'use client';

import {useFormStatus} from 'react-dom'
import {useSearchParams} from "next/navigation"

export default function ButtonWaitlist(props) {
    const {pending} = useFormStatus()
    const searchParams = useSearchParams()

    return <button className="btn btn-primary btn-block mt-6"
                   type="submit"
                   disabled={pending}
    >
        {searchParams.get('success') ? 'Success!' : props.children}
    </button>
}