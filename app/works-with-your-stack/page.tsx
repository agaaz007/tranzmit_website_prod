import { SitePage, siteMetadata } from "@/components/site/site-page"

const path = "/works-with-your-stack"

export const metadata = siteMetadata({
  path,
  title: "How Tranzmit works with your stack | Tranzmit AI",
  description:
    "Tranzmit AI works with RevenueCat, Firebase, Segment, PostHog, Mixpanel, Amplitude and anything else that can send it an event. It sits on top of billing tools.",
})

export default function WorksWithYourStackPage() {
  return (
    <SitePage
      path={path}
      heading="Will Tranzmit work with the tools my app already uses?"
      crumb="Works with your stack"
      lede="Yes. Tranzmit AI works with RevenueCat, Firebase, Segment, PostHog, Mixpanel, Amplitude and anything else that can send it an event."
      related={[
        { href: "/paywall-ab-testing", label: "How to A/B test a paywall" },
        { href: "/paywalls-for-indian-apps", label: "Paywalls for Indian apps" },
        { href: "/pricing", label: "Pricing" },
      ]}
    >
      <h2>Which tools does that cover?</h2>
      <ul>
        <li>
          <strong>PostHog:</strong> capture events and feature usage.
        </li>
        <li>
          <strong>Mixpanel:</strong> understand user journeys and funnels.
        </li>
        <li>
          <strong>Amplitude:</strong> deep behavioral analytics and cohorts.
        </li>
        <li>
          <strong>Segment, Firebase and RevenueCat,</strong> plus anything that can send Tranzmit an event.
        </li>
      </ul>
      <p>Analyze, the first step of the Tranzmit loop, ingests real user signals and product events in real time.</p>

      <h2>What do these tools do themselves?</h2>
      <p>From each vendor's own documentation, read on 10 November 2026:</p>
      <dl className="site-notes">
        <dt>
          <a href="https://www.revenuecat.com/docs/welcome/overview" target="_blank" rel="noopener">
            RevenueCat
          </a>
        </dt>
        <dd>
          A platform for developers who want to focus on building products, not "dealing with the complexities of billing and app stores". Entitlements and
          subscription status, and events and integrations, are among its listed features.
        </dd>
        <dt>
          <a href="https://firebase.google.com/docs/analytics" target="_blank" rel="noopener">
            Firebase
          </a>
        </dt>
        <dd>
          Google Analytics for Firebase is an app measurement solution. Its SDK automatically captures a number of events and user properties and lets you
          define your own custom events.
        </dd>
        <dt>
          <a href="https://posthog.com/docs/product-analytics" target="_blank" rel="noopener">
            PostHog
          </a>
        </dt>
        <dd>Product analytics runs on the events your product sends to PostHog and the persons and properties attached to them.</dd>
      </dl>

      <h2>What does Tranzmit not replace?</h2>
      <p>
        Your billing. Tranzmit sits on top of your billing tools and does not process payments. For UPI, see{" "}
        <a href="/paywalls-for-indian-apps">paywalls for Indian apps</a>. Tranzmit also works with the analytics tools teams already use.
      </p>

      <h2>Do I have to connect anything to get started?</h2>
      <p>Not to see the first result. A 30-minute paywall review needs no integration.</p>
    </SitePage>
  )
}
