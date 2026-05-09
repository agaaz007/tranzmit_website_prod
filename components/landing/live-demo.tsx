"use client"

import { useEffect, useRef, useState } from "react"

export function LiveDemo() {
  const [controlVal, setControlVal] = useState(0)
  const [challengerVal, setChallengerVal] = useState(0)
  const [done, setDone] = useState(false)
  const [winning, setWinning] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    let started = false
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started) {
        started = true
        const cT = 4.2, hT = 7.0
        const steps = 60, dur = 2000
        let i = 0
        const id = setInterval(() => {
          i++
          const p = i / steps
          const ease = 1 - Math.pow(1 - p, 3)
          setControlVal(cT * ease)
          setChallengerVal(hT * ease)
          if (i >= steps) {
            clearInterval(id)
            setTimeout(() => { setWinning(true); setDone(true) }, 400)
          }
        }, dur / steps)
      }
    }, { threshold: 0.3 })
    obs.observe(node)
    return () => obs.disconnect()
  }, [])

  const lift = Math.round(((7.0 - 4.2) / 4.2) * 100)

  return (
    <div ref={ref} className="relative flex justify-center px-6 pb-[120px] -mt-4">
      <div className="absolute left-1/2 top-8 h-[360px] w-[min(980px,86vw)] -translate-x-1/2 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(201,122,74,0.14), rgba(184,84,144,0.08) 38%, transparent 72%)", filter: "blur(28px)" }} />
      <div className="absolute left-1/2 top-[-18px] z-[3] -translate-x-1/2 rounded-full px-4 py-2 hidden sm:flex items-center gap-2"
        style={{ background: "rgba(255,255,255,0.78)", border: "1px solid var(--tz-line)", boxShadow: "0 18px 45px -28px rgba(80,60,120,0.45)", backdropFilter: "blur(12px)", fontFamily: "var(--font-geist-mono), monospace", fontSize: 12, color: "var(--tz-ink-2)", letterSpacing: "0.04em" }}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--tz-green)", boxShadow: "0 0 0 4px oklch(0.55 0.15 150 / 0.14)", animation: "tz-pulse 2s infinite" }} />
        Winner found in 9.4 minutes
      </div>
      <div className="relative z-[2] w-full max-w-[1120px] rounded-[24px] overflow-hidden transition-transform duration-500 hover:-translate-y-1"
        style={{
          background: "var(--tz-bg-card)",
          border: "1px solid rgba(201,122,74,0.24)",
          boxShadow: "0 44px 95px -48px rgba(80,60,120,0.42), 0 0 0 8px rgba(255,255,255,0.42)",
        }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b"
          style={{ background: "linear-gradient(90deg, var(--tz-bg-2), rgba(201,122,74,0.08))", borderColor: "var(--tz-line)" }}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full"
              style={{ background: "var(--tz-green)", animation: "tz-pulse 2s infinite" }} />
            <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 13, color: "var(--tz-ink-2)" }}>
              Live scan · one paywall decision
            </span>
          </div>
          <span className="rounded-md px-2.5 py-1"
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 11,
              background: "oklch(0.55 0.15 150 / 0.1)",
              color: "var(--tz-green)",
              border: "1px solid oklch(0.55 0.15 150 / 0.2)",
            }}>
            50 variants screened
          </span>
        </div>

        {/* Body */}
        <div className="relative p-6 sm:p-8">
          <div className="mb-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {[
              ["1", "Score before launch", "No live traffic spent on weak variants"],
              ["2", "Explain the winner", "Price, proof, offer, and friction called out"],
              ["3", "Roll out safely", "Ship to 5% traffic before full release"],
            ].map(([step, title, desc]) => (
              <div key={step} className="rounded-2xl px-4 py-3"
                style={{ background: "rgba(255,255,255,0.62)", border: "1px solid var(--tz-line)" }}>
                <div className="flex items-center gap-2" style={{ marginBottom: 4 }}>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full"
                    style={{ background: "var(--tz-accent-soft)", color: "var(--tz-accent)", fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, fontWeight: 700 }}>
                    {step}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 650, color: "var(--tz-ink)" }}>{title}</span>
                </div>
                <div style={{ fontSize: 12, color: "var(--tz-ink-3)", lineHeight: 1.4 }}>
                  {desc}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* Control */}
            <div className="rounded-2xl p-5"
              style={{ background: "var(--tz-bg)", border: "1px solid var(--tz-line)", opacity: winning ? 0.78 : 1 }}>
              <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, color: "var(--tz-ink-3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
                Current paywall
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 16, color: "var(--tz-ink)" }}>
                Three plans, monthly toggle, free trial
              </div>
              <div className="h-1.5 rounded-full overflow-hidden mb-2" style={{ background: "var(--tz-line)" }}>
                <div className="h-full rounded-full transition-all duration-[2s] ease-out"
                  style={{ width: `${(controlVal / 12) * 100}%`, background: "var(--tz-ink-3)" }} />
              </div>
              <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--tz-ink-2)" }}>
                {controlVal === 0 ? "—" : controlVal.toFixed(1) + "%"}
              </div>
              <div style={{ fontSize: 12, color: "var(--tz-ink-3)", marginTop: 2 }}>users who pay</div>
            </div>

            {/* Challenger */}
            <div className="relative rounded-2xl p-5 transition-all duration-500"
              style={{
                background: winning ? "linear-gradient(180deg, rgba(255,255,255,0.72), var(--tz-bg))" : "var(--tz-bg)",
                borderWidth: winning ? 2 : 1,
                borderStyle: "solid",
                borderColor: winning ? "var(--tz-accent)" : "var(--tz-line)",
                boxShadow: winning ? "0 24px 55px -34px rgba(184,84,144,0.7), 0 0 0 6px var(--tz-accent-soft)" : "none",
                transform: winning ? "scale(1.015)" : "scale(1)",
              }}>
              <div className="absolute right-4 top-4 rounded-full px-3 py-1 transition-opacity duration-500"
                style={{ opacity: winning ? 1 : 0, background: "oklch(0.55 0.15 150 / 0.12)", color: "var(--tz-green)", border: "1px solid oklch(0.55 0.15 150 / 0.22)", fontFamily: "var(--font-geist-mono), monospace", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Winner
              </div>
              <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, color: "var(--tz-ink-3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
                Tranzmit pick
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 16, color: "var(--tz-ink)" }}>
                Annual anchor, proof strip, simpler choice
              </div>
              <div className="h-1.5 rounded-full overflow-hidden mb-2" style={{ background: "var(--tz-line)" }}>
                <div className="h-full rounded-full transition-all duration-[2s] ease-out"
                  style={{ width: `${(challengerVal / 12) * 100}%`, background: "var(--tz-accent-grad)" }} />
              </div>
              <div style={{
                fontFamily: "var(--font-geist-mono), monospace", fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em",
                background: "var(--tz-accent-grad)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
              }}>
                {challengerVal === 0 ? "—" : challengerVal.toFixed(1) + "%"}
              </div>
              <div style={{ fontSize: 12, color: "var(--tz-ink-3)", marginTop: 2 }}>users who pay</div>
            </div>
          </div>

          {/* Result */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl px-[18px] py-4 transition-all duration-500"
            style={{
              opacity: done ? 1 : 0,
              background: "linear-gradient(90deg, rgba(201,122,74,0.14), rgba(184,84,144,0.08), rgba(107,78,176,0.1))",
              border: "1px solid rgba(201,122,74,0.22)",
              boxShadow: done ? "0 18px 45px -34px rgba(184,84,144,0.55)" : "none",
            }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: "var(--tz-ink)" }}>
              Better paywall found: <span style={{ color: "var(--tz-green)", fontFamily: "var(--font-geist-mono), monospace", fontWeight: 700 }}>+{lift}%</span> predicted lift
            </span>
            <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 12, color: "var(--tz-accent)" }}>
              Guardrailed rollout to 5% traffic
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
