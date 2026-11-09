import { SitePage, siteMetadata } from "@/components/site/site-page"

const path = "/pricing"

export const metadata = siteMetadata({
  path,
  title: "Pricing | Tranzmit AI",
  description:
    "Tranzmit AI pricing is set after a free 30-minute paywall review. Bring one paywall and leave with 20 scored variants, projected lift and the reason it wins.",
})

export default function PricingPage() {
  return (
    <SitePage
      path={path}
      heading="How much does Tranzmit cost?"
      crumb="Pricing"
      lede="Tranzmit AI sets pricing after a free 30-minute paywall review, so there is no price list on this page."
      related={[
        { href: "/customers", label: "Customers" },
        { href: "/paywall-ab-testing", label: "How to A/B test a paywall" },
        { href: "/works-with-your-stack", label: "How Tranzmit works with your stack" },
      ]}
    >
      <h2>What does the free review give me?</h2>
      <p>
        Bring one paywall. The review scores 20 variants against your current screen and gives you the projected lift, the confidence band around it, and the
        reason it wins: price, proof, plan or CTA.
      </p>
      <p>No integration is required to see the first result.</p>

      <h2>What does Tranzmit do?</h2>
      <p>
        It runs a continuous loop on your paywalls. Tranzmit reads real user signals and product events, generates variants, scores them with simulation, VLM
        judges and historical conversion data, and ships winners in stages with guardrails on revenue, churn and errors.
      </p>

      <h2>Will Tranzmit take over my billing?</h2>
      <p>
        No. It does not process payments, and it sits on top of the billing tools you already have. <a href="/works-with-your-stack">See how it fits your stack</a>.
      </p>
    </SitePage>
  )
}
