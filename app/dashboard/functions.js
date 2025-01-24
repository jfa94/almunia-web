'use client';


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
    questionData,
    groupBy = 'value_id',
    timeframe = 'month',
    periodEnd
) => {
    let summarised = {}

    const currentPeriod = getISODateRange(timeframe, periodEnd)
    const previousEnd = new Date(Date.parse(currentPeriod.start) - 1)
    const previousPeriod = getISODateRange(timeframe, previousEnd.toISOString())

    for (let response of surveyResponses) {
        const key = response[groupBy]
        if (!summarised[key]) {
            summarised[key] = {
                name: groupBy === 'question_id'
                    ? questionData[response.value_id].questions.filter(value => value.id === response.question_id)[0]
                    : questionData[key].value_name,
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
    return keys.map(key => {
        return {
            id: key,
            name: object[key].name,
            stat: Math.round(10 * object[key]?.currentPeriodMean) / 10,
            change: `${Math.round(100 * object[key].change)}%` ?? '-',
            changeType: object[key].change < 0 ? 'negative' : 'positive'
        }
    })
}


export const summariseDataForCharts = (keys, groupBy, data) => {
    const dataGroupedByKey = Object.groupBy(data, item => {
        return item[groupBy === 'question_id' ? 'question_id' : 'value_id']
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
