"use client"

import { HoloCard } from "./holo-card"

const cards = [
  {
    metric: "+214%",
    metricLabel: "avg. paid conversion lift",
    title: "Paywalls",
    desc: <>The free → paid wall is your highest-leverage surface. Tranzmit auto-tests pricing, plan structure, copy, social proof, urgency, and layout — then ships the winners. <strong>Avg. +214% paid conversion lift.</strong></>,
    bullets: ["Hard, soft, and metered walls", "Annual vs monthly anchoring", "Trial length & gating logic"],
  },
  {
    metric: "ARPU",
    metricLabel: "lift without trust burn",
    title: "Upsells",
    desc: "Mid-flow upgrade prompts, plan-tier nudges, and add-on offers — surfaced at the moments your users are most likely to say yes. We score every prompt against churn risk so you lift ARPU without burning trust.",
    bullets: ["In-product upgrade prompts", "Usage-cap & quota nudges", "Tier ladders & add-on bundles"],
  },
  {
    metric: "2nd",
    metricLabel: "product line expansion",
    title: "Cross-sells",
    desc: "Second product, companion app, or partner offer — Tranzmit finds the right placement, copy, and audience cohort to convert existing users into multi-product customers without cannibalizing the primary subscription.",
    bullets: ["Companion product launches", "Partner & affiliate placements", "Bundle & package experiments"],
  },
  {
    metric: "Save",
    metricLabel: "subscriptions before churn",
    title: "Retention & win-back",
    desc: "Cancel flows, pause offers, downgrade rescues, and lapsed-user win-back campaigns — tested at the same velocity as acquisition. Every saved subscription compounds against acquisition cost.",
    bullets: ["Cancel-intent intercepts", "Pause vs. discount logic", "Lapsed-user reactivation"],
  },
]

const audiences = [
  "Consumer AI apps", "EdTech & study tools", "Productivity",
  "Freemium SaaS", "Subscription media", "Mobile-first apps",
]

function MonetizationCard({ card, palette }: { card: typeof cards[number]; palette: number }) {
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
    <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-0 rounded-[22px] overflow-hidden transition-all hover:-translate-y-0.5"
      style={{ background: "var(--tz-bg-card)", border: "1px solid var(--tz-line)" }}>
      <div className="relative min-h-[180px] p-6 flex flex-col justify-end overflow-hidden"
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
      <div className="p-7 sm:p-8">
        <h3 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.025em", marginBottom: 12 }}>
          {card.title}
        </h3>
        <p style={{ fontSize: 14, color: "var(--tz-ink-2)", lineHeight: 1.6, marginBottom: 18 }}>
          {card.desc}
        </p>
        <ul className="flex flex-col gap-2 pt-4"
          style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid var(--tz-line)" }}>
          {card.bullets.map((bullet) => (
            <li key={bullet} className="relative pl-4"
              style={{ fontSize: 13, color: "var(--tz-ink-3)", fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.01em" }}>
              <span className="absolute left-0 top-[8px] w-[5px] h-[5px] rounded-full"
                style={{ background: "var(--tz-accent)" }} />
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
          Every monetization moment,<br />self-improving in production
        </h2>
        <p className="max-w-[600px] mb-14" style={{ fontSize: 17, color: "var(--tz-ink-2)", lineHeight: 1.55 }}>
          Tranzmit isn&apos;t just paywalls. We optimize every revenue surface in your product — from the first wall a free user hits, to the upsell that doubles their plan, to the cross-sell that adds a second product line.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-14">
          {cards.map((card, index) => (
            <MonetizationCard key={card.title} card={card} palette={index} />
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
