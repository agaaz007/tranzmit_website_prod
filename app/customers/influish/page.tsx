import { SitePage, Stats, WhatChanged, siteMetadata } from "@/components/site/site-page"

const path = "/customers/influish"

export const metadata = siteMetadata({
  path,
  title: "Influish case study: +82% paywall click-through rate | Tranzmit AI",
  description:
    "Tranzmit AI replaced Influish's static feature list with benefit-led paywalls: +82% paywall click-through rate and +49% subscription conversion.",
})

export default function InfluishPage() {
  return (
    <SitePage
      path={path}
      heading="What did Tranzmit change for Influish?"
      crumb="Influish"
      parent={{ href: "/customers", label: "Customers" }}
      lede="Tranzmit AI replaced Influish's static feature list with benefit-led paywalls, for +82% paywall click-through rate, +49% subscription conversion and 1.5x topline revenue, with 0 app updates or engineering cycles."
      related={[
        { href: "/personalized-paywalls", label: "Personalized paywalls" },
        { href: "/change-paywall-without-app-release", label: "Changing a paywall without an app release" },
        { href: "/customers", label: "All customers" },
      ]}
    >
      <Stats
        items={[
          { value: "+82%", label: "paywall click-through rate" },
          { value: "+49%", label: "subscription conversion" },
          { value: "1.5x", label: "topline revenue" },
          { value: "0", label: "app updates or engineering cycles" },
        ]}
      />

      <h2>Who is Influish?</h2>
      <p>Influish makes creator tools for Instagram Auto-DM and brand collaborations, and has 3M+ monthly active users.</p>

      <WhatChanged
        items={[
          "Static feature list replaced with benefit-led paywalls.",
          "DM-automation variant slotted for engagement-focused creators.",
          "Growth variant leads with follower proof and creator testimonials.",
          "Traffic shifted to the winning variants and the weaker ones were phased out.",
        ]}
      />

      <h2>Which paywalls ran?</h2>
      <ul>
        <li>Original: one feature list for everyone.</li>
        <li>Variant 1: DM automation, 2x CTA clicks.</li>
        <li>Variant 2: growth, 1.5x topline revenue.</li>
      </ul>

      <h2>Did Influish need an app release?</h2>
      <p>No. It ran with 0 app updates or engineering cycles.</p>
    </SitePage>
  )
}
