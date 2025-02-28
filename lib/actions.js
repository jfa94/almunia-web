'use server';
import {cookies} from "next/headers";
import {GetCommand, PutCommand, QueryCommand} from "@aws-sdk/lib-dynamodb";
import {getCognitoIdentity, getDynamoDBClient} from "@/lib/aws";


export async function getCompanyInformation() {
    const cookieStore = await cookies()

    if (!cookieStore.has('idToken')) {
        return {error: 'Not authenticated'}
    }
    const identityToken = cookieStore.get('idToken').value

    const identityId = await getCognitoIdentity(identityToken)
    const dbClient = await getDynamoDBClient(identityToken)

    const input = {
        "TableName": "company-information",
        "Key": {
            "identity_id": identityId,
        },
    }

    try {
        const getCommand = new GetCommand(input)
        const getResponse = await dbClient.send(getCommand)
        console.log('Get response: ', getResponse)
        return {item: getResponse.Item, id: identityId}
    } catch (error) {
        return error
    }
}


export async function getCompanyData(companyId, dataType) {
    if (!['team', 'values', 'questions'].includes(dataType)) {
        console.error('Invalid data type')
        return {error: 'Invalid data type'}
    }

    const tableMap = {
        team: process.env.TEAM_DYNAMODB_TABLE,
        values: process.env.VALUES_DYNAMODB_TABLE,
        questions: process.env.QUESTIONS_DYNAMODB_TABLE
    }

    const cookieStore = await cookies()
    if (!cookieStore.has('idToken')) {
        return {error: 'Not authenticated'}
    }
    const identityToken = cookieStore.get('idToken').value

    const dbClient = await getDynamoDBClient(identityToken)

    const params = {
        TableName: tableMap[dataType],
        KeyConditionExpression: 'company_id = :companyId',
        ExpressionAttributeValues: {
            ':companyId': companyId,
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


export async function createNewItem(companyId, dataType, data) {
    if (!['team', 'values', 'questions'].includes(dataType)) {
        console.error('Invalid data type')
        return {error: 'Invalid data type'}
    }

    const tableMap = {
        team: process.env.TEAM_DYNAMODB_TABLE,
        values: process.env.VALUES_DYNAMODB_TABLE,
        questions: process.env.QUESTIONS_DYNAMODB_TABLE
    }

    const cookieStore = await cookies()

    if (!cookieStore.has('idToken')) {
        return {error: 'Not authenticated'}
    }
    const identityToken = cookieStore.get('idToken').value
    const dbClient = await getDynamoDBClient(identityToken)

    const input = {
        "TableName": tableMap[dataType],
        "Item": data,
    }

    try {
        const putCommand = new PutCommand(input)
        const putResponse = await dbClient.send(putCommand)
        console.log('Put response: ', putResponse)
        return putResponse
    } catch (error) {
        return error
    }
}