'use server';
import {auth} from "@/auth"
import {DynamoDBClient} from "@aws-sdk/client-dynamodb"
import { PutCommand } from "@aws-sdk/lib-dynamodb"
import {fromCognitoIdentityPool} from "@aws-sdk/credential-providers"
import {CognitoIdentityClient, GetIdCommand} from "@aws-sdk/client-cognito-identity";

const tableMap = {
    welcome: 'almunia-company-information',
}

export async function submitForm(page, formData) {
    console.log(`Submitted ${page} with data: `, formData)

    const session = await auth()

    if (session) {
        const login = `cognito-idp.${process.env.CLOUD_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`
        const credentialsProvider = fromCognitoIdentityPool({
            clientConfig: {region: process.env.CLOUD_REGION},
            identityPoolId: process.env.COGNITO_IDENTITY_POOL_ID,
            logins: {
                [login]: session.user.bearer_token
            }
        })

        const cognitoIdentityClient = new CognitoIdentityClient({
            region: process.env.CLOUD_REGION,
            credentials: credentialsProvider,
        })

        const params = {
            IdentityPoolId: process.env.COGNITO_IDENTITY_POOL_ID,
            Logins: {
                [login]: session.user.bearer_token
            }
        }
        let identityId = {}

        try {
            const getIdCommand = new GetIdCommand(params)
            const response = await cognitoIdentityClient.send(getIdCommand)
            identityId = response.IdentityId
        } catch (error) {
            console.error("Error fetching IdentityId:", error)
        }

        const dbClient = new DynamoDBClient({
            region: process.env.CLOUD_REGION,
            credentials: credentialsProvider,
        })

        const input = {
            "TableName": tableMap[page],
            "ReturnValues": "ALL_OLD",
            "Item": {
                "identity_id": identityId,
                "user_id": session.user.id,
                "company_name": formData.get('companyName'),
            },
        }

        try {
            const putCommand = new PutCommand(input)
            const putResponse = await dbClient.send(putCommand)
            console.log('Submission response: ', putResponse)
        } catch (error) {
            console.error('Error during submission: ', error)
        }
    } else {
        console.error('Not authenticated')
    }
}