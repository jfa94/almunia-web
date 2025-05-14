import {useRef, useState} from "react";

export const InfoDropdown = ({title, subtitle, body}) => {
    const accordion = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <div
                className="relative flex gap-2 items-center w-full pt-5 text-left border-t border-base-content/10"
                onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(!isOpen);
                }}
                aria-expanded={isOpen}
            >
                <div className="flex flex-col">
                    <p className={`flex-1 md:text-xl text-lg font-bold text-base-content ${isOpen ? "text-primary" : ""}`}>{title}</p>
                    {subtitle}
                </div>
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
            </div>

            <div
                ref={accordion}
                className={`transition-all duration-300 ease-in-out opacity-80 overflow-hidden`}
                style={
                    isOpen
                        ? {maxHeight: accordion?.current?.scrollHeight, opacity: 1}
                        : {maxHeight: 0, opacity: 0}
                }
            >
                <div className="flex flex-col gap-2 py-5 leading-relaxed">{body}</div>
            </div>
        </div>
    );
};

