import Link from "next/link";
import {getSEOTags} from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR PRIVACY POLICY — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple privacy policy for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Purpose of Data Collection: Order processing
// - Data sharing: we do not share the data with any other parties
// - Children's Privacy: we do not collect any data from children
// - Updates to the Privacy Policy: users will be updated by email
// - Contact information: marc@shipfa.st

// Please write a simple privacy policy for my site. Add the current date.  Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
    title: `Privacy Policy | ${config.appName}`,
    canonicalUrlRelative: "/privacy-policy",
});

const PrivacyPolicy = () => {
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
                    {" "}
                    Back
                </Link>
                <h1 className="text-3xl font-extrabold pb-6">
                    Privacy Policy for <span className="capitalize">{config.appName}</span>
                </h1>

                <h2 className="subheading">Privacy Policy (Last Updated: 28 March, 2024)</h2>
                <p className="paragraph">This privacy policy explains how Almunia (&quot;we&quot;, &quot;our&quot;,
                    or &quot;us&quot;) collects, uses, and discloses information about you when you access or use our
                    web application.</p>

                <h3 className="subheading">Information We Collect:</h3>
                <p className="paragraph">- Personal Information: We collect personal information such as your name,
                    email address, company name, and payment information when you sign up for our service or make a
                    purchase. Additional information, such as employee feedback and organizational reporting lines
                    will be collected as needed to provide the services.</p>
                <p className="paragraph">- Non-Personal Information: We may collect non-personal information such as
                    cookies and other tracking technologies to enhance your experience on our website.</p>

                <h3 className="subheading">How We Use Your Information:</h3>
                <p className="paragraph">The personal information we collect is used to provide our services, process
                    orders, and communicate with you about your account or any updates to our services.</p>

                <h3 className="subheading">Data Sharing:</h3>
                <p className="paragraph">We do not share your personal information with any third parties.</p>

                <h3 className="subheading">Children&rsquo;s Privacy:</h3>
                <p className="paragraph">Our services are not directed towards children under the age of 13, and we do
                    not knowingly collect personal information from children.</p>

                <h3 className="subheading">Updates to this Policy:</h3>
                <p className="paragraph">We may update this privacy policy from time to time. If we make any changes, we
                    will notify you by email.</p>

                <h3 className="subheading">Contact Us:</h3>
                <p className="paragraph">If you have any questions or concerns about this privacy policy, please contact
                    us at {config.contact.supportEmail}.</p>
            </div>
        </main>
    );
};

export default PrivacyPolicy;
