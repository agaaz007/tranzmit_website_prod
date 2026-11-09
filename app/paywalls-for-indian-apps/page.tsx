import { SitePage, siteMetadata } from "@/components/site/site-page"

const path = "/paywalls-for-indian-apps"

export const metadata = siteMetadata({
  path,
  title: "Paywalls for Indian subscription apps | Tranzmit AI",
  description:
    "Tranzmit AI paywalls can show rupee pricing and localised offers and run in Indian languages such as Hindi. HiAstro and TATA 1mg are customers.",
})

export default function PaywallsForIndianAppsPage() {
  return (
    <SitePage
      path={path}
      heading="Does Tranzmit work for apps in India?"
      crumb="Paywalls for Indian apps"
      lede="Yes. HiAstro and TATA 1mg are Indian customers of Tranzmit AI, and its paywalls can show rupee pricing and localised offers and run in Indian languages such as Hindi."
      related={[
        { href: "/customers/hiastro", label: "HiAstro case study" },
        { href: "/works-with-your-stack", label: "How Tranzmit works with your stack" },
        { href: "/pricing", label: "Pricing" },
      ]}
    >
      <h2>What happened at HiAstro?</h2>
      <p>
        HiAstro's one-rupee trial now shows the exact charge timeline instead of hiding it. The <a href="/customers/hiastro">case study</a> has the 25% uplift
        in paywall click-through rates and the other changes.
      </p>

      <h2>Who else in India uses it?</h2>
      <p>TATA 1mg, digital healthcare for medicines, lab tests and consultations, is a Tranzmit customer.</p>

      <h2>Does Tranzmit handle UPI or payments?</h2>
      <p>
        No. Tranzmit does not process payments or run UPI mandates. It sits on top of billing tools, so teams keep theirs. What Tranzmit improves is the moment
        users decide whether to pay.
      </p>

      <h2>What about languages and local offers?</h2>
      <p>
        Rupee pricing and localised offers can appear on the paywall, and the paywall itself can run in Indian languages such as Hindi. For how paywalls are
        tested, see <a href="/paywall-ab-testing">paywall A/B testing</a>.
      </p>

      <h2>How do I check whether it fits my app?</h2>
      <p>
        Bring your paywall to a 30-minute review. <a href="/pricing">Pricing</a> is set after that review.
      </p>
    </SitePage>
  )
}
