/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";

const features = [
    {
        title: "Define your culture",
        description: "Use our tools to understand and develop a values-led culture.",
        image: "/landing/reporting-mockup.png", // Placeholder path - create or replace with actual image
        alt: "Values definition interface showing a workspace for defining company culture",
    },
    {
        title: "Track progress over time",
        description: "Get feedback from your team in one click. Keep track of how your culture is evolving.",
        image: "/landing/reporting-mockup.png",
        alt: "Analytics dashboard showing cultural metrics over time",
    },
    {
        title: "Integrate with existing tools",
        comingSoon: true,
        description: "Keep your data synced by linking your existing Human Capital Management software.",
        image: "/landing/reporting-mockup.png", // Placeholder path - create or replace with actual image
        alt: "Integration diagram showing connections to various HR platforms",
    },
];

const FeaturesList = () => {
    return (
        <section className="w-full bg-base-200/50 text-base-content py-20 lg:py-32">
            <div className="container mx-auto px-4 flex flex-col gap-24">

                <h2 className="max-w-3xl font-black text-4xl md:text-5xl tracking-[-0.01em]">
                    Features to help you create<br/>the best{' '}
                    <span className="underline decoration-dashed underline-offset-8 decoration-base-300">
                        team environment
                    </span>
                </h2>

                <div className="flex flex-col lg:gap-12 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={feature.title}
                            className={`flex flex-col ${
                                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
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
                                <div className="pt-4">
                                    <button className="btn btn-primary">Learn more</button>
                                </div>
                            </div>

                            {/* Image/visual */}
                            <div className="lg:w-1/2">
                                <div
                                    className="rounded-2xl overflow-hidden shadow-xl bg-base-200/50 border border-base-300">
                                    {feature.image && (
                                        <div className="relative h-[300px] md:h-[400px]">
                                            <Image
                                                src={feature.image}
                                                alt={feature.alt}
                                                fill
                                                style={{objectFit: "contain"}}
                                                className="p-6"
                                            />
                                        </div>
                                    )}
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
