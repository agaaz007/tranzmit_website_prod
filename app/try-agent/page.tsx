import { Header } from "@/components/header"
import Script from "next/script"

export const metadata = {
  title: "Try Voice Agent - Tranzmit AI",
  description: "Experience our AI voice agent and see how natural conversations can transform your research.",
}

export default function TryAgentPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,_#E6F3FF_0%,_#F0F8FF_50%,_white_100%)]">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mx-auto max-w-4xl">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                Try Our AI Voice Agent
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Experience a natural conversation with our AI agent. Click the button below to start talking and see how we conduct real-time interviews at scale.
              </p>
            </div>

            {/* Voice Agent Widget Container */}
            <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
              <div className="flex flex-col items-center justify-center space-y-6">
                <div className="w-full max-w-md">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 text-center">
                    <div className="mb-6">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-4">
                        <svg 
                          className="w-10 h-10 text-white" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" 
                          />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                        Ready to Chat?
                      </h2>
                      <p className="text-gray-600">
                        Click the voice agent widget below to start a conversation
                      </p>
                    </div>
                    
                    {/* ElevenLabs Voice Agent Widget */}
                    <div className="flex justify-center">
                    <elevenlabs-convai agent-id="agent_6401k9zs9ec9fs2vkfffmwdpjwzf"></elevenlabs-convai><script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="mt-8 text-center max-w-2xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    What to Expect
                  </h3>
                  <ul className="text-left space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Natural, human-like conversations powered by AI</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Real-time responses and adaptive follow-up questions</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>The same technology we use to conduct thousands of interviews</span>
                    </li>
                  </ul>
                </div>

                {/* Call to Action */}
                <div className="mt-8 pt-8 border-t border-gray-200 w-full text-center">
                  <p className="text-gray-600 mb-4">
                    Impressed? See how this can work for your research needs.
                  </p>
                  <a 
                    href="https://calendly.com/tranzmitai/new-meeting" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    Request a Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* ElevenLabs Script */}
      <Script 
        src="https://unpkg.com/@elevenlabs/convai-widget-embed" 
        strategy="afterInteractive"
        type="text/javascript"
      />
    </div>
  )
}

