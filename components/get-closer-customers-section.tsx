export function GetCloserCustomersSection() {
  return (
    <section className="py-24 bg-white">
      {/* Header with container for centering */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get closer to your customer</h2>
        </div>
      </div>

      {/* Grid with padding and scaled down images */}
      <div className="grid lg:grid-cols-3 gap-8 px-8">
        {/* Marketing Card */}
        <div className="relative">
          <div className="aspect-[490/440] relative overflow-hidden rounded-2xl transform scale-95">
            <img 
              src="/customer_1.png" 
              alt="Marketing insights interface" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="px-4 py-8">
            <h3 className="text-2xl font-semibold mb-4">Marketing</h3>
            <p className="text-lg text-gray-600">
              Test advertising concepts or messaging. Understand brand values and what drives conversion.
            </p>
          </div>
        </div>

        {/* Product Managers Card */}
        <div className="relative">
          <div className="aspect-[490/440] relative overflow-hidden rounded-2xl transform scale-95">
            <img 
              src="/customer_2.png" 
              alt="Product analytics dashboard" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="px-4 py-8">
            <h3 className="text-2xl font-semibold mb-4">Product managers</h3>
            <p className="text-lg text-gray-600">Analyze churn and get product feedback at scale.</p>
          </div>
        </div>

        {/* User Researchers Card */}
        <div className="relative">
          <div className="aspect-[490/440] relative overflow-hidden rounded-2xl transform scale-95">
            <img 
              src="/customer_3.png" 
              alt="User research mobile interface" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="px-4 py-8">
            <h3 className="text-2xl font-semibold mb-4">User researchers</h3>
            <p className="text-lg text-gray-600">Conduct usability testing, diary studies or ethnographic studies.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
