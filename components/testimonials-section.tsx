export function TestimonialsSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-12 md:mb-16">
          {/* Decorative line-dot-line design element */}
          <div className="flex items-center justify-center gap-3 mb-4 sm:mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-gray-400 w-16 sm:w-20 md:w-24"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            <div className="h-px bg-gradient-to-l from-transparent via-gray-300 to-gray-400 w-16 sm:w-20 md:w-24"></div>
          </div>
          <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground px-2 leading-tight">
            Kantar and Nielsen grade AI-interviewers
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Qualitative Interviews Card */}
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#050849] p-4 sm:p-8 md:p-10 min-h-[170px] sm:min-h-[350px] md:min-h-[400px] flex flex-col shadow-lg sm:shadow-xl text-center sm:text-left">
            {/* Top pill/badge */}
            <div className="w-14 sm:w-24 md:w-28 h-5 sm:h-7 bg-white/20 rounded-full mb-2 sm:mb-6 mx-auto sm:mx-0"></div>
            
            {/* Content positioned higher */}
            <div className="mt-1 sm:mt-6 md:mt-8">
              <h3 className="text-base sm:text-2xl lg:text-3xl font-semibold text-white mb-1 sm:mb-4 leading-snug">
                In Depth Qualitative Interviews
              </h3>
              <p className="text-white/70 text-xs sm:text-lg md:text-xl leading-relaxed">
                Interviews spanning 7-60 minutes, helping uncover the why behind customer behaviour
              </p>
            </div>
          </div>

          {/* Voice bio-markers Card */}
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#050849] p-4 sm:p-8 md:p-10 min-h-[170px] sm:min-h-[350px] md:min-h-[400px] flex flex-col shadow-lg sm:shadow-xl text-center sm:text-left">
            {/* Top pill/badge */}
            <div className="w-14 sm:w-24 md:w-28 h-5 sm:h-7 bg-white/20 rounded-full mb-2 sm:mb-6 mx-auto sm:mx-0"></div>
            
            {/* Content positioned higher */}
            <div className="mt-1 sm:mt-6 md:mt-8">
              <h3 className="text-base sm:text-2xl lg:text-3xl font-semibold text-white mb-1 sm:mb-4 leading-snug">
                Analysed for Voice bio-markers and Facial expressions
              </h3>
              <p className="text-white/70 text-xs sm:text-lg md:text-xl leading-relaxed">
                Interviewee's voice and facial expressions are analysed and processed via our SOTA intent detection models
              </p>
            </div>
          </div>

          {/* Expert practices Card */}
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#050849] p-4 sm:p-8 md:p-10 min-h-[170px] sm:min-h-[350px] md:min-h-[400px] flex flex-col shadow-lg sm:shadow-xl text-center sm:text-left col-span-2 sm:col-span-1 max-w-[420px] mx-auto sm:max-w-none">
            {/* Top pill/badge */}
            <div className="w-14 sm:w-24 md:w-28 h-5 sm:h-7 bg-white/20 rounded-full mb-2 sm:mb-6 mx-auto sm:mx-0"></div>
            
            {/* Content positioned higher */}
            <div className="mt-1 sm:mt-6 md:mt-8 flex-1 flex flex-col justify-center sm:block">
              <h3 className="text-base sm:text-2xl lg:text-3xl font-semibold text-white mb-1 sm:mb-4 leading-snug">
                Trained on Expert practices and probing techniques
              </h3>
              <p className="text-white/70 text-xs sm:text-lg md:text-xl leading-relaxed">
                AI Interviewers are trained on expert practices and probes to deeply probe every research objective
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
