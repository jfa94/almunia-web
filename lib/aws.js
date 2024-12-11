import {fromCognitoIdentityPool} from "@aws-sdk/credential-providers";
import {CognitoIdentityClient, GetIdCommand} from "@aws-sdk/client-cognito-identity";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";

export const getCognitoCredentialsProvider = async (token) => {
    const login = `cognito-idp.${process.env.CLOUD_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`
    return fromCognitoIdentityPool({
        clientConfig: { region: process.env.CLOUD_REGION },
        identityPoolId: process.env.COGNITO_IDENTITY_POOL_ID,
        logins: {
            [login]: token
        }
    })

}

export const getCognitoIdentity = async (identityToken) => {
    const login = `cognito-idp.${process.env.CLOUD_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`
    const credentialsProvider = await getCognitoCredentialsProvider(identityToken)
    const cognitoIdentityClient = new CognitoIdentityClient({
        region: process.env.CLOUD_REGION,
        credentials: credentialsProvider,
    })

    const params = {
        IdentityPoolId: process.env.COGNITO_IDENTITY_POOL_ID,
        Logins: {
            [login]: identityToken
        }
    }

    try {
        const getIdCommand = new GetIdCommand(params)
        const response = await cognitoIdentityClient.send(getIdCommand)
        // console.log('Identity response:', response)
        return response.IdentityId
    } catch (error) {
        console.log('Error getting IdentityId:', error)
    }
}

export const getDynamoDBClient = async (identityToken) => {
    const credentialsProvider = await getCognitoCredentialsProvider(identityToken)
    return new DynamoDBClient({
        region: process.env.CLOUD_REGION,
        credentials: credentialsProvider,
    })
}