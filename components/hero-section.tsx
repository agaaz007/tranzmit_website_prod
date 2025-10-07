import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-12 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl text-balance leading-[0.9] max-w-6xl mx-auto">
            Get qualitative insights from your customers, at scale
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-8 text-muted-foreground text-pretty">
            Tranzmit finds the right participants, conducts interviews, analyzes responses, and delivers actionable
            insights — with results in hours, not weeks.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="px-12 py-4 text-lg font-semibold" asChild>
              <a href="/book-demo">Request Demo</a>
            </Button>
            <Button variant="outline" size="lg" className="px-12 py-4 text-lg font-semibold border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white" asChild>
              <a href="/sample-report">View Sample Report</a>
            </Button>
          </div>

          <div className="mt-16 sm:mt-20">
            <div className="relative mx-auto max-w-5xl">
              {/* Product demo container with black border on top, left, and right */}
              <div className="relative shadow-2xl">
                <div className="relative">
                  {/* Black border overlay on top, left, and right */}
                  <div className="absolute inset-0 border-t-12 border-l-12 border-r-12 border-black rounded-t-lg z-10 pointer-events-none"></div>
                  
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
