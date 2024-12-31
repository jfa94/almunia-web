'use server';
import {cookies} from "next/headers";
import {CognitoIdentityProviderClient, UpdateUserAttributesCommand} from "@aws-sdk/client-cognito-identity-provider";
import {getCognitoIdentity, queryDynamoDb, submitDynamoDbUpdate} from "@/lib/aws";


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
    let submittedData = {}

    for (const key of formData.keys()) {
        key.includes('key') && idList.push(key.slice(-1))
    }

    [...new Set(idList)].forEach((id) => {
        submittedData[formData.get(`key${id}`)] = formData.get(`value${id}`)
    })

    const item = {
        "company_id": formArgs.companyId,
        "values": submittedData
    }

    return await submitDynamoDbUpdate('company-values', item)
}


export async function submitQuestionsForm(formArgs, formData) {
    console.log(`Submitted ${formArgs.page} with data: `, formData)

    let questionList = {}
    let submittedData = {}

    for (const key of formData.keys()) {
        if (key.includes('key')) {
            const valueName = formData.get(key)
            const valueId = valueName.replace(/\s/g, '').toLowerCase()

            if (!(valueId in submittedData)) {
                submittedData[valueId] = {
                    value_name: valueName,
                    question_count: 0,
                    last_asked: "2000-01-01T00:00:00.000Z",
                    questions: []
                }
            }

        } else if (key.includes('value')) {
            const valueId = formData.get(`key${key.slice(0, 1)}`).replace(/\s/g, '').toLowerCase()
            const questionNumber = key.slice(-1)
            const questionId = valueId + questionNumber

            const questionObject = {
                key: questionId,
                question: formData.get(key),
                last_asked: "2000-01-01T00:00:00.000Z"
            }

            if (valueId in questionList && questionObject.question !== '') {
                questionList[valueId].push(questionObject)
            } else if (questionObject.question !== '') {
                questionList[valueId] = [questionObject]
            }

        }
    }

    for (const valueId in questionList) {
        submittedData[valueId].questions = questionList[valueId]
        submittedData[valueId].question_count = questionList[valueId].length
    }

    const standardQuestionBank = await queryDynamoDb('company-questions', 'company_id', 'template')

    const item = {
        "company_id": formArgs.companyId,
        "question_object": Object.assign(standardQuestionBank.item.question_object, submittedData)
    }

    return await submitDynamoDbUpdate('company-questions', item)
}


export async function submitTeamForm(formArgs, formData) {
    console.log(`Submitted ${formArgs.page} with data: `, formData)

    let idList = []
    let submittedData = {}

    for (const key of formData.keys()) {
        key.includes('key') && idList.push(key.slice(-1))
    }

    const groups = new Set();

    // First, find all unique groups
    for (let [name] of formData.entries()) {
        const match = name.match(/^value(\d+)/);
        if (match) {
            groups.add(`value${match[1]}`)
        }
    }

    // Transform data for each group
    groups.forEach(groupPrefix => {
        // Collect all data for this group
        const groupData = {}

        // Collect fields for this group
        for (let [name, value] of formData.entries()) {
            if (name.startsWith(groupPrefix) && name.length > groupPrefix.length) {
                // Extract the field name by removing the group prefix
                const fieldName = name.slice(groupPrefix.length)

                // Only add non-empty values
                if (value !== '') {
                    groupData[fieldName] = value
                }
            }
        }

        // Check if group has complete information (requires Email)
        if (groupData.Email) {
            submittedData[groupData.Email] = {
                Active: true,
                FirstName: groupData.FirstName || '',
                LastName: groupData.LastName || '',
                Role: groupData.Role || '',
                ...(Object.keys(groupData)
                    .filter(key => !['FirstName', 'LastName', 'Role', 'Email'].includes(key))
                    .reduce((acc, key) => {
                        acc[key] = groupData[key]
                        return acc
                    }, {}))
            }
        }
    })

    const item = {
        "company_id": formArgs.companyId,
        "team": submittedData
    }

    return await submitDynamoDbUpdate('company-teams', item)
}
