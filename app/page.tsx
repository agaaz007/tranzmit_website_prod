"use client"

import { useEffect, useState } from "react"
import { usePostHog } from 'posthog-js/react'
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { LogoMarquee } from "@/components/logo-marquee"
import { ProblemSection } from "@/components/problem-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { ImpactSection } from "@/components/impact-section"
import { WhyItWorksSection } from "@/components/why-it-works-section"
import { VisionSection } from "@/components/vision-section"
import { ForTeamsSection } from "@/components/for-teams-section"
import { TrialSection } from "@/components/trial-section"
import { FinalCtaSection } from "@/components/final-cta-section"
import { Footer } from "@/components/footer"

function Divider() {
  return (
    <div className="max-w-3xl mx-auto px-5">
      <div className="h-px" style={{ backgroundColor: "var(--t-border)" }} />
    </div>
  )
}

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
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <LogoMarquee />
        <Divider />
        <ProblemSection />
        <Divider />
        <HowItWorksSection />
        <Divider />
        <ImpactSection />
        <Divider />
        <WhyItWorksSection />
        <VisionSection />
        <ForTeamsSection />
        <Divider />
        <TrialSection />
        <Divider />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  )
}
