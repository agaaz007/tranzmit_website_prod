import type { ReactNode } from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import Script from "next/script"
import "./globals.css"
import { PostHogProvider } from './providers'
import { ThemeProvider } from 'next-themes'

const siteDescription =
  "Tranzmit AI builds self-improving interfaces that increase conversion for consumer platforms — starting with monetization: paywalls and App Store pages that help consumer companies automatically improve conversion and revenue."

export const metadata: Metadata = {
  metadataBase: new URL("https://tranzmitai.com"),
  title: "Tranzmit AI — Self-improving interfaces",
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "gh-Q7aJTaV7oy9bRKZvVER3WV0sadHFxNLMV9cK-xM4",
  },
  openGraph: {
    type: "website",
    url: "https://tranzmitai.com/",
    siteName: "Tranzmit AI",
    locale: "en_US",
    title: "Tranzmit AI — Self-improving interfaces",
    description: siteDescription,
    images: [
      {
        url: "/assets/og-card.png",
        width: 1200,
        height: 630,
        alt: "Tranzmit AI — self-improving interfaces",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@agaazsinghal007",
    title: "Tranzmit AI — Self-improving interfaces",
    description: siteDescription,
    images: [
      {
        url: "/assets/og-card.png",
        alt: "Tranzmit AI — self-improving interfaces",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://cdn.jsdelivr.net/npm/@statsig/js-client@3/build/statsig-js-client+session-replay+web-analytics.min.js?apikey=client-IrkiW6zBjWf2TjOhItTC5gLR3Moo4KTJkK8RCU9WBJU"
          strategy="afterInteractive"
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <PostHogProvider>
            {children}
            <Analytics />
          </PostHogProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
