import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { PostHogProvider } from './providers'


export const metadata: Metadata = {
  title: "Tranzmit - AI interviews reveal what people want, fast.",
  description:
    "Tranzmit finds the right participants, conducts interviews, analyzes responses, and delivers actionable insights — with results in hours, not weeks.",
  generator: "v0.app",
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
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {/* PostHogProvider wraps your entire app UI */}
        <PostHogProvider>
          {children}
          {/* Vercel Analytics works globally too */}
          <Analytics />
        </PostHogProvider>
      </body>
    </html>
  )
}