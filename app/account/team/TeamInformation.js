import CustomTable from "@/app/account/components/CustomTable"
import {RiPencilFill} from "@remixicon/react"
import {getCompanyData} from "@/lib/actions"
import {redirect} from "next/navigation";

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

const tableHeaders = ['First Name', 'Last Name', 'Email', 'Role', 'Manager', 'Active']

export default async function TeamInformation({companyId}) {
    let teamArray = []

    // TODO: Change for prod
    // const request = await getCompanyData(companyId, 'team')
    const request = demoData
    if (!request[0]?.email) {
        console.error('Issue with getTeamData. Returned:', request)
        redirect('/?error=account')
    } else {
        for (let row of request) {
            teamArray.push({
                'firstName': row.first_name,
                'lastName': row.last_name,
                'email': row.email,
                'role': row.role,
                'manager': row.manager,
                'active': row.active ? 'Yes' : 'No'
            })
        }
    }

    return <section>
        <div className="flex flex-row gap-2 items-center pb-2">
            <h1 className="subheading p-0">Team</h1>
            <div className="link"><RiPencilFill/></div>
        </div>
        <CustomTable headers={tableHeaders} rows={teamArray} rowLimit={5}/>
    </section>

}