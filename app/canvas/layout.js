import {Suspense} from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function Layout({children}) {
    return <>
        <Suspense fallback={<header></header>}>
            <Header></Header>
        </Suspense>
            {children}
        <Footer></Footer>
    </>;
}
