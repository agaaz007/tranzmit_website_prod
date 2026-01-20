"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"

// Value propositions that rotate
const VALUE_PROPS = [
  {
    title: "Reduce Churn",
    subtitle: "Identify at-risk customers before they leave",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: "#2F82AC"
  },
  {
    title: "Unlock Growth",
    subtitle: "Find expansion opportunities in your ICP",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    color: "#7FB3E7"
  },
  {
    title: "Product Insights",
    subtitle: "Qualitative feedback that drives decisions",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: "#113177"
  }
]

const MARQUEE_MESSAGES = [
  "AI-led customer interviews that drive Growth",
  "Reduce churn with real feedback — not guesses",
  "Accelerate product and GTM decisions with AI-driven evidence",
  "Uncover growth opportunities in your ICP"
]

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98])

  // Rotate through value props
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % VALUE_PROPS.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (  
    <section ref={containerRef} className="relative overflow-hidden bg-background py-8 sm:py-12 md:py-16 lg:py-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-[30%] -right-[15%] w-[60vw] h-[60vw] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(127, 179, 231, 0.3) 0%, rgba(127, 179, 231, 0) 70%)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(47, 130, 172, 0.3) 0%, rgba(47, 130, 172, 0) 70%)",
          }}
          animate={{
            scale: [1.1, 1, 1.1],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-6xl text-center">
          {/* Animated headline */}
          <motion.h1 
            className="text-5xl sm:text-[41px] md:text-[41px] lg:text-[41px] xl:text-[51px] 2xl:text-[70px] font-bold tracking-tight leading-[1.1] max-w-6xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span 
              className="bg-gradient-to-r from-[#7FB3E7] to-[#050849] bg-clip-text text-transparent inline-block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              AI Chief Growth Officer
            </motion.span>
            <br />
            <motion.span 
              className="bg-gradient-to-r from-[#2F82AC] to-[#050849] bg-clip-text text-transparent inline-block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              for Modern Consumer Brands
            </motion.span>
          </motion.h1>

          {/* Animated Value Proposition Cards */}
          <motion.div 
            className="mt-8 sm:mt-10 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="relative h-20 sm:h-24 w-full max-w-lg overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div 
                    className="flex items-center gap-4 px-6 py-4 rounded-2xl border-2 bg-white/80 backdrop-blur-sm shadow-lg"
                    style={{ borderColor: VALUE_PROPS[activeIndex].color }}
                  >
                    <div 
                      className="p-3 rounded-xl"
                      style={{ backgroundColor: `${VALUE_PROPS[activeIndex].color}15`, color: VALUE_PROPS[activeIndex].color }}
                    >
                      {VALUE_PROPS[activeIndex].icon}
                    </div>
                    <div className="text-left">
                      <div 
                        className="font-bold text-lg sm:text-xl"
                        style={{ color: VALUE_PROPS[activeIndex].color }}
                      >
                        {VALUE_PROPS[activeIndex].title}
                      </div>
                      <div className="text-sm sm:text-base text-gray-600">
                        {VALUE_PROPS[activeIndex].subtitle}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Progress indicators */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
                {VALUE_PROPS.map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-1.5 rounded-full cursor-pointer"
                    style={{ 
                      width: i === activeIndex ? 24 : 8,
                      backgroundColor: i === activeIndex ? VALUE_PROPS[i].color : '#E5E7EB'
                    }}
                    onClick={() => setActiveIndex(i)}
                    whileHover={{ scale: 1.2 }}
                    animate={{ width: i === activeIndex ? 24 : 8 }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Marquee */}
          <motion.div 
            className="mx-auto mt-8 sm:mt-10 w-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <style>{`
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-marquee {
                animation: marquee 40s linear infinite;
              }
              .animate-marquee:hover {
                animation-play-state: paused;
              }
              @media (max-width: 640px) {
                .animate-marquee {
                  animation: marquee 30s linear infinite;
                }
              }
            `}</style>
            <div className="relative flex overflow-x-hidden group">
              <div className="animate-marquee whitespace-nowrap flex items-center">
                {[...MARQUEE_MESSAGES, ...MARQUEE_MESSAGES, ...MARQUEE_MESSAGES].map((msg, i) => (
                  <div key={i} className="flex items-center">
                    <span className="mx-4 sm:mx-6 md:mx-8 text-lg sm:text-[18px] md:text-[23px] lg:text-[28px] xl:text-[37px] font-semibold italic text-[#113177]">
                      {msg}
                    </span>
                    <span className="text-[#6B8CC7] text-base sm:text-[15px] md:text-[18px]">•</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Subheadline */}
          <motion.p 
            className="mx-auto mt-6 sm:mt-8 max-w-5xl text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed sm:leading-7 text-muted-foreground font-light px-2 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Tranzmit deploys swarms of AI interviewers that find the right participants,
            conducts interviews, analyzes responses, and delivers actionable insights to
            product and marketing teams in hours, not months.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                size="lg" 
                className="w-full max-w-[280px] sm:w-auto px-6 sm:px-10 py-2.5 sm:py-6 text-sm sm:text-base font-semibold rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/25" 
                asChild
              >
                <a href="https://calendly.com/tranzmitai/new-meeting" target="_blank" rel="noopener noreferrer">
                  Request Demo
                  <motion.span 
                    className="ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                  >
                    →
                  </motion.span>
                </a>
              </Button>
            </motion.div>
           
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full max-w-[280px] sm:w-auto px-6 sm:px-10 py-2.5 sm:py-6 text-sm sm:text-base font-semibold rounded-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white" 
                asChild
              >
                <a href="/sample-report">View Sample Report</a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Product Demo */}
          <motion.div 
            className="mt-8 sm:mt-16 md:mt-20 px-4 sm:px-0"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: imageY, scale: imageScale }}
          >
            <div className="relative mx-auto max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-5xl">
              {/* Glow effect */}
              <motion.div 
                className="absolute -inset-4 sm:-inset-8 bg-gradient-to-r from-[#7FB3E7]/20 via-[#2F82AC]/20 to-[#050849]/20 rounded-3xl blur-3xl"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Product demo container */}
              <motion.div 
                className="relative shadow-lg sm:shadow-2xl"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  {/* Black border overlay */}
                  <div className="absolute inset-0 border-t-[6px] sm:border-t-8 md:border-t-12 border-l-[6px] sm:border-l-8 md:border-l-12 border-r-[6px] sm:border-r-8 md:border-r-12 border-black rounded-t-lg z-10 pointer-events-none"></div>
                  
                  {/* Image container */}
                  <div className="aspect-video rounded-t-lg overflow-hidden bg-white">
                    <Image
                      src="/product_demo2.png"
                      alt="Tranzmit Product Demo"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
                
                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Section divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent mt-4"></div>
    </section>
  )
}
