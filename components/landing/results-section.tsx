"use client"

import Image from "next/image"

const benchmarkNote = "Benchmark: recent Tranzmit paywall audits and backtests. Use as directional evidence."

function WatercolorStat({ v, l, detail, palette = 0 }: { v: string; l: string; detail: string; palette?: number }) {
  const palettes = [
    { bg: "#e6ecf6", b1: "#b8c4ea", b2: "#d8b8e0" },
    { bg: "#f4dde2", b1: "#e8b4c0", b2: "#c8b0d8" },
    { bg: "#ebe6f0", b1: "#c4b8dc", b2: "#e0c0c8" },
    { bg: "#e8eef0", b1: "#b8d0d8", b2: "#d8c0e0" },
  ]
  const p = palettes[palette % 4]
  const id = `wc-${palette}`

  return (
    <div className="relative rounded-[22px] overflow-hidden p-6 sm:p-7 flex flex-col justify-between min-h-[230px] sm:min-h-0"
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
      <div className="relative z-[1]" style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, color: "rgba(40,30,55,0.56)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
        Benchmark
      </div>
      <div className="relative z-[1]">
        <div style={{ fontSize: "clamp(40px, 11vw, 52px)", fontWeight: 600, letterSpacing: "-0.04em", color: "#1a1520", lineHeight: 1, marginBottom: 14 }}>
          {v}
        </div>
        <div style={{ fontSize: "clamp(13px, 3.4vw, 14px)", color: "rgba(40,30,55,0.78)", lineHeight: 1.38, maxWidth: "96%", fontWeight: 600 }}>
          {l}
        </div>
        <div className="mt-3" style={{ fontSize: 12, color: "rgba(40,30,55,0.58)", lineHeight: 1.35 }}>
          {detail}
        </div>
      </div>
    </div>
  )
}

function LiftPanel() {
  const rows = [
    {
      label: "Current paywall",
      value: 4.2,
      buyers: "420 buyers",
      detail: "per 10,000 visitors",
      color: "linear-gradient(180deg, rgba(40,30,55,0.46), rgba(40,30,55,0.22))",
    },
    {
      label: "Tranzmit pick",
      value: 7.0,
      buyers: "700 buyers",
      detail: "per 10,000 visitors",
      color: "linear-gradient(180deg, #c97a4a, #b85490 50%, #6b4eb0)",
    },
  ]
  const addedBuyers = 700 - 420

  return (
    <div className="rounded-[28px] p-4 sm:p-6 lg:p-8"
      style={{
        background: "var(--tz-bg-card)",
        border: "1px solid var(--tz-line)",
        boxShadow: "0 30px 70px -52px rgba(80,60,120,0.42)",
      }}>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[24px] p-6 sm:p-7"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.96), rgba(232,238,240,0.68))", border: "1px solid var(--tz-line)" }}>
          <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 12, color: "var(--tz-accent)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 16 }}>
            Conversion math
          </div>
          <h3 style={{ fontSize: "clamp(30px, 5vw, 54px)", fontWeight: 650, letterSpacing: "-0.045em", lineHeight: 1.02, maxWidth: 560, marginBottom: 18 }}>
            4.2% to 7.0% means 67% more buyers from the same traffic.
          </h3>
          <p style={{ fontSize: 16, color: "var(--tz-ink-2)", lineHeight: 1.55, maxWidth: 520, marginBottom: 24 }}>
            At 10,000 paywall visitors, the better screen turns the same audience into 280 more paid users.
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.72)", border: "1px solid var(--tz-line)" }}>
              <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 12, color: "var(--tz-ink-3)", marginBottom: 8 }}>
                Current
              </div>
              <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 30, fontWeight: 750, color: "var(--tz-ink)", lineHeight: 1 }}>
                4.2%
              </div>
            </div>
            <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.72)", border: "1px solid rgba(201,122,74,0.22)" }}>
              <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 12, color: "var(--tz-ink-3)", marginBottom: 8 }}>
                Winner
              </div>
              <div style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 30,
                fontWeight: 750,
                lineHeight: 1,
                background: "var(--tz-accent-grad)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}>
                7.0%
              </div>
            </div>
            <div className="rounded-2xl p-4" style={{ background: "rgba(90,138,74,0.1)", border: "1px solid rgba(90,138,74,0.2)" }}>
              <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 12, color: "var(--tz-ink-3)", marginBottom: 8 }}>
                Net gain
              </div>
              <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 30, fontWeight: 750, color: "var(--tz-green)", lineHeight: 1 }}>
                +{addedBuyers}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[24px] p-6 sm:p-7"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.92), rgba(244,221,226,0.36))", border: "1px solid var(--tz-line)" }}>
          <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 12, color: "var(--tz-accent)", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 14 }}>
            What changes
          </div>
          <h4 style={{ fontSize: "clamp(24px, 3.2vw, 36px)", fontWeight: 650, letterSpacing: "-0.035em", lineHeight: 1.08, marginBottom: 18 }}>
            The winner answers the buyer faster.
          </h4>
          <div className="grid gap-3">
            {[
              ["1", "Remove extra choices", "Three equal options become one recommended annual path."],
              ["2", "Make savings obvious", "$89/year and 38% savings replace a weak monthly anchor."],
              ["3", "Put proof near the CTA", "1.6M creators appears before the final decision."],
            ].map(([n, title, copy]) => (
              <div key={n} className="flex gap-3 rounded-2xl p-4"
                style={{ background: "rgba(255,255,255,0.62)", border: "1px solid var(--tz-line)" }}>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "var(--tz-accent-soft)", color: "var(--tz-accent)", fontFamily: "var(--font-geist-mono), monospace", fontSize: 12, fontWeight: 750 }}>
                  {n}
                </span>
                <span>
                  <span className="block" style={{ fontSize: 15, fontWeight: 650, color: "var(--tz-ink)", lineHeight: 1.25 }}>
                    {title}
                  </span>
                  <span className="mt-1 block" style={{ fontSize: 13, color: "var(--tz-ink-2)", lineHeight: 1.45 }}>
                    {copy}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mt-5 overflow-hidden rounded-[24px] p-3 sm:p-5"
        style={{ background: "linear-gradient(135deg, #f6f0ea, #eef2ef)", border: "1px solid var(--tz-line)" }}>
        <Image
          src="/generated/paywall-ab-comparison.png"
          alt="Side-by-side paywall audit showing a current paywall at 4.2 percent conversion and a Tranzmit pick at 7.0 percent conversion"
          width={1700}
          height={936}
          className="relative z-[1] block w-full"
          style={{ height: "auto", objectFit: "contain" }}
          priority={false}
        />
        <div className="pointer-events-none absolute left-4 top-4 z-[2] rounded-full px-3 py-1.5"
          style={{ background: "rgba(255,255,255,0.82)", border: "1px solid var(--tz-line)", color: "var(--tz-ink-2)", fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", backdropFilter: "blur(10px)" }}>
          Paywall audit artifact
        </div>
      </div>

      <div className="mt-5 rounded-[24px] p-5 sm:p-6" style={{ background: "var(--tz-bg)", border: "1px solid var(--tz-line)" }}>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 12, color: "var(--tz-accent)", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 8 }}>
              Before / after
            </div>
            <h4 style={{ fontSize: 22, fontWeight: 650, letterSpacing: "-0.025em", lineHeight: 1.1 }}>
              Same visitors, better screen
            </h4>
          </div>
          <div className="rounded-full px-4 py-2"
            style={{ background: "rgba(90,138,74,0.1)", border: "1px solid rgba(90,138,74,0.2)", color: "var(--tz-green)", fontFamily: "var(--font-geist-mono), monospace", fontSize: 13, fontWeight: 700 }}>
            +67% lift
          </div>
        </div>

        <div className="relative grid h-[260px] grid-cols-2 items-end gap-4 rounded-[18px] px-4 pb-4 pt-8"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.62), rgba(255,255,255,0.24))", border: "1px solid var(--tz-line)" }}>
          <div className="absolute inset-x-4 top-1/2 h-px" style={{ background: "var(--tz-line)" }} />
          <div className="absolute inset-x-4 top-[27%] h-px" style={{ background: "var(--tz-line)", opacity: 0.75 }} />
          {rows.map((row) => (
            <div key={row.label} className="relative z-[1] flex h-full flex-col justify-end">
              <div className="mx-auto flex w-full max-w-[150px] flex-col items-center justify-end rounded-t-[18px] px-3 pb-4 pt-5"
                style={{ height: `${(row.value / 7.4) * 100}%`, minHeight: 100, background: row.color, boxShadow: "inset 0 1px 1px rgba(255,255,255,0.38)" }}>
                <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 28, fontWeight: 800, lineHeight: 1, color: row.value > 5 ? "#fffaf5" : "rgba(26,21,32,0.86)" }}>
                  {row.value.toFixed(1)}%
                </div>
              </div>
              <div className="mt-3 text-center">
                <div style={{ fontSize: 14, fontWeight: 650, color: "var(--tz-ink)", lineHeight: 1.25 }}>{row.label}</div>
                <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 12, color: "var(--tz-ink-3)", marginTop: 3 }}>
                  {row.buyers} - {row.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function RolloutPanel() {
  return (
    <div className="mt-8 rounded-[28px] p-4 sm:p-6 lg:p-8"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(230,236,246,0.52))",
        border: "1px solid var(--tz-line)",
        boxShadow: "0 30px 80px -58px rgba(80,60,120,0.44)",
      }}>
      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 12, color: "var(--tz-accent)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 10 }}>
            Safe rollout
          </div>
          <h3 style={{ fontSize: "clamp(24px, 3.6vw, 38px)", fontWeight: 650, letterSpacing: "-0.035em", lineHeight: 1.08 }}>
            Roll out the winner at 5% traffic first.
          </h3>
        </div>
        <p className="max-w-[410px]" style={{ fontSize: 15, color: "var(--tz-ink-2)", lineHeight: 1.55 }}>
          Validate lift while refunds, support tickets, and churn risk stay visible.
        </p>
      </div>
      <div className="overflow-hidden rounded-[24px] px-1 py-3 sm:px-3"
        style={{ background: "rgba(255,255,255,0.46)", border: "1px solid var(--tz-line)" }}>
        <Image
          src="/generated/paywall-rollout.png"
          alt="Guardrailed rollout dashboard for a winning paywall with five percent traffic, conversion monitoring, and confidence score"
          width={1700}
          height={936}
          className="block w-full"
          style={{ height: "auto", objectFit: "contain" }}
        />
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
            A clear paywall decision, measured by conversion instead of opinion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-4">
          <WatercolorStat v="+214%" l="Average conversion lift" detail="Across screened paywall deployments." palette={0} />
          <WatercolorStat v="1,847" l="Variants screened weekly" detail="Price, proof, plan, trial, and CTA combinations." palette={1} />
          <WatercolorStat v="9.4 min" l="Median winner direction" detail="From current screen to recommended next test." palette={2} />
          <WatercolorStat v="±6%" l="Backtest variance" detail="Recommendation versus measured outcome range." palette={3} />
        </div>
        <div className="mb-14 sm:mb-20" style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 12, color: "var(--tz-ink-3)" }}>
          {benchmarkNote}
        </div>

        <LiftPanel />
        <RolloutPanel />
      </div>
    </section>
  )
}
