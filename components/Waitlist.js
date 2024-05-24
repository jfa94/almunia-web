import ButtonWaitlist from "@/components/ButtonWaitlist";
import {revalidatePath} from "next/cache";

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

            const result = response.json()
            console.log('Success: ', result)

            revalidatePath('/?success=true')
        } catch (e) {
            console.log('Error: ', e)
        }
    }


    return (
        <section className="bg-base-200 overflow-hidden" id="pricing">
            <div className="flex flex-col md:flex-row gap-12 py-24 px-8 max-w-6xl mx-auto">

                <div className="flex flex-col flex-[3] text-center w-full md:my-6">
                    <h2 className="font-bold text-3xl lg:text-5xl tracking-tight text-left mb-1">Reach out to learn
                        more</h2>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <p className="font-medium text-primary text-left my-2">Almunia isn't available to everyone just
                        yet.<br/> Please reach out if you are interested in joining our waitlist</p>
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

                        <ButtonWaitlist>
                            Join Waitlist
                        </ButtonWaitlist>
                    </label>
                </form>

            </div>
        </section>
    )
        ;
};

export default Waitlist;
