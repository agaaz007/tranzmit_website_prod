"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const TEAMS = [
  "Growth teams focused on retention",
  "Customer success teams seeking real-time insight",
  "Revenue teams aiming to reduce churn and increase LTV",
]

export function ForTeamsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="for-teams" ref={ref} className="py-20 sm:py-28">
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
              Who This Is For
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl font-bold leading-tight"
            style={{ color: "var(--t-text)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            For teams that care about what customers{" "}
            <span className="italic font-medium" style={{ color: "var(--t-text-secondary)" }}>
              actually do
            </span>
          </motion.h2>

          <motion.div
            className="mt-10 sm:mt-14 space-y-5"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {TEAMS.map((team, i) => (
              <div key={i} className="flex items-start gap-4">
                <div
                  className="mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: "var(--t-text)" }}
                />
                <p className="text-lg sm:text-xl leading-relaxed" style={{ color: "var(--t-text)" }}>
                  {team}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="mt-10 sm:mt-14 pt-8"
            style={{ borderTop: "1px solid var(--t-border)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-base sm:text-lg italic" style={{ color: "var(--t-text-muted)" }}>
              If you&apos;re only looking for another analytics dashboard — this
              is not for you.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
