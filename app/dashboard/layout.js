import Footer from "@/components/Footer";

export default async function LayoutPrivate({children}) {
    return <>
        {children}
        <Footer></Footer>
    </>;
}