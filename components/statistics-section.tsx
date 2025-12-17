export function StatisticsSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="inline-flex items-center justify-center px-4 py-1.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 mb-6">
            BY THE NUMBERS
          </div>
        </div>
        <div className="w-full h-px bg-gray-300 mb-8 sm:mb-12 md:mb-16"></div>
        <div className="flex flex-col sm:flex-row justify-between items-stretch gap-6 sm:gap-4 md:gap-6 lg:gap-8">
          <div className="flex-1 text-center sm:text-left">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">3x</div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-900 leading-relaxed">Customer responses more than three times longer than average.</p>
          </div>
          <div className="flex-1 text-center">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">{"<24h"}</div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-900 leading-relaxed">Results in hours, not days</p>
          </div>
          <div className="flex-1 text-center sm:text-right">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">+500K</div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-900 leading-relaxed">Thousands of possible respondents</p>
          </div>
        </div>
      </div>
    </section>
  )
}
