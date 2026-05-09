"use client"

import { HoloCard } from "./holo-card"

const cards = [
  {
    metric: "+214%",
    metricLabel: "paid conversion lift",
    title: "Paywalls",
    desc: "Start here: find the price, plan, proof, and CTA that turns more free users into buyers.",
    bullets: ["Price", "Plan", "Proof", "CTA"],
  },
  {
    metric: "ARPU",
    metricLabel: "upgrade moments",
    title: "Upsells",
    desc: "Show the upgrade when intent is high, not when the product feels pushy.",
    bullets: ["Usage cap", "Tier ladder", "Add-on"],
  },
  {
    metric: "Save",
    metricLabel: "before churn",
    title: "Cancel saves",
    desc: "Test pause, discount, downgrade, and education paths before users fully leave.",
    bullets: ["Pause", "Downgrade", "Discount"],
  },
  {
    metric: "2nd",
    metricLabel: "chance to convert",
    title: "Win-back",
    desc: "Bring lapsed users back with the offer they actually needed the first time.",
    bullets: ["Email", "Offer", "Timing"],
  },
]

const audiences = [
  "Consumer AI", "EdTech", "Productivity",
  "Freemium SaaS", "Subscription media", "Mobile apps",
]

function MonetizationCard({ card, palette, featured = false }: { card: typeof cards[number]; palette: number; featured?: boolean }) {
  const palettes = [
    { background: "#e6ecf6", primary: "#b8c4ea", secondary: "#d8b8e0" },
    { background: "#f4dde2", primary: "#e8b4c0", secondary: "#c8b0d8" },
    { background: "#ebe6f0", primary: "#c4b8dc", secondary: "#e0c0c8" },
    { background: "#e8eef0", primary: "#b8d0d8", secondary: "#d8c0e0" },
  ]
  const colors = palettes[palette % palettes.length]
  const holoVariants = ["mint", "lilac", "sunset", "mint"] as const
  const holoKinds = ["tiers", "annual", "winner", "annual"] as const

  return (
    <div className={`grid grid-cols-1 gap-0 overflow-hidden rounded-[22px] transition-all hover:-translate-y-0.5 ${featured ? "sm:grid-cols-[260px_1fr]" : "sm:grid-cols-[180px_1fr]"}`}
      style={{ background: "var(--tz-bg-card)", border: "1px solid var(--tz-line)" }}>
      <div className={`relative flex flex-col justify-end overflow-hidden p-6 ${featured ? "min-h-[220px]" : "min-h-[180px]"}`}
        style={{ background: colors.background }}>
        <svg viewBox="0 0 180 180" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <defs>
            <filter id={`built-watercolor-${palette}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="14" />
            </filter>
          </defs>
          <g filter={`url(#built-watercolor-${palette})`} opacity={0.84}>
            <circle cx="138" cy="38" r="50" fill={colors.primary} />
            <circle cx="160" cy="112" r="58" fill={colors.secondary} />
            <circle cx="94" cy="78" r="36" fill={colors.primary} opacity={0.56} />
          </g>
        </svg>
        <div className="absolute right-[-18px] top-5 z-[1] hidden sm:block pointer-events-none" style={{ opacity: 0.34 }}>
          <HoloCard
            variant={holoVariants[palette % holoVariants.length]}
            kind={holoKinds[palette % holoKinds.length]}
            style={{ width: 112, height: 146, right: 0, top: 0 }}
            drift={{ rotX: 14, rotY: palette % 2 === 0 ? -18 : 18, rotZ: palette % 2 === 0 ? -5 : 5, ax: 3, ay: 4, phase: palette * 1.2, sx: 0.26, sy: 0.22, sz: 0.18 }}
          />
        </div>
        <div className="relative z-[2]">
          <div style={{ fontSize: card.metric.length > 4 ? 34 : 46, fontWeight: 600, letterSpacing: "-0.055em", color: "#1a1520", lineHeight: 1, marginBottom: 10 }}>
            {card.metric}
          </div>
          <div style={{ fontSize: 12, color: "rgba(40,30,55,0.7)", lineHeight: 1.35, maxWidth: 120 }}>
            {card.metricLabel}
          </div>
        </div>
      </div>
      <div className={featured ? "p-7 sm:p-10" : "p-7 sm:p-8"}>
        <h3 style={{ fontSize: featured ? 30 : 22, fontWeight: 650, letterSpacing: "-0.03em", marginBottom: 12, lineHeight: 1.08 }}>
          {card.title}
        </h3>
        <p style={{ fontSize: featured ? 16 : 14, color: "var(--tz-ink-2)", lineHeight: 1.6, marginBottom: 18, maxWidth: featured ? 560 : "none" }}>
          {card.desc}
        </p>
        <ul className={featured ? "flex flex-wrap gap-2.5 pt-4" : "flex flex-col gap-2 pt-4"}
          style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid var(--tz-line)" }}>
          {card.bullets.map((bullet) => (
            <li key={bullet} className={featured ? "rounded-full px-4 py-2" : "relative pl-4"}
              style={{
                fontSize: 13,
                color: featured ? "var(--tz-ink-2)" : "var(--tz-ink-3)",
                fontFamily: "var(--font-geist-mono), monospace",
                letterSpacing: "0.01em",
                background: featured ? "rgba(255,255,255,0.64)" : "transparent",
                border: featured ? "1px solid var(--tz-line)" : "none",
              }}>
              {!featured && <span className="absolute left-0 top-[8px] w-[5px] h-[5px] rounded-full"
                style={{ background: "var(--tz-accent)" }} />}
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function MonetizationSection() {
  return (
    <section className="py-[120px] px-6">
      <div className="max-w-[1120px] mx-auto">
        <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 12, color: "var(--tz-accent)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 16 }}>
          Built for
        </div>
        <h2 style={{
          fontSize: "clamp(28px, 4vw, 48px)",
          fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.08, marginBottom: 18,
          textWrap: "balance",
        }}>
          Start with the paywall.<br />Extend once the math works.
        </h2>
        <p className="max-w-[600px] mb-14" style={{ fontSize: 17, color: "var(--tz-ink-2)", lineHeight: 1.55 }}>
          The first job is simple: make more visitors pay from the same traffic.
          The same testing engine can later move into upgrades, cancel flows, and win-back offers.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-14">
          {cards.map((card, index) => (
            <div key={card.title} className={index === 0 ? "lg:col-span-2" : ""}>
              <MonetizationCard card={card} palette={index} featured={index === 0} />
            </div>
          ))}
        </div>

        <div className="rounded-[22px] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center gap-6"
          style={{ background: "var(--tz-bg-card)", border: "1px solid var(--tz-line)" }}>
          <div className="lg:w-[220px] shrink-0">
            <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 12, color: "var(--tz-accent)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
              Works for
            </span>
            <p className="mt-3" style={{ fontSize: 15, color: "var(--tz-ink-2)", lineHeight: 1.5 }}>
              Subscription products where one better screen changes the curve.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {audiences.map((t) => (
              <span key={t}
                className="rounded-full px-5 py-2.5 text-sm transition-all cursor-default"
                style={{
                  border: "1px solid var(--tz-line)",
                  color: "var(--tz-ink-2)",
                  background: "var(--tz-bg-card)",
                }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
