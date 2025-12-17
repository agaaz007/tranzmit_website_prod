export function GetCloserCustomersSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 border border-gray-300 rounded-full text-xs sm:text-sm font-medium text-gray-700 mb-4 sm:mb-6">
            FOR TEAMS
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">Get closer to your customer</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Marketing Card */}
          <div className="group">
            <div className="aspect-[490/440] relative overflow-hidden rounded-xl sm:rounded-2xl bg-gray-100 mb-4 sm:mb-6">
              <img 
                src="/customer_1.png" 
                alt="Marketing insights interface" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 text-gray-900">Marketing</h3>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-900 leading-relaxed">
                Test advertising concepts or messaging. Understand brand values and what drives conversion.
              </p>
            </div>
          </div>

          {/* Product Managers Card */}
          <div className="group">
            <div className="aspect-[490/440] relative overflow-hidden rounded-xl sm:rounded-2xl bg-gray-100 mb-4 sm:mb-6">
              <img 
                src="/customer_2.png" 
                alt="Product analytics dashboard" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 text-gray-900">Product managers</h3>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-900 leading-relaxed">Analyze churn and get product feedback at scale.</p>
            </div>
          </div>

          {/* User Researchers Card */}
          <div className="group sm:col-span-2 lg:col-span-1">
            <div className="aspect-[490/440] relative overflow-hidden rounded-xl sm:rounded-2xl bg-gray-100 mb-4 sm:mb-6">
              <img 
                src="/customer_3.png" 
                alt="User research mobile interface" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 text-gray-900">User researchers</h3>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-900 leading-relaxed">Conduct usability testing, diary studies or ethnographic studies.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
