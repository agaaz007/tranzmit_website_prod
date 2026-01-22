"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Card } from "@/components/ui/card"

const USE_CASES = [
  {
    icon: (
      <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Reduce Churn by Understanding Why Users Leave",
    outcome: "Keep more customers",
    description: "Tranzmit AI talks to churned or inactive users, surfaces their reasons in structured insights, so teams can fix the top drivers of churn.",
    promise: "Reduce cancelations by up to 40% within 30 days.",
    bgColor: "bg-red-100",
    iconColor: "text-red-500",
    accentColor: "#EF4444"
  },
  {
    icon: (
      <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: "Recover Lost Users with Targeted Follow-Up Insights",
    outcome: "Win back revenue",
    description: "Automatically interview recent drop-offs and generate insight-driven re-engagement strategies.",
    promise: "Recover previously lost users with personalized campaigns.",
    bgColor: "bg-amber-100",
    iconColor: "text-amber-600",
    accentColor: "#D97706"
  },
  {
    icon: (
      <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Eliminate Onboarding Drop-Offs",
    outcome: "Increase activation & retention",
    description: "Diagnose why users fail to activate within the critical first week — directly via voice feedback — and iterate flows based on real reasons.",
    promise: "Higher Day-7 and Day-30 retention.",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    accentColor: "#2563EB"
  },
  {
    icon: (
      <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Improve Feature Adoption with Real User Feedback",
    outcome: "More value realized → fewer cancellations",
    description: "Flag features users aren't using and collect qualitative barriers automatically.",
    promise: "Increase meaningful usage of key features.",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
    accentColor: "#9333EA"
  },
  {
    icon: (
      <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: "Reduce Support Load with Automated User Q&A",
    outcome: "Lower support costs",
    description: "Use insights from Tranzmit conversations to proactively answer top user questions before they become tickets.",
    promise: "Cut support volume and response time.",
    bgColor: "bg-teal-100",
    iconColor: "text-teal-600",
    accentColor: "#0D9488"
  },
  {
    icon: (
      <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    title: "Hyper-Targeted Creative Iteration",
    outcome: "Better retention messaging",
    description: "Turn voice feedback into messaging themes that improve onboarding flows, UX copy, and in-product nudges tailored to real user concerns.",
    promise: "Messaging that actually resonates.",
    bgColor: "bg-pink-100",
    iconColor: "text-pink-600",
    accentColor: "#DB2777"
  }
]

export function UseCasesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div 
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div 
            className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 border border-gray-300 rounded-full text-xs sm:text-sm font-medium text-gray-700 mb-4 sm:mb-6"
            whileHover={{ scale: 1.05, borderColor: "#2F82AC" }}
          >
            USE CASES
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-3 sm:mb-4 leading-tight">
            See Tranzmit in action
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-2 sm:px-0">
            From reducing churn to improving feature adoption, our AI agents deliver actionable insights.
          </p>
        </motion.div>

        {/* Use case cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-7xl mx-auto">
          {USE_CASES.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: 0.1 + index * 0.08,
                ease: [0.22, 1, 0.36, 1]
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden p-5 sm:p-6 bg-white min-h-[280px] sm:min-h-[320px] border border-gray-200 relative flex flex-col">
                  {/* Animated highlight */}
                  <motion.div 
                    className="absolute inset-0 opacity-0"
                    style={{
                      background: `linear-gradient(135deg, ${useCase.accentColor}08 0%, transparent 60%)`
                    }}
                    animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Top row: Icon + Outcome badge */}
                  <div className="relative flex items-start justify-between mb-4">
                    <motion.div 
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${useCase.bgColor} flex items-center justify-center`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <span className={useCase.iconColor}>{useCase.icon}</span>
                    </motion.div>
                    
                    <motion.span 
                      className="text-xs font-semibold px-3 py-1.5 rounded-full"
                      style={{ 
                        backgroundColor: `${useCase.accentColor}15`,
                        color: useCase.accentColor
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {useCase.outcome}
                    </motion.span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="relative text-lg sm:text-xl font-bold text-foreground mb-3 leading-snug">
                    {useCase.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="relative text-muted-foreground text-sm sm:text-base leading-relaxed mb-4 flex-grow">
                    {useCase.description}
                  </p>
                  
                  {/* Promise */}
                  <div className="relative mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 flex-shrink-0" style={{ color: useCase.accentColor }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">
                        {useCase.promise}
                      </span>
                    </div>
                  </div>
                  
                  {/* Hover arrow */}
                  <motion.div 
                    className="absolute bottom-5 right-5"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: hoveredIndex === index ? 1 : 0,
                      x: hoveredIndex === index ? 0 : -10
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${useCase.accentColor}15` }}
                    >
                      <svg className="w-4 h-4" style={{ color: useCase.accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </motion.div>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
