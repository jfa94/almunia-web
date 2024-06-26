import {useState} from "react";
import {InputTeamInformation} from "@/app/onboarding/team/InputTeamInformation";
import { SubmitButton } from "@/app/onboarding/team/SubmitButton";
import {submitForm} from "@/app/onboarding/actions";

const TeamInformationForm = ({formState, hidden}) => {
    let [inputArray, setInputArray] = useState([
        <InputTeamInformation key="0" id="0"/>
    ])

    const submitTeamInformationForm = submitForm.bind(null, {'companyId': formState.companyId, page: 'team' })

    let addInputToArray = (e) => {
        e.preventDefault()
        const maxInputArrKey = inputArray[inputArray.length - 1].key
        const newKey = Number(maxInputArrKey) + 1
        setInputArray((prevState) => [
            ...prevState,
            <InputTeamInformation key={`${newKey}`} id={`${newKey}`} removeInput={RemoveInputFromArray}/>
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
        <div className={`${hidden && 'hidden'}`}>
            <div className="subheading">Team Information</div>

            <form action={submitTeamInformationForm}>
                <div className="hidden md:grid grid-cols-[1fr_1fr_1fr_1fr_40px]">
                    <p className="font-bold ml-2">First Name</p>
                    <p className="font-bold ml-2">Last Name</p>
                    <p className="font-bold ml-2">Job Title</p>
                    <p className="font-bold ml-2">Email</p>
                </div>

                {inputArray}

                <div className="flex flex-col md:flex-row gap-4 md:justify-end mt-4">
                    <button onClick={addInputToArray} className="btn btn-neutral md:btn-md min-w-36">
                        Add
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                            <path
                                d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11H7V13H11V17H13V13H17V11H13V7H11V11Z"></path>
                        </svg>
                    </button>
                    <SubmitButton />
                </div>
            </form>
        </div>
    );
}

export default TeamInformationForm;