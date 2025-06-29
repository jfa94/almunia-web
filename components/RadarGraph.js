"use client";

import {useState, useEffect} from 'react';
import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';


const labelMapping = {
    "local-professional-identity": {left: "Local Identity", right: "Professional Identity"},
    "means-goals-oriented": {left: "Means-Oriented", right: "Goals-Oriented"},
    "open-closed-system": {left: "Open System", right: "Closed System"},
    "people-task-oriented": {left: "People-Oriented", right: "Task-Oriented"},
    "easygoing-strict-work-ethic": {left: "Easygoing Work Ethic", right: "Strict Work Ethic"},
    "internal-external-driven": {left: "Internally-Driven", right: "Externally-Driven"}
}

const CustomTick = ({x, y, payload, cx, cy}) => {
    const words = payload.value.split(' ')
    const isMobile = window.innerWidth < 640

    const angle = Math.atan2(y - cy, x - cx)
    // Adjust offset based on screen size
    const offsetX = Math.cos(angle) * (isMobile ? 8 : 15)
    const offsetY = Math.sin(angle) * (isMobile ? 10 : 15)

    // For short labels, just return as is
    if (words.length === 1) {
        return (
            <g transform={`translate(${x + offsetX},${y + offsetY})`}>
                <text x={0} y={0} textAnchor="middle" fill="#666" className={isMobile ? "font-sm" : ""}>
                    {payload.value}
                </text>
            </g>
        );
    }

    // For longer labels, split into multiple lines
    const midpoint = Math.ceil(words.length / 2)
    const firstLine = words.slice(0, midpoint).join(' ')
    const secondLine = words.slice(midpoint).join(' ')

    return (
        <g transform={`translate(${x + offsetX},${y + offsetY})`}>
            <text x={0} y={-8} textAnchor="middle" fill="#666" className={isMobile ? "font-sm" : ""}>
                {firstLine}
            </text>
            <text x={0} y={8} textAnchor="middle" fill="#666" className={isMobile ? "font-sm" : ""}>
                {secondLine}
            </text>
        </g>
    )
}

const chartColours = ["#2563eb", "#c2410c"]
const names = ["Target Profile", "Employee Feedback Profile"]

export default function RadarGraph({inputData = [], inputRange = [1, 5]}) {
    const [chartData, setChartData] = useState({})
    const [minValue, maxValue] = inputRange
    const midpoint = minValue + ((maxValue - minValue) / 2)

    // Format data for the radar chart
    useEffect(() => {
        if (inputData.length === 0) return

        const formattedData = {}

        // Transform the data into the format Recharts expects
        inputData.forEach((dataObject, i) => {
            for (let [key, value] of Object.entries(dataObject)) {
                const normValue = Math.round((value - minValue) / (maxValue - minValue) * 100)
                const invValue = Math.round((maxValue - value) / (maxValue - minValue) * 100)

                if (!formattedData[key]) {
                    formattedData[key] = {
                        [`value${i}`]: value < midpoint ? invValue : normValue,
                        subject: value < midpoint ? labelMapping[key].left : labelMapping[key].right,
                        fullMark: 100
                    }
                } else {
                    const leftSubject = labelMapping[key].left === formattedData[key].subject
                    formattedData[key][`value${i}`] = leftSubject ? invValue : normValue
                }
            }
        })

        setChartData(Object.values(formattedData))
    }, [minValue, maxValue, midpoint, inputData])

// Show empty state if no data is provided
    if (Object.keys(chartData).length === 0) {
        return <div className="flex justify-center items-center h-64 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No data available</p>
        </div>
    }

    return (
        <div className="w-full">
            <div className="h-[450px] sm:h-[500px] w-full">
                <ResponsiveContainer width="100%" height="100%" className="-mt-8 sm:mt-0 pb-8">
                    <RadarChart outerRadius="80%" data={chartData}>
                        <PolarGrid/>
                        <PolarAngleAxis dataKey="subject" tick={CustomTick}/>
                        <PolarRadiusAxis tick={false} angle={30} domain={[0, 100]} tickCount={5}/>
                        {inputData.map((_, i) => {
                            return <Radar
                                key={i}
                                name={names[i]}
                                dataKey={`value${i}`}
                                stroke={chartColours[i]}
                                fill={chartColours[i]}
                                fillOpacity={0.15}
                            />
                        })}
                        <Tooltip formatter={(value) => {
                            return [`${value}%`, 'Score']
                        }}/>
                        <Legend
                            layout="vertical"
                            verticalAlign="bottom"
                            height={36}
                            wrapperStyle={{
                                bottom: 0,
                                marginTop: "10px",
                                paddingTop: "10px"
                            }}
                        /> </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}