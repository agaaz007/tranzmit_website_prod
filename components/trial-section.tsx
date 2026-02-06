"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const TRIAL_STEPS = [
  {
    number: "1",
    title: "Connect your data",
    description: "No heavy setup.",
  },
  {
    number: "2",
    title: "Let AI learn patterns",
    description: "It understands normal behavior vs. risk behavior.",
  },
  {
    number: "3",
    title: "Watch conversations that recover users",
    description: "Real engagement, real results.",
  },
]

export function TrialSection() {
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
              Getting Started
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl font-bold leading-tight"
            style={{ color: "var(--t-text)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Start seeing value in{" "}
            <span className="italic font-medium" style={{ color: "var(--t-text-secondary)" }}>
              days — not weeks
            </span>
          </motion.h2>
        </div>

        <div
          className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-px max-w-4xl mx-auto rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "var(--t-border)",
            border: "1px solid var(--t-border)",
          }}
        >
          {TRIAL_STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              className="p-8 sm:p-10"
              style={{ backgroundColor: "var(--t-bg-card)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.1,
              }}
            >
              <span
                className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold"
                style={{
                  backgroundColor: "var(--t-bg-subtle)",
                  color: "var(--t-text)",
                  border: "1px solid var(--t-border)",
                }}
              >
                {step.number}
              </span>
              <h3 className="mt-5 text-xl font-bold" style={{ color: "var(--t-text)" }}>
                {step.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed" style={{ color: "var(--t-text-secondary)" }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
