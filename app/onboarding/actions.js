'use server';
import {PutCommand} from "@aws-sdk/lib-dynamodb"
import {cookies} from "next/headers";
import {getCognitoIdentity, getDynamoDBClient} from "@/lib/aws";

const tableMap = {
    welcome: 'company-information',
}

export async function submitForm(formArgs, formData) {
    console.log(`Submitted ${formArgs.page} with data: `, formData)

    const cookieStore = cookies()

    if (!cookieStore.has('idToken')) {
        console.error('Not authenticated')
        return {error: 'Not authenticated'}
    }

    const identityToken = cookieStore.get('idToken').value

    const identityId = await getCognitoIdentity(identityToken)
    const dbClient = await getDynamoDBClient(identityToken)

    const input = {
        "TableName": tableMap[formArgs.page],
        "Item": {
            "identity_id": identityId,
            "company_id": formArgs.companyId,
            "company_name": formData.get('companyName'),
        },
    }

    try {
        const putCommand = new PutCommand(input)
        const putResponse = await dbClient.send(putCommand)
        console.log('Submission response: ', putResponse)
        return putResponse
    } catch (error) {
        console.error('Error during submission: ', error)
        return error
    }
}