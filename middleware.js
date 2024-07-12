import {getTokens} from "@/lib/auth";
import {NextResponse} from "next/server";

export const middleware = async (request) => {
    console.log('Ran middleware for:', request.url)
    const accessToken = request.cookies.get('accessToken')
    const identityToken = request.cookies.get('idToken')
    const refreshToken = request.cookies.get('refreshToken')

    if ((!accessToken || !identityToken) && refreshToken) {
        const freshToken = await getTokens('refresh', refreshToken.value)

        if (freshToken.error) {
            NextResponse.redirect(`${process.env.CANONICAL_URL}/?error=authorization`)
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
     * - user-image.png
     */
    '/((?!js/script.js|_next/static|_next/image|favicon.ico|landing/user-image.png).*)',
  ],
}