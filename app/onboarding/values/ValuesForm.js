'use client';

import {submitValuesForm} from "@/app/onboarding/values/submitValuesForm";
import {InputValueField} from "@/app/onboarding/values/InputValueField";
import {useState} from "react";

const ValuesForm = () => {
    let [inputArray, setInputArray] = useState([
        <InputValueField key="0" id="0"/>
    ])

    let addInputToArray = () => {
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
        <>
            <div className="flex flex-row justify-between mb-2">
                <h2 className="subheading text-2xl pt-0">Values</h2>
            </div>
            <form action={submitValuesForm} className="flex flex-col">
                {inputArray}

                <div className="flex flex-col md:flex-row gap-4 md:justify-end md:mr-16">
                    <div onClick={addInputToArray} className="btn btn-neutral min-w-36">
                        Add
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                            <path
                                d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11H7V13H11V17H13V13H17V11H13V7H11V11Z"></path>
                        </svg>
                    </div>
                    <button type="submit" className="btn btn-primary min-w-36">
                        Save
                    </button>
                </div>

            </form>

        </>
    );
};

export default ValuesForm;