import { SitePage, siteMetadata } from "@/components/site/site-page"

const path = "/ai-generated-paywalls"

export const metadata = siteMetadata({
  path,
  title: "AI-generated paywall variants | Tranzmit AI",
  description:
    "Tranzmit AI generates paywall variants across offers, layouts and copy, then scores each one with simulation, VLM judges and historical conversion data.",
})

export default function AiGeneratedPaywallsPage() {
  return (
    <SitePage
      path={path}
      heading="Can AI generate paywall variants for my app?"
      crumb="AI-generated paywalls"
      lede="Yes. Tranzmit AI generates multiple paywall variants across offers, layouts and copy, then scores them so the strongest candidates reach live traffic."
      related={[
        { href: "/paywall-ab-testing", label: "How to A/B test a paywall" },
        { href: "/personalized-paywalls", label: "Personalized paywalls" },
        { href: "/customers/jungle-ai", label: "Jungle AI case study" },
      ]}
    >
      <h2>How are the variants scored?</h2>
      <p>Three signals, each answering a different question:</p>
      <ul>
        <li>
          <strong>Simulation</strong> gives the projected uplift.
        </li>
        <li>
          <strong>VLM judges</strong> assess quality and clarity.
        </li>
        <li>
          <strong>Historical conversion data</strong> supplies the empirical signal.
        </li>
      </ul>
      <p>
        Tranzmit has indexed 20,000+ real paywalls across categories and geographies into a conversion map, structured so the system can tell which
        layouts, prices and proofs move which cohorts.
      </p>

      <h2>What did the variants look like for customers?</h2>
      <p>
        <a href="/customers/influish">Influish</a> started from one feature list for everyone. One variant led with DM automation for engagement-focused
        creators, and another led with follower proof and creator testimonials.
      </p>
      <p>
        <a href="/customers/jungle-ai">Jungle AI</a> started from one generic paywall for everyone. Its variants included one for the clinical-student cohort,
        and separate paywalls were slotted for trial-day-3 and new-user cohorts.
      </p>

      <h2>What happens to the winner?</h2>
      <p>
        Tranzmit ships it automatically, in stages, with auto-rollback behind it. Results from that rollout feed the next round of variants, and weekly
        cohorts at Jungle AI kept re-scoring, so the winner kept moving.
      </p>
    </SitePage>
  )
}
