import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
import { ElevenLabsClient } from "elevenlabs"

// Initialize clients
// Note: Ensure ELEVENLABS_API_KEY and OPENAI_API_KEY are set in environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
})

const SYSTEM_PROMPT = `
You are an empathetic and professional interviewer for "Tranzmit", an innerwear brand.
Your goal is to conduct a user research interview.
You should generally cover the following topics, but adapt the order and phrasing based on the user's responses.
Do not ask all questions at once. Ask one question at a time.
Keep your questions concise and conversational.

Key Topics to Cover:
1. Introduction & Warm-up (already done if this is later)
2. "Three Words" associated with FreeCulture
3. Standout Experience with the brand
4. Gender & Shopping Habits
5. Competitor Ranking (ask them to rank key competitors like Jockey, XYXX, etc.)
6. Brands currently in their drawer
7. Durability/Quality of FreeCulture products
8. Issues/Frustrations with innerwear
9. Pricing Perception
10. Concept Test (Fitter Line)
11. Purchaser Identity (Who buys?)
12. Fabric Preference

If the user answers briefly, ask a follow-up.
If the user answers in Hindi, reply in Hindi (or the language they prefer).
Maintain a friendly, research-focused tone.
`

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const audioFile = formData.get("audio") as File | null
    const conversationHistory = JSON.parse(formData.get("history") as string || "[]")
    const language = formData.get("language") as string || "en"

    if (!audioFile) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 })
    }

    // 1. Transcribe Audio using ElevenLabs Scribe
    // We need to convert File to Blob/Buffer for the SDK
    const arrayBuffer = await audioFile.arrayBuffer()
    const audioBuffer = Buffer.from(arrayBuffer)
    
    // Create a Blob-like object for the SDK if needed, or use the file directly if SDK supports it.
    // The ElevenLabs SDK usually takes a file object or stream.
    // Let's try using the standard fetch if SDK is complex with Next.js File objects, 
    // but SDK is cleaner. Let's try SDK.
    
    let transcript = ""
    
    try {
        const transcription = await elevenlabs.speechToText.convert({
            file: new Blob([audioBuffer]),
            model_id: "scribe_v1", // or "scribe_v2_realtime" if applicable, usually "scribe_v1" for file upload
            // tag: "interview_response",
        })
        transcript = transcription.text
    } catch (scribeError) {
        console.error("ElevenLabs Scribe Error:", scribeError)
        // Fallback or error handling
        return NextResponse.json({ error: "Transcription failed" }, { status: 500 })
    }

    // 2. Append user's answer to history
    const newHistory = [
      ...conversationHistory,
      { role: "user", content: transcript }
    ]

    // 3. Generate Next Question using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // or gpt-4-turbo
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...newHistory
      ],
      temperature: 0.7,
      max_tokens: 150,
    })

    const nextQuestion = completion.choices[0].message.content || "Thank you. Could you tell me more?"

    // 4. Return result
    return NextResponse.json({
      transcript,
      nextQuestion,
      updatedHistory: [
        ...newHistory,
        { role: "assistant", content: nextQuestion }
      ]
    })

  } catch (error) {
    console.error("Processing Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

