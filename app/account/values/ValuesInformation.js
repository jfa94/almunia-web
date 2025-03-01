import {createNewItem, getCompanyData} from "@/lib/actions"
import {redirect} from "next/navigation";
import {DataTable} from "@/components/DataTable";
import {columns} from "./columns.js"
import {toCamelCase} from "@/lib/utils";
import {AddRowModal} from "@/app/account/components/AddRowModal";

const demoData = [
    {
        "company_id": "C-1i19vvu1qt8otual7op8",
        "value_id": "fun",
        "description": "Being fun is top tier",
        "name": "Fun"
    },
    {
        "company_id": "C-1i19vvu1qt8otual7op8",
        "value_id": "jsat",
        "description": "",
        "name": "Job Satisfaction"
    }
]


export default async function ValuesInformation({companyId}) {
    const request = await getCompanyData(companyId, 'values')
    // const request = demoData

    if (!request[0].company_id) {
        console.error('Issue with getValuesData. Returned:', request)
        redirect('/?error=account')
    }

    const formColumns = [
        {accessorKey: "name", headerText: "Name", required: true},
        {accessorKey: "description", headerText: "Description"}
    ]

    const createValue = async ({name, description}) => {
        "use server";
        const valueData = {
            company_id: companyId,
            value_id: toCamelCase(name),
            name: name,
            description: description,
        }
        return await createNewItem(companyId, 'values', valueData)
    }

    return <section>
        <DataTable
            title="Values"
            columns={columns}
            data={request}
            pageSize={5}
            NewRowModal={AddRowModal}
            newRowColumns={formColumns}
            newRowFunction={createValue}
        />
    </section>

}