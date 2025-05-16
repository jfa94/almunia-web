'use client';

import {useFormStatus} from "react-dom";
import {useSearchParams} from "next/navigation"
import posthog from "posthog-js"

export default function ButtonWaitlist(props) {
    const {pending} = useFormStatus()
    const searchParams = useSearchParams()

    return <button className="btn btn-primary btn-block mt-6 plausible-event-name=WaitingList"
                   type="submit"
                   disabled={pending}
                   onClick={() => posthog.capture("waitlist_signup_click")}
    >
        {searchParams.get('success') ? 'Success!' : props.children}
    </button>
}