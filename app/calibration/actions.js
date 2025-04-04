"use server";

import {getCompanyInformation} from "@/lib/actions"
import {submitBatchDynamoDbUpdate} from "@/lib/aws"
import {redirect} from "next/navigation";


export async function submitCalibrationData(data) {
    const {id, item} = await getCompanyInformation()

    if (!item) {
        console.error('Issue with getCompanyInformation. Returned:', {id, item})
        return {error: 'Not authenticated'}
    }

    let dimensionList = []

    for (const [key, value] of Object.entries(data)) {
        dimensionList.push({
            company_id: item.company_id,
            dimension_id: key,
            calibrated_value: value,
            latest_update: new Date().toISOString()
        })
    }

    return await submitBatchDynamoDbUpdate(process.env.CALIBRATION_DYNAMODB_TABLE, dimensionList)
}

export async function submitSignupForm(formData) {
    const object = {}
    formData.forEach(function (value, key) {
        if (value !== '') object[key] = value
    })

    try {
        const response = await fetch('https://tktpruza72.execute-api.eu-west-1.amazonaws.com/items', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(object),
        })

        const result = await response.json()
        console.log('Success: ', result)
    } catch (e) {
        console.log('Error: ', e)
    }

    redirect('calibration/results?success=true')
}

