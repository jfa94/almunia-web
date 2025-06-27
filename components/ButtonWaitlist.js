'use client';

import {useFormStatus} from "react-dom";
import {useSearchParams} from "next/navigation"
import {sendGAEvent} from '@next/third-parties/google'
import posthog from "posthog-js"
import { getCookieConsent } from './CookieConsent';
import { useEffect, useState } from 'react';

export default function ButtonWaitlist(props) {
    const {pending} = useFormStatus()
    const searchParams = useSearchParams()
    const [consentSettings, setConsentSettings] = useState(null);

    // Check for consent on mount and when localStorage changes
    useEffect(() => {
        // Check initial consent
        const consent = getCookieConsent();
        setConsentSettings(consent);

        // Listen for changes to consent
        const handleStorageChange = () => {
            const updatedConsent = getCookieConsent();
            setConsentSettings(updatedConsent);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleClick = () => {
        // Only track if user has consented to marketing cookies
        if (consentSettings?.marketing) {
            sendGAEvent('event', 'conversion', {
                send_to: 'AW-17081447837/WxmzCK3Py8oaEJ3riNE_',
                transaction_id: Date.now().toString()
            });
        }

        // Only track if user has consented to analytics cookies
        if (consentSettings?.analytics && posthog.loaded()) {
            posthog.capture("waitlist_signup_click");
        }
    }


    return <button className="btn btn-primary btn-block mt-6 plausible-event-name=WaitingList"
                   type="submit"
                   disabled={pending}
                   onClick={handleClick}
    >
        {searchParams.get('success') ? 'Success!' : props.children}
    </button>
}