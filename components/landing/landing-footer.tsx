"use client"

import Link from "next/link"

export function LandingFooter() {
  return (
    <footer className="px-6 py-12" style={{ borderTop: "1px solid var(--tz-line)" }}>
      <div className="max-w-[1120px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 13, color: "var(--tz-ink-3)" }}>
          © 2026 Tranzmit Technologies · Delaware C-Corp
        </div>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Contact"].map((l) => (
            <Link key={l} href="#" className="text-[13px] no-underline transition-colors hover:text-[var(--tz-ink)]"
              style={{ color: "var(--tz-ink-3)" }}>
              {l}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
