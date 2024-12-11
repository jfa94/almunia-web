'use server';
import {redirect} from "next/navigation"
import {cookies} from "next/headers";
import {fromCognitoIdentityPool} from "@aws-sdk/credential-providers"
import {CognitoIdentityProviderClient, GetUserCommand} from "@aws-sdk/client-cognito-identity-provider"

export const signIn = async (provider = 'cognito', options = {callbackUrl: '/', middleware: false}) => {
    let auth_endpoint = ''

    if (provider === 'cognito') {
        const canonicalUri = process.env.CANONICAL_URL
        const redirectUri = `${canonicalUri}/api/auth/callback`
        const clientId = process.env.AUTH_COGNITO_ID
        const followUri = options.callbackUrl

        auth_endpoint = `https://auth.almunia.io/authorize?response_type=code&state=${followUri}&client_id=${clientId}&redirect_uri=${redirectUri}`
    }

    if (options.middleware) {
        return auth_endpoint
    } else {
        redirect(auth_endpoint)
    }
}

export const logOut = async () => {
    const cookieStore = await cookies()
    cookieStore.delete('accessToken')
    cookieStore.delete('idToken')
    cookieStore.delete('refreshToken')
    redirect(`https://auth.almunia.io/logout?client_id=${process.env.AUTH_COGNITO_ID}&logout_uri=${process.env.CANONICAL_URL}/`)
}

export const getTokens = async (operation, code) => {
    try {
        const params = {
            client_id: process.env.AUTH_COGNITO_ID,
            client_secret: process.env.AUTH_COGNITO_SECRET,
        }

        if (operation === 'access') {
            params.grant_type = 'authorization_code'
            params.code = code
            params.redirect_uri = `${process.env.CANONICAL_URL}/api/auth/callback`
        } else if (operation === 'refresh') {
            params.grant_type = 'refresh_token'
            params.refresh_token = code
        } else {
            return new Error('Invalid operation')
        }

        const url = `https://almunia.auth.${process.env.CLOUD_REGION}.amazoncognito.com/oauth2/token?` + new URLSearchParams(params)
        const headerString = process.env.AUTH_COGNITO_ID + ':' + process.env.AUTH_COGNITO_SECRET
        const buff = Buffer.from(headerString, 'utf-8')
        const authHeader = buff.toString('base64')

        const getTokensResponse = await fetch(url, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + authHeader,
                // "Access-Control-Allow-Origin": "*",
            },
            method: "POST",
        })

        const newTokens = await getTokensResponse.json()

        if (newTokens.error) {
            return newTokens.error
        }

        return {
            accessToken: newTokens.access_token,
            idToken: newTokens.id_token,
            refreshToken: newTokens.refresh_token || code,
            accessTokenExpiresIn: newTokens.expires_in,
            refreshTokenExpiresIn: 3600 * 24 * 30,
        }
    } catch (error) {
        return error
    }
}

export const getUserData = async () => {
    const cookieStore = await cookies()

    if (!cookieStore.has('accessToken')) {
        return {error: 'Not Authorised'}
    }

    const accessToken = cookieStore.get('accessToken').value

    try {
        const login = `cognito-idp.${process.env.CLOUD_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`
        const credentialsProvider = fromCognitoIdentityPool({
            clientConfig: {region: process.env.CLOUD_REGION},
            identityPoolId: process.env.COGNITO_IDENTITY_POOL_ID,
            logins: {
                [login]: accessToken
            }
        })

        const client = new CognitoIdentityProviderClient({
            region: process.env.CLOUD_REGION,
            credentials: credentialsProvider,
        })

        const params = {
            'AccessToken': accessToken
        }

        const command = new GetUserCommand(params)
        const response = await client.send(command)

        if (response.Username) {
            return response.UserAttributes.reduce((acc, {Name, Value}) => ({...acc, [Name]: Value}), {})
        } else {
            return {error: 'Error getting user data'}
        }
    } catch (error) {
        return error
    }
}