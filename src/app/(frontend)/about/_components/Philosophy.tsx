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
        <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex justify-center">
            <div className="flex flex-col gap-10 w-full max-w-7xl">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-slate-900 text-3xl font-bold mb-4 font-display">{data?.title}</h2>
                    <p className="text-slate-500">{data?.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {data?.items?.map((item, idx) => (
                        <div key={idx} className="flex flex-col gap-4 p-6 rounded-xl bg-white border border-slate-100 hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                            <div className="text-primary">
                                <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>{item.icon}</span>
                            </div>
                            <h4 className="text-lg font-bold text-slate-800 font-display">{item.title}</h4>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Philosophy;

