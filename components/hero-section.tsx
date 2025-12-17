import { Button } from "@/components/ui/button"
import Image from "next/image"

const MESSAGES = [
  "AI-led customer interviews that drive Growth",
  "Reduce churn with real feedback — not guesses",
  "Accelerate product and GTM decisions with AI-driven evidence",
  "Reduce churn and increase customer lifetime value with predictive insight"
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold tracking-tight text-balance leading-[1.1] max-w-6xl mx-auto">
            <span className="bg-gradient-to-r from-[#7FB3E7] to-[#050849] bg-clip-text text-transparent">Your Autonomous</span>
            <br />
            <span className="bg-gradient-to-r from-[#2F82AC] to-[#050849] bg-clip-text text-transparent">Customer Research </span>
            <span className="text-[#6B8CC7]">Team</span>
          </h1>

          <div className="mx-auto mt-6 sm:mt-8 w-full overflow-hidden">
            <style>{`
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-marquee {
                animation: marquee 40s linear infinite;
              }
              .animate-marquee:hover {
                animation-play-state: paused;
              }
              @media (max-width: 640px) {
                .animate-marquee {
                  animation: marquee 30s linear infinite;
                }
              }
            `}</style>
            <div className="relative flex overflow-x-hidden group">
              <div className="animate-marquee whitespace-nowrap flex items-center">
                {/* Triple duplication to ensure smooth loop on wide screens */}
                {[...MESSAGES, ...MESSAGES, ...MESSAGES].map((msg, i) => (
                  <div key={i} className="flex items-center">
                    <span className="mx-4 sm:mx-6 md:mx-8 text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold italic text-[#113177]">
                      {msg}
                    </span>
                    <span className="text-[#6B8CC7] text-base sm:text-xl md:text-2xl">•</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <p className="mx-auto mt-6 sm:mt-8 max-w-5xl text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed sm:leading-7 text-muted-foreground font-light px-2 sm:px-0">
            Tranzmit deploys swarms of AI interviewers that find the right participants,
            conducts interviews, analyzes responses, and delivers actionable insights to
            product and marketing teams in hours, not months.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
            <Button size="lg" className="w-full sm:w-auto px-8 sm:px-10 py-5 sm:py-6 text-sm sm:text-base font-semibold rounded-full" asChild>
              <a href="/book-demo">Request Demo</a>
            </Button>
           
            <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 sm:px-10 py-5 sm:py-6 text-sm sm:text-base font-semibold rounded-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white" asChild>
              <a href="/sample-report">View Sample Report</a>
            </Button>
          </div>

          <div className="mt-12 sm:mt-16 md:mt-20">
            <div className="relative mx-auto max-w-5xl">
              {/* Product demo container with black border on top, left, and right */}
              <div className="relative shadow-xl sm:shadow-2xl">
                <div className="relative">
                  {/* Black border overlay on top, left, and right */}
                  <div className="absolute inset-0 border-t-4 sm:border-t-8 md:border-t-12 border-l-4 sm:border-l-8 md:border-l-12 border-r-4 sm:border-r-8 md:border-r-12 border-black rounded-t-lg z-10 pointer-events-none"></div>
                  
                  {/* Image container */}
                  <div className="aspect-video rounded-t-lg overflow-hidden bg-white">
                    <Image
                      src="/product_demo.png"
                      alt="Tranzmit Product Demo"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
                
                {/* Subtle line divider - moved to touch bottom of image */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Subtle section divider - reduced spacing */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent mt-4"></div>
    </section>
  )
}
