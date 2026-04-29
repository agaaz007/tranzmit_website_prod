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
    <div className="relative rounded-[22px] overflow-hidden p-8 flex flex-col justify-end"
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
        <div style={{ fontSize: 52, fontWeight: 600, letterSpacing: "-0.04em", color: "#1a1520", lineHeight: 1, marginBottom: 14 }}>
          {v}
        </div>
        <div style={{ fontSize: 14, color: "rgba(40,30,55,0.7)", lineHeight: 1.45, maxWidth: "80%" }}>
          {l}
        </div>
      </div>
    </div>
  )
}

export function ResultsSection() {
  return (
    <section className="py-[120px] px-6" id="results">
      <div className="max-w-[1120px] mx-auto">
        <div className="mb-14">
          <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 12, color: "var(--tz-accent)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 16 }}>
            Results
          </div>
          <h2 style={{
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.02, marginBottom: 20, maxWidth: 720,
          }}>
            The perfect paywall<br />for every user
          </h2>
          <p style={{ fontSize: 16, color: "var(--tz-ink-3)", maxWidth: 360, lineHeight: 1.5 }}>
            Personalized paywall wins from live deployments — measured by conversion, not opinions.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-20">
          <WatercolorStat v="+214%" l="Average conversion rate lift across production deployments" palette={0} />
          <WatercolorStat v="1,847" l="Variants tested last week, judged by ensemble AI" palette={1} />
          <WatercolorStat v="9.4m" l="Average time from variant generated to live traffic" palette={2} />
          <WatercolorStat v="±6%" l="Calibrated prediction accuracy versus measured outcomes" palette={3} />
        </div>

        {/* Closer text */}
        <div className="max-w-[980px] mx-auto text-center pt-10">
          <p style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.1,
            textWrap: "balance",
          }}>
            <span style={{ color: "#c97a4a" }}>Generate variants fast &amp;</span>{" "}
            <span style={{ color: "#6b4eb0" }}>sleek. Run synthetic users,</span>{" "}
            <span style={{ color: "#c97a4a" }}>judge with ensembles, ship</span>{" "}
            <span style={{ color: "#6b4eb0" }}>winners autonomously,</span>{" "}
            <span style={{ color: "#b85490" }}>all in one platform.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
