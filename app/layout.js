import {Inter} from "next/font/google";
import PlausibleProvider from "next-plausible";
import {getSEOTags} from "@/lib/seo";
import config from "@/config";
import "./globals.css";
import {SessionProvider} from "@/lib/session";
import {cookies} from "next/headers";

const font = Inter({subsets: ["latin"]});

export const viewport = {
    // Will use the primary color of your theme to show a nice theme color in the URL bar of supported browsers
    themeColor: "#fffbeb",
    width: "device-width",
    initialScale: 1,
};

// This adds default SEO tags to all pages in our app.
// You can override them in each page passing params to getSOTags() function.
export const metadata = getSEOTags();

export default function RootLayout({children}) {
    const cookieStore = cookies()
    const identityToken = cookieStore.get('idToken')?.value || null

    return (
        <html lang="en" data-theme={config.colors.theme} className={font.className}>
        {config.domainName && (
            <head>
                <PlausibleProvider domain={config.domainName}
                                   customDomain={`https://analytics.${config.domainName}`}
                                   selfHosted={true}
                />
            </head>
        )}
        <body>
        {/* ClientLayout contains all the client wrappers (Crisp chat support, toast messages, tooltips, etc.) */}
        <SessionProvider identityToken={identityToken}>
            {children}
        </SessionProvider>
        </body>
        </html>
    );
}
