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
            NewRowModal={AddRowModal}
            newRowColumns={formColumns}
            newRowFunction={createValue}
        />
    </section>

}