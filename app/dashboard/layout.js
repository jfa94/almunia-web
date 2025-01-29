import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ButtonAccount from "@/components/ButtonAccount";

export default async function LayoutPrivate({children}) {
    return <>
        <Header cta={<ButtonAccount/>}/>
            {children}
        <Footer/>
    </>;
}