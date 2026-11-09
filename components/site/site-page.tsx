import type { Metadata } from "next"
import type { ReactNode } from "react"
import "./site.css"

const SITE_URL = "https://tranzmitai.com"
const CALENDLY_URL = "https://calendly.com/tranzmitai/new-meeting"
const MANROPE_URL = "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
const OG_IMAGE = { url: "/assets/og-card.png", width: 1200, height: 630, alt: "Tranzmit AI: self-improving interfaces" }

type SiteLink = { href: string; label: string }

const NAV_LINKS: SiteLink[] = [
  { href: "/#how", label: "How it works" },
  { href: "/#system", label: "Platform" },
  { href: "/customers", label: "Customers" },
  { href: "/#case-study", label: "Results" },
]

const FOOTER_COLUMNS: { title: string; links: SiteLink[] }[] = [
  {
    title: "Product",
    links: [
      { href: "/#how", label: "How it works" },
      { href: "/#system", label: "Platform" },
      { href: "/works-with-your-stack", label: "Works with your stack" },
      { href: "/pricing", label: "Pricing" },
      { href: CALENDLY_URL, label: "Book a demo" },
    ],
  },
  {
    title: "Guides",
    links: [
      { href: "/paywall-ab-testing", label: "Paywall A/B testing" },
      { href: "/change-paywall-without-app-release", label: "No app release" },
      { href: "/ai-generated-paywalls", label: "AI-generated paywalls" },
      { href: "/personalized-paywalls", label: "Personalized paywalls" },
      { href: "/app-store-google-play-page-tests", label: "Store page tests" },
      { href: "/paywalls-for-indian-apps", label: "Paywalls for Indian apps" },
    ],
  },
  {
    title: "Evidence",
    links: [
      { href: "/customers/influish", label: "Influish" },
      { href: "/customers/jungle-ai", label: "Jungle AI" },
      { href: "/customers/hiastro", label: "HiAstro" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/customers", label: "Customers" },
      { href: "mailto:agaaz@tranzmitai.com", label: "Contact" },
      { href: "https://www.linkedin.com/in/agaaz-singhal/", label: "LinkedIn" },
    ],
  },
]

export function siteMetadata({ path, title, description }: { path: string; title: string; description: string }): Metadata {
  const url = `${SITE_URL}${path}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, siteName: "Tranzmit AI", locale: "en_US", title, description, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", site: "@agaazsinghal007", title, description, images: [OG_IMAGE] },
  }
}

function externalProps(href: string) {
  return href.startsWith("https://") ? { target: "_blank", rel: "noopener" } : {}
}

// Plain anchors on purpose: "/" is a rewrite to a static file, so it can't be a client-side navigation.
function SiteAnchor({ href, label, className }: SiteLink & { className?: string }) {
  return (
    <a href={href} className={className} {...externalProps(href)}>
      {label}
    </a>
  )
}

function BookReview({ variant, children }: { variant: "accent" | "ghost"; children: ReactNode }) {
  return (
    <a href={CALENDLY_URL} target="_blank" rel="noopener" className={`site-btn site-btn--${variant}`}>
      {children}
    </a>
  )
}

function Header() {
  return (
    <header className="site-nav">
      <div className="site-nav__inner">
        <a href="/" className="site-brand">
          Tranzmit AI
        </a>
        <nav className="site-nav__links" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => (
            <SiteAnchor key={link.href} {...link} className="site-nav__link" />
          ))}
        </nav>
        <BookReview variant="accent">
          Book Demo <span aria-hidden="true">→</span>
        </BookReview>
      </div>
    </header>
  )
}

function CtaBand() {
  return (
    <section className="site-cta" aria-label="Book a paywall review">
      <div className="site-wrap site-cta__grid">
        <div>
          <h2>
            Stop guessing.
            <br />
            Start <span>compounding.</span>
          </h2>
          <p>Bring the paywall you are least sure about. We will show you a better one before the call ends.</p>
          <div className="site-cta__btns">
            <BookReview variant="accent">
              Book a paywall review <span aria-hidden="true">→</span>
            </BookReview>
            <a href="/#case-study" className="site-btn site-btn--ghost">
              See live results
            </a>
          </div>
        </div>
        <div>
          <div className="site-cta__head">You bring one paywall. You leave with:</div>
          <ul className="site-cta__list">
            <li>
              <b>01</b>
              <span>
                <strong>20 scored variants</strong> against your current screen
              </span>
            </li>
            <li>
              <b>02</b>
              <span>
                The <strong>projected lift</strong>, and the confidence band around it
              </span>
            </li>
            <li>
              <b>03</b>
              <span>
                The <strong>reason it wins</strong>: price, proof, plan, or CTA
              </span>
            </li>
          </ul>
          <p className="site-cta__note">30 minutes. No integration required to see the first result.</p>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-foot">
      <div className="site-wrap">
        <div className="site-foot__top">
          <div className="site-foot__brand">
            <a href="/" className="site-brand">
              Tranzmit AI
            </a>
            <p>The AI platform for paywalls and store pages that improve together.</p>
          </div>
          <nav className="site-foot__cols" aria-label="Footer">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <h4>{column.title}</h4>
                {column.links.map((link) => (
                  <SiteAnchor key={link.href} {...link} />
                ))}
              </div>
            ))}
          </nav>
        </div>
        <small className="site-foot__legal">© 2026 Tranzmit Technologies - Delaware C Corp</small>
      </div>
    </footer>
  )
}

/** Headline figures of a case study, using the home page's labels. */
export function Stats({ items }: { items: { value: string; label: string }[] }) {
  return (
    <dl className="site-stats">
      {items.map((item) => (
        <div key={item.label}>
          <dd>{item.value}</dd>
          <dt>{item.label}</dt>
        </div>
      ))}
    </dl>
  )
}

export function WhatChanged({ items }: { items: string[] }) {
  return (
    <section className="site-changed">
      <h2>What changed</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}

type SitePageProps = {
  path: string
  /** The question the page answers; rendered as the page's only h1. */
  heading: string
  /** The answer, placed directly under the heading. */
  lede: ReactNode
  /** Short name of this page in the breadcrumb. */
  crumb: string
  /** A breadcrumb level between home and this page. */
  parent?: SiteLink
  related: SiteLink[]
  children?: ReactNode
}

export function SitePage({ path, heading, lede, crumb, parent, related, children }: SitePageProps) {
  const trail: SiteLink[] = [{ href: "/", label: "Home" }, ...(parent ? [parent] : []), { href: path, label: crumb }]
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        url: `${SITE_URL}${path}`,
        name: heading,
        isPartOf: { "@type": "WebSite", url: `${SITE_URL}/`, name: "Tranzmit AI" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: trail.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          item: `${SITE_URL}${item.href}`,
        })),
      },
    ],
  }

  return (
    <div className="site-page">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href={MANROPE_URL} precedence="default" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Header />
      <main className="site-main">
        <article className="site-article">
          <nav className="site-crumbs" aria-label="Breadcrumb">
            <ol>
              {trail.map((item, index) => (
                <li key={item.href}>{index === trail.length - 1 ? <span aria-current="page">{item.label}</span> : <a href={item.href}>{item.label}</a>}</li>
              ))}
            </ol>
          </nav>
          <h1>{heading}</h1>
          <p className="site-lede">{lede}</p>
          {children}
          <nav className="site-related" aria-label="Related pages">
            <h2>Related</h2>
            <ul>
              {related.map((link) => (
                <li key={link.href}>
                  <SiteAnchor {...link} />
                </li>
              ))}
              <li>
                <a href="/">Back to home</a>
              </li>
            </ul>
          </nav>
        </article>
      </main>
      <CtaBand />
      <Footer />
    </div>
  )
}
