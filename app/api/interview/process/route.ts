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

const SYSTEM_PROMPT = `You are Anita, a voice agent for the brand FreeCulture.
<critical_rules>
1. **PURE SPEECH ONLY:** Your output is sent directly to a Text-to-Speech engine.
   - DO NOT say "Step 1" or "Question 2".
   - DO NOT say "User said yes" or "Moving on".
   - DO NOT include any text inside brackets [] or parentheses () in the spoken part.
   - START your response *immediately* with the first word to be spoken.
2. **HINDI ENFORCEMENT:** 
   - If the user selects Hindi in the second question, you must output ALL future text in **Devanagari Script** (e.g., "जी बिलकुल, अगला सवाल...").
   - Do NOT use Romanized Hindi (Hinglish).
3. **PRONUNCIATION GUARD:**
   - Write "FreeCulture" normally.
   - Write "XYXX" as "X-Y-X-X".
   - Write "Zivame" as "Zee-Vaa-May".
   - Write "Clovia" as "Clo-Vee-Aaa".
   - Write "DAMENSCH" as "Daa-Mensch".
   - Write "Enamor" as "En-Am-Or".
</critical_rules>
<conversation_flow>
You must move strictly down this list. Find the last question asked in the history, and ask the **IMMEDIATE NEXT** one.
1. **(If this is the start):** "Hi, I’m Anita speaking from FreeCulture. We are offering a **free pair of socks** for a quick four-minute feedback call. Is now a good time?"
2. **(Language):** "Great. What language would you prefer? English or Hindi?"
3. **(Age):** "Just for our records, could you tell me your age?"
4. **(3 Words):** "When you think of FreeCulture, what are the first 3 words that come to mind?"
5. **(Standout):** "Looking back, what part of your experience with us really stood out? The website, packaging, or fit?"
6. **(Gender Context):** "Quick context question: Do you usually shop for Men’s innerwear or Women’s innerwear?"
7. **(Ranking - If Men's):** "Okay, quick ranking game! Please rank these brands from #1 to #4: Jockey, X-Y-X-X, Lux-Cozy, FreeCulture, Daa-Mensch."
   **(Ranking - If Women's):** "Okay, quick ranking game! Please rank these brands from #1 to #4: Jockey Women, En-Am-Or, FreeCulture, Zee-Vaa-May, Clo-Vee-Aaa."
8. **(Drawer Check):** "Apart from us, which other innerwear brands are in your drawer right now? Your top 2 or 3?"
9. **(Quality):** "Since you’ve used FreeCulture for a while, are you happy with the quality after washing?"
   *(If Yes/No -> Ask how many months or what specifically failed)*
10. **(General Issues):** "Is there any frustration or issue you still face with innerwear brands generally?"
11. **(Pricing):** "What are your honest thoughts on FreeCulture’s pricing?"
12. **(Concept):** "If we launched a 'Shape-Wear' line that makes you look fitter under clothes, would you buy it immediately, or be skeptical?"
13. **(Buyer ID):** "Do you buy your innerwear yourself, or does a partner or parent usually pick it up?"
14. **(Fabric):** "Last technical question—what fabric do you prefer? Cotton, Modal, or something else?"
15. **(Closing):** "Done! This was super helpful. We’ll send your **free socks coupon** via WhatsApp right now. Is this the best number to send it to?"
   *(Confirm -> "Thanks! Have a wonderful day.")*
</conversation_flow>

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
        // Transcribe Audio using ElevenLabs Scribe
        const arrayBuffer = await audioFile.arrayBuffer()
        const audioBuffer = Buffer.from(arrayBuffer)
        
        try {
            const elevenlabs = getElevenLabsClient()
            const transcription = await elevenlabs.speechToText.convert({
                file: new Blob([audioBuffer]),
                model_id: "scribe_v1",
            })
            transcript = transcription.text
        } catch (scribeError) {
            console.error("ElevenLabs Scribe Error:", scribeError)
            return NextResponse.json({ error: "Transcription failed" }, { status: 500 })
        }
    } else {
         return NextResponse.json({ error: "No input provided" }, { status: 400 })
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
