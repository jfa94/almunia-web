"use client";

import {useRef, useState} from "react";
import config from "@/config";

const faqList = [
    {
        question: "How does Almunia help improve company culture?",
        answer: <div className="space-y-2 leading-relaxed">
            Almunia provides tools to define your cultural values, gather employee feedback through anonymous surveys,
            track progress over time with analytics, and implement best practices that align with your company&rsquo;s
            values.
            Our data-driven approach helps you identify what&rsquo;s working and what needs improvement, allowing you to
            make
            informed decisions that positively impact your workplace culture.
        </div>,
    },
    {
        question: "Is Almunia suitable for small businesses?",
        answer: <div className="space-y-2 leading-relaxed">
            Absolutely! Almunia is designed to help organizations of any size develop a strong culture. While large
            companies often have dedicated HR departments for this work, small businesses typically don&rsquo;t have
            these resources. Our platform makes it easy to implement best practices at companies that don&rsquo;t have
            specialised expertise or large teams.
        </div>,
    },
    // {
    //     question: "How long does it take to see results?",
    //     answer: <div className="space-y-2 leading-relaxed">
    //         Companies typically begin seeing measurable improvements in engagement metrics within 2-3 months of
    //         consistent use. Cultural change is an ongoing process, but our platform helps you understand the tradeoffs
    //         you are currently making with your culture,
    //         and identify quick wins through direct employee feedback.
    //     </div>,
    // },
    {
        question: "Are survey responses anonymous?",
        answer: <div className="space-y-2 leading-relaxed">
            Yes, all survey responses are fully anonymised. Admin accounts can
            see how many responses each question has received, and (if configured) a team-level breakdown of results.
            However, none of the responses are tied to an individual, ensuring employees can provide honest feedback.
        </div>,
    },
    {
        question: "How do you store data?",
        answer: <div className="space-y-2 leading-relaxed">
            Each organization&rsquo;s data is encrypted and stored in a secure environment. Account
            admins are the only users able to access or decrypt your information. We follow industry best practices
            for data security and comply with relevant data protection regulations.
        </div>,
    },
    {
        question: "I have another question",
        answer: (
            <div className="space-y-2 leading-relaxed">
                Please reach out via email at {config.contact.supportEmail}.io. Our team is happy to answer any questions
                you might have about our platform and how we can help your organization.
            </div>
        ),
    },
];

const Item = ({item}) => {
    const accordion = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li>
            <button
                className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
                onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(!isOpen);
                }}
                aria-expanded={isOpen}
            >
        <span
            className={`flex-1 text-base-content ${isOpen ? "text-primary" : ""}`}
        >
          {item?.question}
        </span>
                <svg
                    className={`flex-shrink-0 w-4 h-4 ml-auto fill-current`}
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        y="7"
                        width="16"
                        height="2"
                        rx="1"
                        className={`transform origin-center transition duration-200 ease-out ${
                            isOpen && "rotate-180"
                        }`}
                    />
                    <rect
                        y="7"
                        width="16"
                        height="2"
                        rx="1"
                        className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                            isOpen && "rotate-180 hidden"
                        }`}
                    />
                </svg>
            </button>

            <div
                ref={accordion}
                className={`transition-all duration-300 ease-in-out opacity-80 overflow-hidden`}
                style={
                    isOpen
                        ? {maxHeight: accordion?.current?.scrollHeight, opacity: 1}
                        : {maxHeight: 0, opacity: 0}
                }
            >
                <div className="pb-5 leading-relaxed">{item?.answer}</div>
            </div>
        </li>
    );
};

const FAQ = () => {
    return (
        <section className="bg-base-200" id="faq">
            <div className="container py-24 px-4 mx-auto flex flex-col md:flex-row gap-12">
                <div className="flex flex-col text-left basis-1/2">
                    <p className="inline-block font-semibold text-primary mb-4">FAQ</p>
                    <p className="sm:text-4xl text-3xl font-extrabold text-base-content">
                        Frequently Asked Questions
                    </p>
                    <p className="mt-4 text-base-content/70">
                        Have more questions? Contact us at <a href={`mailto:${config.contact.supportEmail}`}
                                                              className="text-primary hover:underline">{config.contact.supportEmail}</a>
                    </p>
                </div>

                <ul className="basis-1/2">
                    {faqList.map((item, i) => (
                        <Item key={i} item={item}/>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default FAQ;
