import {redirect} from "next/navigation";
import {getCompanyInformation} from "@/lib/actions";

const Create = async () => {
    const createNewCid = async () => {
        'use server';
        const {item, id} = await getCompanyInformation()

        if (!item) {
            console.error('Issue with getCompanyInformation. Returned:', item)
            redirect('/?error=create')
        } else if (!item.company_id) {
            const newCid = "C-" + Date.now().toString(32) + Math.random().toString(32).slice(2)
            console.log('Create CID', newCid, 'for identity id:', id)
            redirect(`/onboarding?cid=${newCid}`)
        }

        redirect(`/onboarding?cid=${item.company_id}`)
    }

    return <div className="h-dvh w-dvw flex flex-row gap-4 justify-center items-center">
        {createNewCid()}
        <p>Setting up your account</p>
        <span className="loading loading-dots loading-md"></span>
    </div>
}

export default Create;