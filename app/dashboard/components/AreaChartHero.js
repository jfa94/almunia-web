"use client"

import {AreaChart} from "@tremor/react";

const sampleData = [
    {
        date: "Jan 23",
        SolarPanels: 2890,
        Inverters: 2338,
    },
    {
        date: "Feb 23",
        SolarPanels: 2756,
        Inverters: 2103,
    }
]

export const AreaChartHero = ({chartData}) => (
    <div className="md:ml-0 -ml-6">
        <AreaChart
            className="md:h-80 h-60"
            data={chartData}
            index="date"
            categories={["Average Response"]}
            valueFormatter={(number) => Math.round(number * 100) / 100}
            padding={{left: 0}}
            maxValue={5}
            yAxisWidth={40}
            showLegend={false}
            noDataText="No data available"
            intervalType="count"
        />
    </div>
)