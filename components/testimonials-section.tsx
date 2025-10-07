import { Card } from "@/components/ui/card"

export function TestimonialsSection() {
  return (
    <section className="pt-8 pb-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Real-World Success Stories
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 w-full max-w-none mx-auto px-4 justify-center">
          {/* Market Research Firm */}
          <Card className="relative overflow-hidden group w-full sm:w-[481px] shrink-0 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500" style={{aspectRatio: '6/4'}}>
            <div className="absolute inset-0">
              <img 
                src="/success_story_1.png" 
                alt="Market Research Success" 
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay from bottom up */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              
              {/* Company badge at top left */}
              <div className="absolute top-4 left-4 lg:top-6 lg:left-6">
                <span className="inline-block bg-black/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                  Market Research Firm
                </span>
              </div>
              
              {/* Default text content in bottom left on dark gradient */}
              <div className="absolute bottom-4 lg:bottom-8 left-4 lg:left-8 right-4 lg:right-8 text-white group-hover:opacity-0 transition-opacity duration-500">
                <h3 className="text-2xl lg:text-4xl font-bold mb-2 lg:mb-3 text-left leading-tight">
                  3x Faster Data Collection
                </h3>
                <p className="text-white/90 text-left text-sm lg:text-lg leading-relaxed max-w-md">
                  Completed 500+ customer interviews in 2 days instead of 6 weeks.
                </p>
              </div>
              
              {/* Hover state: Expanded content with backdrop */}
              <div className="absolute inset-0 bg-black/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center p-6 lg:p-8">
                <h3 className="text-2xl lg:text-4xl font-bold text-white text-left leading-tight mb-4 lg:mb-6">
                  3x Faster Data Collection
                </h3>
                <p className="text-white/90 mb-4 lg:mb-6 text-base lg:text-xl text-left leading-relaxed">
                  Completed 500+ customer interviews in 2 days instead of the usual 6 weeks. The AI interviewer maintained consistency across all conversations while adapting to each respondent's communication style.
                </p>
                <div className="flex items-center text-green-400">
                  <svg className="w-5 h-5 lg:w-6 lg:h-6 mr-2 lg:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold text-sm lg:text-xl">Time saved: 6 weeks → 2 days</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Healthcare NGO */}
          <Card className="relative overflow-hidden group w-full sm:w-[481px] shrink-0 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500" style={{aspectRatio: '6/4'}}>
            <div className="absolute inset-0">
              <img 
                src="/success_story_2.png" 
                alt="Healthcare NGO Success" 
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay from bottom up */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              
              {/* Company badge at top left */}
              <div className="absolute top-4 left-4 lg:top-6 lg:left-6">
                <span className="inline-block bg-black/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                  Healthcare NGO
                </span>
              </div>
              
              {/* Default text content in bottom left on dark gradient */}
              <div className="absolute bottom-4 lg:bottom-8 left-4 lg:left-8 right-4 lg:right-8 text-white group-hover:opacity-0 transition-opacity duration-500">
                <h3 className="text-2xl lg:text-4xl font-bold mb-2 lg:mb-3 text-left leading-tight">
                  Reached 15,000 Rural Patients
                </h3>
                <p className="text-white/90 text-left text-sm lg:text-lg leading-relaxed max-w-md">
                  Successfully gathered health data from remote communities across 8 states.
                </p>
              </div>
              
              {/* Hover state: Expanded content with backdrop */}
              <div className="absolute inset-0 bg-black/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center p-6 lg:p-8">
                <h3 className="text-2xl lg:text-4xl font-bold text-white text-left leading-tight mb-4 lg:mb-6">
                  Reached 15,000 Rural Patients
                </h3>
                <p className="text-white/90 mb-4 lg:mb-6 text-base lg:text-xl text-left leading-relaxed">
                  Successfully gathered health needs data from remote communities across 8 states. Local dialect support and cultural sensitivity training helped break down barriers that prevented previous outreach efforts.
                </p>
                <div className="flex items-center text-blue-400">
                  <svg className="w-5 h-5 lg:w-6 lg:h-6 mr-2 lg:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-semibold text-sm lg:text-xl">Coverage: 8 states, 12 languages</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Political Polling */}
          <Card className="relative overflow-hidden group w-full sm:w-[481px] shrink-0 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500" style={{aspectRatio: '6/4'}}>
            <div className="absolute inset-0">
              <img 
                src="/success_story_3.png" 
                alt="Political Polling Success" 
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay from bottom up */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              
              {/* Company badge at top left */}
              <div className="absolute top-4 left-4 lg:top-6 lg:left-6">
                <span className="inline-block bg-black/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                  Political Polling
                </span>
              </div>
              
              {/* Default text content in bottom left on dark gradient */}
              <div className="absolute bottom-4 lg:bottom-8 left-4 lg:left-8 right-4 lg:right-8 text-white group-hover:opacity-0 transition-opacity duration-500">
                <h3 className="text-2xl lg:text-4xl font-bold mb-2 lg:mb-3 text-left leading-tight">
                  30% Higher Response Rates
                </h3>
                <p className="text-white/90 text-left text-sm lg:text-lg leading-relaxed max-w-md">
                  Captured honest voter sentiment with unprecedented participation rates.
                </p>
              </div>
              
              {/* Hover state: Expanded content with backdrop */}
              <div className="absolute inset-0 bg-black/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center p-6 lg:p-8">
                <h3 className="text-2xl lg:text-4xl font-bold text-white text-left leading-tight mb-4 lg:mb-6">
                  30% Higher Response Rates
                </h3>
                <p className="text-white/90 mb-4 lg:mb-6 text-base lg:text-xl text-left leading-relaxed">
                  Conducted pre-election polling across swing states with unprecedented participation rates. Anonymous AI interviews reduced social desirability bias and captured honest voter sentiment that traditional polls missed.
                </p>
                <div className="flex items-center text-purple-400">
                  <svg className="w-5 h-5 lg:w-6 lg:h-6 mr-2 lg:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="font-semibold text-sm lg:text-xl">Margin of error: ±1.2% vs industry ±3.5%</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
