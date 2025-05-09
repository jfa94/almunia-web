const About = () => {
    return (
        <section
            className="container px-4 mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 py-16 lg:py-24">
            <div
                className="flex flex-col md:flex-row gap-10 lg:gap-14 items-start justify-center text-center lg:text-left">
                <h1 className="md:basis-2/5 font-extrabold text-4xl md:text-5xl tracking-tight md:-mb-4">
                    Our <span className="text-amber-600">mission</span>
                </h1>

                <div className="md:basis-3/5 text-lg opacity-80 leading-relaxed text-left">
                    <p className='mb-4'>At Almunia, we want to help workplaces become community that are driven by their purpose. Our mission is to enable every company&mdash;regardless of its size&mdash;to design a culture that is aligned with their values and to deliver the best possible version of that culture.</p>
                    
                    <div className="flex flex-col md:flex-row gap-8 pt-2">
                        <div className="md:basis-1/2 p-6 bg-base-100 rounded-lg border border-base-200">
                            <h3 className="font-bold text-xl mb-2">For HR Leaders</h3>
                            <p>Tools to develop and implement cultural strategies without needing a large team or specialized expertise.</p>
                        </div>
                        
                        <div className="md:basis-1/2 p-6 bg-base-100 rounded-lg border border-base-200">
                            <h3 className="font-bold text-xl mb-2">For Business Leaders</h3>
                            <p>Data-driven insights to make decisions that align your culture with your business objectives.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
