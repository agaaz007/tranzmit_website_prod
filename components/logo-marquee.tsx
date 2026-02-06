"use client"

import Image from "next/image"

const BRANDS = [
  { name: "Gojek", logo: "/logos/gojek.svg", width: 100, height: 50 },
  { name: "Freecultr", logo: "/logos/freecultr.svg", width: 150, height: 36 },
  { name: "Jungle", logo: "/logos/jungle.svg", width: 110, height: 44 },
  { name: "Juno", logo: "/logos/juno.svg", width: 100, height: 40 },
]

export function LogoMarquee() {
  const items = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS]

  return (
    <section className="pt-6 pb-14 sm:pt-8 sm:pb-20 overflow-hidden">
      <div className="container mx-auto mb-8">
        <p
          className="text-center text-xs font-semibold tracking-[0.2em] uppercase"
          style={{ color: "var(--t-text-muted)" }}
        >
          Trusted by teams at
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        <div
          className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, var(--t-bg), transparent)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, var(--t-bg), transparent)",
          }}
        />

        <div className="animate-marquee whitespace-nowrap flex items-center">
          {items.map((brand, i) => (
            <div
              key={i}
              className="mx-8 sm:mx-14 flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity duration-300 dark:brightness-0 dark:invert dark:opacity-40 dark:hover:opacity-70"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={brand.width}
                height={brand.height}
                className="h-8 sm:h-10 w-auto object-contain select-none pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
