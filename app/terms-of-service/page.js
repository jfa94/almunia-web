import Link from "next/link";
import {getSEOTags} from "@/lib/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR TERMS & SERVICES — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple Terms & Services for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Contact information: marc@shipfa.st
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - Ownership: when buying a package, users can download code to create apps. They own the code but they do not have the right to resell it. They can ask for a full refund within 7 day after the purchase.
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Link to privacy-policy: https://shipfa.st/privacy-policy
// - Governing Law: France
// - Updates to the Terms: users will be updated by email

// Please write a simple Terms & Services for my site. Add the current date. Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
    title: `Terms and Conditions | ${config.appName}`,
    canonicalUrlRelative: "/terms-of-service",
});

const TOS = () => {
    return (
        <main className="max-w-3xl mx-auto">
            <div className="p-5">
                <Link href="/" className="btn btn-ghost">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            fillRule="evenodd"
                            d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Back
                </Link>
                <h1 className="heading">
                    Terms and Conditions for <span className="capitalize">{config.appName}</span>
                </h1>

                <p className="paragraph"><strong>Effective Date: 28 March 2024</strong></p>

                <h2 className="subheading">1. Acceptance of Terms</h2>
                <p className="paragraph">By accessing or using the Almunia website and services, you agree to be bound
                    by these Terms & Conditions and our Privacy Policy.</p>

                <h2 className="subheading">2. Services</h2>
                <p className="paragraph">Almunia provides a web application that helps companies define their culture
                    through guided questions and to gather employee feedback with the objective of making improvements.
                    The services are provided &quot;as is&quot; without warranties of any kind.</p>

                <h2 className="subheading">3. User Accounts</h2>
                <p className="paragraph">To access certain features of the services, you may be required to create an
                    account. You are responsible for maintaining the confidentiality of your account credentials and for
                    all activities that occur under your account.</p>

                <h2 className="subheading">4. Intellectual Property</h2>
                <p className="paragraph">The Almunia website, services, and all associated intellectual property rights
                    are owned by Almunia. You may not modify, reproduce, distribute, or create derivative works based on
                    our services without prior written consent.</p>

                <h2 className="subheading">5. User Conduct</h2>
                <p className="paragraph">You agree to use the services in compliance with all applicable laws and
                    regulations. You shall not misuse the services for any illegal or unauthorized purpose.</p>

                <h2 className="subheading">6. Data Collection</h2>
                <p className="paragraph">Almunia collects certain personal and non-personal data as described in our
                    Privacy Policy. By using the services, you consent to our data collection and usage practices.</p>

                <h2 className="subheading">7. Payment and Fees</h2>
                <p className="paragraph">Certain features of the services may require payment of fees. You agree to pay
                    all applicable fees in a timely manner. Almunia reserves the right to modify or discontinue the
                    services at any time.</p>

                <h2 className="subheading">8. Limitation of Liability</h2>
                <p className="paragraph">Almunia shall not be liable for any indirect, incidental, consequential, or
                    punitive damages arising out of or relating to the use of the services.</p>

                <h2 className="subheading">9. Governing Law</h2>
                <p className="paragraph">These Terms & Services shall be governed by and construed in accordance with
                    the laws of the United Kingdom.</p>

                <h2 className="subheading">10. Modifications</h2>
                <p className="paragraph">Almunia reserves the right to modify these Terms & Services at any time. Users
                    will be notified of updates via email. Continued use of the services after modifications constitutes
                    acceptance of the updated terms.</p>

                <p className="paragraph">If you have any questions or concerns regarding these Terms & Services, please
                    contact us at {config.contact.supportEmail}.</p>
            </div>
        </main>
    );
};

export default TOS;
