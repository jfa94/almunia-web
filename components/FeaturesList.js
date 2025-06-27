/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import Link from "next/link";

const features = [
    {
        title: "Define your ideal culture",
        description: "Our Culture Calibration Tool helps you easily understand your ideal culture and break it down across several dimensions.",
        // description: "Identify core values that resonate with your mission and translate them into concrete behaviors and practices that guide daily work.",
        image: <div className="w-full h-full flex justify-center items-center">
            <Image
                src="/landing/calibration-form.png"
                alt="Calibration questionnaire and the resulting breakdown of a company's culture"
                height={450}
                width={600}
                className="m-auto"
            />
        </div>,
        bulletPoints: [
            "Simple questionnaire to define your ideal culture",
            "Adopt a research-led approach",
            "Understand the advantages and risks of your culture",
        ],
        url: '/calibration',
        buttonText: 'Start questionnaire'
    },
    {
        title: "Easy anonymous feedback",
        description: "Automated daily surveys help you understand how your team is feeling, with insights that lead to meaningful action.",
        image: <div className="w-full h-full flex justify-center items-center">
            <Image
                src="/landing/survey-email.png"
                alt="Analytics dashboard showing cultural metrics over time"
                height={450}
                width={600}
                className="m-auto p-2"
            />
        </div>,
        bulletPoints: [
            "Surveys your team can answer with a single click",
            "Regular feedback ensures insights are always up to date",
            "Understand how your culture is perceived by your team"
        ]
    },
    {
        title: "Track progress over time",
        comingSoon: true,
        description: "Measure the impact of your changes with our analytics dashboard, which helps you track survey responses and organisational health over time.",
        image: <div className="w-full h-full flex justify-center items-center"><Image
            src="/landing/tracking.png"
            alt="Analytics dashboard showing cultural metrics over time"
            height={450}
            width={700}
            className="m-auto p-2"
        /></div>,
        bulletPoints: [
            "Understand how your culture is evolving over time",
            "Compare your ideal culture with your employees' perception",
            "Track key health metrics such as Engagement"
        ]
    },
    // {
    //     title: "Implement best practices",
    //     description: "Access research-backed templates and workflows to develop policies that reinforce your desired culture and improve employee experience.",
    //     image: "/landing/reporting-mockup.png", // Placeholder path - create or replace with actual image
    //     alt: "Best practices library and implementation tools",
    //     bulletPoints: [
    //         "Choose from proven cultural initiatives",
    //         "Track implementation progress",
    //         "Measure the impact of your changes"
    //     ]
    // },
    {
        title: "Integrate with your existing stack",
        comingSoon: true,
        description: "Keep your data synced by connecting Almunia with your existing Human Capital Management software.",
        image: <div
            className="grid grid-cols-2 gap-10 h-full p-2 [&>img]:flex [&>img]:justify-center [&>img]:items-center [&>img]:m-auto">
            <Image src="/landing/logos/adp-logo.png"
                   alt="ADP Logo"
                   priority={true}
                   height={175}
                   width={200}
            />
            <Image src="/landing/logos/workday-logo.png"
                   alt="Workday Logo"
                   priority={true}
                   height={200}
                   width={500}
            />
            <Image src="/landing/logos/oracle-logo.png"
                   alt="Oracle Logo"
                   priority={true}
                   height={200}
                   width={600}
            />
            <Image src="/landing/logos/dayforce-logo.png"
                   alt="Dayforce Logo"
                   priority={true}
                   height={200}
                   width={600}
            />
        </div>,
        bulletPoints: [
            "Seamless data synchronization",
            "Connect with major HCM platforms",
            "No manual data entry required"
        ]
    },
];

const FeaturesList = () => {
    return (
        <section id="features" className="w-full bg-base-200/30 text-base-content py-14 lg:py-20">
            <div className="container mx-auto px-4 flex flex-col gap-16 md:gap-24">

                <div className="text-left max-w-2xl">
                    <h2 className="font-black text-4xl md:text-5xl tracking-[-0.01em]">
                        Features to create the best{' '}
                        <span className="underline decoration-dashed underline-offset-8 decoration-base-300">
                        team environment
                    </span>
                    </h2>
                </div>

                <div className="flex flex-col lg:gap-32 gap-24">
                    {features.map((feature, index) => (
                        <div
                            key={feature.title}
                            className={`flex flex-col-reverse ${
                                index % 2 === 0 ? "lg:flex-row-reverse" : "lg:flex-row"
                            } gap-8 lg:gap-12 items-center`}
                        >
                            {/* Text content */}
                            <div className="lg:w-1/2 space-y-6">
                                {feature.comingSoon && <div
                                    className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
                                    Coming soon
                                </div>}
                                <h3 className="text-3xl font-bold tracking-tight text-base-content">
                                    {feature.title}
                                </h3>
                                <p className="text-lg text-base-content/80 max-w-lg">
                                    {feature.description}
                                </p>

                                <ul className="space-y-2 pt-2">
                                    {feature.bulletPoints.map((point, i) => (
                                        <li key={i} className="flex items-start">
                                            <svg className="w-5 h-5 text-primary mt-1 mr-2" fill="currentColor"
                                                 viewBox="0 0 20 20">
                                                <path fillRule="evenodd"
                                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                      clipRule="evenodd"></path>
                                            </svg>
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>

                                {feature.url && <div className="pt-4">
                                    <Link href={feature.url}>
                                        <button
                                            className="btn btn-primary">{feature.buttonText ?? 'Learn more'}</button>
                                    </Link>
                                </div>}

                            </div>

                            {/* Image/visual */}
                            <div className="relative h-full w-full lg:w-1/2">
                                <div
                                    className={`h-[300px] xl:h-[400px] w-full p-2 xl:p-6 rounded-2xl overflow-hidden shadow-xl border border-base-300 ${
                                        index % 2 === 0 ? "bg-base-200/50 " : "bg-base-content"
                                    }`}
                                >
                                    {feature.image ?? <></>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FeaturesList;
