'use client';

import ValuesForm from "@/app/onboarding/values/ValuesForm"
import {useRef, useState} from "react"
import Welcome from "@/app/onboarding/Welcome";

const Onboarding = () => {
    const [activePage, setActivePage] = useState(0)
    const maxPage = useRef(0)

    const incrementPage = () => {
        if(maxPage.current === activePage) maxPage.current++
        setActivePage(prevState => prevState+1)
    }

    return (
        <>
            <main className="border-2 border-blue-600 max-w-7xl m-auto p-2">
                <div className="text-sm breadcrumbs">
                    <ul>
                        <li className="hover:cursor-pointer" onClick={() => setActivePage(0)}>Welcome</li>
                        {maxPage.current > 0 && <li className="hover:cursor-pointer" onClick={() => setActivePage(1)}>Values</li>}
                        {maxPage.current > 1 && <li className="hover:cursor-pointer">Questions</li>}
                        {maxPage.current > 2 && <li className="hover:cursor-pointer">Team information</li>}
                    </ul>
                </div>
                <h1 className="heading">Setup</h1>

                <Welcome incrementPage={incrementPage} hidden={activePage !== 0}/>
                <ValuesForm incrementPage={incrementPage} hidden={activePage !== 1}/>

            </main>
        </>
    );
};

export default Onboarding;