import {createNewItem, getCompanyData} from "@/lib/actions"
import {redirect} from "next/navigation";
import {DataTable} from "@/components/DataTable";
import {columns} from "./columns.js"
import {AddRowModal} from "@/app/account/components/AddRowModal";
import {v4 as uuidv4} from "uuid";


// const demoData = [
//     {
//         "company_id": "C-1i19vvu1qt8otual7op8",
//         "active": true,
//         "user_id": "42c3f5e8-6bc5-4849-a952-570e268235c8",
//         "role": "Director",
//         "last_name": "Flores",
//         "first_name": "Javier",
//         "email": "jflores@almunia.io"
//     },
//     {
//         "company_id": "C-1i19vvu1qt8otual7op8",
//         "active": true,
//         "user_id": "6b72fd5b-5838-4506-844a-68a5a30deac0",
//         "last_name": "Flores",
//         "email": "j.flores.almagro@gmail.com",
//         "first_name": "Javier"
//     },
// ]


export default async function TeamInformation({companyId}) {
    const request = await getCompanyData(companyId, 'team')
    // const request = demoData

    if (!request[0]?.email) {
        console.error('Issue with getTeamData. Returned:', request)
        redirect('/?error=account')
    }

    const formColumns = [
        {accessorKey: "email", headerText: "Email", required: true},
        {accessorKey: "first_name", headerText: "First Name"},
        {accessorKey: "last_name", headerText: "Last Name"},
        {accessorKey: "role", headerText: "Role"},
        {accessorKey: "manager", headerText: "Manager"}
    ]

    const createTeamMember = async ({firstName, lastName, email, role, manager}) => {
        "use server";
        const teamMemberData = {
            company_id: companyId,
            active: true,
            user_id: uuidv4(),
            first_name: firstName,
            last_name: lastName,
            email: email,
            role: role,
            manager: manager

        }
        return await createNewItem(companyId, 'team', teamMemberData)
    }

    return <section>
        <DataTable
            title="Team"
            columns={columns}
            data={request}
            filterColumn="email"
            NewRowModal={AddRowModal}
            newRowColumns={formColumns}
            newRowFunction={createTeamMember}
        />
    </section>

}