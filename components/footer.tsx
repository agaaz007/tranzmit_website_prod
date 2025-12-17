export function Footer() {
  return (
    <footer className="relative w-full bg-gradient-to-b from-white via-cyan-100 to-cyan-300 overflow-hidden pt-8 sm:pt-10 md:pt-12 flex flex-col justify-between">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mb-10 sm:mb-14 md:mb-20">
        <div className="pl-0 sm:pl-4">
           <p className="text-xs sm:text-sm md:text-base font-medium text-gray-700">
            Contact Us: <a href="mailto:support@tranzmit.ai" className="hover:text-blue-700 transition-colors break-all sm:break-normal">contact@trazmit.com</a>
          </p>
        </div>
      </div>
      
      <div className="w-full flex justify-center items-end pb-0 -mb-1 sm:-mb-2 md:-mb-4 lg:-mb-6">
        <h1 className="text-[12vw] sm:text-[14vw] md:text-[16vw] lg:text-[18vw] leading-[0.75] font-black text-white/50 tracking-tighter select-none text-center whitespace-nowrap w-full">
          TRANZMIT
        </h1>
      </div>
    </footer>
  )
}
