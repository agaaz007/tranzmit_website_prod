"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const CONVERSATIONS = [
  {
    scenario: "Subscription Cancellation",
    messages: [
      { role: "ai", text: "Hi Sarah! I noticed you're considering cancelling. Before you go — can I ask what's not working?" },
      { role: "user", text: "The pricing jumped from $29 to $79. I only use reports and alerts." },
      { role: "ai", text: "That makes sense. What if I could offer a custom plan at $35/mo with just reports and alerts?" },
      { role: "user", text: "Wait, really? That would be perfect actually." },
    ],
    insight: "Pricing misaligned with usage — recovered with custom plan",
    tag: "RECOVERED",
  },
  {
    scenario: "Feature Frustration",
    messages: [
      { role: "ai", text: "Hey Marcus! I see you've been spending time on the exports page. Running into any issues?" },
      { role: "user", text: "Yeah, exporting to CSV takes forever and crashes half the time." },
      { role: "ai", text: "I'm sorry about that. Our team is shipping a fix next week. Can I notify you when it's live?" },
      { role: "user", text: "Sure, that would be great. I'll hold off on switching then." },
    ],
    insight: "Export bug causing churn — escalated to engineering",
    tag: "RETAINED",
  },
  {
    scenario: "Competitor Switch",
    messages: [
      { role: "ai", text: "Hi Priya! Looks like you haven't logged in for 2 weeks. Is everything okay with your experience?" },
      { role: "user", text: "Honestly, I found another tool that has better integrations with Slack." },
      { role: "ai", text: "We actually just launched Slack integration last week! Want me to walk you through it?" },
      { role: "user", text: "Oh I didn't know that! Yes please." },
    ],
    insight: "Feature awareness gap — resolved with education",
    tag: "RECOVERED",
  },
]

function ConversationDemo() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [visibleMessages, setVisibleMessages] = useState(0)

  useEffect(() => {
    setVisibleMessages(0)
    const conversation = CONVERSATIONS[activeIdx]
    const timers: NodeJS.Timeout[] = []

    conversation.messages.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleMessages(i + 1), 800 + i * 1200))
    })

    const nextTimer = setTimeout(() => {
      setActiveIdx((prev) => (prev + 1) % CONVERSATIONS.length)
    }, 800 + conversation.messages.length * 1200 + 2000)
    timers.push(nextTimer)

    return () => timers.forEach(clearTimeout)
  }, [activeIdx])

  const conversation = CONVERSATIONS[activeIdx]

  return (
    <div
      className="rounded-2xl overflow-hidden w-full max-w-lg"
      style={{
        backgroundColor: "var(--t-bg-card)",
        border: "1px solid var(--t-border)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.02)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3.5"
        style={{ borderBottom: "1px solid var(--t-border)" }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold" style={{ color: "var(--t-text)" }}>
            Tranzmit AI
          </span>
        </div>
        <span
          className="text-[10px] font-medium px-2 py-0.5 rounded-full"
          style={{ backgroundColor: "var(--t-bg-subtle)", color: "var(--t-text-muted)" }}
        >
          {conversation.scenario}
        </span>
      </div>

      {/* Messages */}
      <div className="p-5 space-y-3 min-h-[220px]">
        {conversation.messages.slice(0, visibleMessages).map((msg, i) => (
          <motion.div
            key={`${activeIdx}-${i}`}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className={`text-[13px] leading-relaxed px-4 py-2.5 max-w-[85%] ${
                msg.role === "user"
                  ? "rounded-2xl rounded-br-md"
                  : "rounded-2xl rounded-bl-md"
              }`}
              style={{
                backgroundColor:
                  msg.role === "user"
                    ? "var(--t-bg-subtle)"
                    : "rgba(16,185,129,0.08)",
                color: "var(--t-text)",
              }}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Insight footer */}
      {visibleMessages >= conversation.messages.length && (
        <motion.div
          className="px-5 pb-4"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-[12px]"
            style={{ backgroundColor: "rgba(16,185,129,0.06)" }}
          >
            <svg className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span className="text-emerald-600 font-semibold">{conversation.tag}</span>
            <span className="mx-1" style={{ color: "var(--t-border)" }}>|</span>
            <span style={{ color: "var(--t-text-secondary)" }}>{conversation.insight}</span>
          </div>
        </motion.div>
      )}

      {/* Dots indicator */}
      <div className="flex justify-center gap-1.5 pb-4">
        {CONVERSATIONS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i === activeIdx ? "var(--t-text)" : "var(--t-border)",
              transform: i === activeIdx ? "scale(1.3)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </div>
  )
}

function StatsBar() {
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-8 sm:gap-14 mt-16 sm:mt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      {[
        { value: "40%", label: "of at-risk users retained" },
        { value: "<5min", label: "to deploy" },
        { value: "Zero", label: "eng lift" },
      ].map((stat) => (
        <div key={stat.label} className="text-center">
          <p className="text-3xl sm:text-4xl font-bold" style={{ color: "var(--t-text)" }}>
            {stat.value}
          </p>
          <p className="text-sm mt-1" style={{ color: "var(--t-text-muted)" }}>
            {stat.label}
          </p>
        </div>
      ))}
    </motion.div>
  )
}

export function HeroSection() {
  return (
    <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 overflow-hidden">
      {/* Subtle gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(16,185,129,0.06), transparent)",
        }}
      />

      <div className="container mx-auto relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium"
              style={{
                backgroundColor: "var(--t-bg-subtle)",
                color: "var(--t-text-secondary)",
                border: "1px solid var(--t-border)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              AI-Native Cancel Flow
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
            style={{ color: "var(--t-text)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            The cancel button is the most valuable real estate
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #10B981, #3B82F6, #8B5CF6)",
              }}
            >
              in your product.
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 sm:mt-8 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: "var(--t-text-secondary)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Tranzmit turns the cancellation moment into a retention engine. Real-time. Automatic. Self-improving.
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
              href="https://x.com/agaazsinghal007/status/2019920921285521780?s=20"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 text-base font-medium rounded-full transition-all hover:shadow-sm flex items-center gap-2"
              style={{
                color: "var(--t-text)",
                border: "1px solid var(--t-border)",
              }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch it Work
            </a>
          </motion.div>
        </div>

        {/* Interactive conversation demo */}
        <motion.div
          className="mt-16 sm:mt-24 flex justify-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <ConversationDemo />
        </motion.div>

        <StatsBar />
      </div>
    </section>
  )
}
