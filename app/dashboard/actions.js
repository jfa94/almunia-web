'use server';
import {cookies} from "next/headers";
import { GetCommand } from "@aws-sdk/lib-dynamodb"
import {getDynamoDBClient} from "@/lib/aws";

export async function getTeamInformation(companyId) {
    const cookieStore = await cookies()
    if (!cookieStore.has('idToken')) {
        return {error: 'Not authenticated'}
    }
    const identityToken = cookieStore.get('idToken').value

    const dbClient = await getDynamoDBClient(identityToken)

    const input = {
        "TableName": "company-teams",
        "Key": {
            "company_id": companyId
        },
    }

    try {
        const getCommand = new GetCommand(input)
        const getResponse = await dbClient.send(getCommand)
        // console.log('Get response: ', getResponse)
        return getResponse.Item
    } catch (error) {
        console.error('Error during Get request: ', error)
        return error
    }
}
