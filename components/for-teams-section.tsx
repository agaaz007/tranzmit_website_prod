"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const TEAMS = [
  {
    title: "Growth Teams",
    description: "Understand exactly who's churning and why — then take action before it's too late.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 7l5 5m0 0l-5 5m5-5H6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 12a9 9 0 1118 0 9 9 0 01-18 0z" opacity="0.3" />
      </svg>
    ),
  },
  {
    title: "Customer Success",
    description: "Real-time insight into customer sentiment — no more waiting for quarterly NPS scores.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
        <path d="M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: "Revenue Teams",
    description: "Reduce churn, increase LTV, and build a retention engine that improves itself.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export function ForTeamsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="for-teams" ref={ref} className="py-20 sm:py-28">
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
                Built For
              </span>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
              style={{ color: "var(--t-text)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              For teams that care about
              <br />
              <span className="italic font-medium" style={{ color: "var(--t-text-secondary)" }}>
                what customers actually do
              </span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {TEAMS.map((team, index) => (
              <motion.div
                key={team.title}
                className="rounded-2xl p-7 sm:p-8 text-center transition-all duration-300 hover:shadow-md"
                style={{
                  backgroundColor: "var(--t-bg-card)",
                  border: "1px solid var(--t-border)",
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center mb-5"
                  style={{ backgroundColor: "var(--t-bg-subtle)", color: "var(--t-text)" }}
                >
                  {team.icon}
                </div>
                <h3
                  className="text-lg font-bold"
                  style={{ color: "var(--t-text)" }}
                >
                  {team.title}
                </h3>
                <p
                  className="mt-2.5 text-sm leading-relaxed"
                  style={{ color: "var(--t-text-secondary)" }}
                >
                  {team.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="mt-10 text-center text-base italic"
            style={{ color: "var(--t-text-muted)" }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            If you&apos;re only looking for another analytics dashboard — this is not for you.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
