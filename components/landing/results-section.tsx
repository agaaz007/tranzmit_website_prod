"use client"

function WatercolorStat({ v, l, palette = 0 }: { v: string; l: string; palette?: number }) {
  const palettes = [
    { bg: "#e6ecf6", b1: "#b8c4ea", b2: "#d8b8e0" },
    { bg: "#f4dde2", b1: "#e8b4c0", b2: "#c8b0d8" },
    { bg: "#ebe6f0", b1: "#c4b8dc", b2: "#e0c0c8" },
    { bg: "#e8eef0", b1: "#b8d0d8", b2: "#d8c0e0" },
  ]
  const p = palettes[palette % 4]
  const id = `wc-${palette}`

  return (
    <div className="relative rounded-[22px] overflow-hidden p-6 sm:p-8 flex flex-col justify-end min-h-[220px] sm:min-h-0"
      style={{ aspectRatio: "1 / 1", background: p.bg, boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}>
      <svg viewBox="0 0 200 200" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        <defs>
          <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>
        <g filter={`url(#${id})`} opacity={0.85}>
          <circle cx="160" cy="50" r="55" fill={p.b1} />
          <circle cx="180" cy="125" r="65" fill={p.b2} />
          <circle cx="125" cy="85" r="42" fill={p.b1} opacity={0.6} />
          <circle cx="170" cy="180" r="45" fill={p.b2} opacity={0.7} />
        </g>
      </svg>
      <div className="relative z-[1]">
        <div style={{ fontSize: "clamp(40px, 11vw, 52px)", fontWeight: 600, letterSpacing: "-0.04em", color: "#1a1520", lineHeight: 1, marginBottom: 14 }}>
          {v}
        </div>
        <div style={{ fontSize: "clamp(13px, 3.4vw, 14px)", color: "rgba(40,30,55,0.7)", lineHeight: 1.45, maxWidth: "92%" }}>
          {l}
        </div>
      </div>
    </div>
  )
}

function LiftPanel() {
  const rows = [
    { label: "Current", value: 4.2, color: "var(--tz-ink-3)" },
    { label: "Tranzmit pick", value: 7.0, color: "var(--tz-accent-grad)" },
  ]

  return (
    <div className="rounded-[24px] p-6 sm:p-8"
      style={{
        background: "var(--tz-bg-card)",
        border: "1px solid var(--tz-line)",
        boxShadow: "0 30px 70px -52px rgba(80,60,120,0.42)",
      }}>
      <div className="flex flex-col lg:flex-row gap-8 lg:items-end lg:justify-between">
        <div>
          <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 12, color: "var(--tz-accent)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 14 }}>
            Example decision
          </div>
          <h3 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.05, maxWidth: 540 }}>
            4.2% to 7.0% means 67% more buyers from the same traffic.
          </h3>
        </div>
        <div className="rounded-2xl px-5 py-4 min-w-[220px]"
          style={{ background: "linear-gradient(90deg, rgba(201,122,74,0.14), rgba(184,84,144,0.08), rgba(107,78,176,0.1))", border: "1px solid rgba(201,122,74,0.22)" }}>
          <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 12, color: "var(--tz-ink-3)", marginBottom: 6 }}>
            Why it won
          </div>
          <div style={{ fontSize: 15, color: "var(--tz-ink)", lineHeight: 1.45 }}>
            Less choice, clearer annual value, stronger proof.
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="mb-2 flex items-center justify-between"
              style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 12, color: "var(--tz-ink-3)" }}>
              <span>{row.label}</span>
              <span>{row.value.toFixed(1)}%</span>
            </div>
            <div className="h-4 rounded-full overflow-hidden" style={{ background: "var(--tz-line)" }}>
              <div className="h-full rounded-full" style={{ width: `${(row.value / 8) * 100}%`, background: row.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ResultsSection() {
  return (
    <section className="py-20 sm:py-[120px] px-6" id="results">
      <div className="max-w-[1120px] mx-auto">
        <div className="mb-14">
          <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 12, color: "var(--tz-accent)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 16 }}>
            Results
          </div>
          <h2 style={{
            fontSize: "clamp(36px, 10vw, 72px)",
            fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.02, marginBottom: 20, maxWidth: 720,
          }}>
            More buyers.<br />Less live guessing.
          </h2>
          <p style={{ fontSize: 16, color: "var(--tz-ink-3)", maxWidth: 360, lineHeight: 1.5 }}>
            The output is a clear decision, measured by conversion instead of opinions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-14 sm:mb-20">
          <WatercolorStat v="+214%" l="Average paid conversion lift across deployments" palette={0} />
          <WatercolorStat v="1,847" l="Paywall variants screened last week" palette={1} />
          <WatercolorStat v="9.4m" l="Average time to a recommended winner" palette={2} />
          <WatercolorStat v="±6%" l="Prediction accuracy versus measured outcomes" palette={3} />
        </div>

        <LiftPanel />
      </div>
    </section>
  )
}
