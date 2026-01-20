"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Card } from "@/components/ui/card"

const USE_CASES = [
  {
    icon: (
      <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Concept Testing",
    description: "Qualitative and quantitative feedback on new concepts and ideas.",
    bgColor: "bg-pink-100",
    iconColor: "text-pink-500"
  },
  {
    icon: (
      <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    title: "Product Test",
    description: "Understand how people react and what they think about your product.",
    bgColor: "bg-teal-100",
    iconColor: "text-teal-500"
  },
  {
    icon: (
      <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: "Foundational Research",
    description: "Discover new opportunities through open-ended conversations.",
    bgColor: "bg-cyan-100",
    iconColor: "text-cyan-500"
  },
  {
    icon: (
      <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Brand Perception",
    description: "Understand how customers and prospects view your brand.",
    bgColor: "bg-rose-100",
    iconColor: "text-rose-400"
  },
  {
    icon: (
      <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    title: "Creative Testing",
    description: "Test ads and get real-time feedback from your target audience.",
    bgColor: "bg-orange-100",
    iconColor: "text-orange-500"
  },
  {
    icon: (
      <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: "Usability Testing",
    description: "Watch how people use your product and identify pain points.",
    bgColor: "bg-emerald-100",
    iconColor: "text-emerald-500"
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
            USE CASES ARE INFINITE
          </motion.div>
          <h2 className="text-4xl lg:text-5xl font-semibold italic tracking-tight text-foreground mb-3 sm:mb-4 leading-tight">
            See Tranzmit in action
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-muted-foreground max-w-2xl mx-auto px-2 sm:px-0">
            From validating new ideas to in-depth user interviews, our AI agents handle
            the heavy lifting.
          </p>
        </motion.div>

        {/* Use case cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6 max-w-6xl mx-auto">
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
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden p-3 sm:p-5 md:p-6 bg-white min-h-[130px] sm:min-h-[170px] border border-gray-200 relative">
                  {/* Animated highlight */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0"
                    animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Icon */}
                  <motion.div 
                    className={`relative w-9 h-9 sm:w-11 sm:h-11 rounded-lg ${useCase.bgColor} flex items-center justify-center mb-2 sm:mb-4`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <span className={useCase.iconColor}>{useCase.icon}</span>
                  </motion.div>
                  
                  <h3 className="relative text-sm sm:text-xl lg:text-2xl font-semibold text-foreground mb-1 sm:mb-2 leading-snug">
                    {useCase.title}
                  </h3>
                  <p className="relative text-muted-foreground text-xs sm:text-base md:text-lg leading-relaxed">
                    {useCase.description}
                  </p>
                  
                  {/* Hover arrow */}
                  <motion.div 
                    className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: hoveredIndex === index ? 1 : 0,
                      x: hoveredIndex === index ? 0 : -10
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
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
