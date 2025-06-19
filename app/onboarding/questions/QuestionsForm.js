'use client';
import {submitQuestionsForm} from "@/app/onboarding/actions";
import QuestionContainer from "@/app/onboarding/questions/QuestionContainer";

function QuestionsForm({formState, incrementPage, hidden}) {
    // console.log('formState:', formState)
    const handleSubmitForm = async (formData) => {
        console.log(`Submitted ${formState.page} with data: `, Array.from(formData.keys()))

        let emptyValues = 0
        for (const value of formData.values()) {
            if (value.trim() === '') emptyValues++
        }
        if (Array.from(formData.keys()).length === emptyValues) {
            incrementPage()
            return
        }

        const result = await submitQuestionsForm({companyId: formState.companyId, page: 'questions'}, formData)
        if (result.find(batch => batch['$metadata']?.httpStatusCode !== 200)) {
            console.log('Result:', result)
            alert('An error has occurred. Please try again later.')
        } else {
            incrementPage()
        }
    }

    return <div hidden={hidden}>
        <form action={handleSubmitForm}>
            <h2>Questions</h2>
            <p className="mb-4">
                Our standard question bank includes everything you need to use Almunia, and covers areas such as job
                satisfaction, culture, and career development. You can add questions specific to your values below.
            </p>
            <p>
                Write any value&ndash;specific questions that you would like your team to answer anonymously.
                Please keep in mind that possible answers will be on a scale from 5 (Strongly Agree)
                to 1 (Strongly Disagree). Questions should be written in a way that accommodates these responses
                (e.g., &lsquo;I am satisfied with my job&rsquo;). This step is optional.
            </p>

            {formState.values.map(({value_id, name}) => {
                return <QuestionContainer key={value_id} valueId={value_id} valueName={name}/>
            })}

            <div className="flex flex-col md:flex-row gap-4 md:justify-end mt-4">
                <button type="submit" className="btn btn-primary min-w-36">
                    Save
                </button>
            </div>
        </form>
    </div>
}

export default QuestionsForm;