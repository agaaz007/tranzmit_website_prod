"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow duration-200 ${
        scrolled ? 'shadow-md' : ''
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between min-w-0 w-full">
          {/* Left-aligned logo */}
          <motion.div 
            className="flex items-center min-w-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity min-w-0">
              {/* Transmission/Signal icon */}
              <motion.div 
                className="hidden sm:flex w-8 h-8 bg-blue-600 rounded-lg items-center justify-center flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                  {/* Signal waves */}
                  <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" fill="currentColor"/>
                  <path d="M12 12m-4 0a4 4 0 0 1 8 0a4 4 0 0 1 -8 0" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M12 12m-7 0a7 7 0 0 1 14 0a7 7 0 0 1 -14 0" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M12 12m-10 0a10 10 0 0 1 20 0a10 10 0 0 1 -20 0" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6"/>
                </svg>
              </motion.div>
              <span className="font-bold text-lg sm:text-xl lg:text-2xl text-gray-900 font-sans truncate">TRANZMIT</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div 
            className="hidden lg:flex items-center gap-3 flex-none"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button variant="outline" size="default" className="text-sm font-medium px-4 py-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white" asChild>
                <a href="/sample-report">Sample Report</a>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button size="default" className="text-sm font-medium px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white" asChild>
                <a href="/access-report">Access Report</a>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button size="default" className="text-sm font-medium px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white" asChild>
                <a href="https://calendly.com/tranzmitai/new-meeting" target="_blank" rel="noopener noreferrer">Request Demo</a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-gray-700" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6 text-gray-700" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="lg:hidden fixed inset-0 top-16 bg-white z-40"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col items-center justify-start pt-8 px-6 space-y-4 w-full max-w-sm mx-auto">
              {[
                { href: "/sample-report", label: "Sample Report", variant: "outline" },
                { href: "/access-report", label: "Access Report", variant: "primary" },
                { href: "https://calendly.com/tranzmitai/new-meeting", label: "Request Demo", variant: "primary", external: true }
              ].map((item, index) => (
                <motion.a 
                  key={item.href}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className={`w-full flex items-center justify-center py-4 px-6 text-base font-medium rounded-xl transition-colors text-center ${
                    item.variant === "outline" 
                      ? "text-blue-600 border border-blue-600 hover:bg-blue-50" 
                      : "text-white bg-blue-600 hover:bg-blue-700"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
