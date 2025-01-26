const About = () => {
    return (
        <section
            className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
            <div
                className="flex flex-col md:flex-row gap-10 lg:gap-14 items-start justify-center text-center lg:text-left">
                <h1 className="md:basis-2/5 font-extrabold text-3xl lg:text-5xl tracking-tight md:-mb-4">
                    About <span className="text-amber-600">Almunia</span>
                </h1>
                <div className="md:basis-3/5 text-lg opacity-80 leading-relaxed text-left">
                    <p className='mb-4'>At Almunia, we want to help organizations create and sustain great workplaces by fostering strong, values-led cultures. We help companies create an environment for their team to thrive, reducing turnover rates and increasing job satisfaction.</p>
                    <p className='mb-4'>Guided by research, our tools are designed to help you make frequent adjustments that will have a significant impact in the long term. By leveraging a data-driven methodology, we help companies define their ideal culture, gather employee feedback, and implement best practices to drive meaningful change.</p>
                </div>
            </div>
        </section>
    );
};

export default About;
