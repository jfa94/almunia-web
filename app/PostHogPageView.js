'use client'

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import { usePostHog } from 'posthog-js/react'
import { getCookieConsent } from '@/components/CookieConsent'

function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()
  const [hasConsent, setHasConsent] = useState(false)

  // Check for consent on mount and when localStorage changes
  useEffect(() => {
    // Check initial consent
    const consent = getCookieConsent()
    setHasConsent(consent?.analytics || false)

    // Listen for changes to consent
    const checkConsent = () => {
      const updatedConsent = getCookieConsent()
      setHasConsent(updatedConsent?.analytics || false)
    }

    window.addEventListener('storage', checkConsent)
    return () => window.removeEventListener('storage', checkConsent)
  }, [])

  // Capture page views only if user has consented
  useEffect(() => {
    if (pathname && posthog && hasConsent) {
      // Create URL with search params
      let url = pathname
      const searchParamsString = searchParams.toString()
      if (searchParamsString) url = `${url}?${searchParamsString}`

      posthog.capture('$pageview', { '$current_url': url })
    }
  }, [pathname, searchParams, posthog, hasConsent])

  return null
}

// Wrap this in Suspense to avoid the `useSearchParams` usage above
// from de-opting the whole app into client-side rendering
// See: https://nextjs.org/docs/messages/deopted-into-client-rendering
export default function SuspendedPostHogPageView() {
  return <Suspense fallback={null}>
    <PostHogPageView />
  </Suspense>
}