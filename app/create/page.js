import {redirect} from "next/navigation";
import {getCompanyInformation} from "@/lib/actions";

const Create = async () => {
    const createNewCid = async () => {
        'use server';
        const {company_id: companyId, identity_id: id} = await getCompanyInformation()

        if (!id) {
            console.error('Issue with getCompanyInformation. Returned identity id:', id)
            redirect('/?error=create')
        } else if (!companyId) {
            const newCid = "C-" + Date.now().toString(32) + Math.random().toString(32).slice(2)
            console.log('Create CID', newCid, 'for identity id:', id)
            redirect(`/onboarding?cid=${newCid}`)
        }

        redirect(`/onboarding?cid=${companyId}`)
    }

    return <div className="h-dvh w-dvw flex flex-row gap-4 justify-center items-center">
        {createNewCid()}
        <p>Setting up your account</p>
        <span className="loading loading-dots loading-md"></span>
    </div>
}

export default Create;