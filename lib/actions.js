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
        // console.log('Get response Item: ', getResponse.Item)
        // { "identity_id": "eu-west-1:3128101b-2c78-c194-7555-0d86a4c27901", "company_id": "C-1i19vvu1qt8otual7op8","company_name": "Almunia", "company_mission": "", "company_vision": "" }
        return {identity_id: identityId, ...getResponse.Item}
    } catch (error) {
        return error
    }
}


export async function getCompanyData(companyId, dataType) {
    if (!['team', 'values', 'questions', 'cultureProfile'].includes(dataType)) {
        console.error('Invalid data type')
        return {error: 'Invalid data type'}
    }

    const tableMap = {
        team: process.env.TEAM_DYNAMODB_TABLE,
        values: process.env.VALUES_DYNAMODB_TABLE,
        questions: process.env.QUESTIONS_DYNAMODB_TABLE,
        cultureProfile: process.env.CALIBRATION_DYNAMODB_TABLE
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
        console.log(`Querying ${tableMap[dataType]} for company: `, companyId)
        const queryCommand = new QueryCommand(params)
        const queryResponse = await dbClient.send(queryCommand)
        return queryResponse.Items

    } catch (error) {
        console.error('Error during Get request: ', error)
        return {result: 'error', body: error}
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