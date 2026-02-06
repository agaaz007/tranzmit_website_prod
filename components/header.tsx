"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "./theme-toggle"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [mobileMenuOpen])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.05)]'
          : 'bg-transparent'
      }`}
      style={scrolled ? { backgroundColor: "color-mix(in srgb, var(--t-bg) 90%, transparent)" } : undefined}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container mx-auto">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
            <span className="font-bold text-xl sm:text-2xl tracking-tight" style={{ color: "var(--t-text)" }}>
              Tranzmit
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm font-medium transition-colors" style={{ color: "var(--t-text-secondary)" }}>
              How it works
            </a>
            <a href="#impact" className="text-sm font-medium transition-colors" style={{ color: "var(--t-text-secondary)" }}>
              Impact
            </a>
            <a href="#for-teams" className="text-sm font-medium transition-colors" style={{ color: "var(--t-text-secondary)" }}>
              For teams
            </a>
            <ThemeToggle />
            <a
              href="https://calendly.com/tranzmitai/new-meeting"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-sm font-semibold rounded-full transition-colors"
              style={{
                backgroundColor: "var(--t-btn-bg)",
                color: "var(--t-btn-text)",
              }}
            >
              Request a Demo
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" style={{ color: "var(--t-text)" }} />
              ) : (
                <Menu className="w-5 h-5" style={{ color: "var(--t-text)" }} />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 top-16 z-40"
            style={{ backgroundColor: "var(--t-bg)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col items-center pt-12 px-8 space-y-6">
              {[
                { href: "#how-it-works", label: "How it works" },
                { href: "#impact", label: "Impact" },
                { href: "#for-teams", label: "For teams" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-lg font-medium"
                  style={{ color: "var(--t-text)" }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="https://calendly.com/tranzmitai/new-meeting"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-xs text-center px-6 py-3.5 text-base font-semibold rounded-full transition-colors"
                style={{
                  backgroundColor: "var(--t-btn-bg)",
                  color: "var(--t-btn-text)",
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Request a Demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
