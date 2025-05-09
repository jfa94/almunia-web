/* eslint-disable @next/next/no-img-element */
import React from "react"
import Image from "next/image"
// import reportingMockup from "/public/landing/reporting-mockup.png"

const features = [
    {
        title: "Define your culture",
        description:
            "Use our tools to understand and develop a values-led culture.",
        styles: "bg-primary text-primary-content text-white",
        demo: (
            <div className="overflow-hidden h-full flex items-stretch">
                <div className="w-full translate-x-12 bg-base-200 rounded-t-box h-full p-6">
                    <p className="font-medium uppercase tracking-wide text-base-content/60 text-sm mb-1">
                        <span className="font-bold">Value: </span> Curiosity
                    </p>
                    <div
                        className="relative textarea py-4 h-full mr-12 bg-base-100 group-hover:border-base-content/10 text-base-content"
                    >
                        <div className="absolute left-4 top-4 group-hover:hidden flex items-center ">
                            <span>We recogn</span>
                            <span className="w-[2px] h-6 bg-primary animate-pulse"></span>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 duration-500">
                            We recognize when we are wrong, seek out our blind spots, test our assumptions and change
                            course.
                        </div>
                        <button
                            className="btn shadow-lg btn-primary absolute right-4 bottom-6 opacity-0 group-hover:opacity-100 duration-1000">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        ),
    },
    {
        title: "Something",
        description: "(COMING SOON) Seamlessly integrate with your existing Human Capital Management tools and keep" +
            " all your data synced.",
        styles: "md:col-span-2 bg-base-100 text-base-content",
        demo: (
            <div className="flex left-0 w-full h-full pt-0 lg:pt-8 overflow-hidden md:-mt-12">
                <div className="-rotate-[4deg] flex min-w-max overflow-x-visible h-full lg:pt-4">
                    {[
                        {
                            relatedValue: "Communication",
                            title: "Daily standup",
                            description: "Start work days with team standup",
                            buttonStyles: "bg-neutral text-secondary-content",
                            css: "-ml-1 rotate-[4deg] w-72 h-72 z-30 bg-base-200 text-base-content rounded-2xl group-hover:-ml-64 group-hover:opacity-0 group-hover:scale-75 transition-all duration-500 p-4",
                            topValue: 12,
                        },
                        {
                            relatedValue: "Flexibility",
                            title: "Pet-friendly Fridays",
                            description: "Allow pets in the office once a week",
                            buttonStyles: "bg-neutral text-secondary-content",
                            css: "rotate-[4deg] bg-base-200 text-base-content w-72 h-72 -mr-8 -ml-8 z-20 rounded-xl p-4",
                            topValue: 8,
                        },
                        {
                            relatedValue: "Best Practice",
                            title: "Standard interviews",
                            description: "Guidelines on running interviews",
                            buttonStyles: "bg-neutral text-neutral-content",
                            css: "rotate-[4deg] bg-base-200 text-base-content z-10 w-72 h-72 rounded-xl p-4",
                            topValue: 9,
                        },
                        {
                            relatedValue: "Personal development",
                            title: "Promotion guidelines",
                            description: "Description of expectations by level",
                            buttonStyles: "bg-neutral text-neutral-content",
                            css: "rotate-[4deg] bg-base-200 text-base-content w-72 h-72 -ml-8 rounded-xl p-4",
                            topValue: 15,
                        },
                        {
                            relatedValue: "Communication",
                            title: "Daily standup",
                            description: "Start work days with a team standup",
                            buttonStyles: "bg-neutral text-secondary-content",
                            css: "rotate-[4deg] bg-base-200 text-base-content w-72 h-72 -ml-8 -z-10 rounded-xl p-4 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300",
                            topValue: 12,
                        },
                    ].map((theme, i) => (
                        <div className={`drop-shadow-lg ${theme.css}`} key={i}>
                            <div className="font-medium uppercase tracking-wide text-base-content/60 text-sm mb-3">
                                <span className="font-bold">Value: </span>{theme.relatedValue}
                            </div>
                            <div className="space-y-2">
                                <div className="p-4 bg-base-100 rounded-box flex justify-between">
                                    <div>
                                        <p className="font-semibold mb-1">{theme.title}</p>
                                        <p className="opacity-80">{theme.description}</p>
                                    </div>
                                    <button
                                        className={`px-4 py-2 rounded-box group text-center text-lg duration-150 border border-transparent ${theme.buttonStyles}`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className={`w-5 h-5 ease-in-out duration-150 -translate-y-0.5 group-hover:translate-y-0`}
                                        >
                                            <path d="m18 15-6-6-6 6"/>
                                        </svg>
                                        {theme.topValue}
                                    </button>
                                </div>
                                <div className="p-4 bg-base-100 rounded-box flex justify-between ">
                                    <div>
                                        <p className="font-semibold mb-1">Another great idea</p>
                                        <p className="opacity-80">Make cards more accessible</p>
                                    </div>
                                    <button
                                        className={`px-4 py-2 rounded-box group text-center text-lg duration-150 border border-transparent ${theme.buttonStyles}`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className={`w-5 h-5 ease-in-out duration-150 -translate-y-0.5 group-hover:translate-y-0`}
                                        >
                                            <path d="m18 15-6-6-6 6"/>
                                        </svg>
                                        5
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        title: "Track progress over time",
        description: "Get feedback from your team in one click. Keep track of how your culture is evolving.",
        styles: "md:col-span-2 bg-base-300 text-base-content",
        demo: (
            <div className="px-6 relative h-full flex flex-row gap-4 overflow-hidden">

                <div
                    className="bg-white p-8 h-full max-w-[21rem] rounded-t-box drop-shadow-lg absolute top-16 hover:top-10 duration-300 z-10">
                    <p className="font-medium uppercase tracking-wide text-base-content/60 text-sm mb-1 border-b-2 border-b-base-600">
                        {/*<span className="font-bold">From: </span> Almunia Ltd<br/>*/}
                        {/*<span className="font-bold">To: </span> Tim Apple<br/>*/}
                        <span className="font-bold">Subject: </span> Daily Feedback
                    </p>

                    <p className="font-medium leading-normal my-2">
                        I feel comfortable asking my manager for feedback
                    </p>

                    <div className="flex flex-col gap-2">
                        {[
                            {answer: 'Strongly agree', value: '5'},
                            {answer: 'Agree', value: '4'},
                            {answer: 'Neither agree nor disagree', value: '3'},
                            {answer: 'Disagree', value: '2'},
                            {answer: 'Strongly disagree', value: '1'},
                        ].map((theme) => (
                            <p className="bg-base-200 text-base-400 px-4 py-1.5 rounded-md w-full"
                               key={theme.value}
                            >
                                {theme.answer}
                                <span
                                    className="bg-primary/90 font-bold text-white text-sm py-0.5 px-1.5 mt-0.5 rounded-md float-end"
                                >
                                {theme.value}
                            </span>
                            </p>
                        ))
                        }
                    </div>
                </div>

                <div>
                    <Image src="/landing/reporting-mockup.png"
                           alt="Reporting mockup"
                           className="lg:max-w-[75%] max-w-[90%] absolute right-4 rounded-2xl"
                           priority={true}
                           height={485}
                           width={595}
                    />
                </div>

            </div>
        ),
    },
    {
        title: "Integrate with existing tools",
        description: "(COMING SOON) Keep your data synced by linking your existing Human Capital Management software.",
        styles: "bg-neutral text-neutral-content",
        demo: (
            <div className="lg:pt-8 pb-6">
                <div className="relative w-full">
                    {/* Create a wider container that holds both sets of logos side by side */}
                    <div className="flex animate-infinite-scroll whitespace-nowrap">
                        {/* First set of logos */}
                        <div className="flex lg:gap-10 gap-8 min-w-full h-full select-none">
                            <Image src="/landing/logos/adp-logo.png"
                                   alt="ADP Logo"
                                   priority={true}
                                   height={200}
                                   width={300}
                                   style={{objectFit: "contain"}}
                            />
                            <Image src="/landing/logos/workday-logo.png"
                                   alt="Workday Logo"
                                   priority={true}
                                   height={200}
                                   width={500}
                                   style={{objectFit: "contain"}}
                            />
                            <Image src="/landing/logos/personio-logo.png"
                                   alt="Personio Logo"
                                   priority={true}
                                   height={200}
                                   width={600}
                                   style={{objectFit: "contain"}}
                            />
                            <Image src="/landing/logos/dayforce-logo.png"
                                   alt="Dayforce Logo"
                                   priority={true}
                                   height={200}
                                   width={600}
                                   style={{objectFit: "contain"}}
                            />
                        </div>
                        {/* Second set of logos (exact duplicate) */}
                        <div
                            className="flex lg:gap-10 gap-8 min-w-full h-full select-none"
                            aria-hidden={true}
                        >
                            <Image src="/landing/logos/adp-logo.png"
                                   alt="ADP Logo"
                                   priority={true}
                                   height={200}
                                   width={300}
                                   style={{objectFit: "contain"}}
                            />
                            <Image src="/landing/logos/workday-logo.png"
                                   alt="Workday Logo"
                                   priority={true}
                                   height={200}
                                   width={500}
                                   style={{objectFit: "contain"}}
                            />
                            <Image src="/landing/logos/personio-logo.png"
                                   alt="Personio Logo"
                                   priority={true}
                                   height={200}
                                   width={600}
                                   style={{objectFit: "contain"}}
                            />
                            <Image src="/landing/logos/dayforce-logo.png"
                                   alt="Dayforce Logo"
                                   priority={true}
                                   height={200}
                                   width={600}
                                   style={{objectFit: "contain"}}
                            />
                        </div>
                    </div>
                </div>
            </div>
        ),
    },
];

const FeaturesGrid = () => {
    return (
        <section className="flex justify-center items-center w-full bg-base-200/50 text-base-content py-20 lg:py-32">
            <div className="flex flex-col max-w-[82rem] gap-16 md:gap-20 px-4">
                <h2 className="max-w-3xl font-black text-4xl md:text-5xl tracking-[-0.01em]">
                    Features to help you create<br/>the best{' '}
                    <span className="underline decoration-dashed underline-offset-8 decoration-base-300">
                        team environment
                    </span>
                </h2>
                <div className="flex flex-col w-full h-fit gap-4 lg:gap-10 text-text-default max-w-[82rem]">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-10">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className={`${feature.styles} rounded-3xl flex flex-col gap-6 w-full h-[22rem] lg:h-[25rem] pt-6 overflow-hidden group`}
                            >
                                <div className="px-6 space-y-2">
                                    <h3 className="font-bold text-xl lg:text-3xl tracking-tight">
                                        {feature.title}
                                    </h3>
                                    <p className="opacity-80">{feature.description}</p>
                                </div>
                                {feature.demo}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FeaturesGrid;