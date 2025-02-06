/* eslint-disable @next/next/no-img-element */
"use client";

import config from "@/config";
import {useState} from "react";
import {signIn} from "@/lib/auth";

const ButtonSignin = ({buttonText = "Sign in", extraStyle}) => {
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = () => {
        setIsLoading(true)
        signIn('cognito', {callbackUrl: config.auth.callbackUrl})
    }

    return <button
        className={`btn ${extraStyle ? extraStyle : ""}`}
        onClick={handleClick}
    >
        {isLoading
            ? <div className="min-w-11"><span className="loading loading-dots loading-sm"></span></div>
            : buttonText
        }
    </button>
}

export default ButtonSignin;
