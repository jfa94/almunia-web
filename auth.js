import NextAuth from "next-auth"
import Cognito from "next-auth/providers/cognito";

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [
        Cognito({
            authorization: {params: {scope: "openid aws.cognito.signin.user.admin"}},
        })
    ],
    callbacks: {
        async jwt({token, account}) {
            if (account) {
                token.access_token = account.access_token ?? token.access_token
                token.bearer_token = account.id_token ?? token.bearer_token
                token.refresh_token = account.refresh_token ?? token.refresh_token
                token.exp = account.expires_at ?? token.exp
            } else if (Date.now() > token.exp * 1000) {
                const refreshedToken = await refreshAccessToken(token)
                token.access_token = refreshedToken.access_token
                token.bearer_token = refreshedToken.bearer_token
                token.refresh_token = refreshedToken.refresh_token
                token.exp = refreshedToken.bearer_token_expires
            }
            return token
        },
        session({session, token}) {
            session.user.id = token.sub
            session.user.bearer_token = token.bearer_token
            return session
        },
    }
})

async function refreshAccessToken(token) {
    try {
        const url = `https://almunia.auth.${process.env.CLOUD_REGION}.amazoncognito.com/oauth2/token?` +
            new URLSearchParams({
                grant_type: "refresh_token",
                client_id: process.env.AUTH_COGNITO_ID,
                client_secret: process.env.AUTH_COGNITO_SECRET,
                refresh_token: token.refresh_token,
            })

        const headerString = process.env.AUTH_COGNITO_ID + ':' + process.env.AUTH_COGNITO_SECRET
        const buff = Buffer.from(headerString, 'utf-8')
        const authHeader = buff.toString('base64')

        const refreshedTokensResponse = await fetch(url, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + authHeader,
            },
            method: "POST",
        })

        const refreshedTokens = await refreshedTokensResponse.json()

        return {
            bearer_token: refreshedTokens.id_token,
            access_token: refreshedTokens.access_token,
            bearer_token_expires: Date.now() + refreshedTokens.expires_in * 1000,
            refresh_token: refreshedTokens.refresh_token ?? token.refresh_token,
        }
    } catch (error) {
        return error
    }
}