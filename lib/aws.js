"use server";

import {fromCognitoIdentityPool} from "@aws-sdk/credential-providers";
import {CognitoIdentityClient, GetIdCommand} from "@aws-sdk/client-cognito-identity";
import {BatchWriteItemCommand, DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {marshall} from "@aws-sdk/util-dynamodb";
import {cookies} from "next/headers";
import {DeleteCommand, PutCommand, QueryCommand} from "@aws-sdk/lib-dynamodb";


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

    let batchResponses = []
    const batchSize = 25
    for (let i = 0; i < itemList.length; i += batchSize) {
        const batch = itemList.slice(i, i + batchSize)
        const input = {
            RequestItems: {
                [tableName]: batch.map(item => {
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
            batchResponses.push(putResponse)
        } catch (error) {
            console.error('Error during submission: ', error)
            return JSON.stringify(error)
        }
    }

    return batchResponses
}


export const deleteDynamoDbItem = async (tableName, deleteKey) => {
    const cookieStore = await cookies()

    if (!cookieStore.has('idToken')) {
        return {error: 'Not authenticated'}
    }

    const identityToken = cookieStore.get('idToken').value
    const dbClient = await getDynamoDBClient(identityToken)
    const input = {
        "TableName": tableName,
        "Key": deleteKey
    }

    try {
        const deleteCommand = new DeleteCommand(input)
        const deleteResponse = await dbClient.send(deleteCommand)
        console.log('Delete response: ', deleteResponse)
        return deleteResponse
    } catch (error) {
        return error
    }
}


export async function queryDynamoDb(tableName, keyName, keyValue) {
    const cookieStore = await cookies()
    if (!cookieStore.has('idToken')) {
        return {error: 'Not authenticated'}
    }
    const identityToken = cookieStore.get('idToken').value

    const dbClient = await getDynamoDBClient(identityToken)

    const expressionKey = `:${keyName}`
    const params = {
        TableName: tableName,
        KeyConditionExpression: `${keyName} = ${expressionKey}`,
        ExpressionAttributeValues: {
            [expressionKey]: keyValue,
        }
    }

    try {
        const queryCommand = new QueryCommand(params)
        const queryResponse = await dbClient.send(queryCommand)

        return queryResponse.Items

    } catch (error) {
        console.error('Error during Get request: ', error)
        return error
    }
}

