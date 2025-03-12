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

export default function SpiderGraph({inputData = {}}) {
    const [chartData, setChartData] = useState([])
    const maxValue = 5

    // Format data for the radar chart
    useEffect(() => {
        if (Object.keys(inputData).length === 0) return

        // Transform the data into the format Recharts expects
        const formattedData = Object.keys(inputData).map(key => ({
            subject: inputData[key] < 2.5 ? labelMapping[key].left : labelMapping[key].right,
            value: inputData[key] < 2.5 ? maxValue - inputData[key] : inputData[key],
            fullMark: maxValue
        }));

        setChartData(formattedData)
    }, [maxValue, inputData])

    // Show empty state if no data is provided
    if (chartData.length === 0) {
        return <div className="flex justify-center items-center h-64 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No data available</p>
        </div>;
    }

    return (
        <div className="w-full">
            <div className="h-[500px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius="80%" data={chartData}>
                        <PolarGrid/>
                        <PolarAngleAxis dataKey="subject"/>
                        <PolarRadiusAxis angle={30} domain={[0, maxValue]} tickCount={6}/>
                        <Radar
                            name="Profile"
                            dataKey="value"
                            stroke="#2563eb"
                            fill="#2563eb"
                            fillOpacity={0.15}
                        />
                        <Tooltip formatter={(value) => [value.toFixed(2), 'Score']}/>
                        <Legend/>
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}