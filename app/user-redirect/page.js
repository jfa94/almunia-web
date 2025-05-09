'use client'
import {redirect, useSearchParams} from "next/navigation";
import {useSession} from "@/lib/session";
import {useEffect} from "react";
import {getUserData} from "@/lib/auth";

export default function Page() {
    const {status, setSession} = useSession()
    const searchParams = useSearchParams()

    useEffect(() => {
        (async () => {
            if (status !== 'authenticated') {
                try {
                    const userData = await getUserData()
                    setSession({user: userData})
                } catch (e) {
                    throw new Error(e)
                }
            }
            redirect(searchParams.get('follow'))
        })()
    }, [status, setSession, searchParams])

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <p className="text-xl">Redirecting</p>
            <div className="mt-2"><span className="loading loading-dots loading-sm"></span></div>
        </div>
    );
}
