import {getCompanyData} from "@/lib/actions"
import {redirect} from "next/navigation";
import {DataTable} from "@/components/DataTable";
import {columns} from "./columns.js"

const demoData = [
    {
        "company_id": "C-1i19vvu1qt8otual7op8",
        "value_id": "fun",
        "description": "Being fun is top tier",
        "name": "Fun"
    },
    {
        "company_id": "C-1i19vvu1qt8otual7op8",
        "value_id": "hot",
        "description": "",
        "name": "Hot"
    }
]


export default async function ValuesInformation({companyId}) {
    // TODO: Change for prod
    // const request = await getCompanyData(companyId, 'values')
    const request = demoData
    // TODO: Add a better error check
    if (!request) {
        console.error('Issue with getValuesData. Returned:', request)
        redirect('/?error=account')
    }

    return <section>
        <div className="flex flex-col gap-2">
            <h1 className="subheading p-0">Values</h1>
            <DataTable columns={columns} data={request}/>
        </div>
    </section>

}