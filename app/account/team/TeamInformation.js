import {getCompanyData} from "@/lib/actions"
import {redirect} from "next/navigation";
import {DataTable} from "@/components/DataTable";
import {columns} from "./columns.js"

const demoData = [
    {
        "company_id": "C-1i19vvu1qt8otual7op8",
        "active": true,
        "user_id": "42c3f5e8-6bc5-4849-a952-570e268235c8",
        "role": "Director",
        "last_name": "Flores",
        "first_name": "Javier",
        "email": "jflores@almunia.io"
    },
    {
        "company_id": "C-1i19vvu1qt8otual7op8",
        "active": true,
        "user_id": "6b72fd5b-5838-4506-844a-68a5a30deac0",
        "last_name": "Flores",
        "email": "j.flores.almagro@gmail.com",
        "first_name": "Javier"
    },
]


export default async function TeamInformation({companyId}) {
    // TODO: Change for prod
    const request = await getCompanyData(companyId, 'team')
    // const request = demoData
    if (!request[0]?.email) {
        console.error('Issue with getTeamData. Returned:', request)
        redirect('/?error=account')
    }

    return <section>
        {/*<CustomTable title="Team" headers={tableHeaders} rows={teamArray} rowLimit={5} data={request}/>*/}
        <div className="flex flex-col gap-2">
            <h1 className="subheading p-0">Team</h1>
            <DataTable columns={columns} data={request} filterColumn="email"/>
        </div>
    </section>

}