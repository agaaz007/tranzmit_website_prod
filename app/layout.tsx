import type { ReactNode } from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { PostHogProvider } from './providers'
import { ThemeProvider } from 'next-themes'


export const metadata: Metadata = {
  title: "Tranzmit — Money that's self-improving",
  description:
    "Tranzmit runs hundreds of paywall experiments autonomously every day — synthetic users, ensemble AI judges, auto-deploy. You set the guardrails. We find the winners.",
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
