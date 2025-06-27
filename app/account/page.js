import {redirect} from "next/navigation";
import TeamInformation from "@/app/account/team/TeamInformation"
import UserInformation from "@/app/account/user/UserInformation";
import ValuesInformation from "@/app/account/values/ValuesInformation";
import QuestionInformation from "@/app/account/questions/QuestionInformation";
import CompanyInformation from "@/app/account/company/CompanyInformation";
import {Toaster} from "react-hot-toast";
import {getCompanyInformation} from "@/lib/actions";

export default async function Page() {
    const {company_id: companyId} = await getCompanyInformation()

    if (!companyId) {
        console.error('Issue with getCompanyInformation. Returned:', companyId)
        redirect('/?error=cid')
    }

    return <main className="container m-auto pb-6 md:pb-8 min-h-[75svh]">
        <Toaster/>
        <section id="account" className="mt-4 lg:mt-8 flex flex-col gap-6 md:gap-10 px-4">
            <UserInformation/>
            <CompanyInformation/>
            <ValuesInformation companyId={companyId}/>
            <QuestionInformation companyId={companyId}/>
            <TeamInformation companyId={companyId}/>
        </section>
    </main>

}