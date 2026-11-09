import { SitePage, siteMetadata } from "@/components/site/site-page"

const path = "/app-store-google-play-page-tests"

export const metadata = siteMetadata({
  path,
  title: "App Store and Google Play page tests | Tranzmit AI",
  description:
    "Tranzmit AI turns each campaign into a tailored App Store or Google Play page, so every user sees the right value proposition before they download.",
})

export default function AppStoreGooglePlayPageTestsPage() {
  return (
    <SitePage
      path={path}
      heading="Can I test App Store and Google Play pages for each campaign?"
      crumb="Store page tests"
      lede="Yes. Tranzmit AI turns each campaign into a tailored App Store or Google Play page, so every user sees the right value proposition before they download."
      related={[
        { href: "/paywall-ab-testing", label: "How to A/B test a paywall" },
        { href: "/personalized-paywalls", label: "Personalized paywalls" },
        { href: "/customers", label: "Customers" },
      ]}
    >
      <p>Tranzmit calls these intent-matched acquisition pages. The point is to match intent before the install.</p>

      <h2>How does this connect to my paywalls?</h2>
      <p>
        Tranzmit is one platform for paywalls and store pages that improve together. It builds, tests and evolves both using behavioral data, simulation beds
        and safe live rollout, so the page that earns the install and the paywall that earns the payment sit in one system.
      </p>

      <h2>Do I need an app release to change a store page?</h2>
      <p>
        No app release and no engineering sprint is how Tranzmit describes its work on paywalls and App Store pages. The{" "}
        <a href="/change-paywall-without-app-release">app release page</a> covers what that has meant for paywall customers.
      </p>

      <h2>Do you have a store-page result to show?</h2>
      <p>
        Not on this site. The case studies published here, for <a href="/customers/influish">Influish</a>, <a href="/customers/jungle-ai">Jungle AI</a> and{" "}
        <a href="/customers/hiastro">HiAstro</a>, measure paywalls.
      </p>
    </SitePage>
  )
}
