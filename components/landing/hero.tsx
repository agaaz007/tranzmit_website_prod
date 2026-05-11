"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { HoloCard } from "./holo-card"
import { LogoMarquee } from "@/components/logo-marquee"

function LiveBadge() {
  const [count, setCount] = useState(2341)
  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * 3) + 1)
    }, 4000)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="relative z-[2] inline-flex items-center gap-3 rounded-full px-4 py-2 backdrop-blur-[10px] mb-8"
      style={{
        fontFamily: "var(--font-geist-mono), monospace",
        color: "var(--tz-ink)",
        fontSize: "clamp(14px, 1.35vw, 18px)",
        fontWeight: 500,
        letterSpacing: "-0.005em",
        background: "rgba(255,255,255,0.72)",
        border: "1px solid var(--tz-line-2)",
        boxShadow: "0 18px 42px -30px rgba(80,60,120,0.42), inset 0 1px 1px rgba(255,255,255,0.72)",
      }}>
      <span className="w-2 h-2 rounded-full shrink-0"
        style={{
          background: "var(--tz-green)",
          boxShadow: "0 0 0 4px oklch(0.55 0.15 150 / 0.16)",
          animation: "tz-pulse 2s infinite",
        }} />
      {count.toLocaleString()} paywall variants scored today
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative min-h-[92svh] lg:min-h-screen flex flex-col items-center justify-start lg:justify-center text-center px-6 pt-[116px] pb-12 lg:pt-[140px] lg:pb-20"
      style={{ perspective: 1400 }}>

      <div className="hidden xl:block absolute inset-0 pointer-events-none z-[1]">
        <HoloCard
          variant="mint" kind="tiers"
          style={{ top: 210, left: 150 }}
          drift={{ rotX: 14, rotY: 22, rotZ: 8, ax: 10, ay: 12, phase: 0 }}
        />
        <HoloCard
          variant="lilac" kind="annual"
          style={{ top: 175, right: 135 }}
          drift={{ rotX: 16, rotY: -24, rotZ: -8, ax: 12, ay: 10, phase: 1.7 }}
        />
        <div className="hidden 2xl:block">
          <HoloCard
            variant="sunset" kind="winner"
            style={{ bottom: 55, right: 185, opacity: 0.94 }}
            drift={{ rotX: 22, rotY: -14, rotZ: -4, ax: 8, ay: 10, phase: 3.4, sx: 0.45 }}
          />
        </div>
      </div>

      <LiveBadge />

      <h1 className="relative z-[2] font-semibold max-w-[860px] mb-7"
        style={{
          fontSize: "clamp(40px, 6vw, 76px)",
          lineHeight: 1.02,
          letterSpacing: "-0.035em",
          textWrap: "balance",
        }}>
        Find the paywall<br />that makes more users{" "}
        <span className="font-bold"
          style={{
            background: "var(--tz-accent-grad)",
            backgroundSize: "200% 100%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            animation: "tz-shimmer 6s ease-in-out infinite",
          }}>pay</span>
      </h1>

      <p className="relative z-[2] text-lg max-w-[580px] mb-9"
        style={{ color: "var(--tz-ink-2)", lineHeight: 1.55 }}>
        Upload your current paywall. Tranzmit finds a higher-converting version,
        shows the lift, and explains why it wins.
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
          <ArrowRight size={16} strokeWidth={2} />
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

      <LogoMarquee />

      <div className="relative z-[2] mt-10 sm:mt-12 grid w-full max-w-[620px] grid-cols-3 items-stretch gap-3 rounded-[22px] px-3 py-3 sm:max-w-[760px] sm:px-4"
        style={{
          background: "rgba(255,255,255,0.62)",
          border: "1px solid var(--tz-line-2)",
          boxShadow: "0 24px 58px -42px rgba(80,60,120,0.42), inset 0 1px 1px rgba(255,255,255,0.72)",
          backdropFilter: "blur(14px)",
        }}>
        {[
          ["50", "variants in your audit"],
          ["9.4 min", "median winner direction"],
          ["+67%", "more buyers, same traffic"],
        ].map(([value, label]) => (
          <div key={label} className="flex min-h-[76px] flex-col items-center justify-center gap-1 rounded-[16px] px-2 text-center"
            style={{ fontFamily: "var(--font-geist-mono), monospace", color: "var(--tz-ink-3)", background: "rgba(255,255,255,0.5)" }}>
            <strong style={{
              fontSize: "clamp(20px, 4.6vw, 34px)",
              background: "var(--tz-accent-grad)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              fontWeight: 700,
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}>{value}</strong>
            <span style={{ fontSize: 11, lineHeight: 1.25 }}>{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
