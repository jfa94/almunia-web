'use client';

import {useReducer} from "react"
import Welcome from "@/app/onboarding/welcome/Welcome"
import ValuesForm from "@/app/onboarding/values/ValuesForm"
import TeamInformationForm from "@/app/onboarding/team/TeamInformationForm"
import QuestionsForm from "@/app/onboarding/questions/QuestionsForm"
import {redirect, useSearchParams} from "next/navigation"

const reducer = (state, action) => {
    return {
        ...state,
        [action.field]: action.value
    }
}

const Onboarding = () => {
    const searchParams = useSearchParams()
    const [formState, dispatch] = useReducer(reducer, {
        activePage: 0,
        maxPage: 0,
        companyId: searchParams.get('cid'),
        values: []
    })

    if (!searchParams.has('cid')) {
        redirect('/create')
    }

    const incrementPage = () => {
        if (formState.maxPage === formState.activePage) {
            dispatch({field: 'maxPage', value: formState.maxPage + 1})
        }
        dispatch({field: 'activePage', value: formState.activePage + 1})
    }

    return (
        <>
            <main className="min-h-[65svh] max-w-7xl m-auto md:p-4 p-2">
                <div className="text-sm breadcrumbs">
                    <ul>
                        <li className="hover:cursor-pointer"
                            onClick={() => dispatch({field: 'activePage', value: 0})}>Basics
                        </li>
                        {formState.maxPage > 0 &&
                            <li className="hover:cursor-pointer"
                                onClick={() => dispatch({field: 'activePage', value: 1})}>Values</li>}
                        {formState.maxPage > 1 &&
                            <li className="hover:cursor-pointer"
                                onClick={() => dispatch({field: 'activePage', value: 2})}>Questions</li>}
                        {formState.maxPage > 2 &&
                            <li className="hover:cursor-pointer"
                                onClick={() => dispatch({field: 'activePage', value: 3})}>Team information</li>}
                    </ul>
                </div>
                {/*<h3 className="mb-4">Setup</h3>*/}

                <Welcome formState={formState}
                         dispatch={dispatch}
                         incrementPage={incrementPage}
                         hidden={formState.activePage !== 0}
                />
                <ValuesForm formState={formState}
                            dispatch={dispatch}
                            incrementPage={incrementPage}
                            hidden={formState.activePage !== 1}
                />
                <QuestionsForm formState={formState}
                               incrementPage={incrementPage}
                               hidden={formState.activePage !== 2}
                />
                <TeamInformationForm formState={formState}
                                     incrementPage={incrementPage}
                                     hidden={formState.activePage !== 3}
                />

            </main>
        </>
    );
};

export default Onboarding;