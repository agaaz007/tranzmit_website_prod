"use client"

const problems = [
  {
    number: "01",
    metric: "14d",
    label: "per answer",
    title: "Learning is trapped in two-week cycles",
    desc: "One paywall, one audience, one result. By the time significance lands, pricing, traffic mix, and user intent have already moved.",
    tone: "#e6ecf6",
  },
  {
    number: "02",
    metric: "CAC",
    label: "spent on guesses",
    title: "Every weak variant burns paid traffic",
    desc: "The experiment is not free: real users see the wrong price, the wrong promise, or the wrong layout while you wait for proof.",
    tone: "#f4dde2",
  },
  {
    number: "03",
    metric: "0",
    label: "reasons why",
    title: "A winner still does not explain itself",
    desc: "A/B tools tell you which screen won, not which audience, objection, price anchor, or message actually changed the decision.",
    tone: "#ebe6f0",
  },
]

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
          Your paywall is leaking revenue<br />while A/B tests wait for significance
        </h2>
        <p className="max-w-[600px] mb-14" style={{ fontSize: 17, color: "var(--tz-ink-2)", lineHeight: 1.55 }}>
          The bottleneck is not ideas. It is the cost of testing them on real users,
          one slow variant at a time.
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
              <span>Current loop</span>
              <span>One answer</span>
            </div>
            <div className="relative z-[1]">
              <div style={{ fontSize: "clamp(76px, 11vw, 132px)", fontWeight: 600, letterSpacing: "-0.06em", lineHeight: 0.9, color: "#1a1520", marginBottom: 18 }}>
                14 days
              </div>
              <p style={{ maxWidth: 430, fontSize: 18, color: "rgba(40,30,55,0.72)", lineHeight: 1.45 }}>
                to validate one screen, while high-intent users keep meeting an unproven paywall.
              </p>
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
