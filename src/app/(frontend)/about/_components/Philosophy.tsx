import React from 'react';

interface PhilosophyProps {
    data: {
        title: string;
        description: string;
        items: {
            icon: string;
            title: string;
            description: string;
        }[];
    };
}

const Philosophy = ({ data }: PhilosophyProps) => {
    return (
        <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex justify-center bg-slate-50/70 border-y border-slate-100 relative">
            <div className="flex flex-col gap-10 lg:gap-16 w-full max-w-7xl">
                <div className="text-center max-w-3xl mx-auto flex flex-col gap-5">
                    <h2 className="text-slate-900 text-3xl lg:text-4xl font-bold font-lexend tracking-tight tracking-tight">{data?.title}</h2>
                    <div className="h-1.5 w-24 bg-primary mx-auto rounded-full"></div>
                    <p className="text-slate-600 text-base lg:text-lg font-sans leading-relaxed opacity-90">{data?.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {data?.items?.map((item, idx) => (
                        <div key={idx} className="group relative flex flex-col gap-5 p-6 md:p-8 rounded-2xl bg-white border border-slate-100 hover:border-primary/20 transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-1.5 overflow-hidden">
                            <div className="absolute top-0 right-0 size-48 bg-primary/2.5 -mr-24 -mt-24 rounded-full group-hover:scale-125 transition-transform duration-700"></div>
                            <div className="text-primary bg-primary/10 size-14 rounded-xl flex items-center justify-center transition-all duration-300 z-10 shadow-sm group-hover:bg-primary group-hover:text-white">
                                <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>{item.icon}</span>
                            </div>
                            <div className="flex flex-col gap-2 relative z-10">
                                <h4 className="text-xl font-semibold text-slate-800 font-lexend tracking-tight">{item.title}</h4>
                                <p className="text-slate-500 text-sm md:text-base leading-relaxed font-sans opacity-95">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Philosophy;

