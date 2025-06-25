"use client";

import {useSession} from "@/lib/session";
import {useState} from "react";
import TabNavigation from "@/app/dashboard/components/TabNavigation";
import SurveysTab from "@/app/dashboard/surveys/SurveysTab";
import ProfileTab from "@/app/dashboard/profile/ProfileTab";


const tabs = [
    {id: 'survey', label: 'Survey Results'},
    {id: 'profile', label: 'Culture Profile'}
]

export default function Dashboard() {
    const {data: session} = useSession()
    const [activeTab, setActiveTab] = useState('survey')

    const renderTabContent = () => {
        switch (activeTab) {
            case 'profile':
                return <ProfileTab session={session}/>;
            default:
                return <SurveysTab session={session}/>;
        }
    }

    return (
        <main className="container p-4 min-h-screen mx-auto pb-12">
            <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
            {renderTabContent()}
        </main>
    );
}
