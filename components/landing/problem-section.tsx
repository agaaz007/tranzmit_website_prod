"use client"

import Image from "next/image"
import { Clock, DollarSign, HelpCircle } from "lucide-react"

const problems = [
  {
    number: "01",
    metric: "14d",
    label: "one answer",
    title: "Learning is too slow",
    desc: "One live test can burn two weeks before you learn what to change.",
    tone: "#e6ecf6",
    Icon: Clock,
  },
  {
    number: "02",
    metric: "CAC",
    label: "on guesses",
    title: "Bad variants are expensive",
    desc: "Weak prices, offers, and layouts cost real buyers while the test runs.",
    tone: "#f4dde2",
    Icon: DollarSign,
  },
  {
    number: "03",
    metric: "0",
    label: "reasons why",
    title: "The winner does not teach you",
    desc: "You need to know which proof, price anchor, or CTA changed the decision.",
    tone: "#ebe6f0",
    Icon: HelpCircle,
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
          Slow tests spend traffic on guesses. A useful audit shows why people stall before you run another live experiment.
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
              <div key={problem.number} className="rounded-[18px] p-5 sm:p-6 transition-all hover:-translate-y-0.5"
                style={{
                  background: problem.number === "01"
                    ? "linear-gradient(135deg, rgba(255,255,255,0.92), rgba(230,236,246,0.72))"
                    : "var(--tz-bg-card)",
                  border: problem.number === "01" ? "1px solid rgba(107,78,176,0.18)" : "1px solid var(--tz-line)",
                  boxShadow: problem.number === "01" ? "0 22px 48px -40px rgba(80,60,120,0.46)" : "none",
                }}>
                <div className="flex items-start gap-5">
                  <div className="w-[92px] h-[92px] rounded-2xl shrink-0 flex flex-col items-center justify-center text-center"
                    style={{ background: problem.tone, color: "#1a1520", boxShadow: "inset 0 1px 1px rgba(255,255,255,0.55)" }}>
                    <problem.Icon size={18} strokeWidth={2} style={{ marginBottom: 7, color: "rgba(40,30,55,0.72)" }} />
                    <div style={{ fontSize: problem.metric.length > 2 ? 26 : 38, fontWeight: 600, letterSpacing: "-0.055em", lineHeight: 1 }}>
                      {problem.metric}
                    </div>
                    <div className="mt-1 px-2" style={{ fontSize: 10, color: "rgba(40,30,55,0.62)", lineHeight: 1.15, fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      {problem.label}
                    </div>
                  </div>
                  <div>
                    <div className="inline-flex rounded-full px-2.5 py-1" style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: 11,
                      color: "var(--tz-accent)",
                      letterSpacing: "0.1em",
                      marginBottom: 10,
                      background: "rgba(201,122,74,0.08)",
                    }}>
                      {problem.number}
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 650, marginBottom: 8, letterSpacing: "-0.02em" }}>
                      {problem.title}
                    </div>
                    <div style={{ fontSize: 15, color: "var(--tz-ink-2)", lineHeight: 1.55 }}>
                      {problem.desc}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-[28px] p-4 sm:p-6 lg:p-8"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.86), rgba(232,238,240,0.62))",
            border: "1px solid var(--tz-line)",
            boxShadow: "0 30px 80px -58px rgba(80,60,120,0.44)",
          }}>
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 12, color: "var(--tz-accent)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 10 }}>
                Audit output
              </div>
              <h3 style={{ fontSize: "clamp(24px, 3.6vw, 38px)", fontWeight: 650, letterSpacing: "-0.035em", lineHeight: 1.08 }}>
                See exactly why buyers stall.
              </h3>
            </div>
            <p className="max-w-[390px]" style={{ fontSize: 15, color: "var(--tz-ink-2)", lineHeight: 1.55 }}>
              The audit points to concrete decision blockers: too many choices, weak proof, and hidden annual value.
            </p>
          </div>
          <div className="overflow-hidden rounded-[24px] px-1 py-3 sm:px-3"
            style={{ background: "rgba(255,255,255,0.42)", border: "1px solid var(--tz-line)" }}>
            <Image
              src="/generated/paywall-diagnosis.png"
              alt="Paywall diagnosis artifact showing a current paywall and the reasons buyers stall"
              width={1700}
              height={936}
              className="block w-full"
              style={{ height: "auto", objectFit: "contain" }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
