"use client"

import { useEffect, useState } from "react"
import { usePostHog } from 'posthog-js/react'
import { Nav } from "@/components/landing/nav"
import { Hero } from "@/components/landing/hero"
import { LiveDemo } from "@/components/landing/live-demo"
import { ProblemSection } from "@/components/landing/problem-section"
import { HowItWorks } from "@/components/landing/how-it-works"
import { ResultsSection } from "@/components/landing/results-section"
import { MonetizationSection } from "@/components/landing/monetization-section"
import { FinalCta } from "@/components/landing/final-cta"
import { LandingFooter } from "@/components/landing/landing-footer"

export default function HomePage() {
  const posthog = usePostHog()
  const [scrollMilestones, setScrollMilestones] = useState({ 25: false, 50: false, 75: false, 100: false })

  useEffect(() => {
    posthog?.capture('page_viewed', {
      page_name: 'landing_page',
      page_path: '/'
    })
  }, [posthog])

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollableHeight = documentHeight - windowHeight
      const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0

      const milestones = [25, 50, 75, 100] as const
      milestones.forEach(milestone => {
        if (progress >= milestone && !scrollMilestones[milestone]) {
          posthog?.capture('landing_scroll_milestone', {
            milestone_percent: milestone
          })
          setScrollMilestones(prev => ({ ...prev, [milestone]: true }))
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [posthog, scrollMilestones])

  return (
    <div className="overflow-x-hidden" style={{ background: "var(--tz-bg)", color: "var(--tz-ink)", lineHeight: 1.6 }}>
      <Nav />
      <main>
        <Hero />
        <LiveDemo />
        <ProblemSection />
        <HowItWorks />
        <ResultsSection />
        <MonetizationSection />
        <FinalCta />
      </main>
      <LandingFooter />
    </div>
  )
}
