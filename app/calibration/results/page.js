"use client";

import RadarGraph from "@/app/calibration/components/RadarGraph";
import SpectrumCard from "@/app/calibration/components/SpectrumCard";
import {useLocalStorage} from "@/lib/utils";
import {redirect} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import {InfoDropdown} from "@/app/calibration/components/InfoDropdown";
import {SignupForm} from "@/app/calibration/components/SignupForm";

const pageContent = [
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
        id: "local-professional-identity",
        title: "Local vs. Professional Identity",
        subtitle: <p className="text-neutral-600">
            Explores the degree to which employees identify with their organization or their broader industry.
        </p>,
        body: <>
            <p>A <strong>local identity</strong> means that employees primarily associate with their immediate team
                and direct supervisor. There is a strong sense of loyalty to colleagues, and relationships often
                shape workplace dynamics. While this can create a cohesive and close-knit work environment, it may
                also be prone to politics and lead to siloed thinking&emdash;where teams focus more on internal
                harmony than broader company or industry trends.</p>
            <p>In contrast, employees in a <strong>professional identity</strong> culture align themselves with
                their field or industry rather than their specific workplace. Their primary focus is on career
                growth and industry standards rather than fitting into a particular company culture. This approach
                encourages best practices and knowledge-sharing but may result in weaker team bonds or higher
                employee turnover as workers prioritize personal career advancement.</p>
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
    }
]

export default function Page() {
    const {getItem} = useLocalStorage()
    const [calibrationData, setCalibrationData] = useState()

    useEffect(() => {
        const calibrationData = getItem("calibration-results")
        setCalibrationData(calibrationData)

        if (!calibrationData) {
            console.log("Issue fetching calibration data:", calibrationData)
            redirect("/calibration")
        }
    }, [])

    return <div className="flex flex-col gap-6">

        <section className="container mx-auto my-4">
            <h1 className="text-3xl font-bold">Results</h1>

            <div className="container mx-auto grid md:grid-cols-3 grid-cols-1">
                <div className="col-span-2 h-full flex justify-center items-center">
                    {calibrationData && <RadarGraph inputData={[calibrationData]}/>
                    }
                </div>

                <div className="flex flex-col gap-6">
                    {calibrationData && Object.entries(calibrationData).map(([key, value]) => {
                        const increasePositive = value > 3
                        return <SpectrumCard key={key} id={key} value={value} increasePositive={increasePositive}/>
                    })}
                </div>
            </div>
        </section>

        <section className="container mx-auto flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Interpreting Results</h1>

            <div>
                {pageContent.map(({id, title, subtitle, body}) => {
                    return <InfoDropdown key={id} title={title} subtitle={subtitle} body={body}/>
                })}
            </div>
        </section>

        <section id="signup" className="md:pt-8 pt-4 pb-12 bg-neutral-100">
            <SignupForm />
        </section>
    </div>
}