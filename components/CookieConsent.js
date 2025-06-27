'use client';

import {useState, useEffect} from 'react';
import {Button} from "@/components/ui/button";

export const COOKIE_CONSENT_KEY = 'almunia-cookie-consent'

// Default cookie preferences - analytics and marketing are now true by default
export const defaultConsent = {
    analytics: true,
    marketing: true,
    necessary: true, // Always required
    preferences: true, // Always required
};

export function getCookieConsent() {
    if (typeof window === 'undefined') return null;

    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (savedConsent) {
        try {
            return JSON.parse(savedConsent);
        } catch (e) {
            console.error('Error parsing cookie consent', e);
            return null;
        }
    }
    return null;
}

export function saveCookieConsent(consent) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
        ...consent,
        necessary: true, // Always ensure necessary cookies are enabled
        preferences: true, // Always ensure preferences cookies are enabled
        timestamp: new Date().toISOString(),
    }));
}

export default function CookieConsent({onConsentChange}) {
    const [showBanner, setShowBanner] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [preferences, setPreferences] = useState(defaultConsent);

    useEffect(() => {
        // Check if the user has already given consent
        const savedConsent = getCookieConsent();

        if (!savedConsent) {
            // If no consent found, show the banner
            setShowBanner(true);
        } else {
            // If consent exists, use those settings
            setPreferences(savedConsent);
        }
    }, [onConsentChange]);

    const handleAcceptAll = () => {
        const newPreferences = {
            ...preferences,
            analytics: true,
            marketing: true,
            preferences: true,
        };
        setPreferences(newPreferences);
        saveCookieConsent(newPreferences);
        onConsentChange(newPreferences);
        setShowBanner(false);
        setShowSettings(false);
    };

    const handleRejectAll = () => {
        // Instead of rejecting all, now show settings menu
        setShowSettings(true);
    };

    const toggleSettings = () => {
        setShowSettings(!showSettings);
    };

    const handlePreferenceChange = (key, value) => {
        setPreferences(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSavePreferences = () => {
        saveCookieConsent(preferences);
        onConsentChange(preferences);
        setShowSettings(false);
        setShowBanner(false);
    };

    // if (!showBanner) {
    //     return (
    //         <div className="fixed bottom-4 left-4 z-50">
    //             <Button
    //                 variant="outline"
    //                 size="sm"
    //                 onClick={() => setShowBanner(true)}
    //                 className="text-xs md:text-sm bg-white shadow-md"
    //             >
    //                 Cookie Settings
    //             </Button>
    //         </div>
    //     );
    // }
    //
    return (showBanner && <div className="fixed bottom-0 left-0 right-0 z-50">
            {/* Main cookie banner */}
            <div
                className="bg-white border-t shadow-2xl p-4 md:p-6"
                style={{
                    boxShadow: '0 -10px 25px -5px rgba(0, 0, 0, 0.15), 0 -8px 10px -6px rgba(0, 0, 0, 0.15)'
                }}
            >
                <div className="container mx-auto">
                    {!showSettings ? (
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="text-sm md:text-base flex-1">
                                <p className="font-semibold mb-1 md:mb-2 md:text-lg">Privacy</p>
                                <p className="text-gray-600">
                                    We use cookies to enhance your browsing experience. We will never sell your
                                    data nor show you ads.
                                </p>
                            </div>
                            <div className="flex gap-2 shrink-0 justify-center md:justify-end w-full md:w-auto">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleRejectAll}
                                    className="text-sm md:text-base px-3 py-2 md:px-4 md:py-2.5"
                                >
                                    Customise
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={handleAcceptAll}
                                    className="text-white text-sm md:text-base px-3 py-2 md:px-4 md:py-2.5"
                                >
                                    Accept All
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="flex items-start gap-2">
                                    <input
                                        type="checkbox"
                                        id="necessary"
                                        checked={preferences.necessary}
                                        disabled={true}
                                        className="mt-1"
                                    />
                                    <div>
                                        <label htmlFor="necessary" className="font-medium block">
                                            Necessary Cookies
                                        </label>
                                        <p className="text-xs text-gray-500">
                                            Required for the website to function properly and remember your preferences.
                                            Cannot be disabled.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2">
                                    <input
                                        type="checkbox"
                                        id="analytics"
                                        checked={preferences.analytics}
                                        onChange={(e) => handlePreferenceChange('analytics', e.target.checked)}
                                        className="mt-1"
                                    />
                                    <div>
                                        <label htmlFor="analytics" className="font-medium block">
                                            Analytics Cookies
                                        </label>
                                        <p className="text-xs text-gray-500">
                                            Help us understand how visitors interact with our website. We use PostHog to
                                            capture this data to improve our user experience.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2">
                                    <input
                                        type="checkbox"
                                        id="marketing"
                                        checked={preferences.marketing}
                                        onChange={(e) => handlePreferenceChange('marketing', e.target.checked)}
                                        className="mt-1"
                                    />
                                    <div>
                                        <label htmlFor="marketing" className="font-medium block">
                                            Marketing Cookies
                                        </label>
                                        <p className="text-xs text-gray-500">
                                            We use Google Analytics to track the performance of our marketing campaigns.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center md:justify-end gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={toggleSettings}
                                    className="text-sm md:text-base px-3 py-2 md:px-4 md:py-2.5"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={handleSavePreferences}
                                    className="text-white text-sm md:text-base px-3 py-2 md:px-4 md:py-2.5"
                                >
                                    Save Preferences
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
