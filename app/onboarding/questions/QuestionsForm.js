'use client';
import {useState} from "react";
import {QuestionInput} from "@/app/onboarding/questions/QuestionInput";
import {submitForm} from "@/app/onboarding/actions";

function QuestionsForm({formState, incrementPage, hidden}) {
    let [inputArray, setInputArray] = useState([
        <QuestionInput key="0" id="0"/>
    ])

    const submitQuestionsForm = submitForm.bind(null, {'companyId': formState.companyId, page: 'questions' })

    let addInputToArray = (e) => {
        e.preventDefault()
        const maxInputArrKey = inputArray[inputArray.length - 1].key
        const newKey = Number(maxInputArrKey) + 1
        setInputArray((prevState) => [
            ...prevState,
            <QuestionInput key={`${newKey}`} id={`${newKey}`} removeInput={RemoveInputFromArray}/>
        ])
    }

    let RemoveInputFromArray = (id) => {
        if (window.confirm('Are you sure?')) {
            setInputArray((prevState) => {
                return prevState.filter((inputElement) => inputElement.key !== `${id}`)
            })
        }
    }


    return <div hidden={hidden}>
        <form action={submitQuestionsForm}>
            <div className="subheading">Questions</div>
            <p className="mb-4">
                Write any questions below that you would like your team to answer anonymously.
                Please keep in mind that possible answers will be on a scale from 5 (Strongly Agree)
                to 1 (Strongly Disagree). Questions should be written in a way that accommodates these responses.
                We will also send general questions (for example, &apos;I feel satisfied with my job&apos;).
            </p>

            {inputArray}

            <div className="flex flex-col md:flex-row gap-4 md:justify-end mt-4">
                <button onClick={addInputToArray} className="btn btn-neutral md:btn-md min-w-36">
                    Add
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-white">
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
}

export default QuestionsForm;