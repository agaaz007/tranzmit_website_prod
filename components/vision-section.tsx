"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function VisionSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="py-20 sm:py-28">
      <div className="container mx-auto">
        <div
          className="max-w-4xl mx-auto rounded-3xl p-10 sm:p-14 md:p-20"
          style={{
            backgroundColor: "var(--t-bg-card)",
            border: "1px solid var(--t-border)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
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
              Our Vision
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl font-bold leading-tight"
            style={{ color: "var(--t-text)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            The end of{" "}
            <span className="italic font-medium" style={{ color: "var(--t-text-secondary)" }}>
              guessing
            </span>
          </motion.h2>

          <motion.div
            className="mt-8 sm:mt-10 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg sm:text-xl leading-relaxed" style={{ color: "var(--t-text-secondary)" }}>
              Product teams shouldn&apos;t spend months collecting feedback
              or stare at dashboards hoping for answers.
            </p>

            <div className="space-y-3 pt-4">
              {[
                "Robust session analysis surfaces what's broken",
                "AI-led customer interviews reveal why it matters",
                "Qual + quant fuse into a single source of truth",
                "Teams execute on decisions — not data wrangling",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    style={{ color: "var(--t-text)" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <p className="text-lg" style={{ color: "var(--t-text)" }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-lg sm:text-xl leading-relaxed pt-4" style={{ color: "var(--t-text-secondary)" }}>
              In that world, teams create JIRA tasks —
              <br />
              AI creates understanding.
            </p>
            <p className="text-xl sm:text-2xl font-semibold pt-2" style={{ color: "var(--t-text)" }}>
              Tranzmit is the first step toward that future.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
