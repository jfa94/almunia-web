import {createNewItem, getCompanyData} from "@/lib/actions"
import {redirect} from "next/navigation";
import {DataTable} from "@/components/DataTable";
import {columns} from "./columns.js"
// import {v4 as uuidv4} from "uuid";
import {AddRowModal} from "@/app/account/components/AddRowModal";

// const demoData = [
//     {
//         "company_id": "C-1i19vvu1qt8otual7op8",
//         "question_id": "develop3",
//         "last_asked": "2000-01-01T00:00:00.000Z",
//         "question": "My organisation is committed to my professional development",
//         "value_id": "develop"
//     },
//     {
//         "company_id": "C-1i19vvu1qt8otual7op8",
//         "question_id": "develop0",
//         "last_asked": "2000-01-01T00:00:00.000Z",
//         "question": "I am making progress towards my career goals",
//         "value_id": "develop"
//     },
//     {
//         "company_id": "C-1i19vvu1qt8otual7op8",
//         "question_id": "develop1",
//         "last_asked": "2000-01-01T00:00:00.000Z",
//         "question": "I am learning and developing new skills",
//         "value_id": "develop"
//     },
//     {
//         "company_id": "C-1i19vvu1qt8otual7op8",
//         "question_id": "incl0",
//         "last_asked": "2000-01-01T00:00:00.000Z",
//         "question": "Opportunities are allocated fairly",
//         "value_id": "incl"
//     },
//     {
//         "company_id": "C-1i19vvu1qt8otual7op8",
//         "question_id": "jsat0",
//         "last_asked": "2000-01-01T00:00:00.000Z",
//         "question": "Overall, I am satisfied with my job right now",
//         "value_id": "jsat"
//     },
//     {
//         "company_id": "C-1i19vvu1qt8otual7op8",
//         "question_id": "leadership0",
//         "last_asked": "2000-01-01T00:00:00.000Z",
//         "question": "We have the right leadership in place to achieve our goals",
//         "value_id": "leadership"
//     }
// ]
//
// const demoVals = [
//     {
//         "company_id": "default",
//         "name": "Development",
//         "value_id": "develop"
//     },
//     {
//         "company_id": "default",
//         "name": "Inclusion",
//         "value_id": "incl"
//     },
//     {
//         "company_id": "default",
//         "name": "Job Satisfaction",
//         "value_id": "jsat"
//     },
//     {
//         "company_id": "default",
//         "name": "Leadership",
//         "value_id": "leadership"
//     },
//     {
//         "company_id": "default",
//         "name": "Mission",
//         "value_id": "mission"
//     },
//     {
//         "company_id": "default",
//         "name": "Manager Satisfaction",
//         "value_id": "msat"
//     },
//     {
//         "company_id": "default",
//         "name": "Vision",
//         "value_id": "vision"
//     }
// ]

export default async function QuestionInformation({companyId}) {
    const questionsRequest = await getCompanyData(companyId, 'questions')
    // const questionsRequest = demoData
    const valuesRequest = await getCompanyData(companyId, 'values')
    // const valuesRequest = demoVals

    if (!questionsRequest[0].company_id || !valuesRequest[0].company_id) {
        console.error('Issue whilst getting question data. Returned:', questionsRequest)
        redirect('/?error=account')
    }

    const data = questionsRequest.map((question) => {
        const valueObject = valuesRequest.find(value => value.value_id === question.value_id)
        question.theme = valueObject?.name || ""
        return question
    })

    const possibleValues = []
    for (const val of valuesRequest) {
        possibleValues.push({id: val.value_id, value: val.name})
    }

    const formColumns = [
        {accessorKey: "value_id", headerText: "Value", required: true, possibleVals: possibleValues},
        {accessorKey: "question", headerText: "Question", required: true}
    ]

    const createQuestion = async ({value_id, question}) => {
        "use server";
        const newQuestionData = {
            company_id: companyId,
            value_id: value_id,
            question_id: `${value_id}${Math.floor(Math.random() * 10000000000000000)}`,
            last_asked: "2000-01-01T00:00:00.000Z",
            question: question,
        }
        return await createNewItem(companyId, 'questions', newQuestionData)
    }

    return <section>
        <DataTable
            title="Questions"
            columns={columns}
            data={data}
            filterColumn="question"
            pageSize={5}
            NewRowModal={AddRowModal}
            newRowColumns={formColumns}
            newRowFunction={createQuestion}
        />
    </section>
}