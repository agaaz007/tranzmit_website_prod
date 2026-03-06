"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function WhyItWorksSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="py-20 sm:py-28">
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
              People leave because they feel ignored.
              <br />
              <span className="italic font-medium" style={{ color: "var(--t-text-secondary)" }}>
                Being heard changes everything.
              </span>
            </motion.h2>
          </div>

          {/* Flow diagram - horizontal */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              {
                step: "Detect",
                title: "Early Signals",
                description: "AI detects risk before dashboards do",
                color: "#3B82F6",
              },
              {
                step: "Understand",
                title: "Real Conversations",
                description: "AI interviews uncover the real why",
                color: "#8B5CF6",
              },
              {
                step: "Retain",
                title: "Revenue Recovered",
                description: "Customers stay because they feel heard",
                color: "#10B981",
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className="relative text-center p-6 sm:p-8 rounded-2xl"
                style={{
                  backgroundColor: "var(--t-bg-card)",
                  border: "1px solid var(--t-border)",
                }}
              >
                {/* Arrow connector */}
                {index < 2 && (
                  <div
                    className="hidden sm:block absolute top-1/2 -right-3 w-6 h-px z-10"
                    style={{ backgroundColor: "var(--t-border-hover)" }}
                  />
                )}
                <div
                  className="w-10 h-10 rounded-full mx-auto flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
                <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: item.color }}>
                  {item.step}
                </p>
                <h3 className="text-lg font-bold" style={{ color: "var(--t-text)" }}>
                  {item.title}
                </h3>
                <p className="mt-2 text-sm" style={{ color: "var(--t-text-secondary)" }}>
                  {item.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
