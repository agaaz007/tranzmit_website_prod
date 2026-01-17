"use client"

import { useState, useRef, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, X, ExternalLink, MessageCircle, Clock, Sparkles, ChevronRight, Download } from "lucide-react"
import { respondents, type Respondent } from "./data"
import Script from "next/script"

// Audio Player Component
function AudioPlayer({ audioUrl }: { audioUrl: string }) {
  const openInDrive = () => {
    window.open(audioUrl, '_blank')
  }

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
            </svg>
          </div>
          <div>
            <p className="text-base font-semibold text-gray-900">Audio Recording</p>
            <p className="text-sm text-gray-600">Full conversation available</p>
          </div>
        </div>
        <button
          onClick={openInDrive}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-base font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
        >
          <span>Open in Drive</span>
          <ExternalLink className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

// Full Page Transcript View - Light Mode
function TranscriptView({ 
  respondent, 
  onClose 
}: { 
  respondent: Respondent
  onClose: () => void 
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 bg-white">
      {/* Content */}
      <div className="h-full flex flex-col lg:flex-row">
        {/* Left Sidebar - Info Panel */}
        <div className={`lg:w-[480px] lg:min-w-[480px] bg-gradient-to-b ${respondent.accentColor} p-8 lg:p-10 overflow-y-auto`}>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="mb-10 flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
          >
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <X className="h-6 w-6" />
            </div>
            <span className="text-base font-semibold">Close</span>
          </button>
          
          {/* Respondent Header */}
          <div className="mb-10">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-white text-gray-900 text-4xl font-bold mb-5 shadow-xl">
              {respondent.id}
            </div>
            <h1 className="text-5xl font-bold text-white mb-3">{respondent.name}</h1>
            <p className="text-white/90 text-xl leading-relaxed">{respondent.tagline}</p>
          </div>
          
          {/* Meta Info */}
          <div className="space-y-5 mb-10">
            {respondent.demographics.occupation && (
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <span className="text-2xl">💼</span>
                </div>
                <div>
                  <p className="text-white/70 text-sm uppercase tracking-wider font-medium">Occupation</p>
                  <p className="text-white text-lg font-semibold">{respondent.demographics.occupation}</p>
                </div>
              </div>
            )}
            {respondent.demographics.sport && (
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <span className="text-2xl">🏃</span>
                </div>
                <div>
                  <p className="text-white/70 text-sm uppercase tracking-wider font-medium">Sport</p>
                  <p className="text-white text-lg font-semibold">{respondent.demographics.sport}</p>
                </div>
              </div>
            )}
            {respondent.demographics.experience && (
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-white/90" />
                </div>
                <div>
                  <p className="text-white/70 text-sm uppercase tracking-wider font-medium">Experience</p>
                  <p className="text-white text-lg font-semibold">{respondent.demographics.experience}</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Apps Used */}
          {respondent.demographics.apps && (
            <div className="mb-10">
              <p className="text-white/70 text-sm uppercase tracking-wider font-medium mb-4">Apps Discussed</p>
              <div className="flex flex-wrap gap-2.5">
                {respondent.demographics.apps.map((app, i) => (
                  <span key={i} className="px-4 py-2 rounded-full bg-white/20 text-white text-base font-medium">
                    {app}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Key Insights */}
          {respondent.keyInsights && (
            <div>
              <div className="flex items-center gap-3 mb-5">
                <Sparkles className="h-5 w-5 text-white" />
                <p className="text-white/70 text-sm uppercase tracking-wider font-medium">Key Insights</p>
              </div>
              <div className="space-y-4">
                {respondent.keyInsights.map((insight, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full bg-white mt-2.5 flex-shrink-0" />
                    <p className="text-white/95 text-base leading-relaxed font-medium">{insight}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Right Panel - Conversation */}
        <div className="flex-1 flex flex-col min-h-0 bg-gray-50">
          {/* Audio Player Bar */}
          <div className="p-7 bg-white border-b border-gray-200">
            <AudioPlayer audioUrl={respondent.audioUrl} />
          </div>
          
          {/* Conversation Header */}
          <div className="px-8 lg:px-10 py-5 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-4">
              <MessageCircle className="h-6 w-6 text-gray-400" />
              <h2 className="text-gray-600 text-base uppercase tracking-wider font-semibold">Full Conversation</h2>
              <span className="text-gray-300">•</span>
              <span className="text-gray-600 text-base font-medium">{respondent.conversation.length} messages</span>
            </div>
          </div>
          
          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 lg:p-10">
            <div className="max-w-4xl mx-auto space-y-8">
              {respondent.conversation.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%]`}>
                    {/* Speaker Label */}
                    <p className={`text-sm mb-3 font-semibold ${message.role === "user" ? "text-right text-gray-600" : "text-gray-600"}`}>
                      {message.role === "agent" ? "Putri (AI Interviewer)" : respondent.name}
                    </p>
                    {/* Message Bubble */}
                    <div
                      className={`rounded-2xl px-6 py-5 ${
                        message.role === "user"
                          ? `bg-gradient-to-br ${respondent.accentColor} text-white shadow-md`
                          : "bg-white text-gray-800 border border-gray-200 shadow-sm"
                      }`}
                    >
                      <p className="text-lg leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Respondent Card - Light Mode
function RespondentCard({ 
  respondent, 
  onClick,
  index
}: { 
  respondent: Respondent
  onClick: () => void
  index: number
}) {
  return (
    <button
      onClick={onClick}
      className="group relative text-left w-full animate-in fade-in slide-in-from-bottom-4"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
    >
      <div className="relative bg-white rounded-3xl border border-gray-200 p-7 h-full transition-all duration-300 hover:shadow-xl hover:border-gray-300 hover:-translate-y-1">
        {/* Accent Top Bar */}
        <div className={`absolute top-0 left-7 right-7 h-1 bg-gradient-to-r ${respondent.accentColor} rounded-full opacity-0 group-hover:opacity-100 transition-opacity`} />
        
        {/* Content */}
        <div className="relative">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${respondent.accentColor} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
              {respondent.id}
            </div>
            <ChevronRight className="h-6 w-6 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
          </div>
          
          {/* Name & Tagline */}
          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
            {respondent.name}
          </h3>
          <p className="text-gray-600 text-base leading-relaxed mb-6 line-clamp-2">
            {respondent.tagline}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2.5 mb-6">
            {respondent.demographics.sport && (
              <span className={`px-4 py-2 rounded-full bg-gradient-to-r ${respondent.accentColor} text-white text-sm font-semibold shadow-sm`}>
                {respondent.demographics.sport.split(',')[0].trim()}
              </span>
            )}
            {respondent.demographics.experience && (
              <span className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-semibold">
                {respondent.demographics.experience}
              </span>
            )}
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-between pt-5 border-t border-gray-100">
            <div className="flex items-center gap-2.5 text-gray-500">
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm font-semibold">{respondent.conversation.length} messages</span>
            </div>
            <span className={`text-sm font-bold bg-gradient-to-r ${respondent.accentColor} bg-clip-text text-transparent`}>
              View →
            </span>
          </div>
        </div>
      </div>
    </button>
  )
}

export default function GojekReportPage() {
  const [selectedRespondent, setSelectedRespondent] = useState<Respondent | null>(null)
  const [activeTab, setActiveTab] = useState("conversations")
  const [isDownloading, setIsDownloading] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleDownloadPDF = async () => {
    setIsDownloading(true)
    try {
      // Check if html2pdf is loaded
      if (typeof window !== 'undefined' && (window as any).html2pdf) {
        const iframe = iframeRef.current
        if (iframe && iframe.contentWindow && iframe.contentDocument) {
          const iframeDocument = iframe.contentDocument
          const iframeBody = iframeDocument.body
          
          // Configure PDF options
          const opt = {
            margin: 0,
            filename: 'Gojek-Sports-App-Research-Report.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
              scale: 2,
              useCORS: true,
              logging: false,
              letterRendering: true
            },
            jsPDF: { 
              unit: 'mm', 
              format: 'a4', 
              orientation: 'portrait'
            },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
          }

          // Generate PDF
          await (window as any).html2pdf().set(opt).from(iframeBody).save()
        }
      } else {
        // Fallback: open print dialog
        if (iframeRef.current && iframeRef.current.contentWindow) {
          iframeRef.current.contentWindow.print()
        }
      }
    } catch (error) {
      console.error('Error generating PDF:', error)
      // Fallback to print
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.print()
      }
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!selectedRespondent && <Header />}
      
      {/* Full Page Transcript View */}
      {selectedRespondent && (
        <TranscriptView 
          respondent={selectedRespondent} 
          onClose={() => setSelectedRespondent(null)} 
        />
      )}
      
      {/* Main Content */}
      {!selectedRespondent && (
        <main className="pt-20">
          {/* Hero Section */}
          <div className="bg-white border-b border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
              {/* Back Link */}
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors mb-12"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm">Back to Home</span>
              </Link>
              
              {/* Logo & Title */}
              <div className="max-w-4xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" fill="currentColor"/>
                      <path d="M12 12m-4 0a4 4 0 0 1 8 0a4 4 0 0 1 -8 0" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      <path d="M12 12m-7 0a7 7 0 0 1 14 0a7 7 0 0 1 -14 0" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    </svg>
                  </div>
                  <span className="text-gray-400 text-lg font-semibold tracking-wide">TRANZMIT</span>
                </div>
                
                <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight">
                  Sports App User Research
                </h1>
                
                <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
                  Deep-dive AI interviews with sports enthusiasts exploring their habits, 
                  motivations, and app usage patterns for Reclub, Kuy, Strava, and more.
                </p>
              </div>
            </div>
          </div>
          
          {/* Stats Strip */}
          <div className="bg-white border-b border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
                <div className="py-8 px-6">
                  <p className="text-4xl font-bold text-gray-900 mb-1">{respondents.length}</p>
                  <p className="text-gray-500 text-sm">Interviews</p>
                </div>
                <div className="py-8 px-6">
                  <p className="text-4xl font-bold text-gray-900 mb-1">
                    {respondents.reduce((acc, r) => acc + r.conversation.length, 0)}
                  </p>
                  <p className="text-gray-500 text-sm">Messages</p>
                </div>
                <div className="py-8 px-6">
                  <p className="text-4xl font-bold text-gray-900 mb-1">5+</p>
                  <p className="text-gray-500 text-sm">Apps Discussed</p>
                </div>
                <div className="py-8 px-6">
                  <p className="text-4xl font-bold text-gray-900 mb-1">6</p>
                  <p className="text-gray-500 text-sm">Sports Covered</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-gray-200 bg-white">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <TabsList className="flex w-full justify-center h-auto bg-transparent border-0 p-0 gap-12 -mb-px">
                  <TabsTrigger 
                    value="conversations" 
                    className="relative text-xl font-medium px-2 py-5 rounded-none bg-transparent text-gray-500 border-0 hover:text-gray-900 data-[state=active]:bg-transparent data-[state=active]:text-gray-900 transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-transparent data-[state=active]:after:bg-gradient-to-r data-[state=active]:after:from-blue-600 data-[state=active]:after:to-indigo-600 after:transition-all after:duration-300 after:rounded-t-sm"
                  >
                    Conversations
                  </TabsTrigger>
                  <TabsTrigger 
                    value="report" 
                    className="relative text-xl font-medium px-2 py-5 rounded-none bg-transparent text-gray-500 border-0 hover:text-gray-900 data-[state=active]:bg-transparent data-[state=active]:text-gray-900 transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-transparent data-[state=active]:after:bg-gradient-to-r data-[state=active]:after:from-blue-600 data-[state=active]:after:to-indigo-600 after:transition-all after:duration-300 after:rounded-t-sm"
                  >
                    Report
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
          
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
              {/* Conversations Tab */}
              <TabsContent value="conversations" className="space-y-16">
          
                {/* Respondents Section */}
                <div className="flex items-end justify-between mb-10">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">All Responses</h2>
                    <p className="text-gray-500">Click any card to view the full transcript and audio</p>
                  </div>
                </div>
                
                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {respondents.map((respondent, index) => (
                    <RespondentCard
                      key={respondent.id}
                      respondent={respondent}
                      index={index}
                      onClick={() => setSelectedRespondent(respondent)}
                    />
                  ))}
                </div>
                
                {/* Themes Section */}
                <div className="bg-white border-t border-gray-200 rounded-2xl p-8 mt-16">
                  <div className="flex items-center gap-3 mb-10">
                    <Sparkles className="h-5 w-5 text-amber-500" />
                    <h2 className="text-2xl font-bold text-gray-900">Key Themes Across Interviews</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { title: "Payment Fragmentation", desc: "Users want integrated booking and payment in one app instead of switching between platforms", color: "from-orange-500 to-amber-500" },
                      { title: "Community Discovery", desc: "Finding teammates and communities is a major friction point, especially for team sports", color: "from-violet-500 to-purple-500" },
                      { title: "Social Features Gap", desc: "Users want to share progress within sports apps rather than switching to Instagram", color: "from-emerald-500 to-teal-500" },
                      { title: "Word-of-Mouth Rules", desc: "Friends are the #1 discovery channel for sports apps, beating ads and algorithms", color: "from-blue-500 to-indigo-500" },
                    ].map((theme, i) => (
                      <div key={i} className="group p-6 rounded-2xl bg-gray-50 border border-gray-200 hover:bg-white hover:shadow-lg hover:border-gray-300 transition-all">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${theme.color} flex items-center justify-center mb-4`}>
                          <span className="text-white text-lg font-bold">{i + 1}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{theme.title}</h3>
                        <p className="text-gray-500 leading-relaxed">{theme.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Report Tab */}
              <TabsContent value="report" className="space-y-6">
                {/* Download Button */}
                <div className="flex justify-end">
                  <Button
                    onClick={handleDownloadPDF}
                    disabled={isDownloading}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    size="lg"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    {isDownloading ? 'Generating PDF...' : 'Download Report as PDF'}
                  </Button>
                </div>

                {/* Report Iframe */}
                <div className="relative w-full overflow-hidden rounded-2xl shadow-lg border border-gray-200" style={{ height: '100vh' }}>
                  <iframe 
                    ref={iframeRef}
                    src="/gojek-combined-report.html"
                    className="absolute inset-0 w-full h-full border-0"
                    title="Gojek Combined Report"
                  />
                </div>
              </TabsContent>
            </div>
          </Tabs>
          
          <Footer />
        </main>
      )}
      
      {/* Load html2pdf library for PDF generation */}
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
        strategy="lazyOnload"
      />
    </div>
  )
}
