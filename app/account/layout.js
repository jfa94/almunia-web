import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const viewport = {
    themeColor: '#fafafa' // Neutral 50
}

export default async function LayoutPrivate({children}) {
    return <div className="bg-neutral-50">
        <Header bgClass="bg-neutral-50"/>
        {children}
        <Footer/>
    </div>
}