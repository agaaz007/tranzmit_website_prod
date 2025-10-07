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
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <div className="text-lg font-medium text-muted-foreground mb-4">USE CASES</div>
            <h2 className="text-5xl font-bold tracking-tight text-foreground lg:text-6xl mb-6">See Tranzmit in action</h2>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Tranzmit is an end-to-end moderated platform that customers routinely surveys, focus groups, and in-depth
              interviews with Tranzmit's AI-moderated interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-2xl mx-auto items-stretch">
            {/* Concept testing */}
            <Card
              className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 hover:scale-[1.03] animate-fade-in h-full"
              style={{ animationDelay: '100ms' }}
            >
              <div className="flex items-center h-full py-3">
                <div className="flex h-24 w-24 items-center justify-center bg-muted ml-4 rounded-lg">
                  <svg className="h-7 w-7 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div className="flex-1 py-3 px-5">
                  <h3 className="text-xl font-semibold text-foreground mb-1">Concept testing</h3>
                  <p className="text-base text-muted-foreground">
                    Qualitative and quantitative feedback on new concepts and ideas.
                  </p>
                </div>
              </div>
            </Card>

            {/* Landing Page Test */}
            <Card
              className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 hover:scale-[1.03] animate-fade-in h-full"
              style={{ animationDelay: '200ms' }}
            >
              <div className="flex items-center h-full py-3">
                <div className="flex h-24 w-24 items-center justify-center bg-muted ml-4 rounded-lg">
                  <svg className="h-7 w-7 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="flex-1 py-3 px-5">
                  <h3 className="text-xl font-semibold text-foreground mb-1">Landing Page Test</h3>
                  <p className="text-base text-muted-foreground">
                    Understand how people react and what they think about your landing page.
                  </p>
                </div>
              </div>
            </Card>

            {/* Foundational Research */}
            <Card
              className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 hover:scale-[1.03] animate-fade-in h-full"
              style={{ animationDelay: '300ms' }}
            >
              <div className="flex items-center h-full py-3">
                <div className="flex h-24 w-24 items-center justify-center bg-muted ml-4 rounded-lg">
                  <svg className="h-7 w-7 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </div>
                <div className="flex-1 py-3 px-5">
                  <h3 className="text-xl font-semibold text-foreground mb-1">Foundational Research</h3>
                  <p className="text-base text-muted-foreground">
                    Discover new opportunities through open-ended conversations.
                  </p>
                </div>
              </div>
            </Card>

            {/* Brand Perception */}
            <Card
              className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 hover:scale-[1.03] animate-fade-in h-full"
              style={{ animationDelay: '400ms' }}
            >
              <div className="flex items-center h-full py-3">
                <div className="flex h-24 w-24 items-center justify-center bg-muted ml-4 rounded-lg">
                  <svg className="h-7 w-7 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v2a1 1 0 01-1 1h-1v10a2 2 0 01-2 2H6a2 2 0 01-2-2V8H3a1 1 0 01-1-1V5a1 1 0 011-1h4z"
                    />
                  </svg>
                </div>
                <div className="flex-1 py-3 px-5">
                  <h3 className="text-xl font-semibold text-foreground mb-1">Brand Perception</h3>
                  <p className="text-base text-muted-foreground">
                    Understand how customers and prospects view your brand.
                  </p>
                </div>
              </div>
            </Card>

            {/* Creative Testing */}
            <Card
              className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 hover:scale-[1.03] animate-fade-in h-full"
              style={{ animationDelay: '500ms' }}
            >
              <div className="flex items-center h-full py-3">
                <div className="flex h-24 w-24 items-center justify-center bg-muted ml-4 rounded-lg">
                  <svg className="h-7 w-7 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </div>
                <div className="flex-1 py-3 px-5">
                  <h3 className="text-xl font-semibold text-foreground mb-1">Creative Testing</h3>
                  <p className="text-base text-muted-foreground">
                    Test ads and get real-time feedback from your target audience.
                  </p>
                </div>
              </div>
            </Card>

            {/* Usability Testing */}
            <Card
              className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 hover:scale-[1.03] animate-fade-in h-full"
              style={{ animationDelay: '600ms' }}
            >
              <div className="flex items-center h-full py-3">
                <div className="flex h-24 w-24 items-center justify-center bg-muted ml-4 rounded-lg">
                  <svg className="h-7 w-7 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="flex-1 py-3 px-5">
                  <h3 className="text-xl font-semibold text-foreground mb-1">Usability Testing</h3>
                  <p className="text-base text-muted-foreground">
                    Watch how people use your product and identify pain points.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}

