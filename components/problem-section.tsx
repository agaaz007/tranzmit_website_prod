"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function ProblemSection() {
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

          <motion.div
            className="mt-8 sm:mt-12 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg sm:text-xl leading-relaxed" style={{ color: "var(--t-text-secondary)" }}>
              Session analytics tell you <em>what</em> happened.
              <br className="hidden sm:block" />
              Surveys tell you what people <em>say</em> they think.
            </p>
            <div className="space-y-3 text-lg sm:text-xl" style={{ color: "var(--t-text-muted)" }}>
              <p>Neither tells you why customers actually churn.</p>
              <p>Quant without qual is guessing at scale.</p>
              <p>Teams ship fixes to symptoms — not root causes.</p>
            </div>
          </motion.div>

          <motion.div
            className="mt-10 sm:mt-14 pt-8"
            style={{ borderTop: "1px solid var(--t-border)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-xl sm:text-2xl font-semibold" style={{ color: "var(--t-text)" }}>
              You need qual + quant together — in real time, not next quarter.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
