import {redirect} from "next/navigation";
import TeamInformation from "@/app/account/team/TeamInformation"
import UserInformation from "@/app/account/user/UserInformation";
import ValuesInformation from "@/app/account/values/ValuesInformation";
import QuestionInformation from "@/app/account/questions/QuestionInformation";
import CompanyInformation from "@/app/account/company/CompanyInformation";

export default async function Page() {
    // TODO: Change for prod
    // const {company} = await getCompanyInformation()
    const company = {"company_id": "C-1i19vvu1qt8otual7op8",}

    if (!company?.company_id) {
        console.error('Issue with getCompanyInformation. Returned:', company)
        redirect('/?error=cid')
    }

    return <main className="container m-auto pb-6 md:pb-8 min-h-[75svh]">
        <section className="flex flex-col gap-4 md:gap-6">
            <h1 className="heading pb-0">Account</h1>
            <UserInformation/>
            <CompanyInformation/>
            <TeamInformation companyId={company.company_id}/>
            <ValuesInformation companyId={company.company_id}/>
            <QuestionInformation companyId={company.company_id}/>
        </section>
    </main>

}