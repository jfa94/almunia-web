"use client";

import {useRef, useState} from "react";

// <FAQ> component is a lsit of <Item> component
// Just import the FAQ & add your FAQ content to the const faqList

const faqList = [
    {
        question: "Are survey responses anonymous?",
        answer: <div className="space-y-2 leading-relaxed">
            Yes, all survey responses are fully anonymized. Admin accounts can
            see how many responses each question has received, and (if configured) a team-level breakdown of results.
            However, none of the responses are tied to an individual.
        </div>,
    },
    {
        question: "How do you store data?",
        answer: (<p>
                Each organisation&rsquo;s data is encrypted and kept siloed in its own separate environment. Account
                admins are the only users able to access or decrypt your information.
            </p>
        ),
    },
    {
        question: "I have another question",
        answer: (
            <div className="space-y-2 leading-relaxed">
                Please reach out via email. You can find our contact information below.
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
            <div className="py-24 px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
                <div className="flex flex-col text-left basis-1/2">
                    <p className="inline-block font-semibold text-primary mb-4">FAQ</p>
                    <p className="sm:text-4xl text-3xl font-extrabold text-base-content">
                        Frequently Asked Questions
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
