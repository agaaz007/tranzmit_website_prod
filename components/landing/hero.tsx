"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { HoloCard } from "./holo-card"

function LiveBadge() {
  const [count, setCount] = useState(2341)
  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * 3) + 1)
    }, 4000)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="relative z-[2] inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs backdrop-blur-[8px] mb-7"
      style={{
        fontFamily: "var(--font-geist-mono), monospace",
        color: "var(--tz-ink-2)",
        background: "rgba(255,255,255,0.6)",
        border: "1px solid var(--tz-line)",
      }}>
      <span className="w-1.5 h-1.5 rounded-full"
        style={{
          background: "var(--tz-green)",
          boxShadow: "0 0 0 3px oklch(0.55 0.15 150 / 0.18)",
          animation: "tz-pulse 2s infinite",
        }} />
      {count.toLocaleString()} variants tested today
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center"
      style={{ padding: "140px 24px 80px", perspective: 1400 }}>

      <div className="hidden 2xl:block absolute inset-0 pointer-events-none z-[1]">
        <HoloCard
          variant="mint" kind="tiers"
          style={{ top: 200, left: -40 }}
          drift={{ rotX: 14, rotY: 22, rotZ: 8, ax: 10, ay: 12, phase: 0 }}
        />
        <HoloCard
          variant="lilac" kind="annual"
          style={{ top: 160, right: -30 }}
          drift={{ rotX: 16, rotY: -24, rotZ: -8, ax: 12, ay: 10, phase: 1.7 }}
        />
        <HoloCard
          variant="sunset" kind="winner"
          style={{ bottom: 40, right: 30, opacity: 0.94 }}
          drift={{ rotX: 22, rotY: -14, rotZ: -4, ax: 8, ay: 10, phase: 3.4, sx: 0.45 }}
        />
      </div>

      <LiveBadge />

      <h1 className="relative z-[2] font-semibold max-w-[860px] mb-7"
        style={{
          fontSize: "clamp(40px, 6vw, 76px)",
          lineHeight: 1.02,
          letterSpacing: "-0.035em",
          textWrap: "balance",
        }}>
        Your paywall converts{" "}
        <span className="font-bold"
          style={{
            background: "var(--tz-accent-grad)",
            backgroundSize: "200% 100%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            animation: "tz-shimmer 6s ease-in-out infinite",
          }}>3%</span>.<br />
        It should convert{" "}
        <span className="font-bold"
          style={{
            background: "var(--tz-accent-grad)",
            backgroundSize: "200% 100%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            animation: "tz-shimmer 6s ease-in-out infinite",
          }}>12%</span>.
      </h1>

      <p className="relative z-[2] text-lg max-w-[580px] mb-9"
        style={{ color: "var(--tz-ink-2)", lineHeight: 1.55 }}>
        Tranzmit runs hundreds of paywall experiments autonomously every day -
        synthetic users, ensemble AI judges, auto-deploy.
        You set the guardrails. We find the winners.
      </p>

      <div className="relative z-[2] flex flex-wrap items-center justify-center gap-3">
        <Link href="https://calendly.com/tranzmitai/new-meeting" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full text-[15px] font-medium no-underline transition-all hover:-translate-y-px"
          style={{
            padding: "13px 24px",
            background: "var(--tz-ink)",
            color: "var(--tz-bg)",
          }}>
          Get a free paywall audit
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5-5-5-5" /></svg>
        </Link>
        <Link href="#how"
          className="inline-flex items-center gap-2 rounded-full text-[15px] font-medium no-underline transition-all"
          style={{
            padding: "13px 24px",
            color: "var(--tz-ink-2)",
            border: "1px solid var(--tz-line-2)",
          }}>
          See how it works
        </Link>
      </div>

      <div className="relative z-[2] mt-12 flex flex-wrap items-center justify-center gap-6">
        <div className="flex items-center gap-5"
          style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 13, color: "var(--tz-ink-3)", letterSpacing: "0.05em" }}>
          <span>Jungle AI</span>
          <span>Zeo</span>
          <span>Auto</span>
        </div>
        <div className="h-[22px] w-px" style={{ background: "var(--tz-line-2)" }} />
        <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 13, color: "var(--tz-ink-3)" }}>
          <strong style={{
            background: "var(--tz-accent-grad)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            fontWeight: 700,
          }}>+214%</strong> avg. conversion lift
        </div>
      </div>
    </section>
  )
}
