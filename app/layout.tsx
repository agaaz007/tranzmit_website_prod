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


export const metadata: Metadata = {
  title: "Tranzmit | Find the paywall that makes more users pay",
  description:
    "Tranzmit screens paywall variants safely, shows the winner, and explains why buyers choose it.",
  icons: {
    icon: "/logo_16x16.png",
    shortcut: "/logo_16x16.png",
    apple: "/logo_16x16.png",
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
