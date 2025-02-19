/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {useSession} from "@/lib/session";
import {logOut} from "@/lib/auth";
import {useLocalStorage} from "@/lib/utils";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {RiBarChart2Line, RiAccountCircleLine} from "@remixicon/react";
import {useState} from "react";


const dropdownItems = [
    {label: 'Dashboard', icon: <RiBarChart2Line size={20}/>, link: '/dashboard'},
    {label: 'Account', icon: <RiAccountCircleLine size={20}/>, link: '/account'},
]


const ButtonAccount = () => {
    const {data: session, status} = useSession()
    const {clearStorage} = useLocalStorage()
    const currentPath = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    const handleSignOut = () => {
        clearStorage()
        logOut()
    }

    const onOpenChange = (open) => setIsOpen(open)

    if (status === "unauthenticated") return null

    return (
        <Popover onOpenChange={onOpenChange}>
            <PopoverTrigger className="btn bg-primary" asChild>
                <div>
                    {session?.user?.image ? (
                        <img
                            src={session?.user?.image}
                            alt={session?.user?.name || "Account"}
                            className="w-6 h-6 rounded-full shrink-0"
                            referrerPolicy="no-referrer"
                            width={24}
                            height={24}
                        />
                    ) : (
                        <span
                            className="w-6 h-6 bg-amber-50 text-zinc-400 flex justify-center items-center rounded-full shrink-0">
                                {session?.user?.name?.charAt(0) || session?.user?.email?.charAt(0)}
                            </span>
                    )}

                    <span className="text-white font-bold">
                            {session?.user?.name || "Account"}
                        </span>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        className={`w-5 h-5 fill-white stroke-1 stroke-zinc-200 duration-200 opacity-80 ${
                            isOpen ? "transform rotate-180 " : ""
                        }`}
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </PopoverTrigger>

            <PopoverContent className="bg-base-100 max-w-[16rem] p-2">
                <div className="space-y-0.5 text-sm">
                    {dropdownItems.map(({label, icon, link}) => {
                        return <Link key={label} href={link}>
                            <button
                                className={`${currentPath === link ? 'font-bold bg-gray-100' : 'font-medium'} flex items-center gap-2 hover:bg-base-300 duration-200 py-1.5 px-4 w-full rounded-lg`}
                            >
                                {icon}
                                {label}
                            </button>
                        </Link>
                    })}
                    <button
                        className="flex items-center gap-2 hover:bg-error/20 hover:text-error duration-200 py-1.5 px-4 w-full rounded-lg font-medium"
                        onClick={handleSignOut}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
                                clipRule="evenodd"
                            />
                            <path
                                fillRule="evenodd"
                                d="M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Logout
                    </button>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default ButtonAccount;
