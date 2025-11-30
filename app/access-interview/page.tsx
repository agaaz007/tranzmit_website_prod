"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Loader2, MicVocal, Check, GripVertical, ArrowRight, User, AlertTriangle } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { Reorder } from "framer-motion"

// --- Types ---

interface Message {
  role: "assistant" | "user"
  content: string
}

// --- Components ---

function VoiceInputDisplay({
  isRecording,
  hasStarted,
  lang
}: {
  isRecording: boolean,
  hasStarted: boolean,
  lang: "en" | "hi"
}) {
  return (
    <div className="flex flex-col items-center justify-center py-6 md:py-10 animate-in fade-in zoom-in duration-500">
      <div className="relative">
        {/* Ripple Effect - Always active when recording */}
        {isRecording && (
          <>
            <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping" />
            <div className="absolute inset-0 rounded-full bg-red-500/10 animate-[pulse_2s_infinite]" />
          </>
        )}

        <div className={cn(
          "relative h-20 w-20 md:h-24 md:w-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg",
          isRecording ? "bg-red-500 text-white scale-110" : "bg-slate-200 text-slate-400"
        )}>
          <MicVocal className="h-8 w-8 md:h-10 md:w-10" />
        </div>
      </div>

      <div className="mt-6 md:mt-8 text-center space-y-2 px-4">
        {isRecording ? (
          <>
            <p className="text-lg md:text-xl font-medium text-slate-800 dark:text-slate-200">
              {lang === "hi" ? "मैं सुन रहा हूँ... बोलें" : "Listening... Speak now"}
            </p>
            <p className="text-xs md:text-sm text-slate-500 max-w-[250px] md:max-w-xs mx-auto leading-relaxed">
              {lang === "hi"
                ? "जब आप बोल चुकें तो 'अगला प्रश्न' दबाएं"
                : "Click 'Next Question' when you're done speaking"}
            </p>
          </>
        ) : (
          <>
            <p className="text-lg md:text-xl font-medium text-slate-800 dark:text-slate-200">
              {lang === "hi" ? "तैयार हैं?" : "Ready to answer?"}
            </p>
            <p className="text-xs md:text-sm text-slate-500 max-w-[250px] md:max-w-xs mx-auto leading-relaxed">
              {lang === "hi"
                ? "शुरू करने के लिए नीचे बटन दबाएं"
                : "Click the button below to start recording"}
            </p>
          </>
        )}
      </div>
    </div>
  )
}

function AudioVisualizer({ stream }: { stream: MediaStream | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const analyserRef = useRef<AnalyserNode>()
  const dataArrayRef = useRef<any>()

  useEffect(() => {
    if (!stream || !canvasRef.current) return

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    if (audioContext.state === 'suspended') {
      audioContext.resume()
    }
    const source = audioContext.createMediaStreamSource(stream)
    const analyser = audioContext.createAnalyser()

    analyser.fftSize = 64
    source.connect(analyser)

    analyserRef.current = analyser
    dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount) as any

    const canvas = canvasRef.current
    const canvasCtx = canvas.getContext("2d")
    if (!canvasCtx) return

    const draw = () => {
      if (!analyserRef.current || !dataArrayRef.current) return

      animationRef.current = requestAnimationFrame(draw)
      analyserRef.current.getByteFrequencyData(dataArrayRef.current)

      canvasCtx.clearRect(0, 0, canvas.width, canvas.height)

      // Calculate average volume
      let sum = 0
      for (let i = 0; i < dataArrayRef.current.length; i++) {
        sum += dataArrayRef.current[i]
      }
      const average = sum / dataArrayRef.current.length

      // Draw visualizer bars
      const barWidth = (canvas.width / dataArrayRef.current.length) * 2.5
      let barHeight
      let x = 0

      for (let i = 0; i < dataArrayRef.current.length; i++) {
        barHeight = dataArrayRef.current[i] / 2

        // Dynamic color based on volume
        if (average < 10) {
          canvasCtx.fillStyle = `rgb(150, 150, 150)` // Gray for silence
        } else {
          canvasCtx.fillStyle = `rgb(${barHeight + 100}, 50, 50)` // Red-ish for sound
        }

        canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)
        x += barWidth + 1
      }
    }

    draw()

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      if (audioContext.state !== 'closed') audioContext.close()
    }
  }, [stream])

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={40}
      className="w-full max-w-[200px] h-[40px] rounded opacity-80"
    />
  )
}

// --- Main Page ---

export default function AccessInterviewPage() {
  const [step, setStep] = useState<"start" | "setup" | "rules" | "interview" | "completed">("start")
  const [setupData, setSetupData] = useState({ name: "", language: "en", consent: "" })

  // Dynamic Interview State
  const [history, setHistory] = useState<Message[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<string>("Could you please introduce yourself and tell me a bit about who you are?")
  const [questionType, setQuestionType] = useState<"text" | "mcq" | "number" | "ordering">("text")
  const [questionOptions, setQuestionOptions] = useState<string[]>([])

  // For non-voice inputs
  const [textAnswer, setTextAnswer] = useState<string | string[]>("")

  const [isProcessing, setIsProcessing] = useState(false)

  // Media State
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null)
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]) // Full session recording
  const [isRecording, setIsRecording] = useState(false)
  const [hasStartedAnswering, setHasStartedAnswering] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [attentionWarning, setAttentionWarning] = useState<string | null>(null)
  const [isCriticalWarning, setIsCriticalWarning] = useState(false)

  // Use Refs for synchronous access to data in event handlers/callbacks
  const chunksRef = useRef<Blob[]>([])
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  // Full Session Recording
  const sessionChunksRef = useRef<Blob[]>([])
  const sessionRecorderRef = useRef<MediaRecorder | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)

  const lang = (setupData.language as "en" | "hi") || "en"
  const totalQuestions = 12
  // History length includes user answer + assistant next question (2 messages per turn)
  // So current question number is floor(length / 2) + 1
  const currentQuestionNumber = Math.floor(history.length / 2) + 1
  const progressPercent = Math.min(((currentQuestionNumber - 1) / totalQuestions) * 100, 100)

  // Cleanup
  useEffect(() => {
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop())
      }
    }
  }, [mediaStream])

  // Video Preview
  useEffect(() => {
    if (videoRef.current && mediaStream) {
      videoRef.current.srcObject = mediaStream
    }
  }, [mediaStream, step])

  // Initialize ordering state when options change
  useEffect(() => {
    setAttentionWarning(null)
    if (questionType === 'ordering' && questionOptions.length > 0) {
      setTextAnswer(questionOptions)
      setHasStartedAnswering(true) // Non-voice questions can submit immediately
    } else if (questionType === 'mcq' || questionType === 'number') {
      setTextAnswer("")
      setHasStartedAnswering(true) // Non-voice questions can submit immediately
    } else if (questionType === 'text') {
      setHasStartedAnswering(false) // Voice questions need explicit start
    }
  }, [questionType, questionOptions])

  // Auto-start recording for text questions
  useEffect(() => {
    if (step === 'interview' && questionType === 'text' && !isRecording && !isProcessing) {
      console.log("Auto-starting recording for text question...")
      // Small delay to ensure UI is ready and previous cleanup is done
      const timer = setTimeout(() => {
        startRecording()
        setHasStartedAnswering(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [step, questionType, isRecording, isProcessing])

  const startInterview = async () => {
    setStep("setup")
    try {
      // Request video with ideal resolution for face visibility
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user"
        },
        audio: true
      })
      setMediaStream(stream)
    } catch (error) {
      console.error("Error accessing media devices:", error)
      toast({
        title: "Camera & Mic Required",
        description: "Please allow camera and microphone access. We need to see you to capture your expressions!",
        variant: "destructive"
      })
      setStep("start")
    }
  }

  const startRecording = () => {
    if (!mediaStream) return

    chunksRef.current = []

    // 1. Get audio track
    const originalAudioTrack = mediaStream.getAudioTracks()[0]
    if (!originalAudioTrack) {
      console.error('No audio tracks found')
      return
    }

    if (!originalAudioTrack.enabled) {
      console.warn("Audio track is disabled! Attempting to enable...")
      originalAudioTrack.enabled = true
    }
    if (originalAudioTrack.muted) {
      console.warn("Audio track is muted! Recording may be silent.")
    }

    // 2. CLONE the track.
    // We must clone because stopRecording() stops the tracks on the recorder's stream.
    // If we use the original track, it will be stopped and subsequent recordings will fail.
    const audioTrack = originalAudioTrack.clone()


    // 3. Create a new stream specifically for recording
    const audioStream = new MediaStream([audioTrack])

    // 4. Determine optimal mimeType
    let mimeType = 'audio/webm;codecs=opus'
    if (!MediaRecorder.isTypeSupported(mimeType)) {
      mimeType = 'audio/mp4' // Safari fallback
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = '' // Browser default
      }
    }

    const options = mimeType ? { mimeType } : {}

    try {
      const recorder = new MediaRecorder(audioStream, options)

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          console.log("Chunk received:", e.data.size)
          chunksRef.current.push(e.data)
        }
      }

      // 5. Start with a small timeslice (e.g., 200ms) to get data frequently
      recorder.start(200)
      mediaRecorderRef.current = recorder
      setIsRecording(true)
      console.log('Audio recording started with mimeType:', recorder.mimeType)

    } catch (err) {
      console.error('Failed to start recording:', err)
      toast({
        title: "Recording Error",
        description: "Could not start recording.",
        variant: "destructive"
      })
    }
  }

  const stopRecording = async (): Promise<Blob | null> => {
    if (!mediaRecorderRef.current) {
      return null
    }

    const recorder = mediaRecorderRef.current
    if (recorder.state === "inactive") {
      const mimeType = recorder.mimeType || "audio/webm"
      return new Blob(chunksRef.current, { type: mimeType })
    }

    return new Promise((resolve) => {
      const stopTimeout = setTimeout(() => {
        console.warn("Recorder stop timed out. Resolving with current chunks.")
        const mimeType = recorder.mimeType || "audio/webm"
        resolve(new Blob(chunksRef.current, { type: mimeType }))
      }, 1000)

      recorder.onstop = () => {
        clearTimeout(stopTimeout)
        const mimeType = recorder.mimeType || "audio/webm"
        const blob = new Blob(chunksRef.current, { type: mimeType })
        console.log("Recording stopped successfully. Blob size:", blob.size)

        // Stop the cloned tracks
        try {
          recorder.stream.getTracks().forEach(t => t.stop())
        } catch (e) {
          console.error("Error stopping tracks:", e)
        }

        setRecordedChunks(prev => [...prev, blob])
        setIsRecording(false)
        resolve(blob)
      }

      try {
        // Request final data flush
        recorder.requestData()
        recorder.stop()
      } catch (err) {
        console.error("Error stopping recorder:", err)
        clearTimeout(stopTimeout)
        resolve(null)
      }
    })
  }


  const startSessionRecording = () => {
    if (!mediaStream) return

    console.log("🎥 Starting FULL SESSION recording...")
    sessionChunksRef.current = []

    try {
      // Record video + audio for the full session
      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')
        ? 'video/webm;codecs=vp9,opus'
        : 'video/webm'

      const recorder = new MediaRecorder(mediaStream, { mimeType })

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          sessionChunksRef.current.push(e.data)
        }
      }

      recorder.start(1000) // 1 second chunks
      sessionRecorderRef.current = recorder
      console.log("✅ Session recording started with", mimeType)
    } catch (err) {
      console.error("❌ Failed to start session recording:", err)
      // Try fallback
      try {
        const recorder = new MediaRecorder(mediaStream)
        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) sessionChunksRef.current.push(e.data)
        }
        recorder.start(1000)
        sessionRecorderRef.current = recorder
        console.log("⚠️ Session recording started (fallback)")
      } catch (e) {
        console.error("Critical: Could not record session", e)
      }
    }
  }

  const stopSessionRecording = async (): Promise<Blob | null> => {
    if (!sessionRecorderRef.current) return null

    console.log("⏹️ Stopping session recording...")
    return new Promise((resolve) => {
      const recorder = sessionRecorderRef.current!

      if (recorder.state === "inactive") {
        const blob = new Blob(sessionChunksRef.current, { type: "video/webm" })
        console.log("Session recording already stopped. Size:", blob.size)
        resolve(blob)
        return
      }

      recorder.onstop = () => {
        const blob = new Blob(sessionChunksRef.current, { type: "video/webm" })
        console.log("✅ Session recording stopped. Final Size:", blob.size)
        resolve(blob)
      }

      recorder.stop()
    })
  }

  const handleSetupComplete = () => {
    if (!setupData.name.trim()) {
      toast({ title: "Required", description: "Please enter your name." })
      return
    }
    if (!setupData.consent) {
      toast({ title: "Required", description: "Please select an option." })
      return
    }
    if (setupData.consent === 'no') {
      setStep("completed")
      return
    }

    setStep("rules")
  }

  const handleRulesComplete = () => {
    // Start the full session recording
    startSessionRecording()

    setAttentionWarning(null)
    setStep("interview")
    setHasStartedAnswering(false) // Reset for new question
  }

  const handleStartAnswering = () => {
    console.log("Start Answering button clicked")
    setHasStartedAnswering(true)
    if (questionType === "text") {
      startRecording()
    }
  }

  const handleNext = async () => {
    if (isProcessing) return
    setIsProcessing(true)

    try {
      const formData = new FormData()
      formData.append("history", JSON.stringify(history))
      formData.append("language", setupData.language)
      formData.append("name", setupData.name)

      if (questionType === "text") {
        if (isRecording) {
          const audioBlob = await stopRecording()
          if (audioBlob) {
            formData.append("audio", audioBlob, "recording.webm")
          } else {
            console.warn("No audio blob captured")
            toast({ title: "Error", description: "Could not capture audio.", variant: "destructive" })
            setIsProcessing(false)
            return
          }
        } else {
           // If not recording, maybe they already stopped? Or never started?
           // For now, assume they must be recording or have recorded.
           // But if `hasStartedAnswering` is true and `isRecording` is false, maybe they stopped manually?
           // My logic above handles `isRecording`. 
           // If they stopped manually, `handleNext` wouldn't have the blob unless I stored it.
           // `stopRecording` stores it in `recordedChunks`, but `handleNext` needs the *current* answer.
           // Actually `stopRecording` returns the blob.
           // If I stop manually, I lose the return value if I don't store it.
           // But the UI doesn't have a "Stop" button separate from "Next" usually in this flow?
           // Let's check the UI.
           // The UI shows "Next Question".
           // So "Next Question" IS the stop button for voice.
           // So `isRecording` should be true.
           toast({ title: "Response Required", description: "Please record your answer." })
           setIsProcessing(false)
           return
        }
      } else {
        let answerVal = ""
        if (questionType === 'mcq') answerVal = textAnswer as string
        else if (questionType === 'number') answerVal = textAnswer as string
        else if (questionType === 'ordering') answerVal = (textAnswer as string[]).join(", ")

        if (!answerVal) {
          toast({ title: "Response Required", description: "Please answer the question." })
          setIsProcessing(false)
          return
        }
        formData.append("textAnswer", answerVal)
      }

      const res = await fetch("/api/interview/process", {
        method: "POST",
        body: formData
      })

      const data = await res.json()

      if (data.error) {
        toast({ title: "Please try again", description: data.error === "NO_ANSWER" ? "We didn't hear anything." : "We didn't understand that." })
        // Don't advance
        setIsProcessing(false)
        return
      }

      if (data.completed || data.nextQuestion === "Survey completed") {
        finishInterview()
        return
      }

      if (data.updatedHistory) setHistory(data.updatedHistory)
      
      if (data.nextQuestion) setCurrentQuestion(data.nextQuestion)
      if (data.questionType) setQuestionType(data.questionType)
      if (data.options) setQuestionOptions(data.options)
      
      setTextAnswer("")
      setHasStartedAnswering(false)

    } catch (error) {
      console.error("handleNext error:", error)
      toast({ title: "Error", description: "Failed to process response. Please try again.", variant: "destructive" })
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadRecording = () => {
    if (sessionChunksRef.current.length === 0) {
      toast({ description: "No recording available." })
      return
    }
    const blob = new Blob(sessionChunksRef.current, { type: "video/webm" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    document.body.appendChild(a)
    a.style.display = "none"
    a.href = url
    a.download = `interview-session-${setupData.name.replace(/\s+/g, "-").toLowerCase() || "user"}.webm`
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  const finishInterview = async () => {
    setIsUploading(true)
    try {
      // Stop session recording
      const videoBlob = await stopSessionRecording()

      const formData = new FormData()
      if (videoBlob) {
        formData.append("video", videoBlob, "session.webm")
        console.log(`Prepared video blob for upload: ${videoBlob.size} bytes`)
      }
      formData.append("history", JSON.stringify(history))
      formData.append("userInfo", JSON.stringify(setupData))

      console.log("Starting interview completion upload...")
      toast({
        title: "Uploading Session...",
        description: "Please wait while we securely upload your session video and responses."
      })

      const res = await fetch("/api/interview/complete", {
        method: "POST",
        body: formData
      })

      const result = await res.json()

      if (!res.ok) {
        console.error("Upload failed:", result)
        throw new Error(result.error || "Upload failed")
      }

      console.log("Upload successful:", result)
      toast({
        title: "Success!",
        description: "Interview uploaded successfully to the cloud."
      })
    } catch (error) {
      console.error("Finish Interview Error:", error)
      toast({
        title: "Upload Failed",
        description: "Could not save the session to the cloud. It is available locally.",
        variant: "destructive"
      })
    } finally {
      setIsUploading(false)
      setStep("completed")
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 font-sans text-slate-900 dark:text-slate-50 flex flex-col relative overflow-hidden selection:bg-blue-100">

      {/* Video Feed - PiP Bottom Right */}


      {/* Video Feed - PiP Bottom Right */}
      {mediaStream && (
        <div className="fixed bottom-4 right-4 md:bottom-10 md:right-10 w-56 md:w-[480px] aspect-[3/4] md:aspect-video rounded-2xl overflow-hidden border-[6px] border-white shadow-2xl z-50 bg-black animate-in slide-in-from-bottom-4 opacity-100 transition-all hover:scale-105 duration-300 group">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover transform scale-x-[-1]"
          />

          {/* Face Guide Overlay */}
          <div className="absolute inset-0 pointer-events-none border-4 border-white/20 rounded-xl m-1">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-32 md:w-48 md:h-64 border-4 border-dashed border-white/40 rounded-[50%] opacity-60" />
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <p className="text-[10px] md:text-base text-white/90 font-semibold px-3 py-1 bg-black/40 backdrop-blur-md rounded-full mx-auto w-max shadow-sm">
                Keep face in frame
              </p>
            </div>
          </div>

          {isRecording && (
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-red-500/90 px-2 py-0.5 rounded text-[10px] md:text-xs font-bold text-white animate-pulse">
              REC
            </div>
          )}
        </div>
      )}

      {/* Uploading Overlay */}
      {isUploading && (
        <div className="fixed inset-0 z-[60] bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in duration-300">
          <div className="flex flex-col items-center space-y-6 p-8">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-8 rounded-full bg-blue-100 animate-pulse" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">Saving Interview...</h3>
              <p className="text-slate-500 max-w-xs">Please wait while we securely upload your session video and responses.</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-4 md:px-6 overflow-y-auto pb-20">

        {/* Header / Progress */}
        {step === "interview" && (
          <header className="py-4 md:py-6 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-sm z-10">
            <div className="text-xs md:text-sm font-medium text-slate-500 tracking-wider uppercase">
              Powered by Tranzmit AI
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex flex-col items-end leading-tight mr-2">
                <span className="text-xs font-semibold text-slate-700">
                  {Math.round(progressPercent)}%
                </span>
                <span className="text-[10px] uppercase tracking-[0.16em] text-slate-400">
                  Step {Math.min(currentQuestionNumber, totalQuestions)} of {totalQuestions}
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-slate-900 text-slate-50 shadow-lg shadow-slate-900/15 border border-slate-800">
                <span className="text-[10px] md:text-xs font-semibold tracking-[0.16em] uppercase text-slate-300">
                  Progress
                </span>
                <div className="w-24 md:w-40">
                  <Progress
                    value={progressPercent}
                    className="h-2 md:h-2.5 bg-slate-700/70"
                  />
                </div>
              </div>
            </div>
          </header>
        )}

        {step === "start" && (
          <div className="flex-1 flex items-center justify-center py-8">
            <div className="max-w-lg text-center space-y-6 md:space-y-8 animate-in zoom-in duration-500 px-4">
              <div className="space-y-4">
                <div className="h-14 w-14 md:h-16 md:w-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center text-white mb-4 md:mb-6 shadow-lg shadow-blue-200">
                  <MicVocal className="h-7 w-7 md:h-8 md:w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">AI Research Assistant</h1>
                <p className="text-base md:text-lg text-slate-500 leading-relaxed">
                  We'd love to hear your thoughts. Participate in a dynamic, conversational interview designed to understand your preferences.
                </p>
              </div>
              <Button size="lg" className="w-full md:w-auto rounded-full px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200/50 hover:shadow-blue-200/70 transition-all active:scale-95" onClick={startInterview}>
                Start Session <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        )}

        {step === "setup" && (
          <div className="flex-1 flex items-center justify-center py-8">
            <div className="w-full max-w-2xl space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center space-y-3 md:space-y-4 mb-8 md:mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Let's get set up</h2>
                <p className="text-lg md:text-xl text-slate-500">A few quick details before we begin.</p>
              </div>

              <div className="space-y-8 md:space-y-10 px-2">
                <div className="space-y-3 md:space-y-4">
                  <Label className="text-lg md:text-xl font-medium text-slate-800">What is your name?</Label>
                  <Input
                    placeholder="Type your name..."
                    className="text-xl md:text-2xl px-5 py-6 md:px-6 md:py-8 rounded-2xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all"
                    value={setupData.name}
                    onChange={(e) => setSetupData(d => ({ ...d, name: e.target.value }))}
                  />
                </div>

                <div className="space-y-3 md:space-y-4">
                  <Label className="text-lg md:text-xl font-medium text-slate-800">Preferred Language</Label>
                  <div className="grid grid-cols-2 gap-4 md:gap-6">
                    {[
                      { id: 'en', label: 'English' },
                      { id: 'hi', label: 'Hindi' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setSetupData(d => ({ ...d, language: opt.id }))}
                        className={cn(
                          "p-6 md:p-8 rounded-2xl border-2 text-lg md:text-xl font-medium transition-all duration-200 touch-manipulation",
                          setupData.language === opt.id
                            ? "border-blue-600 bg-blue-50 text-blue-700 shadow-blue-100 shadow-lg transform scale-[1.02]"
                            : "border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50 active:scale-95"
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 md:space-y-4">
                  <Label className="text-lg md:text-xl font-medium text-slate-800">Ready to record?</Label>
                  <div className="grid grid-cols-2 gap-4 md:gap-6">
                    {[
                      { id: 'yes', label: 'Yes, start' },
                      { id: 'no', label: 'Not now' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setSetupData(d => ({ ...d, consent: opt.id }))}
                        className={cn(
                          "p-6 md:p-8 rounded-2xl border-2 text-lg md:text-xl font-medium transition-all duration-200 touch-manipulation",
                          setupData.consent === opt.id
                            ? "border-blue-600 bg-blue-50 text-blue-700 shadow-blue-100 shadow-lg transform scale-[1.02]"
                            : "border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50 active:scale-95"
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <Button onClick={handleSetupComplete} size="lg" className="w-full rounded-full py-6 md:py-8 text-xl md:text-2xl font-semibold bg-slate-900 hover:bg-slate-800 mt-8 shadow-xl hover:shadow-2xl transition-all active:scale-95">
                  Continue
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === "rules" && (
          <div className="flex-1 flex items-center justify-center py-8">
            <div className="w-full max-w-3xl space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center space-y-3 md:space-y-4 mb-8 md:mb-12">
                <div className="h-14 w-14 md:h-16 md:w-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center text-white mb-4 md:mb-6 shadow-lg shadow-blue-200">
                  <MicVocal className="h-7 w-7 md:h-8 md:w-8" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Interview Guidelines</h2>
                <p className="text-lg md:text-xl text-slate-500">Please read these important rules before we begin.</p>
              </div>

              <div className="space-y-6 md:space-y-8 px-4 md:px-8">
                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-700">
                  <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">🎤 How to Respond</h3>
                  <ul className="space-y-3 text-base md:text-lg text-slate-700 dark:text-slate-300">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Speak clearly and naturally - no need to shout or speak slowly</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Wait for the "Start Answering" button to begin recording</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Click "Next Question" when you've finished speaking</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>For multiple choice questions, select your preferred option</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>The microphone is only active when the red recording indicator is visible</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 md:p-8 border border-blue-200 dark:border-blue-800">
                  <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">📹 Camera & Privacy</h3>
                  <ul className="space-y-3 text-base md:text-lg text-slate-700 dark:text-slate-300">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Your camera captures facial expressions to help us understand your reactions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Keep your face visible within the camera frame (see the guide overlay)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>All data is securely stored and used only for research purposes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>You can stop the interview at any time</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 md:p-8 border border-green-200 dark:border-green-800">
                  <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">✨ What to Expect</h3>
                  <ul className="space-y-3 text-base md:text-lg text-slate-700 dark:text-slate-300">
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 mt-1">•</span>
                      <span>Questions will be asked one at a time</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 mt-1">•</span>
                      <span>The interview will take approximately 10-15 minutes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 mt-1">•</span>
                      <span>Your responses help us improve our products and services</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 mt-1">•</span>
                      <span>Thank you for your valuable feedback!</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-center pt-8">
                <Button onClick={handleRulesComplete} size="lg" className="rounded-full px-8 md:px-12 py-6 md:py-8 text-lg md:text-xl font-semibold bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200/50 hover:shadow-blue-200/70 transition-all active:scale-95">
                  I Understand, Start Interview <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === "interview" && (
          <div
            className={cn(
              "flex-1 flex flex-col items-center justify-center py-4 md:py-8 transition-colors duration-300",
              isCriticalWarning ? "bg-red-50/80" : ""
            )}
          >
            <div className="relative w-full max-w-3xl">
              {isCriticalWarning && (
                <div className="absolute inset-0 rounded-3xl border border-red-200 bg-red-100/70 animate-pulse pointer-events-none" />
              )}
              <div className="relative w-full max-w-3xl space-y-8 md:space-y-12 animate-in fade-in duration-700">

                {attentionWarning && (
                  <div
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-2xl border text-sm md:text-base font-medium shadow-sm",
                      isCriticalWarning
                        ? "border-red-300 bg-red-100 text-red-800"
                        : "border-amber-200 bg-amber-50 text-amber-700"
                    )}
                  >
                    <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                    <p>{attentionWarning}</p>
                  </div>
                )}

                <div className="text-center space-y-4 md:space-y-6 px-2">
                  <h2 className="text-2xl md:text-5xl font-bold leading-tight text-slate-900 tracking-tight">
                    {currentQuestion.replace("{name}", setupData.name)}
                  </h2>
                </div>

                <div className="flex justify-center min-h-[250px] md:min-h-[300px] items-center">
                  {/* Voice Input Mode */}
                  {questionType === 'text' && (
                    <>
                      <VoiceInputDisplay
                        isRecording={isRecording}
                        hasStarted={hasStartedAnswering}
                        lang={lang}
                      />
                      {/* Visualizer for debugging confidence */}
                      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-4 opacity-50 hover:opacity-100 transition-opacity">
                        <AudioVisualizer stream={mediaStream} />
                      </div>
                    </>
                  )}

                  {/* MCQ Mode */}
                  {questionType === 'mcq' && (
                    <div className="grid gap-3 w-full max-w-md mx-auto animate-in slide-in-from-bottom-8 duration-500 px-2">
                      {questionOptions.map((opt, idx) => {
                        const isSelected = textAnswer === opt;
                        return (
                          <button
                            key={idx}
                            onClick={() => setTextAnswer(opt)}
                            className={cn(
                              "w-full p-4 md:p-5 text-base md:text-lg font-medium transition-all duration-200 rounded-xl border-2 text-center shadow-sm touch-manipulation",
                              isSelected
                                ? "border-blue-600 bg-blue-600 text-white shadow-blue-200 shadow-lg scale-[1.02]"
                                : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 active:scale-95"
                            )}
                          >
                            {opt}
                          </button>
                        )
                      })}
                    </div>
                  )}

                  {/* Number Mode */}
                  {questionType === 'number' && (
                    <div className="animate-in zoom-in duration-500">
                      <Input
                        type="number"
                        className="text-5xl md:text-6xl p-8 md:p-12 h-auto w-48 md:w-64 text-center border-2 border-slate-200 rounded-2xl focus:border-blue-600 focus:ring-0 font-bold text-slate-800 placeholder:text-slate-200"
                        placeholder="0"
                        autoFocus
                        value={textAnswer as string}
                        onChange={(e) => setTextAnswer(e.target.value)}
                      />
                    </div>
                  )}

                  {/* Ordering Mode */}
                  {questionType === 'ordering' && Array.isArray(textAnswer) && (
                    <Reorder.Group axis="y" values={textAnswer} onReorder={setTextAnswer} className="space-y-2 md:space-y-3 w-full max-w-md animate-in slide-in-from-bottom-8 duration-500 px-2">
                      {textAnswer.map((item) => (
                        <Reorder.Item key={item} value={item} className="group bg-white border-2 border-slate-200 active:border-blue-400 p-3 md:p-4 rounded-xl shadow-sm cursor-grab active:cursor-grabbing flex items-center gap-4 select-none transition-colors touch-manipulation">
                          <div className="text-slate-300 group-hover:text-blue-400 transition-colors">
                            <GripVertical className="h-5 w-5 md:h-6 md:w-6" />
                          </div>
                          <span className="text-base md:text-lg font-medium text-slate-700">{item}</span>
                        </Reorder.Item>
                      ))}
                    </Reorder.Group>
                  )}
                </div>

                <div className="flex justify-center pt-4 md:pt-8 pb-8">
                  {/* Show Start Answering button for voice questions when not started - HIDDEN for auto-record */}
                  <Button
                    onClick={(e) => {
                      console.log("Next Question clicked!", { isProcessing, questionType, isRecording })
                      e.preventDefault()
                      e.stopPropagation()
                      handleNext()
                    }}
                    disabled={isProcessing}
                    size="lg"
                    className={cn(
                      "rounded-full px-8 md:px-12 py-6 md:py-8 text-lg md:text-xl font-semibold shadow-xl transition-all duration-300 active:scale-95",
                      isProcessing ? "bg-slate-100 text-slate-400 shadow-none" : "bg-slate-900 text-white hover:bg-slate-800 hover:scale-105 hover:shadow-2xl"
                    )}
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-3">
                        <Loader2 className="h-5 w-5 md:h-6 md:w-6 animate-spin" />
                        <span>Processing</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <span>{lang === 'hi' ? "अगला प्रश्न" : "Next Question"}</span>
                        <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                      </div>
                    )}
                  </Button>

                </div>
              </div>
            </div>
          </div>
        )}

            {step === "completed" && (
              <div className="flex-1 flex items-center justify-center py-8">
                <div className="max-w-md text-center space-y-6 md:space-y-8 animate-in zoom-in duration-500 px-4">
                  <div className="h-20 w-20 md:h-24 md:w-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
                    <Check className="h-8 w-8 md:h-10 md:w-10" />
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Thank you, {setupData.name}!</h2>
                    <p className="text-base md:text-lg text-slate-500">Your feedback helps us build better products. The session has been recorded.</p>
                  </div>
                  <div className="space-y-3 pt-6">
                    <Button onClick={downloadRecording} variant="outline" size="lg" className="w-full py-6 rounded-xl border-2 hover:bg-slate-50 text-slate-700">
                      Download Recording
                    </Button>
                    <Button asChild variant="ghost" size="lg" className="w-full py-6 text-slate-500 hover:text-slate-900">
                      <a href="/">Back to Home</a>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
    </div>
  )
}