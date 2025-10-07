export function PlatformSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            The AI-first research platform
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Replace manual research methods with AI-moderated customer interviews that scale.
          </p>
        </div>

        {/* Modern Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          
          {/* AI Interview Dashboard */}
          <div className="group relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-600">Live Interview Session</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">AI-Moderated Interviews</h3>
              <p className="text-gray-600 mt-2">Intelligent follow-up questions adapt to each response</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              {/* Chat Interface */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">AI</div>
                  <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                    <p className="text-sm text-gray-800">What specific features would make our checkout process more intuitive for you?</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 justify-end">
                  <div className="bg-blue-600 text-white rounded-2xl rounded-br-sm px-4 py-3 max-w-[85%]">
                    <p className="text-sm">I'd love a guest checkout option and saved payment methods...</p>
                  </div>
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs font-medium">U1</div>
                </div>
              </div>
              
              {/* Live Analytics */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Response Rate: 94%
                  </span>
                  <span>Avg. Duration: 8m 32s</span>
                </div>
                <div className="text-xs text-gray-500">Question 7 of 12</div>
              </div>
            </div>
          </div>

          {/* Analytics Dashboard */}
          <div className="group relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-600">Analytics Dashboard</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Actionable Insights, Instantly</h3>
              <p className="text-gray-600 mt-2">AI analyzes responses and generates key takeaways automatically</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              {/* Insight Cards */}
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-xs font-medium uppercase tracking-wider">KEY INSIGHT</span>
                  </div>
                  <p className="text-sm font-medium">73% want faster checkout process</p>
                </div>
                
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-xs font-medium uppercase tracking-wider">PAIN POINT</span>
                  </div>
                  <p className="text-sm font-medium">Mobile users struggle with form fields</p>
                </div>
                
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-xs font-medium uppercase tracking-wider">OPPORTUNITY</span>
                  </div>
                  <p className="text-sm font-medium">Add guest checkout option</p>
                </div>
              </div>
              
              {/* Progress */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
                <span className="text-xs text-gray-500">Analysis Progress</span>
                <span className="text-xs font-medium text-purple-600">127 responses analyzed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Language & Communication */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto mt-8">
          
          {/* Language Translation */}
          <div className="group relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Global Reach</h3>
              <p className="text-gray-600 mt-2">Automatically translate between 28+ languages</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <span className="text-2xl font-bold text-gray-900">English</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                    <span className="text-2xl font-bold text-gray-900">हिन्दी</span>
                  </div>
                  <div className="text-sm text-gray-500">Real-time translation & transcription</div>
                </div>
              </div>
            </div>
          </div>

          {/* Communication Methods */}
          <div className="group relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Multi-Modal Interviews</h3>
              <p className="text-gray-600 mt-2">Video, audio, or text - whatever works best</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-center py-8">
                <div className="flex items-center gap-1">
                  {[4, 7, 3, 8, 2, 9, 5, 6, 4, 8, 3, 7].map((height, i) => (
                    <div
                      key={i}
                      className="w-3 bg-gradient-to-t from-orange-400 to-orange-500 rounded-full transition-all duration-300 group-hover:from-orange-500 group-hover:to-orange-600"
                      style={{ 
                        height: `${height * 4}px`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="text-center text-sm text-gray-500">Live audio waveform</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}