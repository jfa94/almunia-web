import {signIn, getTokens} from "@/lib/auth";
import {NextResponse} from "next/server";

const protectedRoutes = ['/account', '/dashboard', '/onboarding', '/create']

export const middleware = async (request) => {
    console.log('Ran middleware for:', request.nextUrl.pathname)
    const accessToken = request.cookies.get('accessToken')
    const identityToken = request.cookies.get('idToken')
    const refreshToken = request.cookies.get('refreshToken')

    if (protectedRoutes.some((path) => request.nextUrl.pathname.startsWith(path)) && !refreshToken) {
        const authEndpoint = await signIn('cognito', {callbackUrl: request.nextUrl.pathname, middleware: true})
        return NextResponse.redirect(authEndpoint)
    }

    if ((!accessToken || !identityToken) && refreshToken) {
        const freshToken = await getTokens('refresh', refreshToken.value)

        if (freshToken.error) {
            return NextResponse.redirect(`${process.env.CANONICAL_URL}/?error=authorization`)
        }

        const response = NextResponse.next()

        response.cookies.set("accessToken", freshToken.accessToken, {
            httpOnly: true,
            maxAge: freshToken.accessTokenExpiresIn,
            sameSite: "strict"
        })

        response.cookies.set("idToken", freshToken.idToken, {
            httpOnly: true,
            maxAge: freshToken.accessTokenExpiresIn,
            sameSite: "strict"
        })

        return response
    }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - js/script.js
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public/ folder
     * - landing/ folder
     * - user-redirect/ folder
     */
    '/((?!js/script.js|_next/static|_next/image|favicon.ico|public|landing|user-redirect).*)',
  ],
}