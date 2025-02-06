import CustomTable from "@/app/account/components/CustomTable"
import {RiPencilFill} from "@remixicon/react"
import {getCompanyData} from "@/lib/actions"
import {redirect} from "next/navigation";

const demoData = {
    "Hot": "Hotness is important",
    "Fun": "but fun is more important"
}

const tableHeaders = ['Value Name', 'Description']

export default async function ValuesInformation({companyId}) {
    let valuesArray = []

    // TODO: Change for prod
    // const request = await getCompanyData(companyId, 'values')
    const request = demoData
    // TODO: Add a better error check
    if (!request) {
        console.error('Issue with getValuesData. Returned:', request)
        redirect('/?error=account')
    } else {
        for (let key of Object.keys(request)) {
            valuesArray.push({
                valueName: key,
                description: request[key]
            })
        }
    }

    return <section>
        <div className="flex flex-row gap-2 items-center pb-2">
            <h1 className="subheading p-0">Values</h1>
            <div className="link"><RiPencilFill/></div>
        </div>
        <CustomTable headers={tableHeaders} rows={valuesArray} />
    </section>

}