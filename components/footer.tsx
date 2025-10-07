export function Footer() {
  return (
    <footer className="bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Main tagline */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get valuable customer intelligence with Tranzmit
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transform your customer research with AI-powered interviews that deliver deeper insights faster than ever before.
            </p>
          </div>
          
          {/* CTA Button */}
          <div className="pt-4">
            <a
              href="/book-demo"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200"
            >
              Request Demo
            </a>
          </div>
          
          {/* Simple bottom section */}
          <div className="pt-8 border-t border-gray-300 w-full">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-2xl text-blue-600">TRANZMIT</span>
              </div>
              <div className="text-gray-500 text-sm">
                © 2025 Tranzmit. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
