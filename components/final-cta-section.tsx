"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function FinalCtaSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="py-20 sm:py-32">
      <div className="container mx-auto">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
            style={{ color: "var(--t-text)" }}
          >
            Reduce churn. Recover customers.
            <br />
            <span className="italic font-medium" style={{ color: "var(--t-text-secondary)" }}>
              Build with AI.
            </span>
          </h2>

          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://calendly.com/tranzmitai/new-meeting"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 text-base font-semibold rounded-full transition-all hover:shadow-lg"
              style={{
                backgroundColor: "var(--t-btn-bg)",
                color: "var(--t-btn-text)",
              }}
            >
              Request a Demo
            </a>
            <a
              href="https://x.com/agaazsinghal007/status/2019920921285521780?s=20"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 text-base font-medium rounded-full transition-all"
              style={{
                color: "var(--t-text)",
                border: "1px solid var(--t-border)",
              }}
            >
              Watch a 60-sec Example
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
