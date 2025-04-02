import RadarGraph from "@/app/calibration/components/RadarGraph";
import SpectrumCard from "@/app/calibration/components/SpectrumCard";

const dummyData = {
    "local-professional-identity": 1,
    "means-goals-oriented": 3.3333333333333335,
    "open-closed-system": 4,
    "people-task-oriented": 2,
    "easygoing-strict-work-ethic": 1.3333333333333335,
    "internal-external-driven": 2.6666666666666665
}

const dummyEmployeeData = {
    "local-professional-identity": 1.5,
    "means-goals-oriented": 4,
    "open-closed-system": 2.5,
    "people-task-oriented": 2.3,
    "easygoing-strict-work-ethic": 2,
    "internal-external-driven": 4
}

export default function Page() {
    return <div className="my-8">
        <section className="container mx-auto mb-4">
            <h1 className="text-3xl font-bold">Results</h1>
        </section>
        <section className="container mx-auto grid md:grid-cols-3 grid-cols-1">
            <div className="col-span-2 h-full flex justify-center items-center">
                <RadarGraph inputData={[dummyData, dummyEmployeeData]}/>
            </div>

            <div className="flex flex-col gap-6">
                {
                    Object.entries(dummyData).map(([key, value]) => {
                        const increasePositive = value > 3
                        return <SpectrumCard key={key} id={key} value={value} increasePositive={increasePositive}/>
                    })
                }
            </div>
        </section>
    </div>
}