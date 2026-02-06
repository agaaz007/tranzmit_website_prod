"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

function FlowDiagram() {
  return (
    <motion.div
      className="mt-12 sm:mt-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div
        className="rounded-2xl p-6 sm:p-8 overflow-hidden"
        style={{
          backgroundColor: "var(--t-bg-card)",
          border: "1px solid var(--t-border)",
        }}
      >
        {/* Flow: Signals -> Conversations -> Revenue */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-0">
          {/* Step 1 - Signals */}
          <div className="flex-1 text-center px-4">
            <div
              className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-3"
              style={{ backgroundColor: "rgba(59,130,246,0.1)" }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M4 20L10 14L14 18L24 8" stroke="rgba(59,130,246,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="24" cy="8" r="3" fill="rgba(239,68,68,0.6)" />
                <path d="M4 24H24" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" />
              </svg>
            </div>
            <p className="text-sm font-semibold" style={{ color: "var(--t-text)" }}>
              Early Signals
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--t-text-muted)" }}>
              AI detects risk before dashboards do
            </p>
          </div>

          {/* Arrow */}
          <div className="hidden sm:flex items-center">
            <svg width="40" height="20" viewBox="0 0 40 20" style={{ color: "var(--t-border-hover)" }}>
              <line x1="0" y1="10" x2="30" y2="10" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" />
              <path d="M28 4L36 10L28 16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="sm:hidden">
            <svg width="20" height="30" viewBox="0 0 20 30" style={{ color: "var(--t-border-hover)" }}>
              <line x1="10" y1="0" x2="10" y2="22" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" />
              <path d="M4 18L10 26L16 18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Step 2 - Conversations */}
          <div className="flex-1 text-center px-4">
            <div
              className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-3"
              style={{ backgroundColor: "rgba(139,92,246,0.1)" }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="2" y="4" width="16" height="10" rx="4" stroke="rgba(139,92,246,0.8)" strokeWidth="1.5" />
                <path d="M6 14L3 11" stroke="rgba(139,92,246,0.8)" strokeWidth="1.5" strokeLinecap="round" />
                <rect x="10" y="14" width="16" height="10" rx="4" stroke="rgba(139,92,246,0.5)" strokeWidth="1.5" />
                <path d="M22 14L25 17" stroke="rgba(139,92,246,0.5)" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="6" y1="8" x2="14" y2="8" stroke="rgba(139,92,246,0.3)" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="6" y1="11" x2="11" y2="11" stroke="rgba(139,92,246,0.3)" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="14" y1="18" x2="22" y2="18" stroke="rgba(139,92,246,0.2)" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="14" y1="21" x2="19" y2="21" stroke="rgba(139,92,246,0.2)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-sm font-semibold" style={{ color: "var(--t-text)" }}>
              Real Conversations
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--t-text-muted)" }}>
              AI interviews uncover the real why
            </p>
          </div>

          {/* Arrow */}
          <div className="hidden sm:flex items-center">
            <svg width="40" height="20" viewBox="0 0 40 20" style={{ color: "var(--t-border-hover)" }}>
              <line x1="0" y1="10" x2="30" y2="10" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" />
              <path d="M28 4L36 10L28 16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="sm:hidden">
            <svg width="20" height="30" viewBox="0 0 20 30" style={{ color: "var(--t-border-hover)" }}>
              <line x1="10" y1="0" x2="10" y2="22" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" />
              <path d="M4 18L10 26L16 18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Step 3 - Revenue */}
          <div className="flex-1 text-center px-4">
            <div
              className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-3"
              style={{ backgroundColor: "rgba(16,185,129,0.1)" }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M4 22L10 16L16 19L24 8" stroke="rgba(16,185,129,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18 8H24V14" stroke="rgba(16,185,129,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 24H24" stroke="rgba(16,185,129,0.3)" strokeWidth="1.5" />
              </svg>
            </div>
            <p className="text-sm font-semibold" style={{ color: "var(--t-text)" }}>
              Revenue Retained
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--t-text-muted)" }}>
              Customers stay because they feel heard
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function WhyItWorksSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="py-20 sm:py-28">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: "var(--t-text-muted)" }}
            >
              Why It Works
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
            style={{ color: "var(--t-text)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Early signals + real conversations
            <br />
            <span style={{ color: "var(--t-text-secondary)" }}>=</span>{" "}
            <span className="italic font-medium" style={{ color: "var(--t-text-secondary)" }}>
              revenue retained
            </span>
          </motion.h2>

          <motion.div
            className="mt-10 sm:mt-14 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg sm:text-xl leading-relaxed" style={{ color: "var(--t-text-secondary)" }}>
              People leave because they feel ignored.
            </p>
            <p className="text-lg sm:text-xl leading-relaxed" style={{ color: "var(--t-text-secondary)" }}>
              What keeps them?
            </p>
            <p className="text-xl sm:text-2xl font-semibold" style={{ color: "var(--t-text)" }}>
              Being heard in real time.
            </p>
          </motion.div>

          <FlowDiagram />
        </div>
      </div>
    </section>
  )
}
