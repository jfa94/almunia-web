import Header from "@/components/Header";
import Hero from "@/components/Hero";
// import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import About from "@/components/About";
import FeaturesGrid from "@/components/FeaturesGrid";
import Waitlist from "@/components/Waitlist";
import {Suspense} from "react";
import FeaturesList from "@/components/FeaturesList";
import Statistics from "@/components/Statistics";

export default function Page() {
    return (
        <>
            <Suspense fallback={<header className="bg-amber-50"></header>}>
                    <Header bgClass="bg-amber-50"></Header>
            </Suspense>
            <main>
                <Hero></Hero>
                <Statistics></Statistics>
                {/*<FeaturesGrid></FeaturesGrid>*/}
                <FeaturesList />
                <About></About>
                {/*<Pricing></Pricing>*/}
                <Waitlist></Waitlist>
                <FAQ></FAQ>
            </main>
            <Footer></Footer>
        </>
    );
}
