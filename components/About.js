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
                    <p className='mb-4'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid aspernatur atque doloribus fugit id ipsa ipsam magni nisi nulla quaerat quas, quasi qui quo quos saepe tenetur. Ducimus, quidem.</p>
                    <p className='mb-4'>Atque blanditiis consectetur dolorem earum eligendi expedita iste, officia recusandae vero voluptates? Aliquam aperiam eos esse eum expedita fugiat laboriosam magnam modi molestiae nostrum nulla numquam obcaecati, quas sapiente similique!</p>
                    <p className='mb-4'>Fugit hic minus provident quo tempora! A at corporis dignissimos, eos exercitationem explicabo iste libero, minima optio quam rerum sequi sunt? A accusantium assumenda beatae doloribus et mollitia, recusandae unde.</p>
                </div>
            </div>
        </section>
    );
};

export default About;
