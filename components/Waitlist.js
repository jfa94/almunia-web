import {redirect} from "next/navigation";
import {Suspense} from "react";
import ButtonWaitlist from "@/components/ButtonWaitlist";
import posthog from "posthog-js";

const Waitlist = () => {
    async function submitForm(formData) {
        'use server';
        const object = {}
        formData.forEach(function (value, key) {
            if (value !== '') object[key] = value
        })

        console.log('Form submitted: ', JSON.stringify(object))

        try {
            const response = await fetch('https://tktpruza72.execute-api.eu-west-1.amazonaws.com/items', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(object),
            })

            const result = await response.json()
            posthog.capture("waitlist_signup")
            console.log('Success: ', result)
        } catch (e) {
            console.log('Error: ', e)
        }

        redirect('/?success=true')
    }


    return (
        <section className="bg-base-200 overflow-hidden" id="pricing">
            <div className="flex flex-col md:flex-row gap-12 py-24 px-8 max-w-5xl mx-auto">

                <div className="flex flex-col flex-[3] w-full md:my-6">
                    <h2 className="font-bold text-4xl lg:text-5xl tracking-tight mb-6">
                        Be among the first to transform your workplace culture
                    </h2>
                    
                    <div className="flex flex-col gap-4 text-primary my-2">
                        <div className="flex items-start">
                            <svg className="w-6 h-6 text-primary mt-1 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                            <p className="font-medium">Get <span className="font-bold">free access</span> during our beta period</p>
                        </div>
                        
                        <div className="flex items-start">
                            <svg className="w-6 h-6 text-primary mt-1 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                            <p className="font-medium">Help shape the product with your feedback</p>
                        </div>
                        
                        <div className="flex items-start">
                            <svg className="w-6 h-6 text-primary mt-1 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                            <p className="font-medium">Receive a <span className="font-bold">permanent discount</span> after our official launch</p>
                        </div>
                    </div>
                </div>

                <form className="bg-white lg:p-12 p-6 rounded-xl flex-[2] w-full max-w-2xl m-auto shadow-lg"
                      action={submitForm}
                >
                    <h3 className="font-bold text-xl mb-6">Join our waitlist</h3>
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

            </div>
        </section>
    );
};

export default Waitlist;
