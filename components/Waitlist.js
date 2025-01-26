import {redirect} from "next/navigation";
import {Suspense} from "react";
import ButtonWaitlist from "@/components/ButtonWaitlist";

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
            console.log('Success: ', result)
        } catch (e) {
            console.log('Error: ', e)
        }

        redirect('/?success=true')
    }


    return (
        <section className="bg-base-200 overflow-hidden" id="pricing">
            <div className="flex flex-col md:flex-row gap-12 py-24 px-8 max-w-5xl mx-auto">

                <div className="flex flex-col flex-[3] text-center w-full md:my-6">
                    <h2 className="font-bold text-4xl lg:text-5xl tracking-tight text-left mb-1">
                        Join our waitlist and get Almunia for free
                    </h2>
                    <div className="flex flex-col gap-4 font-medium text-primary text-left my-2">
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <p>Almunia is in active development, so we can't welcome everyone just yet.</p>
                        <p>Customers that join now will get full access for free until our first full release.</p>
                        <p>Additionally, early customers will receive a permanent discount as a thank you for helping us
                        shape the product.</p>
                    </div>
                </div>

                <form className="bg-white lg:p-12 p-6 rounded-xl flex-[2] w-full max-w-2xl m-auto"
                      action={submitForm}
                >
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
    )
        ;
};

export default Waitlist;
