import config from "@/config";
import ButtonCheckout from "./ButtonCheckout";

// <Pricing/> displays the pricing plans for your app
// It's your Stripe config in config.js.stripe.plans[] that will be used to display the plans
// <ButtonCheckout /> renders a button that will redirect the user to Stripe checkout called the /api/stripe/create-checkout API endpoint with the correct priceId

const Waitlist = () => {
    return (
        <section className="bg-base-200 overflow-hidden" id="pricing">
            <div className="py-24 px-8 max-w-5xl mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h2 className="font-bold text-3xl lg:text-5xl tracking-tight mb-1">Reach out to learn more</h2>
                    <p className="font-medium text-primary my-2 mx-auto max-w-xl">Almunia isn't available publicly just
                        yet, please reach out if you are interested in joining our waitlist</p>
                </div>

                <div className="bg-white lg:p-12 p-6 rounded-xl max-w-2xl m-auto">
                    <label className="form-control grid md:grid-cols-2 grid-cols-1 gap-2">

                        <div className="col-span-1">
                            <div className="label p-0">
                                <span className="m-0 label-text text-mg font-medium my-1">First Name</span>
                            </div>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full"/>
                        </div>

                        <div className="col-span-1">
                            <div className="label p-0">
                                <span className="m-0 label-text text-mg font-medium my-1">Last Name</span>
                            </div>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full"/>
                        </div>

                        <div className="md:col-span-2 col-span-1">
                            <div className="label p-0">
                                <span className="m-0 label-text text-mg font-medium my-1">Email</span>
                            </div>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full"/>
                        </div>


                        <div className="col-span-1">
                            <div className="label p-0">
                                <span className="m-0 label-text text-mg font-medium my-1">Company</span>
                            </div>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full"/>
                        </div>

                        <div className="col-span-1">
                            <div className="label p-0">
                                <span className="m-0 label-text text-mg font-medium my-1">Website</span>
                            </div>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full"/>
                        </div>

                    </label>
                </div>

            </div>
        </section>
    );
};

export default Waitlist;
