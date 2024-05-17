import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import About from "@/components/About";
import FeaturesGrid from "@/components/FeaturesGrid";

export default function Page() {
    return (
        <>
            <Header></Header>
            <main>
                <Hero></Hero>
                {/*<Problem></Problem>*/}
                <About></About>
                <FeaturesGrid></FeaturesGrid>
                <Pricing></Pricing>
                <FAQ></FAQ>
            </main>
            <Footer></Footer>
        </>
    );
}
