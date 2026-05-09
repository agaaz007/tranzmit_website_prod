"use client"

const steps = [
  {
    number: "01",
    title: "Read the buying moment",
    desc: "Map what users saw before the paywall and where they hesitated.",
    label: "Context",
    chips: ["Saw", "Clicked", "Left"],
  },
  {
    number: "02",
    title: "Screen the variants safely",
    desc: "Score price, proof, plan, and CTA variants before live buyers see them.",
    label: "Pre-test",
    chips: ["Price", "Copy", "Proof"],
  },
  {
    number: "03",
    title: "Ship the best answer",
    desc: "Launch the winner with expected lift, rollout guardrails, and the reason it works.",
    label: "Winner",
    chips: ["Lift", "Why", "Live"],
  },
]

function StepVisual({ index, label, chips }: { index: number; label: string; chips: string[] }) {
  const palettes = [
    { background: "#e6ecf6", primary: "#b8c4ea", secondary: "#d8b8e0" },
    { background: "#f4dde2", primary: "#e8b4c0", secondary: "#c8b0d8" },
    { background: "#ebe6f0", primary: "#c4b8dc", secondary: "#e0c0c8" },
  ]
  const palette = palettes[index % palettes.length]

  return (
    <div className="relative rounded-[18px] overflow-hidden p-5 mb-6 min-h-[172px]"
      style={{ background: palette.background, border: "1px solid rgba(40,30,55,0.12)", boxShadow: "inset 0 1px 1px rgba(255,255,255,0.55)" }}>
      <svg viewBox="0 0 220 160" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        <defs>
          <filter id={`how-watercolor-${index}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
        </defs>
        <g filter={`url(#how-watercolor-${index})`} opacity={0.8}>
          <circle cx="168" cy="34" r="54" fill={palette.primary} />
          <circle cx="188" cy="112" r="62" fill={palette.secondary} />
          <circle cx="118" cy="78" r="38" fill={palette.primary} opacity={0.55} />
        </g>
      </svg>
      <div className="relative z-[1] flex h-full flex-col justify-between gap-6">
        <div className="flex items-center justify-between" style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, color: "rgba(40,30,55,0.62)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          <span>{label}</span>
          <span>{String(index + 1).padStart(2, "0")}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <span key={chip} className="rounded-full px-3 py-1.5"
              style={{ background: "rgba(255,255,255,0.48)", color: "rgba(26,21,32,0.76)", fontSize: 12, fontWeight: 500, boxShadow: "inset 0 1px 1px rgba(255,255,255,0.55)" }}>
              {chip}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function HowItWorks() {
  return (
    <section className="py-[120px] px-6" id="how">
      <div className="max-w-[1120px] mx-auto">
        <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 12, color: "var(--tz-accent)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 16 }}>
          How it works
        </div>
        <h2 style={{
          fontSize: "clamp(28px, 4vw, 48px)",
          fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.08, marginBottom: 18,
          textWrap: "balance",
        }}>
          Read the moment, score variants,<br />ship the winner.
        </h2>
        <p className="max-w-[600px] mb-14" style={{ fontSize: 17, color: "var(--tz-ink-2)", lineHeight: 1.55 }}>
          One answer: which paywall to ship, what lift to expect, and why it should convert.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((step, index) => (
            <div key={step.number} className="rounded-[22px] p-5 sm:p-6 transition-all hover:-translate-y-0.5"
              style={{
                background: "var(--tz-bg-card)",
                border: "1px solid var(--tz-line)",
              }}>
              <StepVisual index={index} label={step.label} chips={step.chips} />
              <div className="flex items-center gap-2.5 mb-5"
                style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 12, color: "var(--tz-accent)", letterSpacing: "0.08em" }}>
                {step.number}
                <div className="flex-1 h-px" style={{ background: "var(--tz-line)" }} />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, letterSpacing: "-0.025em" }}>{step.title}</h3>
              <p style={{ fontSize: 14, color: "var(--tz-ink-2)", lineHeight: 1.65 }}>{step.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
