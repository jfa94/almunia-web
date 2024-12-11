import {redirect} from "next/navigation"
import {getTokens} from "@/lib/auth";
import {cookies} from "next/headers";

export async function GET(req) {
    const {searchParams: requestParams} = new URL(req.url)

    const followUrl = requestParams.get('state')
    const accesCode = requestParams.get('code')
    const newTokens = await getTokens('access', accesCode)

    if (newTokens.error) {
        redirect(`${process.env.CANONICAL_URL}/?error=authorization`)
    }

    (await cookies()).set("accessToken", newTokens.accessToken, {
        httpOnly: true,
        maxAge: newTokens.accessTokenExpiresIn,
        sameSite: "strict",
        secure: process.env.NODE_ENV === 'production'
    });

    (await cookies()).set("idToken", newTokens.idToken, {
        httpOnly: true,
        maxAge: newTokens.accessTokenExpiresIn,
        sameSite: "strict",
        secure: process.env.NODE_ENV === 'production'
    });

    (await cookies()).set("refreshToken", newTokens.refreshToken, {
        httpOnly: true,
        maxAge: newTokens.refreshTokenExpiresIn,
        sameSite: "strict",
        secure: process.env.NODE_ENV === 'production'
    });

    // const followUrl = stateParams.get('follow')
    redirect(`${process.env.CANONICAL_URL}/user-redirect?follow=${followUrl}`)
}
