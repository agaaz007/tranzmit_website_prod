"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function FinalCta() {
  return (
    <section className="text-center py-[140px] px-6" id="cta">
      <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 12, color: "var(--tz-accent)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 16 }}>
        Get started
      </div>
      <h2 className="max-w-[680px] mx-auto mb-4" style={{
        fontSize: "clamp(28px, 4vw, 48px)",
        fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.08,
        textWrap: "balance",
      }}>
        Bring one paywall.<br />Leave with the better version.
      </h2>
      <p className="max-w-[600px] mx-auto mb-9" style={{ fontSize: 17, color: "var(--tz-ink-2)", lineHeight: 1.55 }}>
        We&apos;ll compare 50 variants against your current paywall and show the better direction during the call.
      </p>
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link href="https://calendly.com/tranzmitai/new-meeting" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full font-medium no-underline transition-all hover:-translate-y-px"
          style={{ fontSize: 16, padding: "16px 32px", background: "var(--tz-ink)", color: "var(--tz-bg)" }}>
          Get a free paywall audit
          <ArrowRight size={16} strokeWidth={2} />
        </Link>
        <Link href="#results"
          className="inline-flex items-center gap-2 rounded-full font-medium no-underline transition-all hover:-translate-y-px"
          style={{ fontSize: 16, padding: "15px 28px", color: "var(--tz-ink-2)", border: "1px solid var(--tz-line-2)", background: "rgba(255,255,255,0.42)" }}>
          See audit example
        </Link>
      </div>
      <div className="mt-4" style={{ fontSize: 13, color: "var(--tz-ink-3)", fontFamily: "var(--font-geist-mono), monospace" }}>
        No credit card. No commitment. Just the math.
      </div>
    </section>
  )
}
