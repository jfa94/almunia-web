import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const viewport = {
    themeColor: "#fafafa", // Neutral 50
}

export default async function LayoutPrivate({children}) {
    const bgClass = "bg-neutral-50"
    return <div className={bgClass}>
        <Header bgClass={bgClass}/>
        {children}
        <Footer/>
    </div>;
}