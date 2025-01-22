'use client';
import ButtonAccount from "@/components/ButtonAccount";
import {useSession} from "@/lib/session";
import {getSurveyResponses, getQuestionData} from "@/app/dashboard/actions";
import {useEffect, useRef, useState} from "react";
import ToplineCard from "@/app/dashboard/components/ToplineCard"
import {formatDataForCards, summariseDataForCharts, summariseSurveyData} from "@/app/dashboard/functions";
import {AreaChartHero} from "@/app/dashboard/components/AreaChartHero";
import {Card} from "@tremor/react";
import {useLocalStorage} from "@/lib/utils";

const topRowValueIds = ['jsat', 'mission', 'vision', 'leadership']

export default function Dashboard() {
    const {data: session} = useSession()
    let [loading, setLoading] = useState(true)
    let questionData = useRef({})
    let cardsData = useRef([])
    let chartData = useRef([])

    useEffect(() => {
        (async () => {
            const companyId = session.user['custom:company-id']
            const startDate = '2024-11-01T00:00:00.000Z'
            const endDate = '2024-12-31T23:59:59.999Z'

            const responseData = await getSurveyResponses(companyId, startDate, endDate)
            questionData.current = await getQuestionData(companyId)

            const valueResults = summariseSurveyData(responseData, questionData.current, 'value_id', 'month')
            // const questionResults = summariseSurveyData(responseData.current, questionData.current, 'question_id', 'month')

            const sortKeys = (keys, object) => {
                return keys.sort((a, b) => {
                    return object[a].currentPeriodMean - object[b].currentPeriodMean
                })
            }

            const sortedValues = sortKeys(Object.keys(valueResults), valueResults)
            // const sortedQuestions = sortKeys(Object.keys(questionResults), questionResults)

            cardsData.current = formatDataForCards(topRowValueIds, valueResults)
            chartData.current = summariseDataForCharts(sortedValues, 'value_id', responseData)

            setLoading(false)
        })()
    })

    return (
        <main className="min-h-screen p-8 pb-24">
            <section className="max-w-6xl mx-auto space-y-8">
                <ButtonAccount/>
                <h1 className="text-4xl md:text-4xl font-extrabold">Private Page</h1>
                {loading ? <p>Loading...</p> :
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {cardsData.current.map((item) => {
                            return <ToplineCard key={item.id} item={item}/>
                        })}
                    </div>
                }
                {loading ? <p>Loading ...</p> :
                    <div className="flex flex-col gap-4">
                        {chartData.current.map(item => {
                            return (<Card key={item.id} className="mx-auto">
                                <h2 className="text-2xl font-extrabold pl-8 pb-6">{
                                    item.grouping === 'question_id'
                                        // TODO: Implement for question name
                                        ? questionData.current[item.id].value_name
                                        : questionData.current[item.id].value_name
                                }</h2>
                                <AreaChartHero key={item.id} chartData={item.stat}/>
                            </Card>)
                        })}
                    </div>}
            </section>
        </main>
    );
}
