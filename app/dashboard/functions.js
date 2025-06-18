'use client';

import config from '@/config'

export const calculateMean = (arr) => {
    if (arr.length <= 0) return null
    return arr.reduce((a, b) => a + b) / arr.length
}


export const calculatePercentageChange = (a, b) => {
    if (!a || !b) return null
    return (b / a) - 1
}


export const getISODateRange = (timeframe, periodEnd) => {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24
    let latestMonthEnd = new Date()
    latestMonthEnd.setDate(1)
    latestMonthEnd.setHours(-1)

    const endDate = periodEnd ? new Date(periodEnd) : latestMonthEnd
    endDate.setHours(23, 59, 59, 999)

    let startDate = new Date(endDate)
    startDate.setHours(0, 0, 0, 0)

    switch (timeframe) {
        case 'week':
            startDate = new Date(startDate - _MS_PER_DAY * 6)
            break;
        case 'quarter':
            startDate.setDate(endDate.getDate() - 90)
            startDate.setDate(1)
            break;
        case 'semester':
            startDate.setDate(endDate.getDate() - 180)
            startDate.setDate(1)
            break;
        case 'year':
            startDate.setDate(endDate.getDate() - 365)
            startDate.setDate(1)
            break;
        default:
            startDate.setDate(endDate.getDate())
            startDate.setDate(1)
            break;
    }

    return {start: startDate.toISOString(), end: endDate.toISOString()}
}


export const summariseSurveyData = (
    surveyResponses,
    groupBy = 'value_id',
    timeframe = 'month',
    periodEnd
) => {
    let summarised = {}
    const currentPeriod = getISODateRange(timeframe, periodEnd)
    const previousEnd = new Date(Date.parse(currentPeriod.start) - 1)
    const previousPeriod = getISODateRange(timeframe, previousEnd.toISOString())

    for (let response of surveyResponses) {
        if (!response.question || !response.value_name) continue

        // Determine the key to summarise by, group all custom values into a single metric
        const key = (
            groupBy === 'value_id' && !config.constants.orgHealthIds.includes(response.value_id)
        ) ? 'values' : response[groupBy]

        if (!summarised[key]) {
            summarised[key] = {
                name: groupBy === 'question_id'
                    ? response.question
                    : response.value_name,
                currentPeriod: [],
                previousPeriod: [],
                change: 0
            }
        }

        if (response.date > currentPeriod.start && response.date < currentPeriod.end) {
            summarised[key].currentPeriod.push(response.response_value)
        } else if (response.date > previousPeriod.start && response.date < previousPeriod.end) {
            summarised[key].previousPeriod.push(response.response_value)
        }
    }

    for (let key of Object.keys(summarised)) {
        const relevantObject = summarised[key]
        relevantObject.currentPeriodMean = calculateMean(relevantObject.currentPeriod)
        relevantObject.previousPeriodMean = calculateMean(relevantObject.previousPeriod)
        relevantObject.change = calculatePercentageChange(relevantObject.previousPeriodMean, relevantObject.currentPeriodMean)
    }

    return summarised
}


export const formatDataForCards = (keys, object) => {
    if (!keys || keys.length === 0) return []
    return keys.map(key => {
        return {
            id: key,
            name: object[key].name,
            stat: Math.round(10 * object[key]?.currentPeriodMean) / 10,
            change: object[key].change ? `${Math.round(100 * object[key].change)}%` : '-',
            changeType: object[key].change < 0 ? 'negative' : 'positive'
        }
    })
}


export const summariseDataForCharts = (keys, groupBy, data) => {
    if (!keys || !data || keys.length === 0) return {}

    const dataGroupedByKey = Object.groupBy(data, item => {
        if (groupBy === 'value_id' && !config.constants.orgHealthIds.includes(item.value_id)) {
            return 'values'
        }
        return item[groupBy]
    })

    return keys.map(key => {
        let dataGroupedByDate = Object.groupBy(dataGroupedByKey[key], (item) => {
            let itemDate = new Date(item.date)

            return itemDate.toLocaleString('default', {month: 'short', year: '2-digit'})
        })

        let reducedData = Object.keys(dataGroupedByDate).map(date => {
            let sum = dataGroupedByDate[date].reduce((acc, curr) => {
                return acc + Number(curr.response_value)
            }, 0)
            return {
                date: date,
                'Average Response': sum / dataGroupedByDate[date].length
            }
        })

        return {
            id: key,
            valueId: dataGroupedByKey[key][0]?.value_id ?? key,
            grouping: groupBy,
            stat: reducedData
        }
    })
}
