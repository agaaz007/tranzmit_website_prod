"use client"

import { useEffect, useState } from "react"

const PALETTES = {
  mint: { bg: "linear-gradient(135deg, #d4f0e0 0%, #a8d8c8 30%, #f4c8b8 60%, #e8a890 100%)" },
  lilac: { bg: "linear-gradient(135deg, #e8d4f0 0%, #d4a8e8 25%, #f0c8d8 55%, #f8e0c0 100%)" },
  sunset: { bg: "linear-gradient(135deg, #ffd4b8 0%, #f0a890 30%, #e08498 60%, #b878b8 100%)" },
} as const

function PaywallTiers() {
  const tiers = [
    { name: "Free", price: "$0", hl: false },
    { name: "Pro", price: "$12", hl: true },
    { name: "Team", price: "$29", hl: false },
  ]
  return (
    <>
      <div style={{ fontSize: 9, fontFamily: "var(--font-geist-mono), monospace", color: "rgba(40,30,55,0.55)", letterSpacing: "0.1em", marginBottom: 8 }}>VARIANT · 412</div>
      <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 12 }}>Pick your plan</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
        {tiers.map((p, i) => (
          <div key={i} style={{
            border: `1px solid ${p.hl ? "rgba(40,30,55,0.4)" : "rgba(40,30,55,0.12)"}`,
            background: p.hl ? "rgba(40,30,55,0.06)" : "transparent",
            borderRadius: 8, padding: "8px 10px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ fontSize: 11, fontWeight: 500 }}>{p.name}</span>
            <span style={{ fontSize: 11, fontFamily: "var(--font-geist-mono), monospace", color: "rgba(40,30,55,0.7)" }}>{p.price}/mo</span>
          </div>
        ))}
      </div>
      <button style={{ marginTop: 10, padding: 8, borderRadius: 8, border: "none", background: "#1a1520", color: "#fafafa", fontSize: 11, fontWeight: 600, fontFamily: "inherit", cursor: "pointer" }}>Start free trial</button>
    </>
  )
}

function PaywallAnnual() {
  return (
    <>
      <div style={{ fontSize: 9, fontFamily: "var(--font-geist-mono), monospace", color: "rgba(40,30,55,0.55)", letterSpacing: "0.1em", marginBottom: 8 }}>VARIANT · 847 ★</div>
      <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 4 }}>Unlock everything.</div>
      <div style={{ fontSize: 10, color: "rgba(40,30,55,0.6)", marginBottom: 12 }}>Used by 1.6M creators</div>
      <div style={{
        border: "1px solid rgba(40,30,55,0.18)",
        background: "linear-gradient(135deg, rgba(201,122,74,0.12), rgba(184,84,144,0.08))",
        borderRadius: 10, padding: 12, marginBottom: 8,
      }}>
        <div style={{ fontSize: 9, color: "#c97a4a", fontFamily: "var(--font-geist-mono), monospace", marginBottom: 4 }}>ANNUAL · BEST</div>
        <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em" }}>$89<span style={{ fontSize: 10, color: "rgba(40,30,55,0.6)", fontWeight: 400 }}>/yr</span></div>
        <div style={{ fontSize: 9, color: "#5a8a4a", marginTop: 2 }}>Save 38% vs monthly</div>
      </div>
      <div style={{ fontSize: 9, color: "rgba(40,30,55,0.55)", textAlign: "center", marginBottom: 6 }}>or $12/mo · cancel anytime</div>
      <button style={{ marginTop: "auto", padding: 9, borderRadius: 8, border: "none", background: "#1a1520", color: "#fafafa", fontSize: 11, fontWeight: 700, fontFamily: "inherit", cursor: "pointer" }}>Continue →</button>
    </>
  )
}

function PaywallWinner() {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ fontSize: 9, fontFamily: "var(--font-geist-mono), monospace", color: "#c97a4a", letterSpacing: "0.1em" }}>EXPERIMENT 847</div>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#5a8a4a" }} />
      </div>
      <div style={{ fontSize: 11, color: "rgba(40,30,55,0.6)", marginBottom: 4 }}>Predicted lift</div>
      <div style={{
        fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 14,
        background: "linear-gradient(92deg, #c97a4a, #b85490, #6b4eb0)",
        WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
      }}>+67%</div>
      <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 60, marginBottom: 14 }}>
        {[20, 30, 28, 42, 38, 55, 60, 72, 68, 80, 88, 95].map((h, i) => (
          <div key={i} style={{
            flex: 1, borderRadius: 2,
            background: i < 5 ? "rgba(40,30,55,0.15)" : "linear-gradient(to top, #c97a4a, #b85490)",
            height: `${h}%`,
          }} />
        ))}
      </div>
      <div style={{ fontSize: 9, fontFamily: "var(--font-geist-mono), monospace", color: "rgba(40,30,55,0.55)", letterSpacing: "0.05em", marginTop: "auto" }}>
        ▸ AUTO-DEPLOYING TO 5%
      </div>
    </>
  )
}

interface HoloCardProps {
  variant: "mint" | "lilac" | "sunset"
  kind: "tiers" | "annual" | "winner"
  style?: React.CSSProperties
  drift: {
    rotX: number; rotY: number; rotZ: number
    ax: number; ay: number; phase: number
    sx?: number; sy?: number; sz?: number
  }
}

export function HoloCard({ variant = "mint", style: posStyle = {}, drift, kind }: HoloCardProps) {
  const [t, setT] = useState(0)
  useEffect(() => {
    let raf: number
    const start = performance.now()
    const tick = (now: number) => {
      setT((now - start) / 1000)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const ax = drift.ax ?? 12, ay = drift.ay ?? 9
  const sx = drift.sx ?? 0.5, sy = drift.sy ?? 0.4, sz = drift.sz ?? 0.3
  const phase = drift.phase ?? 0
  const baseRotX = drift.rotX ?? 16, baseRotY = drift.rotY ?? -22, baseRotZ = drift.rotZ ?? -6

  const x = Math.sin(t * sx + phase) * ax
  const y = Math.sin(t * sy + phase * 1.3) * ay
  const rx = baseRotX + Math.sin(t * sz + phase) * 5
  const ry = baseRotY + Math.cos(t * sz * 0.9 + phase) * 5
  const rz = baseRotZ + Math.sin(t * 0.3 + phase) * 1.5

  const p = PALETTES[variant] ?? PALETTES.mint

  return (
    <div style={{
      position: "absolute", width: 260, height: 340,
      transformStyle: "preserve-3d",
      transform: `translate3d(${x}px, ${y}px, 0) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`,
      transition: "transform 40ms linear",
      ...posStyle,
    }}>
      <div style={{
        position: "absolute", inset: "auto 16px -34px 16px", height: 56,
        background: "radial-gradient(ellipse at center, rgba(60,40,80,0.22) 0%, transparent 70%)",
        filter: "blur(10px)", zIndex: -1,
      }} />
      <div style={{
        position: "absolute", inset: 0, borderRadius: 22,
        background: p.bg,
        boxShadow: "inset 0 1px 1px rgba(255,255,255,0.6), 0 30px 60px -20px rgba(80,60,120,0.35)",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: -20,
          background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)",
          mixBlendMode: "overlay",
          transform: `translateX(${Math.sin(t * 0.4 + phase) * 30}px)`,
        }} />
        <div style={{
          position: "absolute", inset: 12, borderRadius: 16,
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(12px)",
          padding: 18,
          display: "flex", flexDirection: "column",
          color: "#1a1520",
          fontFamily: "'Geist', sans-serif",
          border: "1px solid rgba(255,255,255,0.6)",
        }}>
          {kind === "tiers" && <PaywallTiers />}
          {kind === "annual" && <PaywallAnnual />}
          {kind === "winner" && <PaywallWinner />}
        </div>
      </div>
    </div>
  )
}
