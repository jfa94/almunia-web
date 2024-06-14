import { auth, signIn } from "@/auth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {Suspense} from "react";

// This is a server-side component to ensure the user is logged in.
// If not, it will redirect to the login page.
// It's applied to all subpages of /dashboard in /app/dashboard/*** pages
// You can also add custom static UI elements like a Navbar, Sidebar, Footer, etc..
// See https://shipfa.st/docs/tutorials/private-page
export default async function LayoutPrivate({children}) {
    const session = await auth();

    // const logIn = async () => {
    //     'use server'
    //     await signIn("Cognito", {redirectTo: "/onboarding"})
    // }

    if (!session) {
      await signIn("Cognito", { redirectTo: "/onboarding" })
    }

    return <>
        <Suspense fallback={<header></header>}>
            <Header></Header>
        </Suspense>
        {children}
        <Footer></Footer>
    </>;
}
