'use client';
import {submitForm} from "@/app/onboarding/actions";
import QuestionContainer from "@/app/onboarding/questions/QuestionContainer";

function QuestionsForm({formState, incrementPage, hidden}) {
    // console.log('formState:', formState)
    const submitQuestionsForm = async (formData) => {
        const result = await submitForm({companyId: formState.companyId, page: 'questions'}, formData)
        if (result['$metadata']?.httpStatusCode === 200) {
            incrementPage()
        } else {
            alert('An error has occurred. Please try again later.')
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

            {formState.values.map((value, i) => <QuestionContainer key={i} valueKey={i} valueName={value}/>)}

            <div className="flex flex-col md:flex-row gap-4 md:justify-end mt-4">
                <button type="submit" className="btn btn-primary min-w-36">
                    Save
                </button>
            </div>
        </form>
    </div>
}

export default QuestionsForm;