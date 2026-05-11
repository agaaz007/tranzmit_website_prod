"use client"

import Image from "next/image"

const BRANDS = [
  { name: "Jungle AI", logo: "/logos/jungleai.png", width: 140, height: 140 },
  { name: "Zeo", logo: "/logos/zeoauto.png", width: 140, height: 140 },
  { name: "Tata 1mg", logo: "/logos/tata1mg.png", width: 140, height: 140 },
]

export function LogoMarquee() {
  return (
    <div className="relative z-[2] flex items-center justify-center gap-2 mt-10 sm:mt-12">
      <span
        className="text-xs font-medium tracking-wide"
        style={{ color: "var(--tz-ink-2)", whiteSpace: "nowrap" }}
      >
        Trusted by
      </span>
      <div className="flex items-center gap-6 sm:gap-8">
        {BRANDS.map((brand) => (
          <div
            key={brand.name}
            className="opacity-50 hover:opacity-80 transition-opacity duration-300 grayscale"
          >
            <Image
              src={brand.logo}
              alt={brand.name}
              width={brand.width}
              height={brand.height}
              className="h-6 sm:h-7 w-auto object-contain select-none pointer-events-none"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
