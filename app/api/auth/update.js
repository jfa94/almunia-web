import {getToken} from "next-auth/jwt"
import AWS from "aws-sdk"

export default async function update(req, res) {
    const token = await getToken({req})

    if (token && req.method === 'PUT') {
        const params = {
            // @ts-ignore
            AccessToken: token?.accessToken ?? '',
            UserAttributes: [
                {
                    Name: req.body.attributeName,
                    Value: req.body.newValue
                },
            ],
        }

        try {
            const cognitoClient = new AWS.CognitoIdentityServiceProvider()

            // @ts-ignore
            await cognitoClient.updateUserAttributes(params).promise()
            res.status(200).json({success: true})
        } catch
            (error) {
            if (error instanceof Error) {
                console.log('error: ', error)
                // @ts-ignore
                res.status(error.status || 400).end(error.message)
            } else {
                console.error('Unknown error: ', error)
            }
        }
    } else {
        res.status(405).end('Method not allowed')
    }
}