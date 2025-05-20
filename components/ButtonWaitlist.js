'use client';

import {useFormStatus} from "react-dom";
import {useSearchParams} from "next/navigation"
import { sendGTMEvent } from '@next/third-parties/google'
import posthog from "posthog-js"

export default function ButtonWaitlist(props) {
    const {pending} = useFormStatus()
    const searchParams = useSearchParams()

    const handleClick = () => {
        sendGTMEvent({
            event: 'conversion',
            value: {send_to: 'AW-17081447837/WxmzCK3Py8oaEJ3riNE_'}
        })

        posthog.capture("waitlist_signup_click")
    }


    return <button className="btn btn-primary btn-block mt-6 plausible-event-name=WaitingList"
                   type="submit"
                   disabled={pending}
                   onClick={handleClick}
    >
        {searchParams.get('success') ? 'Success!' : props.children}
    </button>
}