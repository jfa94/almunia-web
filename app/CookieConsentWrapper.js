'use client';

import {useState, useEffect} from 'react';
import CookieConsent from '@/components/CookieConsent';

export default function CookieConsentWrapper() {
    const [consentLoaded, setConsentLoaded] = useState(false);

    // Handle consent changes
    const handleConsentChange = (consentSettings) => {
        // This is where we could dispatch events or actions based on consent changes
        // For now, we just log the consent settings for debugging
        console.log('Consent settings updated:', consentSettings);

        // Additional app-wide actions could be taken here based on consent settings
    };

    // We need to defer rendering until after hydration
    useEffect(() => {
        setConsentLoaded(true);
    }, []);

    if (!consentLoaded) {
        return null;
    }

    return <CookieConsent onConsentChange={handleConsentChange}/>;
}
