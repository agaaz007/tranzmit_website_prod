import { Button } from "@/components/ui/button"
import { Sparkles, Mic, FileText, Search } from "lucide-react"

export function StreamlinedResearchSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.05),transparent_50%)] pointer-events-none"></div>
      
      <div className="container relative mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 mb-8 tracking-tight leading-tight">
            Customer research,<br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-extrabold">streamlined</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto font-normal leading-relaxed">
            Go from first question to comprehensive market report in hours, not weeks.
          </p>
        </div>

        {/* Interactive Platform Mockup */}
        <div className="max-w-none mx-auto mb-20 flex justify-center">
            <div className="grid lg:grid-cols-3 gap-8 max-w-7xl w-full">
              {/* Quick Start Panel */}
              <div className="group bg-white/40 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/50">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-1 mb-6 w-fit">
                  <div className="bg-white rounded-xl px-4 py-2">
                    <h3 className="text-lg font-semibold text-slate-800">Quick Start</h3>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white justify-start text-base font-semibold py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                    <Sparkles className="w-5 h-5 mr-3" />
                    Create with AI
                  </Button>
                  <button className="w-full text-left p-4 rounded-2xl hover:bg-white/60 flex items-center text-slate-700 font-normal transition-all duration-300 hover:scale-[1.01]">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center mr-3">
                      <Mic className="w-5 h-5 text-slate-600" />
                    </div>
                    Churn Interview
                  </button>
                  <button className="w-full text-left p-4 rounded-2xl hover:bg-white/60 flex items-center text-slate-700 font-normal transition-all duration-300 hover:scale-[1.01]">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center mr-3">
                      <FileText className="w-5 h-5 text-slate-600" />
                    </div>
                    Concept Test
                  </button>
                </div>
              </div>

              {/* Participants Panel */}
              <div className="group bg-white/40 backdrop-blur-xl rounded-3xl p-8 relative shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/50">
                <div className="absolute top-6 right-6 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
                  2k
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-1 mb-8 w-fit">
                  <div className="bg-white rounded-xl px-4 py-2 flex items-center gap-3">
                    <Search className="w-4 h-4 text-slate-600" />
                    <span className="bg-gradient-to-r from-blue-100 to-indigo-100 px-3 py-1 rounded-full text-sm font-medium text-slate-700">Delhi</span>
                    <span className="bg-gradient-to-r from-blue-100 to-indigo-100 px-3 py-1 rounded-full text-sm font-medium text-slate-700">Marketing</span>
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 mb-8">
                  {/* Enhanced participant avatars with better shadows */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white/80 shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-sm">JD</span>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-white/80 shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-sm">SM</span>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 border-2 border-white/80 shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-sm">AR</span>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white/80 shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-sm">KL</span>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-white/80 shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-sm">TW</span>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 border-2 border-white/80 shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-sm">MJ</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-base font-semibold py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                  Add participants
                </Button>
              </div>

              {/* Results Panel */}
              <div className="group bg-white/40 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/50">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-1 mb-8 w-fit">
                  <div className="bg-white rounded-xl px-4 py-2">
                    <h3 className="text-lg font-semibold text-slate-800">Results</h3>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200/50 rounded-2xl p-4 text-center hover:scale-105 transition-transform duration-300">
                    <div className="text-sm font-semibold text-amber-800">Quotes</div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200/50 rounded-2xl p-4 text-center hover:scale-105 transition-transform duration-300">
                    <div className="text-sm font-semibold text-amber-800">Trends</div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200/50 rounded-2xl p-4 text-center hover:scale-105 transition-transform duration-300">
                    <div className="text-sm font-semibold text-amber-800">Evaluation</div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200/50 rounded-2xl p-4 text-center hover:scale-105 transition-transform duration-300">
                    <div className="text-sm font-semibold text-amber-800">Objectives</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200/50 rounded-2xl p-4 text-center hover:scale-105 transition-transform duration-300">
                    <div className="text-sm font-semibold text-amber-800">Key insights</div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200/50 rounded-2xl p-4 text-center hover:scale-105 transition-transform duration-300">
                    <div className="text-sm font-semibold text-amber-800">Top themes</div>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-base font-semibold py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                  See Report
                </Button>
              </div>
            </div>
        </div>

        {/* Three Steps */}
        <div className="grid lg:grid-cols-3 gap-16 max-w-7xl mx-auto">
          <div className="group text-left hover:scale-[1.02] transition-all duration-500">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg mr-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <div className="h-px bg-gradient-to-r from-blue-200 to-transparent flex-1 ml-4"></div>
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-slate-900 group-hover:text-blue-700 transition-colors duration-300">
              Define your research goals
            </h3>
            <p className="text-lg text-slate-600 leading-relaxed font-normal">
              Tell our AI what you want to learn. Choose from proven templates or describe your research objectives, and Tranzmit handles the rest.
            </p>
          </div>
          <div className="group text-left hover:scale-[1.02] transition-all duration-500">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg mr-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <div className="h-px bg-gradient-to-r from-blue-200 to-transparent flex-1 ml-4"></div>
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-slate-900 group-hover:text-blue-700 transition-colors duration-300">
              AI conducts interviews
            </h3>
            <p className="text-lg text-slate-600 leading-relaxed font-normal">
              Our AI automatically identifies the right participants from our global panel, conducts personalized interviews using voice agents, and gathers deep insights at scale.
            </p>
          </div>
          <div className="group text-left hover:scale-[1.02] transition-all duration-500">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg mr-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <div className="h-px bg-gradient-to-r from-blue-200 to-transparent flex-1 ml-4"></div>
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-slate-900 group-hover:text-blue-700 transition-colors duration-300">
              Explore your results
            </h3>
            <p className="text-lg text-slate-600 leading-relaxed font-normal">
              Within hours, our AI conducts and analyzes hundreds of interviews and generates a detailed and interactive report.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
