"use client"

import { useEffect, useState } from "react"
import { usePostHog } from 'posthog-js/react'
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { UseCasesSection } from "@/components/use-cases-section"
import { PlatformSection } from "@/components/platform-section"
import { ComparisonSection } from "@/components/comparison-section"
import { StreamlinedResearchSection } from "@/components/streamlined-research-section"
import { MoreThanWordsSection } from "@/components/more-than-words-section"
import { StatisticsSection } from "@/components/statistics-section"
import { GetCloserCustomersSection } from "@/components/get-closer-customers-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  const posthog = usePostHog()
  const [scrollMilestones, setScrollMilestones] = useState({ 25: false, 50: false, 75: false, 100: false })

  // Track page view on mount
  useEffect(() => {
    posthog?.capture('page_viewed', {
      page_name: 'landing_page',
      page_path: '/'
    })
  }, [posthog])

  // Track scroll milestones
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
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-16 sm:pt-18 md:pt-20">
        <HeroSection />
        <TestimonialsSection />
        <UseCasesSection />
        <PlatformSection />
        <ComparisonSection />
        <StreamlinedResearchSection />
        <GetCloserCustomersSection />
        {/* <MoreThanWordsSection /> */}
        <StatisticsSection />
      </main>
      <Footer />
    </div>
  )
}
