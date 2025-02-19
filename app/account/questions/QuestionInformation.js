import CustomTable from "@/app/account/components/CustomTable"
import {RiPencilFill} from "@remixicon/react"
import {getCompanyData} from "@/lib/actions"
import {redirect} from "next/navigation";
import {EditModal} from "@/app/account/components/EditModal";

const demoData = {
    "vision": {
        "questions": [
            {
                "question": "I feel excited about our organisation's future",
                "id": "vision0",
                "last_asked": "2000-01-01T00:00:00.000Z"
            },
            {
                "question": "Our organisation's current direction will eventually achieve our mission",
                "id": "vision1",
                "last_asked": "2000-01-01T00:00:00.000Z"
            },
            {
                "question": "I have clarity on the direction our organisation is going",
                "id": "vision2",
                "last_asked": "2025-01-24T15:26:06.578Z"
            }
        ],
        "question_count": 3,
        "last_asked": "2025-01-24T15:26:06.578Z",
        "value_name": "Vision"
    },
    "mission": {
        "questions": [
            {
                "question": "I feel inspired by our mission",
                "id": "mission0",
                "last_asked": "2000-01-01T00:00:00.000Z"
            },
            {
                "question": "I am familiar with our mission",
                "id": "mission1",
                "last_asked": "2000-01-01T00:00:00.000Z"
            },
            {
                "question": "My work contributes to our mission",
                "id": "mission2",
                "last_asked": "2000-01-01T00:00:00.000Z"
            },
            {
                "question": "I feel proud to work here",
                "id": "mission3",
                "last_asked": "2025-01-27T08:26:13.203Z"
            }
        ],
        "question_count": 4,
        "last_asked": "2025-01-27T08:26:13.203Z",
        "value_name": "Mission"
    }
}

const tableHeaders = ['Theme', 'Question', 'Last Asked']

export default async function QuestionInformation({companyId}) {
    let questionArray = []

    // TODO: Change for prod
    // const request = await getCompanyData(companyId, 'questions')
    const request = demoData
    // TODO: Add a better error check
    if (!request) {
        console.error('Issue with getCompanyData. Returned:', request)
        redirect('/?error=account')
    } else {
        for (let key of Object.keys(request)) {
            for (let question of request[key].questions) {
                let lastAsked = new Date(question.last_asked)
                const dateFormat = {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                }
                questionArray.push({
                    theme: request[key].value_name,
                    question: question.question,
                    lastAsked: lastAsked.toLocaleDateString('en-GB', dateFormat)
                })
            }
        }
    }

    return <section>
        <CustomTable title="Questions" headers={tableHeaders} rows={questionArray} rowLimit={5} data={request}/>
    </section>

}