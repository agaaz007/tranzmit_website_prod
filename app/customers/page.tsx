import { SitePage, siteMetadata } from "@/components/site/site-page"

const path = "/customers"

export const metadata = siteMetadata({
  path,
  title: "Customers | Tranzmit AI",
  description:
    "Tranzmit AI customers include Influish, Jungle AI, HiAstro and TATA 1mg, consumer apps in creator tools, study, astrology and healthcare.",
})

const CUSTOMERS = [
  {
    name: "Influish",
    about: "Creator tools for Instagram Auto-DM and brand collaborations.",
    scale: "3M+ monthly active users",
    result: "+82% paywall click-through rate",
    href: "/customers/influish",
  },
  {
    name: "Jungle AI",
    about: "AI study tool that turns course material into practice questions.",
    scale: "500K+ monthly active users",
    result: "+62% paywall conversion uplift",
    href: "/customers/jungle-ai",
  },
  {
    name: "HiAstro",
    about: "AI astrology for personalized readings and live guidance.",
    scale: "1M+ users",
    result: "25% uplift in paywall click-through rates",
    href: "/customers/hiastro",
  },
  {
    name: "TATA 1mg",
    about: "Digital healthcare for medicines, lab tests and consultations.",
    scale: "12M average monthly active users",
  },
]

export default function CustomersPage() {
  return (
    <SitePage
      path={path}
      heading="Which apps use Tranzmit?"
      crumb="Customers"
      lede="Tranzmit AI's customers include Influish, Jungle AI, HiAstro and TATA 1mg, consumer apps in creator tools, study, astrology and healthcare."
      related={[
        { href: "/paywalls-for-indian-apps", label: "Paywalls for Indian apps" },
        { href: "/paywall-ab-testing", label: "How to A/B test a paywall" },
        { href: "/pricing", label: "Pricing" },
      ]}
    >
      <p>
        Across all of them, Tranzmit improves the moment users decide whether to pay. Influish, Jungle AI and HiAstro each have a case study with the metric and
        what changed.
      </p>
      <div className="site-cards">
        {CUSTOMERS.map((customer) => (
          <section key={customer.name} className="site-card">
            <h2>{customer.name}</h2>
            <p>{customer.about}</p>
            <p className="site-card__scale">{customer.scale}</p>
            {customer.result && (
              <p>
                <strong>{customer.result}</strong>
              </p>
            )}
            {customer.href && (
              <p>
                <a href={customer.href}>Read the {customer.name} case study</a>
              </p>
            )}
          </section>
        ))}
      </div>
      <h2>How can I see this on my own paywall?</h2>
      <p>
        Book a 30-minute paywall review. <a href="/pricing">Pricing</a> is set after it.
      </p>
    </SitePage>
  )
}
