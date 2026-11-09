import { SitePage, Stats, WhatChanged, siteMetadata } from "@/components/site/site-page"

const path = "/customers/jungle-ai"

export const metadata = siteMetadata({
  path,
  title: "Jungle AI case study: +62% paywall conversion uplift | Tranzmit AI",
  description:
    "Tranzmit AI replaced Jungle AI's one generic paywall with paywalls for specific cohorts: +62% paywall conversion uplift with 0 app updates or engineering cycles.",
})

export default function JungleAiPage() {
  return (
    <SitePage
      path={path}
      heading="What did Tranzmit change for Jungle AI?"
      crumb="Jungle AI"
      parent={{ href: "/customers", label: "Customers" }}
      lede="Tranzmit AI replaced Jungle AI's one generic paywall with paywalls for specific cohorts and re-anchored the annual plan as the default recommendation, for a +62% paywall conversion uplift with 0 app updates or engineering cycles."
      related={[
        { href: "/ai-generated-paywalls", label: "AI-generated paywall variants" },
        { href: "/paywall-ab-testing", label: "How to A/B test a paywall" },
        { href: "/customers", label: "All customers" },
      ]}
    >
      <Stats
        items={[
          { value: "+62%", label: "paywall conversion uplift" },
          { value: ">80%", label: "revenue increase from the same product" },
          { value: ">$20k", label: "value proven during rollout" },
          { value: "0", label: "app updates or engineering cycles" },
        ]}
      />

      <h2>Who is Jungle AI?</h2>
      <p>Jungle AI is an AI study tool that turns course material into practice questions, with 500K+ monthly active users.</p>

      <WhatChanged
        items={[
          "Annual plan re-anchored as the default recommendation.",
          "Proof strip moved beside the CTA to reduce buyer uncertainty.",
          "Separate paywalls slotted for trial-day-3 and new-user cohorts.",
          "Weekly cohorts kept re-scoring, so the winner kept moving.",
        ]}
      />

      <h2>Which paywalls ran?</h2>
      <ul>
        <li>Original: one generic paywall for everyone.</li>
        <li>Variant 1: clinical-student cohort.</li>
        <li>Variant 2: +$24,000 revenue growth.</li>
      </ul>

      <h2>How much engineering did it take?</h2>
      <p>The case study records 0 app updates or engineering cycles, and more than $20,000 of value proven during the rollout.</p>
    </SitePage>
  )
}
