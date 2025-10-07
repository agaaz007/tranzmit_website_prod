export function StatisticsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="w-full h-px bg-gray-300 mb-16"></div>
        <div className="flex flex-col sm:flex-row justify-between items-stretch gap-12 sm:gap-8">
          <div className="flex-1 text-center sm:text-left">
            <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-gray-900 mb-3 sm:mb-4">3x</div>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">Customer responses more than three times longer than average.</p>
          </div>
          <div className="flex-1 text-center">
            <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-gray-900 mb-3 sm:mb-4">{"<24h"}</div>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">Results in hours, not days.</p>
          </div>
          <div className="flex-1 text-center sm:text-right">
            <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-gray-900 mb-3 sm:mb-4">+1L</div>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">Thousands of possible respondents.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
