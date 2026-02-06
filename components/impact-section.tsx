"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const BULLETS = [
  "Know exactly who is about to churn — and why",
  "Recover lost customers with insights, not guesswork",
  "Ship the right fix 20x faster with qual + quant in one view",
  "Replace months of research with real-time customer understanding",
  "Improve LTV without growing headcount",
]

export function ImpactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="impact" ref={ref} className="py-20 sm:py-28">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div>
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
                Business Impact
              </span>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl font-bold leading-tight"
              style={{ color: "var(--t-text)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Who to fix.
              <br />
              <span className="italic font-medium" style={{ color: "var(--t-text-secondary)" }}>
                What to build.
              </span>
            </motion.h2>
          </div>

          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {BULLETS.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div
                  className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: "var(--t-text)" }}
                />
                <p className="text-lg sm:text-xl leading-relaxed" style={{ color: "var(--t-text)" }}>
                  {item}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
