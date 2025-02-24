import {getCompanyData} from "@/lib/actions"
import {redirect} from "next/navigation";
import {DataTable} from "@/components/DataTable";
import {columns} from "./columns.js"

const demoData = [
    {
        "company_id": "C-1i19vvu1qt8otual7op8",
        "question_id": "develop3",
        "last_asked": "2000-01-01T00:00:00.000Z",
        "question": "My organisation is committed to my professional development",
        "value_id": "develop"
    },
    {
        "company_id": "C-1i19vvu1qt8otual7op8",
        "question_id": "develop0",
        "last_asked": "2000-01-01T00:00:00.000Z",
        "question": "I am making progress towards my career goals",
        "value_id": "develop"
    },
    {
        "company_id": "C-1i19vvu1qt8otual7op8",
        "question_id": "develop1",
        "last_asked": "2000-01-01T00:00:00.000Z",
        "question": "I am learning and developing new skills",
        "value_id": "develop"
    },
    {
        "company_id": "C-1i19vvu1qt8otual7op8",
        "question_id": "incl0",
        "last_asked": "2000-01-01T00:00:00.000Z",
        "question": "Opportunities are allocated fairly",
        "value_id": "incl"
    },
    {
        "company_id": "C-1i19vvu1qt8otual7op8",
        "question_id": "jsat0",
        "last_asked": "2000-01-01T00:00:00.000Z",
        "question": "Overall, I am satisfied with my job right now",
        "value_id": "jsat"
    },
    {
        "company_id": "C-1i19vvu1qt8otual7op8",
        "question_id": "leadership0",
        "last_asked": "2000-01-01T00:00:00.000Z",
        "question": "We have the right leadership in place to achieve our goals",
        "value_id": "leadership"
    }
]

const demoVals = [
    {
        "company_id": "default",
        "name": "Development",
        "value_id": "develop"
    },
    {
        "company_id": "default",
        "name": "Inclusion",
        "value_id": "incl"
    },
    {
        "company_id": "default",
        "name": "Job Satisfaction",
        "value_id": "jsat"
    },
    {
        "company_id": "default",
        "name": "Leadership",
        "value_id": "leadership"
    },
    {
        "company_id": "default",
        "name": "Mission",
        "value_id": "mission"
    },
    {
        "company_id": "default",
        "name": "Manager Satisfaction",
        "value_id": "msat"
    },
    {
        "company_id": "default",
        "name": "Vision",
        "value_id": "vision"
    }
]

export default async function QuestionInformation({companyId}) {
    // TODO: Change for prod
    // const questionsRequest = await getCompanyData(companyId, 'questions')
    const questionsRequest = demoData
    // const valuesRequest = await getCompanyData(companyId, 'values')
    const valuesRequest = demoVals
    // TODO: Add a better error check
    if (!questionsRequest || !valuesRequest) {
        console.error('Issue with getCompanyData. Returned:', questionsRequest)
        redirect('/?error=account')
    }

    const data = questionsRequest.map((question) => {
        const valueObject = valuesRequest.find(value => value.value_id === question.value_id)
        question.theme = valueObject?.name || ""
        return question
    })

    return <section>
        <div className="flex flex-col gap-2">
            <h1 className="subheading p-0">Questions</h1>
            <DataTable columns={columns} data={data} pageSize={5} filterColumn="question"/>
        </div>
    </section>

}