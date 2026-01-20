"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

function AnimatedCounter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [displayValue, setDisplayValue] = useState(0)
  
  useEffect(() => {
    if (!isInView) return
    
    const duration = 2000
    const startTime = Date.now()
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.round(easeOut * value))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [isInView, value])

  return (
    <span ref={ref}>
      {prefix}{displayValue}{suffix}
    </span>
  )
}

const STATS = [
  {
    value: 3,
    suffix: "x",
    prefix: "",
    label: "Longer Responses",
    description: "Customer responses more than three times longer than average."
  },
  {
    value: 24,
    suffix: "h",
    prefix: "<",
    label: "Time to Insights",
    description: "Results in hours, not days"
  },
  {
    value: 500,
    suffix: "K+",
    prefix: "",
    label: "Potential Respondents",
    description: "Thousands of possible respondents"
  }
]

export function StatisticsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div 
          className="text-center mb-8 sm:mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center justify-center px-4 py-1.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 mb-6"
            whileHover={{ scale: 1.05, borderColor: "#2F82AC" }}
          >
            BY THE NUMBERS
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="w-full h-px bg-gray-300 mb-8 sm:mb-12 md:mb-16"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        
        <div className="grid grid-cols-3 sm:flex sm:flex-row justify-between items-stretch gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {STATS.map((stat, index) => (
            <motion.div 
              key={stat.label}
              className={`flex-1 ${
                index === 0 ? 'text-center sm:text-left' : 
                index === 1 ? 'text-center' : 
                'text-center sm:text-right'
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
            >
              <motion.div 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4"
                whileHover={{ scale: 1.05, color: "#113177" }}
                transition={{ duration: 0.2 }}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </motion.div>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-900 leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
