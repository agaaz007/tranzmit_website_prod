"use client"

import Link from "next/link"

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border-b backdrop-blur-[20px]"
      style={{
        background: "rgba(252,250,247,0.78)",
        borderColor: "var(--tz-line)",
      }}>
      <Link href="/" className="flex items-center gap-2.5 no-underline"
        style={{ color: "var(--tz-ink)", fontWeight: 650, fontSize: 20, letterSpacing: "-0.035em" }}>
        Tranzmit AI
      </Link>
      <div className="hidden md:flex items-center gap-8">
        <Link href="#how" className="text-sm font-medium no-underline transition-colors hover:text-[var(--tz-ink)]"
          style={{ color: "var(--tz-ink-2)" }}>
          How it works
        </Link>
        <Link href="#results" className="text-sm font-medium no-underline transition-colors hover:text-[var(--tz-ink)]"
          style={{ color: "var(--tz-ink-2)" }}>
          Results
        </Link>
        <Link href="#" target="_blank" className="text-sm font-medium no-underline transition-colors hover:text-[var(--tz-ink)]"
          style={{ color: "var(--tz-ink-2)" }}>
          Docs
        </Link>
        <Link href="https://calendly.com/tranzmitai/new-meeting" target="_blank" rel="noopener noreferrer"
          className="whitespace-nowrap rounded-full text-[13px] font-medium no-underline"
          style={{
            background: "var(--tz-ink)",
            color: "var(--tz-bg)",
            padding: "9px 18px",
          }}>
          Book a demo
        </Link>
      </div>
    </nav>
  )
}
