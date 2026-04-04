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
          className="max-w-4xl mx-auto text-center rounded-3xl p-12 sm:p-16 md:p-20 relative overflow-hidden"
          style={{
            backgroundColor: "var(--t-bg-subtle)",
            border: "1px solid var(--t-border)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Gradient accent */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse, rgba(16,185,129,0.08), transparent 70%)",
            }}
          />

          <div className="relative z-10">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
              style={{ color: "var(--t-text)" }}
            >
              Your cancel button is
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #10B981, #3B82F6)",
                }}
              >
                leaking revenue right now.
              </span>
            </h2>

            <p
              className="mt-6 text-lg max-w-xl mx-auto"
              style={{ color: "var(--t-text-secondary)" }}
            >
              20 minutes. We&apos;ll show you what the first week looks like on your product.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://calendly.com/tranzmitai/new-meeting"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-3.5 text-base font-semibold rounded-full transition-all hover:shadow-lg flex items-center gap-2"
                style={{
                  backgroundColor: "var(--t-btn-bg)",
                  color: "var(--t-btn-text)",
                }}
              >
                Book a Demo
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="mailto:contact@trazmit.com"
                className="px-8 py-3.5 text-base font-medium rounded-full transition-all hover:shadow-sm"
                style={{
                  color: "var(--t-text)",
                  border: "1px solid var(--t-border)",
                }}
              >
                Contact Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
