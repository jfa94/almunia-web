/* eslint-disable @next/next/no-img-element */
"use client";

// import {useSession, signIn} from "next-auth/react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import config from "@/config";
import {useState} from "react";
import {signIn} from "@/lib/auth";
import {useSession} from "@/lib/session";

// A simple button to sign in with our providers (Google & Magic Links).
// It automatically redirects user to callbackUrl (config.auth.callbackUrl) after login, which is normally a private page for users to manage their accounts.
// If the user is already logged in, it will show their profile picture & redirect them to callbackUrl immediately.
const ButtonSignin = ({text = "Sign in", extraStyle}) => {
    const {data: session, status} = useSession()
    const router = useRouter();
    const [buttonText, setButtonText] = useState(text)

    const handleClick = () => {
        if (status === 'authenticated') {
            router.push(config.auth.callbackUrl);
        } else {
            setButtonText(<div className="min-w-11"><span className="loading loading-dots loading-sm"></span></div>)
            signIn('cognito', {callbackUrl: config.auth.callbackUrl})
        }
    };

    if (status === 'authenticated') {
        return (
            <Link
                href={config.auth.callbackUrl}
                className={`btn text-white ${extraStyle ? extraStyle : ""}`}
            >
                {session.user?.image ? (
                    <img
                        src={session.user?.image}
                        alt={session.user?.name || "Dashboard"}
                        className="w-6 h-6 rounded-full shrink-0"
                        referrerPolicy="no-referrer"
                        width={24}
                        height={24}
                    />
                ) : (
                    <span className="w-6 h-6 bg-amber-50 text-zinc-400 flex justify-center items-center rounded-full shrink-0">
                        {session.user?.name?.charAt(0) || session.user?.email?.charAt(0)}
                    </span>
                )}
                Dashboard
            </Link>
        );
    }

    return (
        <button
            className={`btn ${extraStyle ? extraStyle : ""}`}
            onClick={handleClick}
        >
            {buttonText}
        </button>
    );
};

export default ButtonSignin;
