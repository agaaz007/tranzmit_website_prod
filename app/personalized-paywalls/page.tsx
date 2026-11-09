import { SitePage, siteMetadata } from "@/components/site/site-page"

const path = "/personalized-paywalls"

export const metadata = siteMetadata({
  path,
  title: "Personalized paywalls for different users | Tranzmit AI",
  description:
    "Tranzmit AI generates and ranks paywalls by audience, behavior, offer, price, proof and layout, then tests the strongest candidates on live traffic.",
})

export default function PersonalizedPaywallsPage() {
  return (
    <SitePage
      path={path}
      heading="How do I show different paywalls to different users?"
      crumb="Personalized paywalls"
      lede="Tranzmit AI generates and ranks paywalls by audience, behavior, offer, price, proof and layout, then sends the strongest candidates to live traffic, so the paid moment fits the user."
      related={[
        { href: "/ai-generated-paywalls", label: "AI-generated paywall variants" },
        { href: "/paywalls-for-indian-apps", label: "Paywalls for Indian apps" },
        { href: "/customers/influish", label: "Influish case study" },
      ]}
    >
      <h2>What does Tranzmit look at?</h2>
      <p>
        Real user signals and product events, read in real time. Tranzmit groups them as behavioral signals, intent and value, source and device, and user
        segments.
      </p>

      <h2>What has this looked like for customers?</h2>
      <ul>
        <li>
          <a href="/customers/influish">Influish</a>: a DM-automation variant slotted for engagement-focused creators.
        </li>
        <li>
          <a href="/customers/jungle-ai">Jungle AI</a>: separate paywalls slotted for trial-day-3 and new-user cohorts.
        </li>
        <li>
          <a href="/customers/hiastro">HiAstro</a>: readings slotted by the question the user came with, not by a generic offer.
        </li>
      </ul>

      <h2>How are personalized paywalls tested safely?</h2>
      <p>
        Tranzmit tests them on a staged rollout with guardrails and auto-rollback. <a href="/change-paywall-without-app-release">The app release page</a> has
        the traffic steps and what the guardrails watch.
      </p>

      <h2>Does the targeting improve?</h2>
      <p>Live results feed the next round. Winners get sharper, and cohorts get more specific.</p>
    </SitePage>
  )
}
