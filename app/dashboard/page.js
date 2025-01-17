'use client';
import ButtonAccount from "@/components/ButtonAccount";
import {useSession} from "@/lib/session";
import {getSurveyResponses} from "@/app/dashboard/actions";
import {useEffect, useRef} from "react";
import ToplineCard from "@/app/dashboard/components/ToplineCard"

const data = [
    {
        id: 'jsat',
        name: 'Job Satisfaction',
        stat: '75%',
        change: '+24 bps',
        changeType: 'positive',
    },
    {
        id: 'msat',
        name: 'Manager Satisfaction',
        stat: '75%',
        change: '-24 bps',
        changeType: 'negative',
    },
    {
        id: 'develop',
        name: 'Career Development',
        stat: '75%',
        change: '+24 bps',
        changeType: 'positive',
    },
    {
        id: 'incl',
        name: 'Inclusion',
        stat: '75%',
        change: '+24 bps',
        changeType: 'positive',
    },
    {
        id: 'leadership',
        name: 'Leadership',
        stat: '75%',
        change: '+24 bps',
        changeType: 'positive',
    },
    {
        id: 'mission',
        name: 'Mission',
        stat: '75%',
        change: '+24 bps',
        changeType: 'positive',
    },
    {
        id: 'vision',
        name: 'Vision',
        stat: '75%',
        change: '+24 bps',
        changeType: 'positive',
    },
];

export default function Dashboard() {
    const {data: session} = useSession()
    let teamInfo = useRef({})

    useEffect(() => {
        (async () => {
            const companyId = session.user['custom:company-id']
            teamInfo.current = await getSurveyResponses(companyId)
            console.log(teamInfo.current)
        })()
    })

    return (
        <main className="min-h-screen p-8 pb-24">
            <section className="max-w-6xl mx-auto space-y-8">
                <ButtonAccount/>
                <h1 className="text-4xl md:text-4xl font-extrabold">Private Page</h1>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {data.map((item) => {
                        return <ToplineCard key={item.id} item={item}/>
                    })}
                </div>
            </section>
        </main>
    );
}
