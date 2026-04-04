"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function VisionSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="py-20 sm:py-28">
      <div className="container mx-auto">
        <motion.div
          className="max-w-4xl mx-auto rounded-3xl p-10 sm:p-14 md:p-20 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Gradient orbs */}
          <div
            className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(16,185,129,0.15), transparent 70%)",
              transform: "translate(30%, -40%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-72 h-72 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(59,130,246,0.1), transparent 70%)",
              transform: "translate(-30%, 40%)",
            }}
          />

          <div className="relative z-10">
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-400">
                Our Vision
              </span>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              The cancel button is{" "}
              <span className="italic font-medium text-white/60">
                the wedge.
              </span>
            </motion.h2>

            <motion.div
              className="mt-8 sm:mt-10 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="text-lg sm:text-xl leading-relaxed text-white/70">
                The real prize is a product layer that knows what&apos;s breaking before your team does, and acts on it. That&apos;s what we&apos;re building.
              </p>

              <div className="space-y-3 pt-4">
                {[
                  "Knows what's breaking before your team does",
                  "Acts on signals automatically — not after a meeting",
                  "Compounds intelligence with every cancellation",
                  "Becomes the product layer between you and churn",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-base sm:text-lg text-white/90">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-xl sm:text-2xl font-semibold text-white pt-4">
                Tranzmit is the wedge into that future.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
