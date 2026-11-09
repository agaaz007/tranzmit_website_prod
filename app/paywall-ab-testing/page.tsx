import { SitePage, siteMetadata } from "@/components/site/site-page"

const path = "/paywall-ab-testing"

export const metadata = siteMetadata({
  path,
  title: "How to A/B test a paywall | Tranzmit AI",
  description:
    "Tranzmit AI generates paywall variants, scores them with simulation, VLM judges and conversion history, and ships winners with guardrails and auto-rollback.",
})

export default function PaywallAbTestingPage() {
  return (
    <SitePage
      path={path}
      heading="How do I A/B test my paywall?"
      crumb="Paywall A/B testing"
      lede="Test variants against your current screen on live traffic and roll the winner out in stages, which is the loop Tranzmit AI runs for paywalls on iOS and Android."
      related={[
        { href: "/ai-generated-paywalls", label: "Can AI generate paywall variants?" },
        { href: "/change-paywall-without-app-release", label: "Changing a paywall without an app release" },
        { href: "/customers", label: "Customers" },
      ]}
    >
      <p>
        Doing this by hand is slow. A manual test runs about $2,500 per experiment across engineering, design and analytics. It takes two to six weeks
        to trust one result, it changes one variable at a time, and nothing carries over to the next test.
      </p>

      <h2>What does the loop do?</h2>
      <ol>
        <li>
          <strong>Analyze.</strong> Tranzmit ingests real user signals and product events in real time: behavioral signals, intent and value, source and
          device, and user segments.
        </li>
        <li>
          <strong>Generate.</strong> It creates multiple paywall variants across offers, layouts and copy.
        </li>
        <li>
          <strong>Score.</strong> It evaluates them with simulation for projected uplift, VLM judges for quality and clarity, and historical conversion
          data as the empirical signal.
        </li>
        <li>
          <strong>Ship.</strong> The winner ramps to 25%, then 50%, then 100% of traffic, with guardrails on revenue, churn and errors and auto-rollback
          if a guardrail is breached.
        </li>
      </ol>
      <p>Live results feed the next round.</p>

      <h2>How many tests does that run?</h2>
      <p>Tranzmit runs 200+ experiments per week, where a human team runs 3 to 4 per month.</p>

      <h2>What have teams seen?</h2>
      <ul>
        <li>
          <a href="/customers/influish">Influish</a>: +82% paywall click-through rate and +49% subscription conversion.
        </li>
        <li>
          <a href="/customers/jungle-ai">Jungle AI</a>: +62% paywall conversion uplift.
        </li>
        <li>
          <a href="/customers/hiastro">HiAstro</a>: 25% uplift in paywall click-through rates, measured across more than 400,000 users within two weeks of
          going live.
        </li>
      </ul>
    </SitePage>
  )
}
