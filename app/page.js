import {Suspense} from "react";
import {GoogleTagManager} from "@next/third-parties/google"
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Waitlist from "@/components/Waitlist";
import FeaturesList from "@/components/FeaturesList";
import Statistics from "@/components/Statistics";


export default function Page() {
    return (
        <>
            <GoogleTagManager gtmId="AW-17081447837"/>
            <Suspense fallback={<header className="bg-amber-50"></header>}>
                <Header bgClass="bg-amber-50"></Header>
            </Suspense>
            <main>
                <Hero></Hero>
                <Statistics></Statistics>
                <FeaturesList/>
                <About></About>
                {/*<Pricing></Pricing>*/}
                <Waitlist></Waitlist>
                <FAQ></FAQ>
            </main>
            <Footer></Footer>
        </>
    );
}
