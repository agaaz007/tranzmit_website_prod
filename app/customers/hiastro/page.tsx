import { SitePage, Stats, WhatChanged, siteMetadata } from "@/components/site/site-page"

const path = "/customers/hiastro"

export const metadata = siteMetadata({
  path,
  title: "HiAstro case study: 25% uplift in paywall click-through | Tranzmit AI",
  description:
    "HiAstro saw a 25% uplift in paywall click-through rates, measured across more than 400,000 users within two weeks of going live. Its one-rupee trial now shows the exact charge timeline.",
})

export default function HiAstroPage() {
  return (
    <SitePage
      path={path}
      heading="What did Tranzmit change for HiAstro?"
      crumb="HiAstro"
      parent={{ href: "/customers", label: "Customers" }}
      lede="Tranzmit AI's changes for HiAstro included showing the exact charge timeline on its one-rupee trial instead of hiding it, and HiAstro saw a 25% uplift in paywall click-through rates, measured across more than 400,000 users within two weeks of going live."
      related={[
        { href: "/paywalls-for-indian-apps", label: "Paywalls for Indian apps" },
        { href: "/personalized-paywalls", label: "Personalized paywalls" },
        { href: "/customers", label: "All customers" },
      ]}
    >
      <Stats
        items={[
          { value: "25%", label: "uplift in paywall click-through rates" },
          { value: "400K+", label: "users included in the live rollout" },
          { value: "2 weeks", label: "to prove uplift after going live" },
        ]}
      />

      <h2>Who is HiAstro?</h2>
      <p>
        HiAstro is AI astrology for personalized readings and live guidance, with 1M+ users. It is one of Tranzmit's{" "}
        <a href="/paywalls-for-indian-apps">customers in India</a>.
      </p>

      <WhatChanged
        items={[
          "The one-rupee trial now shows the exact charge timeline instead of hiding it.",
          "A renewal reminder was moved above the CTA, where the hesitation happens.",
          "Readings are slotted by the question the user came with, not by a generic offer.",
          "Traffic shifted to the winning variants over two weeks of live rollout.",
        ]}
      />

      <h2>Which paywalls ran?</h2>
      <p>A trial timeline paywall and a personalized marriage-window paywall.</p>
    </SitePage>
  )
}
