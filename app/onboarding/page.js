import ValuesForm from "@/app/onboarding/values/ValuesForm";

const Onboarding = () => {
    // const [orgValues, setOrgValues] = useState([])
    return (
        <>
            <main className="border-2 border-blue-600 max-w-7xl m-auto p-2">
                <h1 className="heading">Onboarding</h1>

                <ValuesForm />

            </main>
        </>
    );
};

export default Onboarding;