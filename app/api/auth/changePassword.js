import {getToken} from "next-auth/jwt"
import AWS from "aws-sdk"

export default async function changePassword(req, res) {
    const token = await getToken({req})

    if (token && req.method === 'PUT') {
        console.log(req)
        const params = {
            // @ts-ignore
            AccessToken: token?.accessToken ?? '',
            PreviousPassword: req.body.currentPassword,
            ProposedPassword: req.body.proposedPassword
        }

        try {
            const cognitoClient = new AWS.CognitoIdentityServiceProvider()

            // @ts-ignore
            await cognitoClient.changePassword(params).promise()
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