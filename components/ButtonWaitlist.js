'use client';

import {useFormStatus} from 'react-dom'
import {useEffect} from "react";

export default function ButtonWaitlist(props) {
    const {pending} = useFormStatus()

    useEffect(() => {
        console.log(pending)
    }, [pending])

    return <button className="btn btn-primary btn-block mt-6"
                   type="submit"
                   disabled={pending}
    >
        {pending ? 'Submitting...' : props.children}
    </button>
}