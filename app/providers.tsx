'use client'

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { StatsigClient } from '@statsig/js-client'
import { StatsigSessionReplayPlugin } from '@statsig/session-replay'
import { StatsigAutoCapturePlugin } from '@statsig/web-analytics'

const statsigClient = new StatsigClient(
  "client-IrkiW6zBjWf2TjOhItTC5gLR3Moo4KTJkK8RCU9WBJU",
  { userID: "anonymous" },
  {
    plugins: [
      new StatsigSessionReplayPlugin(),
      new StatsigAutoCapturePlugin(),
    ],
  }
)

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      capture_pageview: false,
    })
  }, [])

  useEffect(() => {
    statsigClient.initializeAsync()
  }, [])

  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    return <>{children}</>
  }

  return (
    <PHProvider client={posthog}>
      {children}
    </PHProvider>
  )
}
