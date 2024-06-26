import {redirect} from "next/navigation";
import {checkForCompany} from "@/app/create/actions";
import {auth} from "@/auth";

const Create = async () => {
    const session = await auth()

    const createNewCid = async () => {
        'use server';
        const existingInfo = await checkForCompany()

        if (!existingInfo.company_id) {
            const newCid = "C-" + Date.now().toString(32) + Math.random().toString(32).slice(2)
            console.log('Generated new CID for user', session.user.id, ':', newCid)
            redirect(`/onboarding?cid=${newCid}`)
        }

        redirect(`/onboarding?cid=${existingInfo.company_id}`)
    }

    return <div className="h-dvh w-dvw flex flex-row gap-4 justify-center items-center">
        {createNewCid()}
        <p>Setting up your account</p>
        <span className="loading loading-dots loading-md"></span>
    </div>
}

export default Create;