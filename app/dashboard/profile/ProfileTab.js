'use client';

import {Card} from '@tremor/react';
import Link from 'next/link';
import {useEffect, useRef, useState} from "react";
import {useLocalStorage} from "@/lib/utils";
import SpectrumCard from "@/components/SpectrumCard";
import {getCalibrationResults} from "@/app/dashboard/actions";
import ProfileRadarGraph from "@/app/dashboard/profile/components/ProfileRadarGraph";
import {RiInformationLine} from "@remixicon/react";
import {InfoDropdown} from "@/components/InfoDropdown";

const tooltipText = "Employee profile is based on the past 90 days of survey data."

const pageContent = [
    {
        id: "internally-driven-externally-driven",
        title: "Internally Driven vs. Externally Driven Culture",
        subtitle: <p className="text-neutral-600">
            Whether an organisation prioritises internal values and expertise or customer needs and market demands.
        </p>,
        body: <>
            <p><strong>Internally driven organizations</strong> believe they know what’s best for their and focus
                on
                adhering to a set of guiding principles, such as standards or ethical commitments. While this
                approach provides strong consistency, it can also lead to stagnation if customer expectations evolve
                faster than the company’s response.</p>
            <p><strong>Externally driven organizations</strong>, by contrast, are deeply attuned to customer and
                market trends. They
                adapt quickly, emphasizing practicality and responsiveness. While this can be a , it may also result
                in of long-term strategic vision if are too reactive.</p>
        </>
    },
    {
        id: "open-closed-system",
        title:
            "Open vs. Closed System",
        subtitle:
            <p className="text-neutral-600">
                Assesses how open or closed an organization is to new employees and ideas.
            </p>,
        body:
            <>
                <p>Some organizations welcome newcomers with open arms, making integration easy and encouraging diverse
                    perspectives. These <strong>open systems</strong> are inclusive, flexible, and quick to absorb new
                    talent, fostering innovation and collaboration. However, if the assimilation process is too relaxed,
                    it can lead to a dilution of the company’s core culture or inconsistent application of values.</p>
                <p><strong>Closed systems</strong>, on the other hand, have a more selective approach. New employees
                    must prove themselves before fully integrating, often facing a steep learning curve. This
                    exclusivity helps preserve organizational culture and ensures that only the most aligned individuals
                    thrive, but it can also slow down hiring, limit fresh ideas, and create an intimidating work
                    environment for newcomers.</p>
            </>
    },
    {
        id: "local-professional-identity",
        title: "Local vs. Professional Identity",
        subtitle: <p className="text-neutral-600">
            Explores the degree to which employees identify with their organization or their broader industry.
        </p>,
        body: <>
            <p>A <strong>local identity</strong> means that employees primarily associate with their immediate team
                and direct supervisor. There is a strong sense of loyalty to colleagues, and relationships often
                shape workplace dynamics. While this can create a cohesive and close-knit work environment, it may
                also be prone to politics and lead to siloed thinking&mdash;where teams focus more on internal
                harmony than broader company or industry trends.</p>
            <p>In contrast, employees in a <strong>professional identity</strong> culture align themselves with
                their field or industry rather than their specific workplace. Their primary focus is on career
                growth and industry standards rather than fitting into a particular company culture. This approach
                encourages best practices and knowledge-sharing but may result in weaker team bonds or higher
                employee turnover as workers prioritize personal career advancement.</p>
        </>
    },
    {
        id: "people-task-oriented",
        title: "People-Oriented vs. Task-Oriented Culture",
        subtitle: <p className="text-neutral-600">
            The degree to which an organization balances employee well-being with its productivity goals.
        </p>,
        body: <>
            <p><strong>People-oriented cultures</strong> prioritize employee happiness, well-being, and personal
                development. These organisations assume that personal challenges will affect business performance
                and offer support, even at the cost of short-term productivity. While this approach leads to higher
                job satisfaction and loyalty, it can sometimes result in lower efficiency if performance
                expectations are not well-balanced.</p>
            <p><strong>Task-oriented cultures</strong>, in contrast, focus primarily on achieving business
                objectives, sometimes at the expense of employee well-being. The emphasis is on productivity,
                results, and efficiency, which can drive strong performance in high-pressure environments. However,
                if taken to an extreme, this culture can lead to burnout, stress, and high employee turnover.</p>
        </>
    },
    {
        id: "easygoing-strict-work-ethic",
        title: "Easygoing vs. Strict Work Ethic",
        subtitle: <p className="text-neutral-600">
            How the work ethic of an organisation determines whether the work feels structured or flexible to its
            employees.
        </p>,
        body: <>
            <p>In <strong>easygoing cultures</strong>, there is an emphasis on adaptability, improvisation, and
                creativity. Employees enjoy a relaxed atmosphere where schedules are fluid and decision-making is
                less rigid. While this can foster innovation, it can also create challenges in terms of consistency,
                accountability, and meeting deadlines.</p>
            <p><strong>Strict cultures</strong>, on the other hand, are characterized by discipline, punctuality,
                and cost-consciousness. Employees follow clear schedules, and efficiency is a top priority. While
                this ensures predictability and reliability, it can sometimes feel rigid, leaving little room for
                creative problem-solving or individual flexibility.</p>
        </>
    },
    {
        id: "means-oriented-goal-oriented",
        title: "Means-Oriented vs. Goal-Oriented Culture",
        subtitle: <p className="text-neutral-600">
            The extent to which an organisation focuses on either <span className="italic">how</span> work is done
            or <span className="italic">what</span> gets accomplished.
        </p>,
        body: <>
            <p>In a <strong>means-oriented culture</strong>, employees follow established processes and routines,
                favoring risk-averse approaches and ensuring consistency. These environments tend to be stable,
                reliable, and highly structured, making them ideal for industries that require precision and
                control. However, they can also limit innovation due to the high effort required to implement
                new ideas.</p>
            <p>On the other end of the spectrum, <strong>goal-oriented cultures</strong> are driven by results.
                Employees focus on achieving targets, often taking risks and embracing change to reach ambitious
                objectives. While this can drive rapid growth and innovation, it also comes with potential
                downsides—such as gaming metrics, burnout, or ethical compromises if goals become the sole priority.
            </p>
        </>
    },
]


export default function ProfileTab({session}) {
    const {getItem, setItem} = useLocalStorage()
    const [loading, setLoading] = useState(true)
    const companyId = session.user['custom:company-id']
    const calibrationData = useRef()

    useEffect(() => {
        (async () => {
            const calibrationResultsLocal = getItem("calibration-results")

            if (!calibrationResultsLocal) {
                try {
                    const calibrationResultsServer = await getCalibrationResults(companyId)

                    if (calibrationResultsServer) {
                        const formattedResults = {}
                        for (const item of calibrationResultsServer) {
                            formattedResults[item.dimension_id] = item.calibrated_value
                        }

                        calibrationData.current = formattedResults
                        setItem("calibration-results", formattedResults)
                    }
                } catch (error) {
                    console.error("Error fetching calibration results:", error)
                }
            } else {
                calibrationData.current = calibrationResultsLocal
            }

            setLoading(false)
        })()
    })

    return <>
        <section className="flex flex-row justify-between items-end">
            <div>
                <h1 className="md:pt-6 pt-4">
                    Culture Profile
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
        </section>

        <section className="flex flex-col lg:flex-row gap-6 mt-4">
            <Card className="flex-1 p-6">
                <p className="mb-6">
                    This radar graph shows your company&apos;s culture profile across several key dimensions based on
                    your calibration responses.
                </p>
                <div className="max-w-2xl mx-auto">
                    {!loading && <ProfileRadarGraph calibrationData={calibrationData.current}/>}
                </div>
            </Card>

            <Card className="lg:basis-2/5 xl:basis-1/3 p-6">
                <div className="flex flex-col gap-4">
                    {calibrationData.current && Object.entries(calibrationData.current).map(([key, value]) => {
                        const increasePositive = value > 3
                        return <SpectrumCard key={key} id={key} value={value} increasePositive={increasePositive}/>
                    })}
                </div>
            </Card>
        </section>

        <section className="mt-6">
            <Card className="mx-auto p-6">
                <h2 className="pb-2">More Information</h2>
                <div className="lg:col-span-2 min-h-full flex flex-col justify-between gap-4">
                    {pageContent.map(({id, title, subtitle, body}) => {
                        return <InfoDropdown key={id} title={title} subtitle={subtitle} body={body}/>
                    })}
                </div>
            </Card>

            <div className="flex justify-end mt-6">
                <Link href="/calibration?form=true" className="btn btn-neutral">
                    Retake Calibration Assessment
                </Link>
            </div>
        </section>
    </>
}
