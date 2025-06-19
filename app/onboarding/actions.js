'use server';
import {cookies} from "next/headers";
import {CognitoIdentityProviderClient, UpdateUserAttributesCommand} from "@aws-sdk/client-cognito-identity-provider";
import {
    getCognitoIdentity,
    queryDynamoDb,
    submitBatchDynamoDbUpdate,
    submitDynamoDbUpdate
} from "@/lib/aws";
import {v4 as uuidv4} from "uuid";
import {toCamelCase} from "@/lib/utils";


export async function submitWelcomeForm(formArgs, formData) {
    console.log('Submitted Welcome form with data:', formData)

    const cookieStore = await cookies()

    if (!cookieStore.has('idToken')) {
        console.error('Not authenticated')
        return {error: 'Not authenticated'}
    }

    console.log('Running Cognito Identity update...')
    const accessToken = cookieStore.get('accessToken').value
    const cognitoClient = new CognitoIdentityProviderClient({
        region: process.env.CLOUD_REGION || 'eu-west-1'
    })

    try {
        const updateUserCommand = new UpdateUserAttributesCommand({
            UserAttributes: [
                {Name: 'custom:company', Value: formData.get('companyName')},
                {Name: 'custom:company-id', Value: formArgs.companyId}
            ],
            AccessToken: accessToken
        })
        await cognitoClient.send(updateUserCommand)
        console.log('User attributes updated successfully')
    } catch (error) {
        console.error('Error during user update: ', error)
        return JSON.stringify(error)
    }

    console.log('Updating company information...')
    const identityToken = cookieStore.get('idToken').value
    const identityId = await getCognitoIdentity(identityToken)

    const item = {
        "identity_id": identityId,
        "company_id": formArgs.companyId,
        "company_name": formData.get('companyName'),
        "company_mission": formData.get('companyMission'),
        "company_vision": formData.get('companyVision')
    }

    return await submitDynamoDbUpdate('company-information', item)
}


export async function submitValuesForm(formArgs, formData) {
    console.log(`Submitted ${formArgs.page} with data: `, formData)
    let idList = []
    let items = []

    for (const key of formData.keys()) {
        key.includes('key') && idList.push(key.slice(-1))
    }

    [...new Set(idList)].forEach((id) => {
        items.push({
            "company_id": formArgs.companyId,
            "value_id": toCamelCase(formData.get(`key${id}`)),
            "name": formData.get(`key${id}`),
            "description": formData.get(`value${id}`)
        })
    })

    const standardItems = []
    const standardValues = await queryDynamoDb('company-values', 'company_id', 'default')
    for (let row of standardValues) {
        row.company_id = formArgs.companyId
        standardItems.push(row)
    }

    const result = await submitBatchDynamoDbUpdate('company-values', [...items, ...standardItems])
    return {result, items}
}


export async function submitQuestionsForm(formArgs, formData) {
    console.log(`Submitted ${formArgs.page} with data: `, formData)
    let itemList = []

    for (const [name, value] of formData.entries()) {
        if (value.trim() === '') continue
        itemList.push({
            company_id: formArgs.companyId,
            question_id: name.replace("_q", ""),
            question: value,
            value_id: name.substring(0, name.indexOf("_q")),
            last_asked: "2000-01-01T00:00:00.000Z",
        })
    }

    const standardQuestionBank = await queryDynamoDb('company-questions', 'company_id', 'template')

    for (let row of standardQuestionBank) {
        row.company_id = formArgs.companyId
        itemList.push(row)
    }

    return await submitBatchDynamoDbUpdate('company-questions', itemList)
}


export async function submitTeamForm(formArgs, formData) {
    console.log(`Submitted ${formArgs.page} with data: `, formData)
    let itemList = []

    let peopleObject = {}
    for (let [name, value] of formData.entries()) {
        const [personId, valueName] = name.split('-')
        if (value !== '') {
            if (!peopleObject[personId]) {
                peopleObject[personId] = {}
            }
            peopleObject[personId][valueName] = value
        }
    }

    Object.keys(peopleObject).forEach((key) => {
        itemList.push({
            "company_id": formArgs.companyId,
            "user_id": uuidv4(),
            "active": true,
            ...peopleObject[key]
        })
    })

    return await submitBatchDynamoDbUpdate('company-teams', itemList)
}
