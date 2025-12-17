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
