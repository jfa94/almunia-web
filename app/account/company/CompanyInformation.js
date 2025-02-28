import {getCompanyInformation} from "@/lib/actions"
import {redirect} from "next/navigation";
import {DataTable} from "@/components/DataTable";
import {columns} from "./columns.js"

const demoData = {
    "identity_id": "eu-west-1:3128101b-2c78-c194-7555-0d86a4c27901",
    "company_id": "C-1i19vvu1qt8otual7op8",
    "company_name": "Almunia",
    "company_mission": "",
    "company_vision": ""
}


export default async function CompanyInformation() {
    // TODO: Change for prod
    // const {id, item} = await getCompanyInformation()
    const {id, item} = {id: "eu-west-1:3128101b-2c78-c194-7555-0d86a4c27901", item: demoData}
    if (!item) {
        console.error('Issue with getCompanyInformation. Returned:', {id, item})
        redirect('/?error=account')
    }

    return <section>
            <DataTable title="Company" columns={columns} data={[item]}/>
    </section>

}