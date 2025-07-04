"use client";

import {useState, useEffect} from "react";
import {useSearchParams} from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import config from "@/config";
import ButtonSignin from "@/components/ButtonSignin";
import {useSession} from "@/lib/session";
import ButtonAccount from "@/components/ButtonAccount";
import {RiAccountCircleLine, RiBarChart2Line} from "@remixicon/react";

const links = [
    {href: "/#features", label: "Features"},
    {href: "/#waitlist", label: "Waitlist"},
    {href: "/#faq", label: "FAQ"},
];

const authLinks = [
    {label: 'Dashboard', icon: <RiBarChart2Line size={20}/>, href: '/dashboard'},
    {label: 'Account', icon: <RiAccountCircleLine size={20}/>, href: '/account'},
]

const Header = ({bgClass = "bg-white"}) => {
    const [isOpen, setIsOpen] = useState(false);
    const searchParams = useSearchParams();
    const {status} = useSession()

    const cta = status === 'authenticated' ? <ButtonAccount/> : <ButtonSignin extraStyle="btn-primary"/>

    // setIsOpen(false) when the route changes (i.e: when the user clicks on a link on mobile)
    useEffect(() => {
        setIsOpen(false);
    }, [searchParams]);

    return (
        <header className={`${bgClass} ...`}>
            <nav
                className="container flex items-center justify-between pt-8 p-4 mx-auto"
                aria-label="Global"
            >
                {/* Your logo/name on large screens */}
                <div className="flex lg:flex-1 ">
                    <Link
                        className="flex items-center gap-2 shrink-0 "
                        href="/"
                        title={`${config.appName} hompage`}
                    >
                        <Image
                            src={logo}
                            alt={`${config.appName} logo`}
                            // placeholder="blur"
                            className={`transition-opacity ease-in-out duration-900 ${isOpen ? "opacity-0" : "opacity-100"}`}
                            priority={true}
                            width='auto'
                            height={45}
                        />
                    </Link>
                </div>

                <div className="flex">
                    {/* Burger button to open menu on mobile */}
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md p-2.5"
                            onClick={() => setIsOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 text-base-content"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Your links on large screens */}
                    <div className="hidden lg:flex lg:justify-center lg:gap-12 lg:mr-12 lg:items-center">
                        {(status === "authenticated" ? authLinks : links).map((link) => (
                            <Link
                                href={link.href}
                                key={link.href}
                                className="link link-hover flex items-center"
                                title={link.label}
                            >
                                {link.icon && <span className="inline-block mr-2">{link.icon}</span>}
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* CTA on large screens */}
                    <div className="hidden lg:flex lg:justify-end lg:flex-1">{cta}</div>
                </div>
            </nav>

            {/* Mobile menu, show/hide based on menu state. */}
            <div className={`relative z-50 ${isOpen ? "" : "pointer-events-none"}`}>
                <div
                    className={`fixed inset-y-0 right-0 z-10 w-full py-8 px-4 overflow-y-auto bg-white shadow sm:max-w-sm transform transition-transform duration-300 ease-in-out ${
                        isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    {/* Your logo/name on small screens */}
                    <div className="flex items-center justify-between">
                        <Link
                            className="flex items-center gap-2 shrink-0 "
                            title={`${config.appName} hompage`}
                            href="/"
                        >
                            <Image
                                src={logo}
                                alt={`${config.appName} logo`}
                                className="sm:hidden"
                                placeholder="blur"
                                priority={true}
                                width='auto'
                                height={45}
                            />
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5"
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Your links on small screens */}
                    <div className="flow-root mt-6 sm:mt-0">
                        <div className="py-4">
                            <div className="flex flex-col gap-y-4 items-center">
                                {(status === "authenticated" ? authLinks : links).map((link) => (
                                    <Link
                                        href={link.href}
                                        key={link.href}
                                        className="link link-hover flex items-center text-lg"
                                        title={link.label}
                                    >
                                        {link.icon && <span className="inline-block mr-2">{link.icon}</span>}
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="divider"></div>
                        {/* Your CTA on small screens */}
                        <div className="flex flex-col">{cta}</div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
