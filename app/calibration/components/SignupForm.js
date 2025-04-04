import {Suspense} from "react";
import ButtonWaitlist from "@/components/ButtonWaitlist";
import {submitSignupForm} from "@/app/calibration/actions";

export function SignupForm() {
    return <form className="bg-white lg:p-12 p-6 rounded-xl flex-[2] w-full max-w-2xl m-auto drop-shadow"
                 action={submitSignupForm}
    >
        <div className="flex flex-col gap-2 pb-6">
            <h3 className="mg:text-2xl text-xl font-bold text-base-content">
                Sign up to save your results and track progress over time!
            </h3>
            <p className="text-primary">
                Almunia is in active development, so we can&rsquo;t welcome everyone just yet. If you would like to join
                our waitlist, please fill out the form below. We will be in touch as soon as we can.
            </p>
        </div>

        <label className="form-control flex gap-2">

            <div className="form-field">
                <label className="custom-label justify-start">
                    First Name <span className="text-red-800">*</span>
                </label>
                <input type="text"
                       name="firstName"
                       id="firstName"
                       placeholder="First Name"
                       autoComplete="given-name"
                       className="custom-input"
                       required
                />
            </div>

            <div className="form-field">
                <label className="custom-label justify-start">
                    Last Name <span className="text-red-800">*</span>
                </label>
                <input type="text"
                       name="lastName"
                       id="lastName"
                       placeholder="Last Name"
                       autoComplete="family-name"
                       className="custom-input"
                       required
                />
            </div>

            <div className="form-field">
                <label className="custom-label justify-start">
                    Email<span className="text-red-800">*</span>
                </label>
                <input type="email"
                       name="email"
                       id="email"
                       placeholder="Email"
                       autoComplete="email"
                       className="custom-input"
                       required
                />
            </div>

            <div className="form-field">
                <label className="custom-label">Company</label>
                <input type="text"
                       name="companyName"
                       id="companyName"
                       placeholder="Company Name"
                       autoComplete="organization"
                       className="custom-input"
                />
            </div>

            <div className="form-field">
                <label className="custom-label">Website</label>
                <input type="text"
                       name="companyWebsite"
                       id="companyWebsite"
                       placeholder="Company Website"
                       autoComplete="url"
                       className="custom-input"
                />
            </div>

            <Suspense fallback={<div className="btn btn-primary"><p>...</p></div>}>
                <ButtonWaitlist>
                    Join Waitlist
                </ButtonWaitlist>
            </Suspense>
        </label>
    </form>
}