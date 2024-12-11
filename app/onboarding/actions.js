'use server';
import {PutCommand} from "@aws-sdk/lib-dynamodb"
import {cookies} from "next/headers";
import {getCognitoIdentity, getDynamoDBClient} from "@/lib/aws";

const tableMap = {
    welcome: ['company-information', 'pairs'],
    values: ['company-values', 'pairs'],
    questions: ['custom-questions', 'list'],
    team: ['company-teams', 'table']
}

const objectFromData = (formData, dataShape) => {
    let idList = []
    let newObject = {}

    for (const key of formData.keys()) {
        key.includes('key') && idList.push(key.slice(-1))
    }

    if (dataShape === 'pairs') {
        [...new Set(idList)].forEach((id) => {
            newObject[formData.get(`key${id}`)] = formData.get(`value${id}`)
        })
    } else if (dataShape === 'list') {
        [...new Set(idList)].forEach((id) => {
            if (!(newObject[formData.get(`key${id}`)] instanceof Array)) {
                newObject[formData.get(`key${id}`)] = []
            }

            for (let i = 0; i < formData.getAll(`key${id}`).length; i++) {
                newObject[formData.get(`key${id}`)].push(formData.get(`${id}value${i}`))
            }
        })
    } else if (dataShape === 'table') {
        const groups = new Set();

        // First, find all unique groups
        for (let [name] of formData.entries()) {
            const match = name.match(/^value(\d+)/);
            if (match) {
                groups.add(`value${match[1]}`);
            }
        }

        // Transform data for each group
        groups.forEach(groupPrefix => {
            // Collect all data for this group
            const groupData = {};

            // Collect fields for this group
            for (let [name, value] of formData.entries()) {
                if (name.startsWith(groupPrefix) && name.length > groupPrefix.length) {
                    // Extract the field name by removing the group prefix
                    const fieldName = name.slice(groupPrefix.length);

                    // Only add non-empty values
                    if (value !== '') {
                        groupData[fieldName] = value;
                    }
                }
            }

            // Check if group has complete information (requires Email)
            if (groupData.Email) {
                newObject[groupData.Email] = {
                    FirstName: groupData.FirstName || '',
                    LastName: groupData.LastName || '',
                    Role: groupData.Role || '',
                    ...(Object.keys(groupData)
                        .filter(key => !['FirstName', 'LastName', 'Role', 'Email'].includes(key))
                        .reduce((acc, key) => {
                            acc[key] = groupData[key];
                            return acc;
                        }, {}))
                };
            }
        });
    }

    return newObject
}

export async function submitForm(formArgs, formData) {
    console.log(`Submitted ${formArgs.page} with data: `, formData)
    if (!Object.keys(tableMap).includes(formArgs.page)) {
        console.error('Invalid page value')
        return {error: 'Invalid page value'}
    }

    const cookieStore = await cookies()

    if (!cookieStore.has('idToken')) {
        console.error('Not authenticated')
        return {error: 'Not authenticated'}
    }

    const identityToken = cookieStore.get('idToken').value

    const identityId = await getCognitoIdentity(identityToken)
    const dbClient = await getDynamoDBClient(identityToken)

    let item = {}
    const submittedData = objectFromData(formData, tableMap[formArgs.page][1])
    if (formArgs.page === 'welcome') {
        item = {
            "identity_id": identityId,
            "company_id": formArgs.companyId,
            "company_name": formData.get('companyName'),
            "company_mission": formData.get('companyMission'),
            "company_vision": formData.get('companyVision'),
        }
    } else {
        item = {
            "company_id": formArgs.companyId,
            [formArgs.page]: submittedData
        }
    }

    const input = {
        "TableName": tableMap[formArgs.page][0],
        "Item": item,
    }

    try {
        const putCommand = new PutCommand(input)
        const putResponse = await dbClient.send(putCommand)
        console.log('Submission response: ', putResponse)
        return Object.assign(putResponse, {data: submittedData})
    } catch (error) {
        console.error('Error during submission: ', error)
        return JSON.stringify(error)
    }
}