'use server';
import {cookies} from "next/headers";
import { GetCommand } from "@aws-sdk/lib-dynamodb"
import {getCognitoIdentity, getDynamoDBClient} from "@/lib/aws";

export async function checkForCompany() {
    const cookieStore = cookies()

    if (!cookieStore.has('idToken')) {
        return {error: 'Not authenticated'}
    }
        const identityToken = cookieStore.get('idToken').value
        console.log('/create checkForCompany() token:', identityToken)

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
            // console.log('Get response: ', getResponse)
            return {item: getResponse.Item, id: identityId}
        } catch (error) {
            console.error('Error during Get request: ', error)
            return error
        }
}