'use client';

import ButtonAccount from "@/components/ButtonAccount";
import {useSession} from "@/lib/session";
import {getSurveyResponses, getQuestionData} from "@/app/dashboard/actions";
import {useEffect, useRef, useState} from "react";
import ToplineCard from "@/app/dashboard/components/ToplineCard"
import {
    formatDataForCards,
    getISODateRange,
    summariseDataForCharts,
    summariseSurveyData
} from "@/app/dashboard/functions";
import {AreaChartHero} from "@/app/dashboard/components/AreaChartHero";
import {Card} from "@tremor/react";
import {useLocalStorage} from "@/lib/utils";
import {CustomSelect} from "@/app/dashboard/components/CustomSelect";


export default function Dashboard() {
    const {data: session} = useSession()
    const {setItem, getItem} = useLocalStorage()
    let [loading, setLoading] = useState(true)
    let [chartDataType, setChartDataType] = useState('chart-data-value')
    let questionData = useRef({})

    const chartOptions = [
        {value: 'chart-data-value', label: 'Values'},
        {value: 'chart-data-question', label: 'Questions'}
    ]

    const findQuestionValue = (questionId) => {
        if (questionData.current === {}) return undefined
        for (let valueId of Object.keys(questionData.current)) {
            for (let question of questionData.current[valueId].questions) {
                if (question.id === questionId) return question.question
            }
        }
        return undefined
    }

    useEffect(() => {
        (async () => {
            const companyId = session.user['custom:company-id']
            // const startDate = '2024-01-01T00:00:00.000Z'
            // const endDate = '2024-12-31T23:59:59.999Z'
            const {start: startDate, end: endDate} = getISODateRange('year')
            console.log(`Displaying data for dates between ${startDate} and ${endDate}`)

            const dateRange = getItem('survey-data-date-range')
            let responseData = []
            questionData.current = await getQuestionData(companyId)

            if (!dateRange || dateRange.start > startDate || dateRange.end < endDate) {
                responseData = await getSurveyResponses(companyId, startDate, endDate)
                setItem('survey-data-date-range', {start: startDate, end: endDate})

                const valueResults = summariseSurveyData(responseData, questionData.current, 'value_id', 'month')
                const questionResults = summariseSurveyData(responseData, questionData.current, 'question_id', 'month')

                const sortKeys = (keys, object) => {
                    return keys.sort((a, b) => {
                        return object[a].currentPeriodMean - object[b].currentPeriodMean
                    })
                }

                const sortedValues = sortKeys(Object.keys(valueResults), valueResults)
                const sortedQuestions = sortKeys(Object.keys(questionResults), questionResults)

                setItem('cards-data', formatDataForCards(sortedValues, valueResults))
                setItem('chart-data-value', summariseDataForCharts(sortedValues, 'value_id', responseData))
                setItem('chart-data-question', summariseDataForCharts(sortedQuestions, 'question_id', responseData))
                console.log('Updated data in localStorage')
            }

            setLoading(false)
        })()
    })

    return (
        <main className="min-h-screen p-8 pb-24">
            <section className="max-w-6xl mx-auto">
                <ButtonAccount/>
                <h1 className="text-6xl md:text-4xl font-extrabold md:pt-6 pt-4">Dashboard</h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                    {loading
                        ? [1, 2, 3, 4].map(i => <Card key={i} className="min-h-24"/>)
                        : getItem('cards-data')?.map((item) => {
                            return <ToplineCard key={item.id} item={item}/>
                        })}
                </div>
                <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mt-6">
                    <div className="flex items-center justify-end md:col-start-3">
                        <p className="font-medium text-sm">Group by:</p>
                    </div>
                    <CustomSelect data={chartOptions} state={[chartDataType, setChartDataType]}/>
                </div>
                <div className="flex flex-col gap-4 sm:pt-2 pt-4">
                    {loading
                        ? <Card><p>Loading ...</p></Card>
                        : getItem(chartDataType)?.map(item => {
                            return (<Card key={item.id} className="mx-auto">
                                <h3 className="text-2xl font-extrabold pl-8 pb-6">{
                                    item.grouping === 'question_id'
                                        ? findQuestionValue(item.id)
                                        : questionData.current[item.id].value_name
                                }</h3>
                                <AreaChartHero key={item.id} chartData={item.stat}/>
                            </Card>)
                        })
                    }
                </div>
            </section>
        </main>
    );
}
