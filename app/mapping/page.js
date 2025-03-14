import CalibrationForm from './components/CalibrationForm'
import questions from "@/app/mapping/questions.json"


const getRandomSubset = (arr, sizePerDimension) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random())

    const uniqueKeys = [...new Set(questions.map(({id}) => {
        return id.substring(0, id.lastIndexOf('-'));
    }))]

    const selectedIds = uniqueKeys.map((key) => {
        const numbers = Array.from(
            {length: 9},
            (_, i) => i + 1
        ).sort(() => 0.5 - Math.random()).slice(0, sizePerDimension)
        return numbers.map(num => `${key}-${num}`)
    }).flat()

    return shuffled.filter(({id}) => selectedIds.includes(id))
}

const questionSubset = getRandomSubset(questions, 3)

export default function Page() {
    return <div className="my-8">
        <section className="container mx-auto md:mb-6 mb-4">
            <h1 className="text-3xl font-bold">Calibration</h1>
        </section>
        <CalibrationForm questions={questionSubset}/>
    </div>
}