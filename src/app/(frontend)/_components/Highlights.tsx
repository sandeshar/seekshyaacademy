import React from 'react';

interface HighlightsProps {
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

const Highlights = ({ data }: HighlightsProps) => {
    const highlights = data?.items || [];

    return (
        <div className="w-full py-16 md:py-24 bg-background-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">{data?.title}</h2>
                        <p className="text-slate-600 font-medium">{data?.description}</p>
                    </div>
                    <div className="h-1.5 w-24 bg-accent-orange rounded-full hidden md:block"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {highlights.map((item, index) => (
                        <div key={index} className="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-primary transition-all duration-500 cursor-default hover:-translate-y-1 shadow-sm hover:shadow-2xl hover:shadow-primary/10">
                            <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 overflow-hidden text-center shrink-0">
                                <span className="material-symbols-outlined text-[28px] shrink-0">{item.icon}</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                            <p className="text-sm text-slate-500 leading-relaxed font-normal">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Highlights;

