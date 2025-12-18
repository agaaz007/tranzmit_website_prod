import { Card } from "@/components/ui/card"

export function UseCasesSection() {
  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          opacity: 0;
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
      <section className="py-12 sm:py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            {/* USE CASES Badge */}
            <div className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 border border-gray-300 rounded-full text-xs sm:text-sm font-medium text-gray-700 mb-4 sm:mb-6">
              USE CASES ARE INFINITE
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold italic tracking-tight text-foreground mb-3 sm:mb-4 leading-tight">
              See Tranzmit in action
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-muted-foreground max-w-2xl mx-auto px-2 sm:px-0">
              From validating new ideas to in-depth user interviews, our AI agents handle
              the heavy lifting.
            </p>
      
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6 max-w-6xl mx-auto">
            {/* Concept testing */}
            <Card
              className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 animate-fade-in p-4 sm:p-5 md:p-6 bg-white min-h-[160px] sm:min-h-[170px] border border-gray-200"
              style={{ animationDelay: '100ms' }}
            >
              {/* Pink icon background */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-pink-100 flex items-center justify-center mb-3 sm:mb-4">
                <svg className="h-5 w-5 sm:h-6 sm:w-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground mb-1.5 sm:mb-2">Concept testing</h3>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
                Qualitative and quantitative feedback on new concepts and ideas.
              </p>
            </Card>

            {/* Landing Page Test */}
            <Card
              className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 animate-fade-in p-4 sm:p-5 md:p-6 bg-white min-h-[160px] sm:min-h-[170px] border border-gray-200"
              style={{ animationDelay: '200ms' }}
            >
              {/* Teal icon background */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-teal-100 flex items-center justify-center mb-3 sm:mb-4">
                <svg className="h-5 w-5 sm:h-6 sm:w-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground mb-1.5 sm:mb-2"> Product Test</h3>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
                Understand how people react and what they think about your product.
              </p>
            </Card>

            {/* Foundational Research */}
            <Card
              className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 animate-fade-in p-4 sm:p-5 md:p-6 bg-white min-h-[160px] sm:min-h-[170px] border border-gray-200"
              style={{ animationDelay: '300ms' }}
            >
              {/* Cyan icon background */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-cyan-100 flex items-center justify-center mb-3 sm:mb-4">
                <svg className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground mb-1.5 sm:mb-2">Foundational Research</h3>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
                Discover new opportunities through open-ended conversations.
              </p>
            </Card>

            {/* Brand Perception */}
            <Card
              className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 animate-fade-in p-4 sm:p-5 md:p-6 bg-white min-h-[160px] sm:min-h-[170px] border border-gray-200"
              style={{ animationDelay: '400ms' }}
            >
              {/* Light pink icon background */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-rose-100 flex items-center justify-center mb-3 sm:mb-4">
                <svg className="h-5 w-5 sm:h-6 sm:w-6 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground mb-1.5 sm:mb-2">Brand Perception</h3>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
                Understand how customers and prospects view your brand.
              </p>
            </Card>

            {/* Creative Testing */}
            <Card
              className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 animate-fade-in p-4 sm:p-5 md:p-6 bg-white min-h-[160px] sm:min-h-[170px] border border-gray-200"
              style={{ animationDelay: '500ms' }}
            >
              {/* Orange icon background */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-orange-100 flex items-center justify-center mb-3 sm:mb-4">
                <svg className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground mb-1.5 sm:mb-2">Creative Testing</h3>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
                Test ads and get real-time feedback from your target audience.
              </p>
            </Card>

            {/* Usability Testing */}
            <Card
              className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 animate-fade-in p-4 sm:p-5 md:p-6 bg-white min-h-[160px] sm:min-h-[170px] border border-gray-200"
              style={{ animationDelay: '600ms' }}
            >
              {/* Green icon background */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-emerald-100 flex items-center justify-center mb-3 sm:mb-4">
                <svg className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground mb-1.5 sm:mb-2">Usability Testing</h3>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
                Watch how people use your product and identify pain points.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
