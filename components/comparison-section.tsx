import { Check, X, Clock, Zap, Target, Mic, BarChart3 } from "lucide-react"

export function ComparisonSection() {
  return (
    <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Artistic Section Divider */}
        <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-gray-400 w-16 sm:w-24 md:w-32"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          <div className="h-px bg-gradient-to-l from-transparent via-gray-300 to-gray-400 w-16 sm:w-24 md:w-32"></div>
        </div>

        <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <div className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 border border-gray-200 rounded-full text-[10px] sm:text-xs font-black text-gray-400 mb-4 sm:mb-6 tracking-[0.2em] sm:tracking-[0.3em] uppercase">
            The Research Evolution
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] max-w-4xl mx-auto">
            <span className="bg-gradient-to-r from-[#2F82AC] to-[#050849] bg-clip-text text-transparent italic">Research is broken.</span>
            <br />
            <span className="text-[#6B8CC7]">We fixed it.</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mt-4 sm:mt-6 font-semibold leading-relaxed px-2 sm:px-0">
            Traditional qualitative research is a logistical nightmare. Tranzmit replaces weeks of manual work with minutes of AI processing.
          </p>
        </div>

        {/* Artistic Comparison Canvas - REDUCED SIZE */}
        <div className="relative max-w-5xl mx-auto">
          {/* Background Decorative Element */}
          <div className="absolute inset-0 bg-[#050849] rounded-xl sm:rounded-2xl lg:rounded-3xl translate-x-1 sm:translate-x-2 translate-y-1 sm:translate-y-2 -z-10 opacity-5 blur-lg sm:blur-xl"></div>
          
          <div className="grid grid-cols-2 lg:flex lg:flex-row gap-0 rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-md sm:shadow-lg lg:shadow-xl border border-gray-100">
            
            {/* Left: The Old Way (The Pain) */}
            <div className="flex-1 bg-gray-50/50 p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col text-left relative overflow-hidden border-r lg:border-b-0 lg:border-r border-gray-100">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(239,68,68,0.03),transparent_50%)]"></div>
              
              <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6 relative z-10">
                <div>
                  <span className="text-red-500 font-black text-[10px] sm:text-xs tracking-widest uppercase mb-1 block">The Past</span>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-300">The Old Way</h3>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center rotate-[-6deg]">
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
                </div>
              </div>
              
              <ul className="space-y-2 sm:space-y-3 flex-1 relative z-10">
                {[
                  "Expensive recruiting agencies",
                  "Scheduling nightmares & no-shows",
                  "Weeks of manual transcription",
                  "Subjective, biased analysis",
                  "Limited sample sizes"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 sm:gap-3 group">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-white border border-gray-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <div className="w-1 h-1 rounded-full bg-red-300"></div>
                    </div>
                    <span className="text-xs sm:text-sm md:text-base text-gray-400 font-semibold tracking-tight leading-tight">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 sm:mt-5 md:mt-6 pt-3 sm:pt-4 border-t border-gray-100 flex items-center gap-2 sm:gap-3 text-gray-300 relative z-10">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base font-black italic tracking-tight">Timeline: 4-6 Weeks</span>
              </div>
            </div>

            {/* Right: The Tranzmit Way (The Solution) */}
            <div className="flex-1 bg-[#050849] p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col text-left relative group">
              {/* Animated Glow Element */}
              <div className="absolute top-0 right-0 w-[200px] sm:w-[250px] lg:w-[300px] h-[200px] sm:h-[250px] lg:h-[300px] bg-blue-500/20 blur-[60px] sm:blur-[80px] rounded-full -translate-y-1/2 translate-x-1/4 group-hover:bg-blue-400/30 transition-colors duration-1000"></div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-5 md:mb-6 relative z-10 gap-2 sm:gap-0">
                <div>
                  <span className="text-blue-400 font-black text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-1 block animate-pulse">The Future</span>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">The Tranzmit Way</h3>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-blue-500/10 backdrop-blur-xl rounded-full text-[8px] sm:text-[9px] font-black text-blue-300 border border-blue-500/30 tracking-[0.15em]">
                  <Zap className="w-2 h-2 sm:w-2.5 sm:h-2.5 fill-blue-400 text-blue-400" />
                  AI POWERED
                </div>
              </div>
              
              <ul className="space-y-2 sm:space-y-3 font-semibold flex-1 relative z-10">
                {[
                  "Instant AI Recruiting from Global Panel",
                  "24/7 On-Demand Interviews",
                  "Real-time Transcription & Synthesis",
                  "Objective, Pattern-Based Growth Insights",
                  "Scale to Thousands of Interviews"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 sm:gap-3 group/item">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.2)] group-hover/item:bg-blue-500/40 transition-all">
                      <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400 stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-sm md:text-base text-white font-semibold tracking-tight leading-tight">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 sm:mt-5 md:mt-6 pt-3 sm:pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 relative z-10">
                <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 bg-white text-[#050849] rounded-lg sm:rounded-xl text-sm sm:text-base font-black italic shadow-md sm:shadow-lg hover:scale-105 transition-transform cursor-default">
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 fill-blue-600 text-blue-600" />
                  <span>Time: Hours</span>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-blue-400 tracking-tighter leading-none">20 x</div>
                  <div className="text-[10px] sm:text-xs font-black text-blue-300/40 uppercase tracking-[0.2em] sm:tracking-[0.3em] mt-1">FASTER</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Meet Your New AI Team Section */}
        <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24 relative">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
             <div className="h-px bg-gray-100 w-full absolute top-1/2 left-0 -z-10 hidden md:block"></div>
             <span className="bg-white px-4 sm:px-6 md:px-8 text-xs sm:text-sm md:text-base font-black text-gray-300 uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em]">Meet your new AI team</span>
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-6 md:gap-8 max-w-5xl mx-auto justify-items-center sm:justify-items-stretch">
            {/* The Recruiter */}
            <div className="group w-full text-center sm:text-left p-3 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-white border border-gray-50 hover:border-blue-100 hover:shadow-md sm:hover:shadow-lg transition-all duration-500">
              <div className="w-9 h-9 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-5 border border-blue-100 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm mx-auto sm:mx-0">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 stroke-[1.5]" />
              </div>
              <h4 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 mb-0 sm:mb-3 tracking-tight">The Recruiter</h4>
              <p className="hidden sm:block text-gray-500 text-xs sm:text-sm leading-relaxed font-semibold">Finds your exact target audience from verified panels and schedules them instantly.</p>
            </div>

            {/* The Interviewer */}
            <div className="group w-full text-center sm:text-left p-3 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-white border border-gray-50 hover:border-purple-100 hover:shadow-md sm:hover:shadow-lg transition-all duration-500">
              <div className="w-9 h-9 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-5 border border-purple-100 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm mx-auto sm:mx-0">
                <Mic className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 stroke-[1.5]" />
              </div>
              <h4 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 mb-0 sm:mb-3 tracking-tight">The Interviewer</h4>
              <p className="hidden sm:block text-gray-500 text-xs sm:text-sm leading-relaxed font-semibold">Conducts voice-to-voice 1:1 interviews, asking dynamic follow-up questions to dig deeper.</p>
            </div>

            {/* The Analyst */}
            <div className="group w-full text-center sm:text-left p-3 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-white border border-gray-50 hover:border-emerald-100 hover:shadow-md sm:hover:shadow-lg transition-all duration-500 col-span-1 sm:col-span-2 md:col-span-1">
              <div className="w-9 h-9 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-5 border border-emerald-100 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm mx-auto sm:mx-0">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 stroke-[1.5]" />
              </div>
              <h4 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 mb-0 sm:mb-3 tracking-tight">The Analyst</h4>
              <p className="hidden sm:block text-gray-500 text-xs sm:text-sm leading-relaxed font-semibold">Synthesizes hours of audio into key themes, quotes, and actionable insights in minutes.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
