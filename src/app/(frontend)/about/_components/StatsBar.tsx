import React from 'react';

interface StatsBarProps {
    data: {
        items: {
            number: string;
            title: string;
        }[];
    };
}

const StatsBar = ({ data }: StatsBarProps) => {
    return (
        <div className="bg-white border-y border-slate-100 w-full py-12 md:py-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 size-96 bg-primary/2 rounded-full -mr-48 -mt-48 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 size-96 bg-secondary/2 rounded-full -ml-48 -mb-48 blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center lg:divide-x lg:divide-slate-100">
                    {data?.items?.map((item, idx) => (
                        <div key={idx} className="flex flex-col gap-4 group transition-all duration-300 hover:-translate-y-1">
                            <span className="text-3xl md:text-4xl font-black text-primary drop-shadow-sm font-lexend tracking-tight">
                                {item.number}
                            </span>
                            <span className="text-sm text-slate-500 font-bold uppercase tracking-[0.15em] font-sans opacity-80">
                                {item.title}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StatsBar;

