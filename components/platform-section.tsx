export function PlatformSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
       <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-gray-400 w-16 sm:w-20 md:w-24"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            <div className="h-px bg-gradient-to-l from-transparent via-gray-300 to-gray-400 w-16 sm:w-20 md:w-24"></div>
          </div>
          <br className="hidden sm:block" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 border border-gray-300 rounded-full text-xs sm:text-sm font-medium text-gray-700 mb-4 sm:mb-6">
            PLATFORM
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-3 sm:mb-4">
            The AI-first research platform
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">
            Replace manual research methods with AI-moderated customer interviews that scale.
          </p>
        </div>

        {/* Modern Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 max-w-7xl mx-auto">
          
          {/* AI Interview Dashboard */}
          <div className="group relative bg-white p-5 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 min-h-[400px] sm:min-h-[450px] md:min-h-[520px] flex flex-col">
            <div className="mb-4 sm:mb-6 md:mb-8">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-semibold text-red-500 uppercase tracking-wider">LIVE SESSION</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">AI-Moderated Interviews</h3>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mt-2">Intelligent follow-up questions adapt to each response in real-time.</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-100 flex-1 flex flex-col justify-center">
              {/* Chat Interface */}
              <div className="space-y-4 sm:space-y-6 mb-4 sm:mb-6 md:mb-8">
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-medium shrink-0">AI</div>
                  <div className="bg-white rounded-xl sm:rounded-2xl rounded-tl-sm px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 shadow-sm border border-gray-100 max-w-[85%]">
                    <p className="text-xs sm:text-sm md:text-base text-gray-800">What specific features would make our checkout process more intuitive for you?</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4 justify-end">
                  <div className="bg-blue-600 text-white rounded-xl sm:rounded-2xl rounded-br-sm px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 max-w-[85%]">
                    <p className="text-xs sm:text-sm md:text-base">I'd love a guest checkout option and saved payment methods...</p>
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-xs sm:text-sm font-medium shrink-0">U1</div>
                </div>
              </div>
              
              {/* Live Analytics */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 sm:pt-6 border-t border-gray-200 gap-2 sm:gap-0">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-gray-500">
                  <span className="flex items-center gap-1 sm:gap-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
                    Response Rate: 94%
                  </span>
                  <span>Avg. Duration: 8m 32s</span>
                </div>
                <div className="text-xs sm:text-sm text-gray-500">Question 7 of 12</div>
              </div>
            </div>
          </div>

          {/* Analytics Dashboard */}
          <div className="group relative bg-white p-5 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 min-h-[400px] sm:min-h-[450px] md:min-h-[520px] flex flex-col">
            <div className="mb-4 sm:mb-6 md:mb-8">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-purple-500 rounded-full"></div>
                <span className="text-xs sm:text-sm font-semibold text-purple-500 uppercase tracking-wider">REAL-TIME ANALYSIS</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Actionable Insights, Instantly</h3>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mt-2">AI analyzes responses and generates key takeaways automatically.</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-100 flex-1 flex flex-col justify-center">
              {/* Insight Cards */}
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-emerald-500 text-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5">
                  <div className="flex items-center gap-2 mb-1 sm:mb-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                    <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">KEY INSIGHT</span>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg font-medium">73% want faster checkout process</p>
                </div>
                
                <div className="bg-purple-500 text-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5">
                  <div className="flex items-center gap-2 mb-1 sm:mb-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                    <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">PAIN POINT</span>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg font-medium">Mobile users struggle with form fields</p>
                </div>
                
                <div className="bg-orange-500 text-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5">
                  <div className="flex items-center gap-2 mb-1 sm:mb-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                    <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">OPPORTUNITY</span>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg font-medium">Add guest checkout option</p>
                </div>
              </div>
              
              {/* Progress */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 sm:pt-6 border-t border-gray-200 mt-4 sm:mt-6 gap-2 sm:gap-0">
                <span className="text-xs sm:text-sm text-gray-500">Analysis Progress</span>
                <span className="text-xs sm:text-sm font-medium text-blue-600">127 responses analyzed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Language & Communication */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 max-w-7xl mx-auto mt-6 sm:mt-8 md:mt-10">
          
          {/* Language Translation */}
          <div className="group relative bg-white p-5 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 min-h-[300px] sm:min-h-[350px] md:min-h-[400px] flex flex-col">
            <div className="mb-4 sm:mb-6 md:mb-8">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Global Reach</h3>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mt-2">Automatically translate between 28+ languages instantly.</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 lg:p-10 border border-gray-100 flex-1 flex flex-col justify-center">
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-3 sm:mb-4">
                    <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">English</span>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                    <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">हिन्दी</span>
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-500">Real-time translation & transcription</div>
                </div>
              </div>
            </div>
          </div>

          {/* Communication Methods */}
          <div className="group relative bg-white p-5 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 min-h-[300px] sm:min-h-[350px] md:min-h-[400px] flex flex-col">
            <div className="mb-4 sm:mb-6 md:mb-8">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Multi-Modal Interviews</h3>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mt-2">Video, audio, or text - whatever works best for your users.</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 lg:p-10 border border-gray-100 flex-1 flex flex-col justify-center">
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  {[4, 7, 3, 8, 2, 9, 5, 6, 4, 8, 3, 7].map((height, i) => (
                    <div
                      key={i}
                      className="w-2 sm:w-2.5 md:w-3 lg:w-3.5 bg-gradient-to-t from-orange-400 to-orange-500 rounded-full transition-all duration-300 group-hover:from-orange-500 group-hover:to-orange-600"
                      style={{ 
                        height: `${height * 4}px`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="text-center text-xs sm:text-sm md:text-base text-gray-500 mt-4 sm:mt-6">Live audio waveform</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
