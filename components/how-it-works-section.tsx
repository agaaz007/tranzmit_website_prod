"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const STEPS = [
  {
    number: "01",
    title: "Deploy on your cancel flow",
    description:
      "Drop in a single script tag. Tranzmit intercepts cancellation attempts and engages users with a personalized AI conversation.",
    visual: (
      <div className="flex items-center gap-2 mt-4">
        <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--t-bg-subtle)" }}>
          <div className="h-full w-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300" />
        </div>
        <span className="text-xs font-medium text-emerald-500">Live</span>
      </div>
    ),
  },
  {
    number: "02",
    title: "AI conducts real interviews",
    description:
      "Natural, empathetic conversations uncover the true reason behind every cancellation — pricing, bugs, missing features, or competitor switches.",
    visual: (
      <div className="flex flex-col gap-1.5 mt-4">
        {["Pricing", "Feature Gap", "Support", "Competitor"].map((reason) => (
          <div key={reason} className="flex items-center gap-2">
            <div
              className="h-2 rounded-full"
              style={{
                width: `${Math.random() * 40 + 30}%`,
                backgroundColor: reason === "Pricing" ? "rgba(139,92,246,0.5)" : "var(--t-border-hover)",
              }}
            />
            <span className="text-[11px]" style={{ color: "var(--t-text-muted)" }}>{reason}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    number: "03",
    title: "Recover in the moment",
    description:
      "AI offers personalized solutions — plan downgrades, feature education, targeted discounts — converting cancellations back to retained customers.",
    visual: (
      <div className="flex items-center gap-3 mt-4">
        <div className="flex -space-x-1.5">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-[8px] font-bold"
              style={{
                borderColor: "var(--t-bg-card)",
                backgroundColor: ["#10B981", "#3B82F6", "#8B5CF6", "#F59E0B"][i],
                color: "white",
              }}
            >
              {["S", "M", "P", "A"][i]}
            </div>
          ))}
        </div>
        <span className="text-xs" style={{ color: "var(--t-text-muted)" }}>4 recovered today</span>
      </div>
    ),
  },
  {
    number: "04",
    title: "Learn and improve",
    description:
      "Every conversation feeds back into your product. See churn patterns, feature requests, and actionable insights — qual + quant unified.",
    visual: (
      <div className="flex items-end gap-1 mt-4 h-8">
        {[25, 40, 35, 55, 45, 65, 50, 70, 60, 80, 75, 90].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: `${h}%`,
              backgroundColor: i >= 8 ? "rgba(16,185,129,0.5)" : "var(--t-border-hover)",
            }}
          />
        ))}
      </div>
    ),
  },
]

export function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="how-it-works" ref={ref} className="py-20 sm:py-28">
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
              How It Works
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
            style={{ color: "var(--t-text)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            From cancel click to
            <br />
            <span className="italic font-medium" style={{ color: "var(--t-text-secondary)" }}>
              customer recovered
            </span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              className="rounded-2xl p-7 sm:p-8 transition-all duration-300 hover:shadow-md"
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
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-xs font-bold tracking-wider"
                  style={{ color: "var(--t-text-muted)" }}
                >
                  STEP {step.number}
                </span>
              </div>
              <h3
                className="text-lg sm:text-xl font-bold"
                style={{ color: "var(--t-text)" }}
              >
                {step.title}
              </h3>
              <p
                className="mt-2.5 text-[15px] leading-relaxed"
                style={{ color: "var(--t-text-secondary)" }}
              >
                {step.description}
              </p>
              {step.visual}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
