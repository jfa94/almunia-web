"use client"
import {useSearchParams} from "next/navigation"

export default function Page() {
    const searchParams = useSearchParams()
    let userObject = {}

    if (searchParams.has('uid')) {
        userObject = {uid: searchParams.get('uid')}
    }
    return <main className="w-full h-96 mb-auto flex justify-center items-center">
        <p>Hello, {userObject?.uid || 'you'}</p>
    </main>
}