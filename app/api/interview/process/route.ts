import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
import { ElevenLabsClient } from "elevenlabs"

// Lazy initialization - only create clients when needed (not during build)
function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY environment variable is not set")
  }
  return new OpenAI({ apiKey })
}

function getElevenLabsClient() {
  const apiKey = process.env.ELEVENLABS_API_KEY
  if (!apiKey) {
    throw new Error("ELEVENLABS_API_KEY environment variable is not set")
  }
  return new ElevenLabsClient({ apiKey })
}

const SYSTEM_PROMPT = `
Only respond in ENGLISH. Do not respond in any other language.
You are an empathetic and professional interviewer for "Tranzmit", an innerwear brand.
Your goal is to conduct a user research interview.
You should generally cover the following topics, but adapt the order and phrasing based on the user's responses.
Do not ask all questions at once. Ask one question at a time.
Keep your questions concise and conversational.

You must output your response in JSON format with the following structure:
{
  "text": "The question text",
  "type": "text" | "mcq" | "number" | "ordering",
  "options": ["Option 1", "Option 2"] // Only for mcq or ordering
}

Use "text" for open-ended questions where the user should speak.
Use "mcq" for questions with specific choices (e.g., Gender, specific age ranges if needed, or simple Yes/No).
Use "number" for specific numeric values (e.g., exact age, price).
Use "ordering" when asking to rank items (e.g., Competitor Ranking).

Key Topics to Cover:
1. Introduction & Warm-up (already done if this is later)
2. "Three Words" associated with FreeCulture (text)
3. Standout Experience with the brand (text)
4. Gender & Shopping Habits (can be mcq for gender)
5. Competitor Ranking (use "ordering" type with options like ["Jockey", "XYXX", "Van Heusen", "FreeCulture", "Other"])
6. Brands currently in their drawer (text or mcq)
7. Durability/Quality of FreeCulture products (text)
8. Issues/Frustrations with innerwear (text)
9. Pricing Perception (text or number)
10. Concept Test (Fitter Line) (text)
11. Purchaser Identity (Who buys?) (text)
12. Fabric Preference (text or mcq)

If the user answers briefly, ask a follow-up.
If the user answers in Hindi, reply in Hindi (or the language they prefer).
Maintain a friendly, research-focused tone.

When survey is completed, return a message saying "Survey completed".
`

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const audioFile = formData.get("audio") as File | null
    const textAnswer = formData.get("textAnswer") as string | null
    const conversationHistory = JSON.parse(formData.get("history") as string || "[]")
    const language = formData.get("language") as string || "en"
    const name = formData.get("name") as string || ""

    let transcript = ""

    // 1. Get Transcript (from Audio or Text)
    if (textAnswer) {
      transcript = textAnswer
    } else if (audioFile) {
      // Transcribe Audio using ElevenLabs Scribe v2
      console.log("Audio file received:", {
        name: audioFile.name,
        size: audioFile.size,
        type: audioFile.type
      })

      const arrayBuffer = await audioFile.arrayBuffer()

      if (arrayBuffer.byteLength === 0) {
        console.error("Empty audio buffer received")
        return NextResponse.json({
          error: "Empty audio recording",
          details: "No audio data was captured. Please try speaking again."
        }, { status: 400 })
      }

      console.log("Audio buffer size:", arrayBuffer.byteLength)

      // --- DEBUG: Save file locally ---
      try {
        const fs = await import("fs/promises")
        const path = await import("path")
        const debugDir = path.join(process.cwd(), "debug_audio")
        await fs.mkdir(debugDir, { recursive: true })
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
        const filename = `audio-${timestamp}.webm`
        const filepath = path.join(debugDir, filename)
        await fs.writeFile(filepath, Buffer.from(arrayBuffer))
        console.log("Saved debug audio to:", filepath)
      } catch (err) {
        console.error("Failed to save debug audio:", err)
      }
      // --------------------------------

      try {
        const elevenlabs = getElevenLabsClient()
        console.log("ElevenLabs client created, starting transcription with Scribe v2...")

        // Create a File object for ElevenLabs Scribe v2
        // Scribe v2 accepts various formats including webm
        const audioFile2 = new File(
          [arrayBuffer],
          "audio.webm",
          { type: "audio/webm" }
        )

        console.log("Sending to ElevenLabs Scribe v2:", {
          fileName: audioFile2.name,
          fileSize: audioFile2.size,
          fileType: audioFile2.type,
          language: language === 'hi' ? 'hi' : 'en'
        })

        const transcription = await elevenlabs.speechToText.convert({
          file: audioFile2,
          model_id: "scribe_v2"
        })

        transcript = transcription.text || ""
        console.log("Transcription result:", {
          length: transcript.length,
          text: transcript.substring(0, 100),
          fullResult: transcription
        })

        if (!transcript || transcript.trim().length === 0) {
          console.warn("Transcription returned empty text - ElevenLabs Scribe v2 may not support this format")
          return NextResponse.json({
            error: "No speech detected",
            details: "Could not transcribe the audio. This might be a format compatibility issue. Please try speaking more clearly or check your microphone.",
            transcript: ""
          }, { status: 400 })
        }
      } catch (scribeError: any) {
        console.error("ElevenLabs Scribe v2 Error:", {
          message: scribeError?.message,
          status: scribeError?.status,
          body: scribeError?.body,
          error: scribeError
        })

        const errorMessage = scribeError?.message || "Unknown transcription error"
        const statusCode = scribeError?.status || 500

        return NextResponse.json({
          error: "Transcription failed",
          details: `${errorMessage}. Note: ElevenLabs Scribe v2 may not support the video/webm format directly.`,
          transcript: ""
        }, { status: statusCode })
      }
    } else {
      return NextResponse.json({
        error: "No input provided",
        details: "Either audio recording or text answer is required"
      }, { status: 400 })
    }

    // 2. Append user's answer to history
    const newHistory = [
      ...conversationHistory,
      { role: "user", content: transcript }
    ]

    // 3. Generate Next Question using OpenAI
    const messages: any[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...newHistory
    ]

    if (name) {
      messages.splice(1, 0, { role: "system", content: `The user's name is ${name}. Please address them by name occasionally.` })
    }

    const openai = getOpenAIClient()
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages,
      temperature: 0.7,
      max_tokens: 350,
      response_format: { type: "json_object" }
    })

    const content = completion.choices[0].message.content
    if (!content) {
      throw new Error("No content from OpenAI")
    }

    let nextQuestionData;
    try {
      nextQuestionData = JSON.parse(content)
    } catch (e) {
      console.error("Failed to parse JSON from OpenAI", content)
      // Fallback
      nextQuestionData = {
        text: content,
        type: "text"
      }
    }

    // 4. Return result
    return NextResponse.json({
      transcript,
      nextQuestion: nextQuestionData.text,
      questionType: nextQuestionData.type || "text",
      options: nextQuestionData.options || [],
      updatedHistory: [
        ...newHistory,
        { role: "assistant", content: nextQuestionData.text } // Store text only in history for context
      ]
    })

  } catch (error) {
    console.error("Processing Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
