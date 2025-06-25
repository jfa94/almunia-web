'use server';
import {cookies} from "next/headers";
import {QueryCommand} from "@aws-sdk/lib-dynamodb"
import {getDynamoDBClient} from "@/lib/aws";


export async function getSurveyResponses(companyId, startDate, endDate) {
    console.log('Getting latest survey response data...')
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

export async function getCalibrationResults(companyId) {
    console.log('Getting calibration data for company:', companyId)
    const cookieStore = await cookies()
    if (!cookieStore.has('idToken')) {
        return {error: 'Not authenticated'}
    }
    const identityToken = cookieStore.get('idToken').value

    const dbClient = await getDynamoDBClient(identityToken)

    const params = {
        TableName: process.env.CALIBRATION_DYNAMODB_TABLE,
        KeyConditionExpression: 'company_id = :company_id',
        ExpressionAttributeValues: {
            ':company_id': companyId,
        }
    }

    try {
        const queryCommand = new QueryCommand(params)
        const queryResponse = await dbClient.send(queryCommand)
        console.log('Calibration data query response:', queryResponse.Items)
        return queryResponse.Items
    } catch (error) {
        console.error('Error fetching calibration data:', error)
        return []
    }
}
