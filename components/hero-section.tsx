"use client"

import { motion } from "framer-motion"

function DashboardMockup() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        backgroundColor: "var(--t-bg-card)",
        border: "1px solid var(--t-border)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-5 py-3"
        style={{ borderBottom: "1px solid var(--t-border)" }}
      >
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
        </div>
        <div
          className="ml-3 text-xs font-medium"
          style={{ color: "var(--t-text-muted)" }}
        >
          Tranzmit Dashboard
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {/* Top stats row */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-5">
          {[
            { label: "At-Risk Users", value: "142", trend: "-23%", good: true },
            { label: "Recovered", value: "89", trend: "+31%", good: true },
            { label: "Churn Rate", value: "4.2%", trend: "-1.8%", good: true },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-3 sm:p-4"
              style={{ backgroundColor: "var(--t-bg-subtle)" }}
            >
              <p
                className="text-[10px] sm:text-xs font-medium"
                style={{ color: "var(--t-text-muted)" }}
              >
                {stat.label}
              </p>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span
                  className="text-lg sm:text-2xl font-bold"
                  style={{ color: "var(--t-text)" }}
                >
                  {stat.value}
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-emerald-500">
                  {stat.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Two column layout: Session + Interview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Session Analysis Panel */}
          <div
            className="rounded-xl p-4"
            style={{ border: "1px solid var(--t-border)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span
                className="text-xs font-semibold"
                style={{ color: "var(--t-text)" }}
              >
                Session Analysis
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 font-medium ml-auto">
                QUANT
              </span>
            </div>
            {/* Mini session timeline */}
            <div className="space-y-2">
              {[
                { page: "/pricing", time: "2m 14s", flag: true },
                { page: "/settings", time: "0m 08s", flag: false },
                { page: "/cancel", time: "1m 42s", flag: true },
              ].map((s) => (
                <div
                  key={s.page}
                  className="flex items-center justify-between text-[10px] sm:text-xs py-1.5 px-2 rounded-lg"
                  style={{ backgroundColor: s.flag ? "rgba(239,68,68,0.06)" : "var(--t-bg-subtle)" }}
                >
                  <span
                    className="font-mono"
                    style={{ color: "var(--t-text-secondary)" }}
                  >
                    {s.page}
                  </span>
                  <div className="flex items-center gap-2">
                    <span style={{ color: "var(--t-text-muted)" }}>
                      {s.time}
                    </span>
                    {s.flag && (
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Mini bar chart */}
            <div className="flex items-end gap-1 mt-3 h-10">
              {[40, 65, 30, 80, 55, 20, 70, 45, 15, 60, 35, 75].map(
                (h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm transition-all"
                    style={{
                      height: `${h}%`,
                      backgroundColor:
                        h < 30
                          ? "rgba(239,68,68,0.5)"
                          : "rgba(59,130,246,0.3)",
                    }}
                  />
                )
              )}
            </div>
          </div>

          {/* Interview Panel */}
          <div
            className="rounded-xl p-4"
            style={{ border: "1px solid var(--t-border)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
              <span
                className="text-xs font-semibold"
                style={{ color: "var(--t-text)" }}
              >
                AI Interview
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/10 text-violet-500 font-medium ml-auto">
                QUAL
              </span>
            </div>
            {/* Chat bubbles */}
            <div className="space-y-2">
              <div
                className="text-[10px] sm:text-xs px-3 py-2 rounded-xl rounded-bl-sm max-w-[85%]"
                style={{
                  backgroundColor: "var(--t-bg-subtle)",
                  color: "var(--t-text-secondary)",
                }}
              >
                What made you consider cancelling?
              </div>
              <div
                className="text-[10px] sm:text-xs px-3 py-2 rounded-xl rounded-br-sm max-w-[85%] ml-auto"
                style={{
                  backgroundColor: "rgba(139,92,246,0.1)",
                  color: "var(--t-text)",
                }}
              >
                The pricing tier jumped too fast. I only need 2 features.
              </div>
              <div
                className="text-[10px] sm:text-xs px-3 py-2 rounded-xl rounded-bl-sm max-w-[85%]"
                style={{
                  backgroundColor: "var(--t-bg-subtle)",
                  color: "var(--t-text-secondary)",
                }}
              >
                Which 2 features do you use most?
              </div>
              <div
                className="text-[10px] sm:text-xs px-3 py-2 rounded-xl rounded-br-sm max-w-[85%] ml-auto"
                style={{
                  backgroundColor: "rgba(139,92,246,0.1)",
                  color: "var(--t-text)",
                }}
              >
                Reports and the alert system. Everything else I never open.
              </div>
            </div>
            {/* Insight tag */}
            <div
              className="mt-3 flex items-center gap-1.5 text-[10px] sm:text-xs px-2.5 py-1.5 rounded-lg"
              style={{ backgroundColor: "rgba(16,185,129,0.08)" }}
            >
              <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span className="font-semibold text-emerald-600">Insight:</span>
              <span style={{ color: "var(--t-text-secondary)" }}>
                Pricing misaligned with usage pattern
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="relative pt-32 sm:pt-40 pb-10 sm:pb-14">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold leading-[1.1] tracking-tight"
            style={{ color: "var(--t-text)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            AI to reduce churn
            <br />
            and recover{" "}
            <span className="italic font-medium" style={{ color: "var(--t-text-secondary)" }}>
              lost customers
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 sm:mt-8 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: "var(--t-text-secondary)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            Combine qualitative interviews with quantitative session data to
            find out{" "}
            <strong style={{ color: "var(--t-text)" }}>who to fix</strong> and{" "}
            <strong style={{ color: "var(--t-text)" }}>what to build</strong> — 20x faster.
          </motion.p>

          <motion.div
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
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
          </motion.div>
        </div>

        {/* Product mockup */}
        <motion.div
          className="mt-14 sm:mt-20 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <DashboardMockup />
        </motion.div>
      </div>
    </section>
  )
}
