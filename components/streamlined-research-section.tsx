import { Button } from "@/components/ui/button"
import { Sparkles, Mic, FileText, Search } from "lucide-react"

export function StreamlinedResearchSection() {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.05),transparent_50%)] pointer-events-none"></div>
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 border border-gray-300 rounded-full text-xs sm:text-sm font-medium text-gray-700 mb-4 sm:mb-6 bg-white/50">
            HOW IT WORKS
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-slate-900 mb-4 sm:mb-6 md:mb-8 tracking-tight leading-tight">
            Customer research,<br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-extrabold">streamlined</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto font-normal leading-relaxed px-2 sm:px-0">
            Go from first question to comprehensive market report in hours, not weeks.
          </p>
        </div>

        {/* Interactive Platform Mockup */}
        <div className="max-w-none mx-auto mb-12 sm:mb-16 md:mb-20 flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl w-full">
              {/* Quick Start Panel */}
              <div className="group bg-white/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-lg sm:shadow-xl border border-white/50 hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/50">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-1 mb-4 sm:mb-6 w-fit">
                  <div className="bg-white rounded-lg sm:rounded-xl px-3 sm:px-4 py-1.5 sm:py-2">
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-slate-800">Quick Start</h3>
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white justify-start text-sm sm:text-base font-semibold py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                    Create with AI
                  </Button>
                  <button className="w-full text-left p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-white/60 flex items-center text-slate-700 font-normal transition-all duration-300 hover:scale-[1.01]">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-100 rounded-lg sm:rounded-xl flex items-center justify-center mr-2 sm:mr-3">
                      <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                    </div>
                    <span className="text-sm sm:text-base">Churn Interview</span>
                  </button>
                  <button className="w-full text-left p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-white/60 flex items-center text-slate-700 font-normal transition-all duration-300 hover:scale-[1.01]">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-100 rounded-lg sm:rounded-xl flex items-center justify-center mr-2 sm:mr-3">
                      <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                    </div>
                    <span className="text-sm sm:text-base">Concept Test</span>
                  </button>
                </div>
              </div>

              {/* Participants Panel */}
              <div className="group bg-white/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 relative shadow-lg sm:shadow-xl border border-white/50 hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/50">
                <div className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] sm:text-xs font-bold rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-lg">
                  2k
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-1 mb-4 sm:mb-6 md:mb-8 w-fit">
                  <div className="bg-white rounded-lg sm:rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-2 sm:gap-3">
                    <Search className="w-3 h-3 sm:w-4 sm:h-4 text-slate-600" />
                    <span className="bg-gradient-to-r from-blue-100 to-indigo-100 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium text-slate-700">Delhi</span>
                    <span className="bg-gradient-to-r from-blue-100 to-indigo-100 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium text-slate-700 hidden sm:inline">Marketing</span>
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8">
                  {/* Enhanced participant avatars with better shadows */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white/80 shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-[10px] sm:text-xs md:text-sm">JD</span>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-white/80 shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-[10px] sm:text-xs md:text-sm">SM</span>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-green-400 to-green-600 border-2 border-white/80 shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-[10px] sm:text-xs md:text-sm">AR</span>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white/80 shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-[10px] sm:text-xs md:text-sm">KL</span>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-white/80 shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-[10px] sm:text-xs md:text-sm">TW</span>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 border-2 border-white/80 shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-[10px] sm:text-xs md:text-sm">MJ</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm sm:text-base font-semibold py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                  Add participants
                </Button>
              </div>

              {/* Results Panel */}
              <div className="group bg-white/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-lg sm:shadow-xl border border-white/50 hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/50 md:col-span-2 lg:col-span-1">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-1 mb-4 sm:mb-6 md:mb-8 w-fit">
                  <div className="bg-white rounded-lg sm:rounded-xl px-3 sm:px-4 py-1.5 sm:py-2">
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-slate-800">Results</h3>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center hover:scale-105 transition-transform duration-300">
                    <div className="text-xs sm:text-sm font-semibold text-amber-800">Quotes</div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center hover:scale-105 transition-transform duration-300">
                    <div className="text-xs sm:text-sm font-semibold text-amber-800">Trends</div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center hover:scale-105 transition-transform duration-300">
                    <div className="text-xs sm:text-sm font-semibold text-amber-800">Evaluation</div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center hover:scale-105 transition-transform duration-300">
                    <div className="text-xs sm:text-sm font-semibold text-amber-800">Objectives</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8">
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center hover:scale-105 transition-transform duration-300">
                    <div className="text-xs sm:text-sm font-semibold text-amber-800">Key insights</div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center hover:scale-105 transition-transform duration-300">
                    <div className="text-xs sm:text-sm font-semibold text-amber-800">Top themes</div>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm sm:text-base font-semibold py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                  See Report
                </Button>
              </div>
            </div>
        </div>

        {/* Three Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-16 max-w-7xl mx-auto">
          <div className="group text-left hover:scale-[1.02] transition-all duration-500">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg mr-3 sm:mr-4">
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">1</span>
              </div>
              <div className="h-px bg-gradient-to-r from-blue-200 to-transparent flex-1 ml-2 sm:ml-4 hidden sm:block"></div>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 md:mb-6 text-slate-900 group-hover:text-blue-700 transition-colors duration-300">
              Define your research goals
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-normal">
              Tell our AI what you want to learn. Choose from proven templates or describe your research objectives, and Tranzmit handles the rest.
            </p>
          </div>
          <div className="group text-left hover:scale-[1.02] transition-all duration-500">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg mr-3 sm:mr-4">
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">2</span>
              </div>
              <div className="h-px bg-gradient-to-r from-blue-200 to-transparent flex-1 ml-2 sm:ml-4 hidden sm:block"></div>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 md:mb-6 text-slate-900 group-hover:text-blue-700 transition-colors duration-300">
              AI conducts interviews
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-normal">
              Our AI automatically identifies the right participants from our global panel, conducts personalized interviews using voice agents, and gathers deep insights at scale.
            </p>
          </div>
          <div className="group text-left hover:scale-[1.02] transition-all duration-500 md:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg mr-3 sm:mr-4">
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">3</span>
              </div>
              <div className="h-px bg-gradient-to-r from-blue-200 to-transparent flex-1 ml-2 sm:ml-4 hidden sm:block"></div>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 md:mb-6 text-slate-900 group-hover:text-blue-700 transition-colors duration-300">
              Explore your results
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-normal">
              Within hours, our AI conducts and analyzes hundreds of interviews and generates a detailed and interactive report.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
