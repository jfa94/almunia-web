'use client';

import {InputValueField} from "@/app/onboarding/values/InputValueField";
import {submitForm} from "@/app/onboarding/submitForm";
import {useState} from "react"

const ValuesForm = ({incrementPage, hidden}) => {
    let [inputArray, setInputArray] = useState([
        <InputValueField key="0" id="0"/>
    ])

    const submitValuesForm = submitForm.bind(null, 'values')

    let addInputToArray = (e) => {
        e.preventDefault()
        const maxInputArrKey = inputArray[inputArray.length - 1].key
        const newKey = Number(maxInputArrKey) + 1
        setInputArray((prevState) => [
            ...prevState,
            <InputValueField key={`${newKey}`} id={`${newKey}`} removeInput={RemoveInputFromArray}/>
        ])
    }

    let RemoveInputFromArray = (id) => {
        if (window.confirm('Are you sure?')) {
            setInputArray((prevState) => {
                return prevState.filter((inputElement) => inputElement.key !== `${id}`)
            })
        }
    }

    return (
        <div hidden={hidden}>
            <div className="flex flex-col mb-2">
                <h2 className="subheading">Values</h2>
                <p>
                    Let's define your company values. Useful values are genuinely reflective of a company's ideals,
                    without being idealistic. Avoid generic statements that are not specific to the culture you
                    want to create (for example, "excellence"). Keep in mind that you should integrate these values in
                    every aspect of your organisation, from hiring and performance reviews to strategic decision-making.
                </p>
                <p className="my-2">
                    You can learn more about defining meaningful values{" "}
                    <a href="https://hbr.org/2002/07/make-your-values-mean-something" className="underline">
                        here (link to Harvard Business Review)
                    </a>.
                </p>
            </div>

            <form action={submitValuesForm} className="flex flex-col mt-4">

                {inputArray}

                <div className="flex flex-col md:flex-row gap-4 md:justify-end md:mr-16">
                    <button onClick={addInputToArray} className="btn btn-neutral min-w-36">
                        Add
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-5 fill-white">
                            <path
                                d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11H7V13H11V17H13V13H17V11H13V7H11V11Z"></path>
                        </svg>
                    </button>
                    <button type="submit" onClick={() => incrementPage()} className="btn btn-primary min-w-36">
                        Save
                    </button>
                </div>

            </form>

        </div>
    );
};

export default ValuesForm;