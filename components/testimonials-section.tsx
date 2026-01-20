"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: "In-Depth Qualitative Interviews",
    description: "7-60 minute conversations that uncover the why behind customer behavior"
  },
  {
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
    title: "Voice & Facial Analysis",
    description: "SOTA intent detection models analyze voice biomarkers and expressions"
  },
  {
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Expert Probing Techniques",
    description: "Trained on research best practices to deeply explore every objective"
  }
]

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div 
          className="text-center mb-6 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Decorative element */}
          <motion.div 
            className="flex items-center justify-center gap-3 mb-4 sm:mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.div 
              className="h-px bg-gradient-to-r from-transparent via-gray-300 to-gray-400 w-16 sm:w-20 md:w-24"
              initial={{ width: 0 }}
              animate={isInView ? { width: "6rem" } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
            <motion.div 
              className="w-2 h-2 rounded-full bg-[#2F82AC]"
              animate={isInView ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div 
              className="h-px bg-gradient-to-l from-transparent via-gray-300 to-gray-400 w-16 sm:w-20 md:w-24"
              initial={{ width: 0 }}
              animate={isInView ? { width: "6rem" } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
          </motion.div>
          
          <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground px-2 leading-tight">
            Kantar and Nielsen grade AI-interviewers
          </h2>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 lg:gap-12 max-w-7xl mx-auto">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#050849] p-4 sm:p-8 md:p-10 min-h-[170px] sm:min-h-[350px] md:min-h-[400px] flex flex-col shadow-lg sm:shadow-xl text-center sm:text-left ${
                index === 2 ? 'col-span-2 sm:col-span-1 max-w-[420px] mx-auto sm:max-w-none' : ''
              }`}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.7, 
                delay: 0.2 + index * 0.15,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {/* Animated gradient background */}
              <motion.div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(circle at 50% 0%, rgba(127, 179, 231, 0.15) 0%, transparent 50%)"
                }}
                animate={{
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
              />
              
              {/* Top pill/badge */}
              <motion.div 
                className="w-14 sm:w-24 md:w-28 h-5 sm:h-7 bg-white/20 rounded-full mb-2 sm:mb-6 mx-auto sm:mx-0"
                initial={{ width: 0 }}
                animate={isInView ? { width: "auto" } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              />
              
              {/* Icon */}
              <motion.div 
                className="hidden sm:flex w-12 h-12 rounded-xl bg-white/10 items-center justify-center mb-4 text-white/80"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
              >
                {feature.icon}
              </motion.div>
              
              {/* Content */}
              <div className="mt-1 sm:mt-4 md:mt-6 flex-1 flex flex-col justify-center sm:block">
                <h3 className="text-base sm:text-2xl lg:text-3xl font-semibold text-white mb-1 sm:mb-4 leading-snug">
                  {feature.title}
                </h3>
                <p className="text-white/70 text-xs sm:text-lg md:text-xl leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
