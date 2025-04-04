"use server";

import {getCompanyInformation} from "@/lib/actions"
import {submitBatchDynamoDbUpdate} from "@/lib/aws"


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
