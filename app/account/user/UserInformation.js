import {getUserData} from "@/lib/auth";
import {redirect} from "next/navigation";
import {DataTable} from "@/components/DataTable";
import {columns} from "./columns.js"

const sampleData = {
    "email": "j.flores.almagro@gmail.com",
    "email_verified": "true",
    "name": "Javier Flores",
    "custom:company-id": "C-1i19vvu1qt8otual7op8",
    "custom:company": "Almunia",
    "sub": "828564a4-90e1-70e0-b53b-dba7201b44d9"
}


export default async function UserInformation() {
    // TODO: Change for prod
    // const user = await getUserData()
    const user = sampleData

    if (!user?.sub) {
        console.error('Issue with getUserData. Returned:', user)
        redirect('/?error=account')
    }

    return <section>
        <DataTable title="Admin Information" columns={columns} data={[user]}/>
    </section>

}