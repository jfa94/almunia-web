'use client';
import {submitValuesForm} from "@/app/onboarding/actions";
import {InputValueField} from "@/app/onboarding/values/InputValueField";
import {useState} from "react"
import {InfoDropdown} from "@/components/InfoDropdown";

const dropdownInformation = {
    id: "more-information",
    title: "Read more",
    // subtitle: <p className="text-neutral-600">
    //     How the work ethic of an organisation determines whether the work feels structured or flexible to its
    //     employees.
    // </p>,
    body: <>
        <section className="mb-4">
            <p className="">
                In many business, values are often discussed but less frequently embodied. They can be relegated to
                framed statements on office walls or forgotten lines in an onboarding packet. However, truly meaningful
                values&mdash;deeply embedded in an organisation’s day&ndash;to&ndash;day&mdash;serve as a powerful
                compass, guiding decisions, fostering culture, and driving performance. In contrast, hollow value
                statements lead employees to become cynical and undermine managerial credibility.
            </p>
        </section>

        <section className="mb-6 [&>p]:mb-2">
            <h2 className="text-2xl font-semibold mb-2">Defining Authentic Values</h2>
            <p className="font-bold text-lg">Find your preliminary values</p>
            <p>
                The first step in making values meaningful is to define them authentically. This process goes beyond
                brainstorming a list of desirable traits. Instead, it demands introspection and a candid assessment of
                what genuinely drives your organisation.
            </p>
            <p>
                Begin by looking inward. Ask yourself: <em>what are the core beliefs that already underpin your most
                successful initiatives and the behaviours that are celebrated within your team?</em> Consider instances
                where
                your organisation truly excelled, or conversely, where it fell short. Often, the values that surface
                during such reflections are more genuine than those plucked from a generic list.
            </p>
            <p className="pt-2 font-bold text-lg">
                Test for distinctiveness
            </p>
            <p>
                Once a preliminary set of values emerges, rigorously test their distinctiveness. Are they unique to your
                organisation, or could they apply to any company? Generic terms
                like &apos;integrity&apos; or &apos;innovation&apos; are good starting points, but they need
                specificity. What does &apos;integrity&apos; mean within your organisation? Does it manifest as
                unwavering honesty in client interactions, absolute transparency in internal communications, or
                something more? Dig deeper to uncover the specific behaviours and actions that define each value for
                your business.
            </p>
            <p className="pt-2 font-bold text-lg">
                Ensure values are actionable
            </p>
            <p>
                Make sure the people in your organisation know how to take actions according to your values.
                Can an employee understand how to live out a value in their daily work? Vague statements offer little
                guidance. A value like &lsquo;customer focus&rsquo; is strengthened when accompanied by a clear
                understanding of what that entails&mdash;perhaps &lsquo;when making decisions, we prioritise our
                customers&apos; needs above profit.&rsquo; This clarity is vital for translating abstract concepts into
                tangible actions.
            </p>
            <p className="pt-2">
                Finally, less is often more. A concise set of three to five core values is far more memorable and
                actionable than a lengthy list. Overwhelm leads to dilution. Focus on the most pivotal principles that
                truly define your organisation&apos;s character and aspirations.
            </p>
        </section>

        <section className="mb-6 [&>p]:mb-2">
            <h2 className="text-2xl font-semibold mb-2">Weaving Values into the Organisational Culture</h2>
            <p>
                Defining values is just the first step; the true challenge lies in embedding them within
                your organisation. This requires consistent effort and a holistic approach that touches every
                aspect of the business.
            </p>
            <p className="pt-2 font-bold text-lg">Find the right people</p>
            <p>
                Your values must inform your hiring process. Beyond assessing skills and experience, evaluate candidates
                against your core values. Do their personal principles align with those you cherish as an organisation?
                Hiring individuals who naturally resonate with your values dramatically increases the likelihood of
                their embodiment within the workplace.
            </p>
            <p className="pt-2 font-bold text-lg">Link to performance</p>
            <p>
                Similarly, performance management must be closely linked to your values. Regular reviews should not
                only assess what an employee achieves but also how they achieve it. Are their actions consistent with
                your stated values? Recognise and reward behaviours that exemplify your values, and gently
                course-correct those that deviate. This sends a clear message that living the values is as important as
                meeting targets.
            </p>
            <p className="pt-2 font-bold text-lg">Lead by example</p>
            <p>
                Leadership plays a crucial role in this process. Leaders must embody the values of the organisation,
                serving as role models for the rest of the team. When leaders consistently demonstrate the values in
                their decisions and actions, it reinforces their importance and encourages employees to do the same.
                Conversely, a lack of effort&mdash;or worse, hypocrisy&mdash;at the top will quickly erode any effort to
                instil values.
            </p>
            <p className="pt-2 font-bold text-lg">Shape strategy and decision&ndash;making</p>
            <p>
                Finally, values should be a recurring topic in your operational processes and strategic decisions. When
                developing new products, entering new markets, or addressing organisational challenges, consciously
                refer back to your values. Do these decisions align with who you profess to be? This continuous
                reference ensures that values are not merely decorative statements but active drivers of your business
                strategy.
            </p>
            <p className="pt-2">
                In essence, authentic values are not a destination but a continuous journey of definition, integration,
                and lived experience. By embracing this structured approach, business executives can transform abstract
                ideals into tangible forces that shape culture, guide behaviour, and ultimately, drive enduring success.
            </p>
        </section>
    </>
}

const ValuesForm = ({formState, dispatch, incrementPage, hidden}) => {
    let [inputArray, setInputArray] = useState([
        <InputValueField key="0" id="0"/>
    ])

    const handleSubmitForm = async (formData) => {
        const {result, items} = await submitValuesForm({companyId: formState.companyId, page: 'values'}, formData)
        if (result.find(batch => batch['$metadata']?.httpStatusCode !== 200)) {
            console.log('Result:', result)
            alert('An error has occurred. Please try again later.')
        } else {
            dispatch({field: 'values', value: items})
            incrementPage()
        }
    }

    let addInputToArray = (e) => {
        e.preventDefault()
        const maxInputArrKey = inputArray[inputArray.length - 1].key
        const newKey = Number(maxInputArrKey) + 1
        setInputArray((prevState) => [
            ...prevState,
            <InputValueField key={`${newKey}`} id={`${newKey}`} removeInput={RemoveInputFromArray}/>
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
        <div hidden={hidden}>
            <div className="flex flex-col mb-2">
                <h2 className="subheading">Values</h2>
                <p>
                    Let&apos;s define your company values.
                </p>
                <p className="font-bold text-lg mt-4">
                    Writing meaningful statements
                </p>
                <p>
                    Good values are genuinely reflective of a company&apos;s ideals, without being idealistic. Avoid
                    generic statements that are not specific to the culture you want to create (for
                    example, &lsquo;excellence&rsquo;). Keep in mind that you should integrate these values in every
                    aspect of your organisation, from hiring and performance reviews to strategic decision-making.
                </p>
                <p className="my-2">
                    You can learn more about defining meaningful values by clicking &lsquo;Read more&rsquo; below.
                </p>
                {/*<p className="my-2">*/}
                {/*    You can learn more about defining meaningful values{" "}*/}
                {/*    <a href="https://hbr.org/2002/07/make-your-values-mean-something" className="underline">*/}
                {/*        here (link to Harvard Business Review)*/}
                {/*    </a>.*/}
                {/*</p>*/}
            </div>

            <form action={handleSubmitForm} className="flex flex-col mt-4">

                {inputArray}

                <div className="flex flex-col md:flex-row gap-4 md:justify-end md:mr-16">
                    <button onClick={addInputToArray} className="btn btn-neutral min-w-36">
                        Add
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-5 fill-white">
                            <path
                                d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11H7V13H11V17H13V13H17V11H13V7H11V11Z"></path>
                        </svg>
                    </button>
                    <button type="submit" className="btn btn-primary min-w-36">
                        Save
                    </button>
                </div>

            </form>

            <div className="mt-6 pb-4 border-b border-base-content/10">
                <InfoDropdown id={dropdownInformation.id}
                              title={dropdownInformation.title}
                              body={dropdownInformation.body}
                />
            </div>
        </div>
    );
};

export default ValuesForm;