"use client"
import {useSearchParams} from "next/navigation"
import {useEffect} from "react";

export default function Page() {
    const searchParams = useSearchParams()
    const responseData = searchParams.get("req")
    const responseValue = searchParams.get("val")

    useEffect(() => {
        // TODO: Create Lambda function that can get the data and call it here
    }, [])

    return <main className="w-full h-96 mb-auto flex justify-center items-center">
        <p>Thank you! Your response has been captured.</p>
    </main>
}