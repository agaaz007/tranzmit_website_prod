"use client"

const problems = [
  {
    number: "01",
    metric: "14d",
    label: "one answer",
    title: "Learning is too slow",
    desc: "One screen, one audience, one result. The buying moment moves before the lesson lands.",
    tone: "#e6ecf6",
  },
  {
    number: "02",
    metric: "CAC",
    label: "on guesses",
    title: "Bad variants are expensive",
    desc: "Real buyers see the wrong price, offer, or layout before you know it is weak.",
    tone: "#f4dde2",
  },
  {
    number: "03",
    metric: "0",
    label: "reasons why",
    title: "The winner does not teach you",
    desc: "You learn what won, but not which objection, proof point, or price anchor changed the decision.",
    tone: "#ebe6f0",
  },
]

function BuyerDots() {
  return (
    <div className="grid grid-cols-10 gap-1.5 sm:gap-2 max-w-[340px]">
      {Array.from({ length: 100 }).map((_, index) => {
        const bought = index < 4
        return (
          <span
            key={index}
            className="block rounded-full"
            style={{
              width: "100%",
              aspectRatio: "1 / 1",
              background: bought ? "var(--tz-green)" : "rgba(40,30,55,0.14)",
              boxShadow: bought ? "0 0 0 4px oklch(0.55 0.15 150 / 0.12)" : "none",
            }}
          />
        )
      })}
    </div>
  )
}

export function ProblemSection() {
  return (
    <section className="py-[120px] px-6" id="problem">
      <div className="max-w-[1120px] mx-auto">
        <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 12, color: "var(--tz-accent)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 16 }}>
          The problem
        </div>
        <h2 style={{
          fontSize: "clamp(28px, 4vw, 48px)",
          fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.08, marginBottom: 18,
          textWrap: "balance",
        }}>
          The problem is simple:<br />too few buyers, too slow to learn
        </h2>
        <p className="max-w-[600px] mb-14" style={{ fontSize: 17, color: "var(--tz-ink-2)", lineHeight: 1.55 }}>
          A paywall is usually the highest-leverage screen in the product.
          Most teams still optimize it one live test at a time.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-5">
          <div className="rounded-[22px] p-8 sm:p-10 relative overflow-hidden min-h-[440px] flex flex-col justify-between"
            style={{ background: "#e8eef0", border: "1px solid var(--tz-line)" }}>
            <svg viewBox="0 0 420 420" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
              <defs>
                <filter id="problem-watercolor" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="28" />
                </filter>
              </defs>
              <g filter="url(#problem-watercolor)" opacity={0.82}>
                <circle cx="330" cy="70" r="115" fill="#b8c4ea" />
                <circle cx="365" cy="245" r="130" fill="#d8b8e0" />
                <circle cx="190" cy="160" r="90" fill="#e8b4c0" opacity={0.62} />
              </g>
            </svg>
            <div className="relative z-[1] flex items-center justify-between gap-4" style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 12, color: "rgba(40,30,55,0.62)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              <span>The simple math</span>
              <span>At 4.2% conversion</span>
            </div>
            <div className="relative z-[1]">
              <div style={{ fontSize: "clamp(76px, 11vw, 132px)", fontWeight: 600, letterSpacing: "-0.06em", lineHeight: 0.9, color: "#1a1520", marginBottom: 18 }}>
                96/100
              </div>
              <p style={{ maxWidth: 430, fontSize: 18, color: "rgba(40,30,55,0.72)", lineHeight: 1.45 }}>
                users still leave. The question is which price, proof, and offer would have changed their mind.
              </p>
            </div>
            <div className="relative z-[1] mt-8">
              <BuyerDots />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {problems.map((problem) => (
              <div key={problem.number} className="rounded-[18px] p-6 sm:p-7 transition-all hover:-translate-y-0.5"
                style={{ background: "var(--tz-bg-card)", border: "1px solid var(--tz-line)" }}>
                <div className="flex items-start gap-5">
                  <div className="w-[86px] h-[86px] rounded-2xl shrink-0 flex flex-col items-center justify-center text-center"
                    style={{ background: problem.tone, color: "#1a1520", boxShadow: "inset 0 1px 1px rgba(255,255,255,0.55)" }}>
                    <div style={{ fontSize: problem.metric.length > 2 ? 26 : 38, fontWeight: 600, letterSpacing: "-0.055em", lineHeight: 1 }}>
                      {problem.metric}
                    </div>
                    <div className="mt-1 px-2" style={{ fontSize: 10, color: "rgba(40,30,55,0.62)", lineHeight: 1.15, fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      {problem.label}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 12, color: "var(--tz-accent)", letterSpacing: "0.1em", marginBottom: 8 }}>
                      {problem.number}
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, letterSpacing: "-0.015em" }}>
                      {problem.title}
                    </div>
                    <div style={{ fontSize: 14, color: "var(--tz-ink-2)", lineHeight: 1.6 }}>
                      {problem.desc}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
