"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const METRICS = [
  {
    value: "40%",
    label: "reduction in churn",
    description: "AI-powered conversations recover customers who would have silently left.",
  },
  {
    value: "20x",
    label: "faster than manual research",
    description: "Real-time insights replace months of surveys and analysis cycles.",
  },
  {
    value: "3x",
    label: "more actionable insights",
    description: "Qual + quant in one view means every insight links to a clear action.",
  },
]

export function ImpactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="impact" ref={ref} className="py-20 sm:py-28">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14 sm:mb-20">
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
                Impact
              </span>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
              style={{ color: "var(--t-text)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Results that
              <br />
              <span className="italic font-medium" style={{ color: "var(--t-text-secondary)" }}>
                compound over time
              </span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px rounded-2xl overflow-hidden" style={{ backgroundColor: "var(--t-border)" }}>
            {METRICS.map((metric, index) => (
              <motion.div
                key={metric.label}
                className="p-8 sm:p-10 text-center"
                style={{ backgroundColor: "var(--t-bg-card)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + index * 0.1,
                }}
              >
                <p
                  className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #10B981, #3B82F6)",
                  }}
                >
                  {metric.value}
                </p>
                <p className="mt-2 text-base font-semibold" style={{ color: "var(--t-text)" }}>
                  {metric.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--t-text-secondary)" }}>
                  {metric.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
