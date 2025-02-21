'use server';
import {cookies} from "next/headers";
import {GetCommand, QueryCommand} from "@aws-sdk/lib-dynamodb";
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

        let returnData = null
        switch (dataType) {
            case 'questions':
                returnData = queryResponse.Items[0].question_object
                break
            case 'values':
                returnData = queryResponse.Items[0].values
                break
            default:
                returnData = queryResponse.Items
        }
        return returnData

    } catch (error) {
        console.error('Error during Get request: ', error)
        return error
    }
}
