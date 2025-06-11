import {getSEOTags} from "@/lib/seo"
import {SessionProvider} from "@/lib/session"
import {getUserData} from "@/lib/auth"
import {Inter} from "next/font/google"
import {PostHogProvider} from "./providers"
import PostHogPageView from "./PostHogPageView"
import config from "@/config"
import "./globals.css"
import CookieConsentWrapper from "./CookieConsentWrapper"

const font = Inter({subsets: ["latin"]});

export const viewport = {
    // Will use the primary color of your theme to show a nice theme color in the URL bar of supported browsers
    themeColor: "#fffbeb", width: "device-width", initialScale: 1,
};

// This adds default SEO tags to all pages in our app.
// You can override them in each page passing params to getSOTags() function.
export const metadata = getSEOTags();

export default async function RootLayout({children}) {
    console.log('Rendered root')
    let userData = await getUserData()
    // console.log('Initial data:', initialData)

    return <html lang="en" data-theme={config.colors.theme} className={`${font.className} antialiased`}>
    <body>
    <PostHogProvider>
        <SessionProvider initialData={{user: userData}}>
            <PostHogPageView/>
            {children}
            <CookieConsentWrapper />
        </SessionProvider>
    </PostHogProvider>
    </body>
    </html>
}
