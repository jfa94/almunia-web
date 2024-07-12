import {redirect} from "next/navigation"
import Cryptr from "cryptr"
import {getTokens} from "@/lib/auth";
import {cookies} from "next/headers";

export async function GET(req) {
    const {searchParams: requestParams} = new URL(req.url)
    const authSecret = process.env.AUTH_SECRET

    const encryptedState = requestParams.get('state')
    const cryptr = new Cryptr(authSecret)
    const authState = cryptr.decrypt(encryptedState)
    const {searchParams: stateParams} = new URL(authState)

    if (stateParams.get('secret') !== authSecret) {
        redirect(`${process.env.CANONICAL_URL}/?error=authentication`)
    }

    console.log('Auth State follow:', stateParams.get('follow'))
    const accesCode = requestParams.get('code')
    const newTokens = await getTokens('access', accesCode)

    if (newTokens.error) {
        redirect(`${process.env.CANONICAL_URL}/?error=authorization`)
    }

    cookies().set("accessToken", newTokens.accessToken, {
        httpOnly: true,
        maxAge: newTokens.accessTokenExpiresIn,
        sameSite: "strict",
        secure: process.env.NODE_ENV === 'production'
    });

    cookies().set("idToken", newTokens.idToken, {
        httpOnly: true,
        maxAge: newTokens.accessTokenExpiresIn,
        sameSite: "strict",
        secure: process.env.NODE_ENV === 'production'
    });

    cookies().set("refreshToken", newTokens.refreshToken, {
        httpOnly: true,
        maxAge: newTokens.refreshTokenExpiresIn,
        sameSite: "strict",
        secure: process.env.NODE_ENV === 'production'
    });

    const followUrl = stateParams.get('follow')
    redirect(`${process.env.CANONICAL_URL}${followUrl}`)
}
