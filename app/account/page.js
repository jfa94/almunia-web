import {redirect} from "next/navigation";
import TeamInformation from "@/app/account/team/TeamInformation"
import UserInformation from "@/app/account/user/UserInformation";
import ValuesInformation from "@/app/account/values/ValuesInformation";
import QuestionInformation from "@/app/account/questions/QuestionInformation";
import CompanyInformation from "@/app/account/company/CompanyInformation";
import {Toaster} from "react-hot-toast";
import {getCompanyInformation} from "@/lib/actions";

export default async function Page() {
    const {item: company} = await getCompanyInformation()

    if (!company?.company_id) {
        console.error('Issue with getCompanyInformation. Returned:', company)
        redirect('/?error=cid')
    }

    return <main className="container m-auto pb-6 md:pb-8 min-h-[75svh]">
        <Toaster/>
        <section className="flex flex-col gap-6 md:gap-10">
            <h1 className="heading pb-0">Account</h1>
            <UserInformation/>
            <CompanyInformation/>
            <ValuesInformation companyId={company.company_id}/>
            <QuestionInformation companyId={company.company_id}/>
            <TeamInformation companyId={company.company_id}/>
        </section>
    </main>

}