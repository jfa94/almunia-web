'use client';

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect, useState } from 'react'
import { getCookieConsent, COOKIE_CONSENT_KEY } from '@/components/CookieConsent';

export function PostHogProvider({ children }) {
  const [hasAnalyticsConsent, setHasAnalyticsConsent] = useState(false);

  useEffect(() => {
    // Check for existing consent
    const consent = getCookieConsent();

    // Only initialize PostHog if analytics consent is given
    if (consent && consent.analytics) {
      setHasAnalyticsConsent(true);
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: '/ingest',
        capture_pageview: false, // Disable automatic pageview capture, as we capture manually
        capture_pageleave: true,
      });
    }

    // Listen for changes to consent
    const handleStorageChange = (e) => {
      if (e.key === COOKIE_CONSENT_KEY) {
        try {
          const newConsent = JSON.parse(e.newValue);
          if (newConsent && newConsent.analytics !== hasAnalyticsConsent) {
            if (newConsent.analytics) {
              // Initialize PostHog if newly consented
              setHasAnalyticsConsent(true);
              posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
                api_host: '/ingest',
                capture_pageview: false,
                capture_pageleave: true,
              });
            } else if (posthog.loaded()) {
              // Disable PostHog if consent withdrawn
              setHasAnalyticsConsent(false);
              posthog.opt_out_capturing();
            }
          }
        } catch (error) {
          console.error('Error parsing consent data', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [hasAnalyticsConsent]);

  return (
    <PHProvider client={posthog}>
      {children}
    </PHProvider>
  )
}