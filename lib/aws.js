import {fromCognitoIdentityPool} from "@aws-sdk/credential-providers";
import {CognitoIdentityClient, GetIdCommand} from "@aws-sdk/client-cognito-identity";
import {BatchWriteItemCommand, DynamoDBClient} from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import {cookies} from "next/headers";
import {GetCommand, PutCommand} from "@aws-sdk/lib-dynamodb";


export const getCognitoCredentialsProvider = async (token) => {
    const login = `cognito-idp.${process.env.CLOUD_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`
    return fromCognitoIdentityPool({
        clientConfig: {region: process.env.CLOUD_REGION},
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


export const submitDynamoDbUpdate = async (tableName, itemObject) => {
    const cookieStore = await cookies()

    if (!cookieStore.has('idToken')) {
        console.error('Not authenticated')
        return {error: 'Not authenticated'}
    }

    const identityToken = cookieStore.get('idToken').value
    const dbClient = await getDynamoDBClient(identityToken)
    const input = {
        "TableName": tableName,
        "Item": itemObject
    }

    try {
        const putCommand = new PutCommand(input)
        const putResponse = await dbClient.send(putCommand)
        console.log('Submission response: ', putResponse)
        return Object.assign(putResponse, {data: itemObject})
    } catch (error) {
        console.error('Error during submission: ', error)
        return JSON.stringify(error)
    }
}


export const submitBatchDynamoDbUpdate = async (tableName, itemList) => {
    const cookieStore = await cookies()

    if (!cookieStore.has('idToken')) {
        console.error('Not authenticated')
        return {error: 'Not authenticated'}
    }

    const identityToken = cookieStore.get('idToken').value
    const dbClient = await getDynamoDBClient(identityToken)

    const input = {
        RequestItems: {
            [tableName]: itemList.map(item => {
                return {
                    "PutRequest": {
                        "Item": marshall(item, {
                            removeUndefinedValues: true,
                            convertEmptyValues: true
                        })
                    }
                }
            })
        }
    }

    try {
        console.log('BatchWriteItemCommand input:', JSON.stringify(input))
        const putCommand = new BatchWriteItemCommand(input)
        const putResponse = await dbClient.send(putCommand)
        console.log('Submission response: ', putResponse)
        return putResponse
    } catch (error) {
        console.error('Error during submission: ', error)
        return JSON.stringify(error)
    }
}


export const queryDynamoDb = async (tableName, keyName, keyValue) => {
    const cookieStore = await cookies()

    if (!cookieStore.has('idToken')) {
        return {error: 'Not authenticated'}
    }

    const identityToken = cookieStore.get('idToken').value
    const dbClient = await getDynamoDBClient(identityToken)
    const input = {
        "TableName": tableName,
        "Key": {
            [keyName]: keyValue,
        },
    }

    try {
        const getCommand = new GetCommand(input)
        const getResponse = await dbClient.send(getCommand)
        console.log('Get response: ', getResponse)
        return {item: getResponse.Item}
    } catch (error) {
        return error
    }
}