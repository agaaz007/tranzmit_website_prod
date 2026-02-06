"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

function IconSessions() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="6" width="32" height="24" rx="4" stroke="currentColor" strokeWidth="2" />
      <path d="M2 12H34" stroke="currentColor" strokeWidth="2" />
      <rect x="6" y="16" width="4" height="10" rx="1" fill="currentColor" opacity="0.2" />
      <rect x="12" y="19" width="4" height="7" rx="1" fill="currentColor" opacity="0.3" />
      <rect x="18" y="14" width="4" height="12" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="24" y="21" width="4" height="5" rx="1" fill="rgba(239,68,68,0.6)" />
      <circle cx="30" cy="9" r="1" fill="currentColor" opacity="0.4" />
      <circle cx="27" cy="9" r="1" fill="currentColor" opacity="0.4" />
    </svg>
  )
}

function IconInterview() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="20" height="14" rx="4" stroke="currentColor" strokeWidth="2" />
      <path d="M8 24L4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect x="12" y="18" width="20" height="14" rx="4" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <path d="M28 12L32 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <line x1="9" y1="9" x2="19" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      <line x1="9" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      <line x1="17" y1="23" x2="27" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      <line x1="17" y1="27" x2="24" y2="27" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    </svg>
  )
}

function IconMerge() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="10" r="5" stroke="rgba(59,130,246,0.8)" strokeWidth="2" />
      <circle cx="8" cy="26" r="5" stroke="rgba(139,92,246,0.8)" strokeWidth="2" />
      <circle cx="28" cy="18" r="6" stroke="currentColor" strokeWidth="2" />
      <path d="M13 10L22 18" stroke="rgba(59,130,246,0.5)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13 26L22 18" stroke="rgba(139,92,246,0.5)" strokeWidth="1.5" strokeLinecap="round" />
      <text x="28" y="20.5" textAnchor="middle" fontSize="8" fontWeight="700" fill="currentColor" opacity="0.6">Q²</text>
      <text x="8" y="12.5" textAnchor="middle" fontSize="6" fontWeight="600" fill="rgba(59,130,246,0.8)">Qt</text>
      <text x="8" y="28.5" textAnchor="middle" fontSize="6" fontWeight="600" fill="rgba(139,92,246,0.8)">Ql</text>
    </svg>
  )
}

function IconRecover() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 4L18 14" stroke="rgba(16,185,129,0.6)" strokeWidth="2" strokeLinecap="round" />
      <path d="M13 9L18 4L23 9" stroke="rgba(16,185,129,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 18C6 11.4 11.4 6 18 6C24.6 6 30 11.4 30 18C30 24.6 24.6 30 18 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      <path d="M30 18C30 24.6 24.6 30 18 30C11.4 30 6 24.6 6 18" stroke="rgba(16,185,129,0.7)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="18" cy="20" r="3" fill="rgba(16,185,129,0.3)" stroke="rgba(16,185,129,0.7)" strokeWidth="1.5" />
    </svg>
  )
}

const STEPS = [
  {
    number: "01",
    title: "Analyze Sessions",
    description:
      "AI continuously monitors user sessions, flagging drop-offs, rage clicks, and at-risk behavior patterns.",
    Icon: IconSessions,
  },
  {
    number: "02",
    title: "Interview Customers",
    description:
      "AI conducts natural, personalized conversations with users — at the right moment — to uncover the real why.",
    Icon: IconInterview,
  },
  {
    number: "03",
    title: "Qual meets Quant",
    description:
      "Session data + interview insights merge into one view: who to fix, what to build, and why it matters.",
    Icon: IconMerge,
  },
  {
    number: "04",
    title: "Recover & Retain",
    description:
      "Act on root causes — not symptoms. Customers rethink their decision and stay.",
    Icon: IconRecover,
  },
]

export function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="how-it-works" ref={ref} className="py-20 sm:py-28">
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
              How Tranzmit Works
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
            style={{ color: "var(--t-text)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Session analysis + customer interviews
            <br />
            <span className="italic font-medium" style={{ color: "var(--t-text-secondary)" }}>
              = 20x faster clarity
            </span>
          </motion.h2>
        </div>

        <div className="mt-14 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              className="rounded-2xl p-8 sm:p-10 transition-shadow duration-300"
              style={{
                backgroundColor: "var(--t-bg-card)",
                border: "1px solid var(--t-border)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <span
                  className="text-sm font-semibold tracking-wide"
                  style={{ color: "var(--t-text-muted)" }}
                >
                  {step.number}
                </span>
                <div style={{ color: "var(--t-text)" }}>
                  <step.Icon />
                </div>
              </div>
              <h3
                className="text-xl sm:text-2xl font-bold"
                style={{ color: "var(--t-text)" }}
              >
                {step.title}
              </h3>
              <p
                className="mt-3 text-base sm:text-lg leading-relaxed"
                style={{ color: "var(--t-text-secondary)" }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mt-12 sm:mt-16 text-center text-lg sm:text-xl italic"
          style={{ color: "var(--t-text-muted)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Stop guessing. Start knowing.
        </motion.p>
      </div>
    </section>
  )
}
