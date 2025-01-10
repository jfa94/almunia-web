'use server';
import {cookies} from "next/headers";
import {QueryCommand} from "@aws-sdk/lib-dynamodb"
import {getDynamoDBClient} from "@/lib/aws";

export async function getTeamInformation(companyId) {
    const cookieStore = await cookies()
    if (!cookieStore.has('idToken')) {
        return {error: 'Not authenticated'}
    }
    const identityToken = cookieStore.get('idToken').value

    const dbClient = await getDynamoDBClient(identityToken)

    const params = {
        "TableName": "company-teams",
        "KeyConditionExpression": 'company_id = :companyId',
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
