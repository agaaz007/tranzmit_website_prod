"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Loader2, MicVocal, Check, GripVertical, ArrowRight } from "lucide-react"
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
  lang,
  toggleRecording
}: { 
  isRecording: boolean, 
  lang: "en" | "hi",
  toggleRecording: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center py-6 md:py-10 animate-in fade-in zoom-in duration-500">
       <button 
         onClick={toggleRecording}
         className={cn(
           "relative group transition-all duration-300 outline-none touch-manipulation",
           "rounded-full p-1"
         )}
       >
         {/* Ripple Effect */}
         {isRecording && (
            <>
              <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping" />
              <div className="absolute inset-0 rounded-full bg-red-500/10 animate-[pulse_2s_infinite]" />
            </>
         )}
         
         <div className={cn(
           "relative h-20 w-20 md:h-24 md:w-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg",
           isRecording 
             ? "bg-red-500 text-white scale-110" 
             : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 active:scale-95"
         )}>
           <MicVocal className="h-8 w-8 md:h-10 md:w-10" />
         </div>
       </button>

       <div className="mt-6 md:mt-8 text-center space-y-2 px-4">
         <p className="text-lg md:text-xl font-medium text-slate-800 dark:text-slate-200">
            {isRecording 
              ? (lang === "hi" ? "मैं सुन रहा हूँ..." : "Listening...") 
              : (lang === "hi" ? "जवाब देने के लिए टैप करें" : "Tap to speak")}
         </p>
         <p className="text-xs md:text-sm text-slate-500 max-w-[250px] md:max-w-xs mx-auto leading-relaxed">
           {lang === "hi" 
              ? "आपका जवाब रिकॉर्ड किया जा रहा है" 
              : "Your answer will be transcribed automatically"}
         </p>
       </div>
    </div>
  )
}

// --- Main Page ---

export default function AccessInterviewPage() {
  const [step, setStep] = useState<"start" | "setup" | "interview" | "completed">("start")
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
  
  // Use Refs for synchronous access to data in event handlers/callbacks
  const chunksRef = useRef<Blob[]>([])
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  const lang = (setupData.language as "en" | "hi") || "en"

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
      if (questionType === 'ordering' && questionOptions.length > 0) {
          setTextAnswer(questionOptions)
      } else if (questionType === 'mcq' || questionType === 'number') {
          setTextAnswer("")
      }
  }, [questionType, questionOptions])

  const startInterview = async () => {
    setStep("setup")
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      setMediaStream(stream)
    } catch (error) {
      console.error("Error accessing media devices:", error)
      toast({
        title: "Permission Denied",
        description: "Please allow camera and microphone access.",
        variant: "destructive"
      })
      setStep("start")
    }
  }

  const startRecording = () => {
    if (!mediaStream) return
    
    chunksRef.current = []
    const recorder = new MediaRecorder(mediaStream)
    
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data)
      }
    }
    
    recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" })
        setRecordedChunks(prev => [...prev, blob])
    }

    recorder.start()
    mediaRecorderRef.current = recorder
    setIsRecording(true)
  }

  const stopRecording = async () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        await new Promise<void>(resolve => {
            if (!mediaRecorderRef.current) return resolve()
            mediaRecorderRef.current.onstop = () => resolve()
            mediaRecorderRef.current.stop()
        })
        setIsRecording(false)
    }
  }

  const toggleRecording = () => {
      if (isRecording) {
          stopRecording()
      } else {
          startRecording()
      }
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
    setStep("interview")
    
    // Auto-start recording only if it's a text question
    if (questionType === "text") {
        startRecording()
    }
  }

  const handleNext = async () => {
    if (isProcessing) return
    
    // Validate inputs
    if (questionType === 'mcq' && !textAnswer) {
        toast({ title: "Required", description: "Please select an option." })
        return
    }
    if (questionType === 'number' && !textAnswer) {
        toast({ title: "Required", description: "Please enter a number." })
        return
    }

    setIsProcessing(true)
    
    const formData = new FormData()
    formData.append("history", JSON.stringify(history))
    formData.append("language", lang)
    formData.append("name", setupData.name)

    // Handle different input types
    if (questionType === "text") {
        // Voice Logic
        await stopRecording()
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" })
        formData.append("audio", audioBlob, "response.webm")
    } else {
        // Structured Input Logic
        let finalAnswer = textAnswer
        if (Array.isArray(textAnswer)) {
            finalAnswer = textAnswer.join(", ")
        }
        formData.append("textAnswer", finalAnswer as string)
    }

    try {
        const res = await fetch("/api/interview/process", {
            method: "POST",
            body: formData
        })
        
        if (!res.ok) throw new Error("Failed to process")
        
        const data = await res.json()
        
        // Update State
        setHistory(data.updatedHistory)
        setCurrentQuestion(data.nextQuestion)
        setQuestionType(data.questionType || "text")
        setQuestionOptions(data.options || [])
        
        // Reset answers
        setTextAnswer("")

        // Handle Recording State for Next Question
        if (data.questionType === "text") {
            startRecording()
        } else {
             if (isRecording) stopRecording()
        }

    } catch (error) {
        console.error(error)
        toast({ title: "Error", description: "Could not process your response. Please try again.", variant: "destructive" })
    } finally {
        setIsProcessing(false)
    }
  }

  const downloadRecording = () => {
    if (recordedChunks.length === 0) return
    const blob = new Blob(recordedChunks, { type: "video/webm" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    document.body.appendChild(a)
    a.style.display = "none"
    a.href = url
    a.download = "interview-session.webm"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 font-sans text-slate-900 dark:text-slate-50 flex flex-col relative overflow-hidden selection:bg-blue-100">
      
      {/* Video Feed - PiP Bottom Right */}
      {mediaStream && (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-32 md:w-48 aspect-video rounded-lg overflow-hidden border-2 border-white shadow-xl z-50 bg-black animate-in slide-in-from-bottom-4 opacity-90 hover:opacity-100 transition-opacity">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="w-full h-full object-cover"
          />
          {isRecording && (
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-red-500/90 px-2 py-0.5 rounded text-[10px] md:text-xs font-bold text-white">
              REC
            </div>
          )}
        </div>
      )}

      <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-4 md:px-6 overflow-y-auto pb-20">
         
         {/* Header / Progress */}
         {step === "interview" && (
            <header className="py-4 md:py-6 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-sm z-10">
                 <div className="text-xs md:text-sm font-medium text-slate-400 tracking-wider uppercase">Research Session</div>
                 <div className="flex items-center gap-3">
                    <span className="text-xs md:text-sm text-slate-400 hidden md:inline">Progress</span>
                    <Progress value={(history.length / 12) * 100} className="w-16 md:w-24 h-1.5 bg-slate-100" />
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

         {step === "interview" && (
            <div className="flex-1 flex flex-col items-center justify-center py-4 md:py-8">
               <div className="w-full max-w-3xl space-y-8 md:space-y-12 animate-in fade-in duration-700">
                   
                   <div className="text-center space-y-4 md:space-y-6 px-2">
                      <h2 className="text-2xl md:text-5xl font-bold leading-tight text-slate-900 tracking-tight">
                         {currentQuestion.replace("{name}", setupData.name)}
                      </h2>
                   </div>

                   <div className="flex justify-center min-h-[250px] md:min-h-[300px] items-center">
                      {/* Voice Input Mode */}
                      {questionType === 'text' && (
                          <VoiceInputDisplay 
                            isRecording={isRecording} 
                            lang={lang} 
                            toggleRecording={toggleRecording}
                          />
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
                      {(questionType !== 'text' || !isRecording) && (
                        <Button 
                            onClick={handleNext} 
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
                                <span>{lang === 'hi' ? "अगला" : "Next Question"}</span>
                                <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                               </div>
                           )}
                        </Button>
                      )}
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