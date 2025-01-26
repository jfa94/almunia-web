'use server';
import {cookies} from "next/headers";
import {QueryCommand} from "@aws-sdk/lib-dynamodb"
import {getDynamoDBClient} from "@/lib/aws";


export async function getQuestionData(companyId) {
    const cookieStore = await cookies()
    if (!cookieStore.has('idToken')) {
        return {error: 'Not authenticated'}
    }
    const identityToken = cookieStore.get('idToken').value

    const dbClient = await getDynamoDBClient(identityToken)

    const params = {
        TableName: 'company-questions',
        KeyConditionExpression: 'company_id = :companyId',
        ExpressionAttributeValues: {
            ':companyId': companyId,
        }
    }

    try {
        const queryCommand = new QueryCommand(params)
        const queryResponse = await dbClient.send(queryCommand)
        // console.log('Question query response:', queryResponse)
        return queryResponse.Items[0].question_object
    } catch (error) {
        console.error('Error during Get request: ', error)
        return error
    }
}


export async function getSurveyResponses(companyId, startDate, endDate) {
    const cookieStore = await cookies()
    if (!cookieStore.has('idToken')) {
        return {error: 'Not authenticated'}
    }
    const identityToken = cookieStore.get('idToken').value

    const dbClient = await getDynamoDBClient(identityToken)

    const params = {
        TableName: 'survey-responses',
        KeyConditionExpression: 'company_id = :company_id and #dynamoDbDate between :startDate and :endDate',
        ProjectionExpression: '#dynamoDbDate, value_id, question_id, response_value',
        ExpressionAttributeNames: {
            '#dynamoDbDate': 'date'
        },
        ExpressionAttributeValues: {
            ':company_id': companyId,
            ':startDate': startDate,
            ':endDate': endDate,
        }
    }

    try {
        const queryCommand = new QueryCommand(params)
        const queryResponse = await dbClient.send(queryCommand)
        // console.log('Query response: ', queryResponse)
        return queryResponse.Items
    } catch (error) {
        console.error('Error during Get request: ', error)
        return error
    }
}


export async function getTeamInformation(companyId) {
    const cookieStore = await cookies()
    if (!cookieStore.has('idToken')) {
        return {error: 'Not authenticated'}
    }
    const identityToken = cookieStore.get('idToken').value

    const dbClient = await getDynamoDBClient(identityToken)

    const params = {
        TableName: 'company-teams',
        KeyConditionExpression: 'company_id = :companyId',
        ExpressionAttributeValues: {
            ':companyId': companyId,
        }
    }

    try {
        const queryCommand = new QueryCommand(params)
        const queryResponse = await dbClient.send(queryCommand)
        console.log('Query response: ', queryResponse)
        return queryResponse.Items
    } catch (error) {
        console.error('Error during Get request: ', error)
        return error
    }
}
