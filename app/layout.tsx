import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { PostHogProvider } from './providers'
import { ThemeProvider } from 'next-themes'


export const metadata: Metadata = {
  title: "Tranzmit - AI to reduce churn and recover lost customers",
  description:
    "Automatically detect at-risk users, reduce churn, and recover lost customers — before it's too late.",
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
