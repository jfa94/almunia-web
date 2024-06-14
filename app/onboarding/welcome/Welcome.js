import {submitForm} from "@/app/onboarding/submitForm";

function Welcome({incrementPage, hidden}) {
    const submitWelcomeForm = submitForm.bind(null, 'welcome')

    return <div hidden={hidden}>
        <h2 className="subheading">Welcome to Almunia!</h2>
        <p>Let's start with the basics.</p>

        <form action={submitWelcomeForm} className="mt-4">
            <div className="flex flex-col">
                <label htmlFor="companyName"
                       className="font-bold text-lg"
                >
                    What is your company's name?
                </label>
                <input type="text"
                       id="companyName"
                       name="companyName"
                       placeholder="Company Name"
                       className="custom-input h-10 shadow-sm"
                />
            </div>

            <div className="flex flex-col mt-4">
                <label htmlFor="companyName"
                       className="font-bold text-lg"
                >
                    What is your mission? <span className="text-sm font-medium">(Optional)</span>
                </label>
                <input type="text"
                       id="companyMission"
                       name="companyMission"
                       placeholder="What is your company's purpose, and how will you achieve it"
                       className="custom-input h-10 shadow-sm"
                />
            </div>

            <div className="flex flex-col mt-4">
                <label htmlFor="companyName"
                       className="font-bold text-lg"
                >
                    What is your vision? <span className="text-sm font-medium">(Optional)</span>
                </label>
                <input type="text"
                       id="companyVision"
                       name="companyVision"
                       placeholder="How is the world different if you achieve your goals"
                       className="custom-input h-10 shadow-sm"
                />
            </div>

            <button type="submit" onClick={() => incrementPage()} className="btn btn-primary min-w-36 mt-4 self-end">
                Save
            </button>

        </form>
    </div>
}

export default Welcome;