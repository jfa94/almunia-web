"use client"
import {useSearchParams} from "next/navigation"
import {useEffect, useState} from "react"

export default function Page() {
    const [isLoading, setIsLoading] = useState(true)

    const searchParams = useSearchParams()
    const responseData = searchParams.get("req")
    const responseValue = searchParams.get("val")

    useEffect(() => {
        if (responseData && responseData) {
            (async () => {
                try {
                    // setTimeout(() => setIsLoading(false), 3000)
                    await fetch('https://7xnudglovs65pobl554ulsudaq0mgile.lambda-url.eu-west-1.on.aws/', {
                        method: 'PUT',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            responseData,
                            responseValue
                        }),
                    })
                    setIsLoading(false)
                } catch (e) {
                    console.log('Error: ', e)
                }
            })()
        }
    }, [responseData, responseValue])

    return <main className="w-full h-96 mb-auto flex justify-center items-center">
        <div className="text-xl">
            {
                isLoading ? <p>Pending...</p> : <p>Thank you! Your response has been captured.</p>
            }
        </div>
    </main>
}