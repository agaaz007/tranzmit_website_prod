"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const PROBLEMS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 17H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-4" strokeLinecap="round" />
        <path d="M8 21h8M12 17v4" strokeLinecap="round" />
        <path d="M7 9l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
      </svg>
    ),
    title: "Session analytics show what",
    description: "You see drop-offs, rage clicks, and funnel leaks — but never why they happen.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" strokeLinecap="round" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 12h6M9 16h4" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
    title: "Surveys capture opinions",
    description: "Self-reported feedback is biased, delayed, and rarely captures what people actually do.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Teams ship fixes to symptoms",
    description: "Without the real why, product decisions are guesswork. Months of effort, same churn rate.",
  },
]

export function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="py-20 sm:py-28">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
            <div>
              <motion.div
                className="mb-5"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <span
                  className="text-xs font-semibold tracking-[0.2em] uppercase"
                  style={{ color: "var(--t-text-muted)" }}
                >
                  The Problem
                </span>
              </motion.div>

              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
                style={{ color: "var(--t-text)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                You have the data.
                <br />
                <span className="italic font-medium" style={{ color: "var(--t-text-muted)" }}>
                  You don&apos;t have the why.
                </span>
              </motion.h2>

              <motion.p
                className="mt-6 text-xl sm:text-2xl font-semibold"
                style={{ color: "var(--t-text)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                You need qual + quant together — in real time, not next quarter.
              </motion.p>
            </div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {PROBLEMS.map((problem, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-5 rounded-xl transition-colors"
                  style={{
                    backgroundColor: "var(--t-bg-card)",
                    border: "1px solid var(--t-border)",
                  }}
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "var(--t-bg-subtle)", color: "var(--t-text-muted)" }}
                  >
                    {problem.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[15px]" style={{ color: "var(--t-text)" }}>
                      {problem.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--t-text-secondary)" }}>
                      {problem.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
