'use client';

import {getSurveyResponses} from "@/app/dashboard/actions";
import {getCompanyData} from "@/lib/actions";
import {useEffect, useRef, useState} from "react";
import ToplineCard from "@/app/dashboard/surveys/components/ToplineCard"
import {
    formatDataForCards,
    getISODateRange,
    summariseDataForCharts,
    summariseSurveyData
} from "@/app/dashboard/functions";
import {AreaChartHero} from "@/app/dashboard/surveys/components/AreaChartHero";
import {Card} from "@tremor/react";
import {RiInformationLine} from "@remixicon/react";
import {useLocalStorage} from "@/lib/utils";
import {CustomSelect} from "@/app/dashboard/surveys/components/CustomSelect";
import {DownloadDataButton} from "@/app/dashboard/surveys/components/DownloadDataButton";


const tooltipText = "Data aggregated monthly. Percentage value in summary card represents change vs previous month."
const chartOptions = [
    {value: 'chart-data-value', label: 'Theme'},
    {value: 'chart-data-question', label: 'Question'}
]

export default function SurveysTab({session}) {
    const {setItem, getItem} = useLocalStorage()
    let [loading, setLoading] = useState(true)
    let [chartDataType, setChartDataType] = useState('chart-data-value')
    const valueData = useRef([])
    const questionData = useRef([])

    useEffect(() => {
        (async () => {
            const companyId = session.user['custom:company-id']
            const today = new Date()
            const {start: startDate, end: endDate} = getISODateRange('year', today.toISOString())
            console.log(`Displaying data for dates between ${startDate} and ${endDate}`)

            const dateRange = getItem('survey-data-date-range')
            let responseData = []
            valueData.current = await getCompanyData(companyId, 'values')
            questionData.current = await getCompanyData(companyId, 'questions')

            if (!dateRange || dateRange.start > startDate || dateRange.end < endDate) {
                setItem('survey-data-date-range', {start: startDate, end: endDate})

                responseData = await getSurveyResponses(companyId, startDate, endDate)
                const contextualizedResponses = responseData.map(response => {
                    const relevantValue = valueData.current.find(val => val.value_id === response.value_id)
                    const relevantQuestion = questionData.current.find(q => q.question_id === response.question_id)
                    const context = {
                        value_name: relevantValue?.name ?? "",
                        question: relevantQuestion?.question ?? ""
                    }
                    return Object.assign(response, context)
                })

                const valueResults = summariseSurveyData(contextualizedResponses, 'value_id', 'month')
                const questionResults = summariseSurveyData(contextualizedResponses, 'question_id', 'month')

                const sortKeys = (keys, object) => {
                    return keys.sort((a, b) => {
                        return object[a].currentPeriodMean - object[b].currentPeriodMean
                    })
                }

                const sortedValues = sortKeys(Object.keys(valueResults), valueResults)
                const sortedQuestions = sortKeys(Object.keys(questionResults), questionResults)

                setItem('cards-data', formatDataForCards(sortedValues.slice(0, Math.min(8, sortedValues.length)), valueResults))
                setItem('chart-data-value', summariseDataForCharts(sortedValues, 'value_id', responseData))
                setItem('chart-data-question', summariseDataForCharts(sortedQuestions, 'question_id', responseData))
                console.log('Updated data in localStorage')
            }

            setLoading(false)
        })()
    }, [session.user, getItem, setItem])

    return <>
        <section className="flex flex-row justify-between items-end">
            <div>
                <h1 className="md:pt-6 pt-4">
                    Dashboard
                    <span className="tooltip tooltip-right pl-2 pt-1 align-top"
                          data-tip={tooltipText}
                          style={{
                              fontSize: '0.8em',
                              fontWeight: 'normal',
                              textAlign: 'left',
                              letterSpacing: '0.02em'
                          }}
                    >
                        <RiInformationLine size={20}/>
                    </span>
                </h1>
            </div>

            <div>
                <DownloadDataButton/>
            </div>
        </section>

        <section>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                {loading
                    ? Array.from({length: 8}, (v, i) => <Card key={i} className="min-h-[108px]"/>)
                    : getItem('cards-data')?.map((item) => {
                        return <ToplineCard key={item.id} item={item}/>
                    })}
            </div>
        </section>

        <section>
            <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mt-6">
                <div className="flex items-center justify-end md:col-start-3">
                    <p className="font-medium text-sm">Group by:</p>
                </div>
                <CustomSelect data={chartOptions} state={[chartDataType, setChartDataType]}/>
            </div>
            <div className="flex flex-col md:gap-6 gap-4 sm:pt-4 pt-6">
                {loading
                    ? <Card><p>Loading ...</p></Card>
                    : getItem(chartDataType)?.map(item => {
                        const itemName = item.grouping === 'question_id'
                            ? questionData.current.find(q => q.question_id === item.id)
                            : valueData.current.find(val => val.value_id === item.id)
                        return (<Card key={item.id} className="mx-auto md:p-6 p-5">
                            <h2 className="md:pl-8 pb-6">{
                                item.grouping === "question_id"
                                    ? itemName?.question ?? "Missing Theme Name"
                                    : itemName?.name ?? "Missing Theme Name"
                            }</h2>
                            <AreaChartHero key={item.id} chartData={item.stat}/>
                        </Card>)
                    })
                }
            </div>
        </section>
    </>
}
