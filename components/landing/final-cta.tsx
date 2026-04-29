"use client"

import Link from "next/link"

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
        Stop guessing.<br />Start shipping paywalls that convert.
      </h2>
      <p className="max-w-[600px] mx-auto mb-9" style={{ fontSize: 17, color: "var(--tz-ink-2)", lineHeight: 1.55 }}>
        We&apos;ll run a custom 50-variant experiment on your current paywall during the call.
        See results before you hang up.
      </p>
      <Link href="https://calendly.com/tranzmitai/new-meeting" target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full font-medium no-underline transition-all hover:-translate-y-px"
        style={{ fontSize: 16, padding: "16px 32px", background: "var(--tz-ink)", color: "var(--tz-bg)" }}>
        Book a 15-minute demo
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5-5-5-5" /></svg>
      </Link>
      <div className="mt-4" style={{ fontSize: 13, color: "var(--tz-ink-3)", fontFamily: "var(--font-geist-mono), monospace" }}>
        No credit card. No commitment. Just data.
      </div>
    </section>
  )
}
