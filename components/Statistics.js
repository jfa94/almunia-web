import {Users, DoorOpen, HandCoins} from "lucide-react";

const Statistics = () => {
    const stats = [
        {
            percentage: "89%",
            icon: <Users size={52}/>,
            metric: "engagement",
            description: "at companies with dedicated culture programmes (vs 31% average)."
        },
        {
            percentage: "43%",
            icon: <DoorOpen size={52}/>,
            metric: "less attrition",
            description: "when a company is in the top 25% of employee engagement."
        },
        {
            percentage: "23%",
            icon: <HandCoins size={52}/>,
            metric: "higher profitability",
            description: "when a company is in the top 25% of employee engagement."
        },
    ]

    return (
        <section className="bg-white py-16">
            <div
                className="container mx-auto px-4 flex flex-col gap-6 lg:gap-12 text-base-content/70 text-left lg:text-center text-lg">

                <div className="text-center">
                    <h2>
                        The numbers speak for themselves
                    </h2>

                    <p className="mt-2">
                        Culture drives business performance
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
                    {stats.map((stat, index) => (
                        <div key={index}
                             className="grid grid-cols-5 lg:grid-cols-1 items-center gap-6 lg:gap-1 p-6 lg:py-8 rounded-lg border border-base-200 transition-all shadow hover:shadow-md">
                            <div className="flex flex-col md:flex-row lg:flex-col md:gap-4 lg:gap-1 col-span-2">
                                <div className="hidden lg:flex justify-center items-center mb-2">
                                    {stat.icon}
                                </div>
                                <h3 className="text-amber-600">
                                    {stat.percentage}
                                </h3>
                                <h4 className="font-semibold text-amber-600 lg:mb-2 white">{stat.metric}</h4>
                            </div>
                            <div className="col-span-3">
                                <p className="lg:text-center text-base-content/70 white">{stat.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <p className="max-w-2xl xl:max-w-4xl mx-auto">
                        Despite this, less than a quarter of companies have a strategy to influence their culture.
                        Almunia helps you be part of the successful minority.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Statistics;
