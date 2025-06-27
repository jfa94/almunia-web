import Link from 'next/link'
import CalibrationForm from './components/CalibrationForm'
import questions from "@/app/calibration/questions.json"
import {getCompanyInformation} from "@/lib/actions";


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


export default async function Page({searchParams}) {
    const {form: showForm} = await searchParams
    const {company_id: companyId} = await getCompanyInformation()
    const questionSubset = getRandomSubset(questions, companyId ? 12 : 3)

    return <div className="my-8 min-h-[60vh]">
        <section className="container mx-auto px-4 md:mb-6 mb-4">
            {!showForm && <>
                <h1 className="text-3xl font-bold pb-6">Welcome to the Calibration Form</h1>

                <div className="flex flex-col gap-4 pb-6">
                    <p>
                        Thanks for using the Culture Calibration Tool! This brief assessment is designed to help you
                        frame your company&#39;s desired culture through a series of statements rated on a scale from 1
                        (strongly disagree) to 5 (strongly agree). Your responses will be used to map your company
                        across several dimensions, providing valuable insights into your organization&#39;s preferred
                        culture. The form will take around {companyId ? '15' : '5'} minutes to complete.
                    </p>

                    <p>
                        This questionnaire should be answered by the individual responsible for defining your
                        organization&#39;s culture—whether that&#39;s the CEO, Head of Human Resources, or another key
                        leader—your perspective is crucial for this evaluation. Please answer each question according to
                        how you believe your company should ideally operate, not necessarily how it currently functions.
                    </p>

                    {!companyId && <p>
                        Please note that this is an abbreviated version of our comprehensive assessment; for a more
                        detailed cultural evaluation and additional insights, we invite you to sign up for our full
                        service.
                    </p>}
                </div>

                <Link href="/calibration?form=true">
                    <button className="btn btn-primary">
                        Start the Questionnaire
                    </button>
                </Link>
            </>}
            {showForm && <>
                <section className="container mx-auto md:mb-6 mb-4">
                    <h1 className="text-3xl font-bold">Calibration</h1>
                </section>
                <CalibrationForm questions={questionSubset}/>
            </>}
        </section>
    </div>
}