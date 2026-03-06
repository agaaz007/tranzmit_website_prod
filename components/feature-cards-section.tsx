"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const FEATURES = [
  {
    title: "Understand every churn",
    description:
      "AI interviews users at the moment of cancellation — surfacing the real reasons behind every lost customer.",
    gradient: "linear-gradient(135deg, #0F766E 0%, #10B981 50%, #34D399 100%)",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="12" r="6" stroke="white" strokeWidth="2" />
        <path d="M8 26c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M22 10l2-2m0 0l2 2m-2-2v4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      </svg>
    ),
  },
  {
    title: "Recover in real time",
    description:
      "Personalized offers, objection handling, and smart routing — all powered by AI that understands context.",
    gradient: "linear-gradient(135deg, #1E40AF 0%, #3B82F6 50%, #60A5FA 100%)",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4v8l6 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="16" cy="16" r="12" stroke="white" strokeWidth="2" />
        <path d="M4 16h2m20 0h2M16 4v2m0 20v2" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
  },
  {
    title: "Insights that drive action",
    description:
      "Qual meets quant in one dashboard. See who's churning, why, and exactly what to build next.",
    gradient: "linear-gradient(135deg, #7C3AED 0%, #A855F7 50%, #C084FC 100%)",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="4" width="24" height="24" rx="4" stroke="white" strokeWidth="2" />
        <path d="M10 20l4-6 4 3 4-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="22" cy="10" r="2" fill="white" opacity="0.5" />
      </svg>
    ),
  },
]

export function FeatureCardsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="py-20 sm:py-28">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-20">
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
              Platform
            </span>
          </motion.div>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
            style={{ color: "var(--t-text)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Everything you need to
            <br />
            <span className="italic font-medium" style={{ color: "var(--t-text-secondary)" }}>
              turn churn into growth
            </span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative rounded-2xl p-8 sm:p-9 overflow-hidden cursor-default"
              style={{ background: feature.gradient, minHeight: "320px" }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Subtle noise overlay for depth */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                  {feature.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/80 flex-1">
                  {feature.description}
                </p>
                <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-white/90 group-hover:text-white transition-colors">
                  Learn more
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
