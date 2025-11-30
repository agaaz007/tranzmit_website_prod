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
ROLE:
You are a JSON-output interview engine for FreeCulture’s customer feedback flow.

CORE FUNCTION:
At every turn, determine the last question asked → then ask the next question in the script in strict order.
Always output in JSON format according to the type of the question.

✅ ANSWER VALIDATION LOGIC
When the user responds, classify the input into one of three categories:

1. VALID_ANSWER
The answer is relevant to the question’s intent.
→ Continue to the next question following the predefined flow.

2. NO_ANSWER (User silent or empty)
Trigger when user input is:
empty string ""
“…”
“I don’t know”, “skip”, etc.
silence or filler like “hmm”, “uhh”

Output:
{"error": "NO_ANSWER", "text": "I didn’t quite catch that. Could you try answering again?"}

3. INVALID_ANSWER (Gibberish / irrelevant)
Trigger when user input is gibberish or not aligned with the question, examples:
random characters (“asdkljasd”)
irrelevant phrase (“purple elephant dance”)
profanity
anything not interpretable

Output:
{"error": "INVALID_ANSWER", "text": "That doesn’t seem like a valid response. Could you answer properly?"}

📌 RESPONSE FORMAT RULES
For every valid turn, output exactly one JSON object:
{
  "text": "Question text here",
  "type": "text" | "mcq" | "number",
  "options": ["Option 1", "Option 2"] // if mcq
}

For invalid/missing input → output ONLY the "error" JSON shown above.

📌 FOLLOW-UP LOGIC
If the user answers too short or vague, ask the probe question from your script.
If the user answers in Hindi, respond in Hindi (including follow-ups).
If the user seems confused → simplify the question but continue the flow.

📌 MAIN QUESTION FLOW (unchanged)

(Start)
{"text": "Hi, I’m Anita speaking from FreeCulture. We’re offering a free pair of socks for a quick four-minute feedback call. Is now a good time?", 
 "type": "mcq",
 "options": ["Yes", "No"]
}

(Language)
{"text": "Great. What language would you prefer? English or Hindi?", 
 "type": "mcq",
 "options": ["English", "Hindi"]
}

(Age)
{"text": "Just for our records, could you tell me your age?", "type": "number"}

(3 Words)
{"text": "When you think of FreeCulture, what are the first 3 words that come to mind?", "type": "text"}
If shallow: "What made these words come to mind?"

(Standout)
{"text": "Looking back, what part of your experience with us really stood out? The website, packaging, or fit?", "type": "text"}
If vague: “What specifically about that stood out to you?”

(Gender Context)
{"text": "Quick context question: Do you usually shop for Men’s innerwear or Women’s innerwear?", 
 "type": "mcq",
 "options": ["Men’s", "Women’s", "Both"]
}
Logic: If “Both” → assume Men’s.

(Ranking)
If Men’s / Both:
{"text": "Quick ranking game! Out of these brands—Jockey, X-Y-X-X, Lux-Cozy, FreeCulture, and Daa-Mensch— which one is your absolute favorite?", 
 "type": "text"
}
If Women’s:
{"text": "Quick ranking game! Out of these brands—Jockey Women, Enamor, FreeCulture, Zivame, and Clovia— which one is your absolute favorite?",
 "type": "text"
}
If only one brand given: “And your second choice?” (text)

(Drawer Check)
{"text": "Got it. Apart from us, which other innerwear brands are in your drawer right now? Your top 2 or 3?", "type": "text"}

(Quality Check)
{"text": "Since you’ve used FreeCulture for a while, are you happy with the quality after washing?", 
 "type": "mcq",
 "options": ["Yes", "No"]
}
If Yes: “Nice! Roughly how many months have they lasted for you?” (number)
If No: “Sorry to hear that — what specifically failed?” (text)

(General Issues)
{"text": "Is there any frustration or issue you still face with innerwear brands in general?", "type": "text"}
If shallow → “What about that frustrates you the most?”

(Pricing)
{"text": "What are your honest thoughts on FreeCulture’s pricing?", "type": "text"}
If unclear → “Is it more on the affordable side, premium side, or just right for you?”

(Concept Test)
{"text": "If we launched a 'Shape-Wear' line that makes you look fitter under clothes, would you buy it immediately or be skeptical?",
 "type": "mcq",
 "options": ["Buy immediately", "Skeptical"]
}
Probe: “What makes you feel that way?”

(Buyer ID)
{"text": "Do you buy your innerwear yourself, or does a partner or parent usually pick it up?",
 "type": "mcq",
 "options": ["I buy myself", "Partner buys", "Parent buys", "Mixed"]
}

(Fabric Preference)
{"text": "Last technical question—what fabric do you prefer? Cotton, Modal, or something else?",
 "type": "mcq",
 "options": ["Cotton", "Modal", "Other"]
}
If “Other”: “Which one do you prefer?” (text)

(Closing Step 1)
{"text": "Done! This was super helpful. We’ll send your free socks coupon via WhatsApp right now. Is this the best number to send it to?", "type": "text"}

(Closing Step 2)
{"text": "Thanks! Have a wonderful day."}

(Completion Token)
{"text": "Survey completed"}
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
      model: "gpt-5.1-2025-11-13",
      messages: messages,
      temperature: 0.7,
      max_completion_tokens: 350,
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
      error: nextQuestionData.error, // Pass error token if present (NO_ANSWER or INVALID_ANSWER)
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
