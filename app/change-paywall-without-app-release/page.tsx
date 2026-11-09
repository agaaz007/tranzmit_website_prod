import { SitePage, siteMetadata } from "@/components/site/site-page"

const path = "/change-paywall-without-app-release"

export const metadata = siteMetadata({
  path,
  title: "Change a paywall without an app release | Tranzmit AI",
  description:
    "Tranzmit AI changes paywalls with no app release and no engineering sprint. Influish and Jungle AI each ran with 0 app updates or engineering cycles.",
})

export default function ChangePaywallWithoutAppReleasePage() {
  return (
    <SitePage
      path={path}
      heading="Can I change my paywall without an app release?"
      crumb="No app release"
      lede="Yes. Tranzmit AI changes paywalls with no app release and no engineering sprint."
      related={[
        { href: "/paywall-ab-testing", label: "How to A/B test a paywall" },
        { href: "/customers/influish", label: "Influish case study" },
        { href: "/customers/jungle-ai", label: "Jungle AI case study" },
      ]}
    >
      <p>
        <a href="/customers/influish">Influish</a> and <a href="/customers/jungle-ai">Jungle AI</a> each ran with 0 app updates or engineering cycles.
        Tranzmit's paywalls run on iOS and Android.
      </p>

      <h2>What changed without a release?</h2>
      <ul>
        <li>
          At Influish, a static feature list was replaced with benefit-led paywalls. Influish saw +82% paywall click-through rate and +49%
          subscription conversion.
        </li>
        <li>
          At Jungle AI, the annual plan was re-anchored as the default recommendation, and a proof strip moved beside the CTA to reduce buyer uncertainty.
          Jungle AI saw a +62% paywall conversion uplift.
        </li>
      </ul>

      <h2>What can I vary?</h2>
      <p>
        Offers, layouts and copy. Paywalls are generated and ranked by audience, behavior, offer, price, proof and layout, and the strongest candidates go
        to live traffic.
      </p>

      <h2>What stops a bad change from reaching everyone?</h2>
      <p>
        A winning variant reaches 25% of traffic first, then 50%, then 100%. Guardrails watch revenue, churn and errors, and a breach triggers an automatic
        rollback.
      </p>

      <h2>Do I have to integrate before I see anything?</h2>
      <p>No. The first result needs no integration: it comes out of a 30-minute paywall review of a screen you bring.</p>
    </SitePage>
  )
}
