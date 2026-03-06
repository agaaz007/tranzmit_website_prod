"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const STEPS = [
  {
    number: "1",
    title: "Connect your cancel flow",
    description: "Add a single script tag to your cancellation page. Works with any stack.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "2",
    title: "AI learns your patterns",
    description: "Within hours, Tranzmit understands normal behavior vs. at-risk signals.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" opacity="0.3" />
        <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "3",
    title: "Watch recoveries happen",
    description: "Real conversations. Real engagement. Customers retained automatically.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export function TrialSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="py-20 sm:py-28">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-20">
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
              Getting Started
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
            style={{ color: "var(--t-text)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Live in{" "}
            <span className="italic font-medium" style={{ color: "var(--t-text-secondary)" }}>
              minutes, not months
            </span>
          </motion.h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((step, index) => (
              <motion.div
                key={step.number}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + index * 0.1,
                }}
              >
                {/* Connector line (hidden on mobile) */}
                {index < STEPS.length - 1 && (
                  <div
                    className="hidden md:block absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-px"
                    style={{ backgroundColor: "var(--t-border)" }}
                  />
                )}
                <div className="text-center">
                  <div
                    className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-5 relative z-10"
                    style={{
                      backgroundColor: "var(--t-bg-card)",
                      border: "2px solid var(--t-border)",
                      color: "var(--t-text)",
                    }}
                  >
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-bold" style={{ color: "var(--t-text)" }}>
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--t-text-secondary)" }}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
