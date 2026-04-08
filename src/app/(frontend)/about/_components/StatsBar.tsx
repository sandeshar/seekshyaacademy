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
        <div className="bg-white border-b border-slate-200 w-full py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
                    {data?.items?.map((item, idx) => (
                        <div key={idx} className={`flex flex-col gap-1 ${idx > 0 ? 'pl-4 md:pl-0' : ''}`}>
                            <span className="text-3xl md:text-4xl font-black text-primary">{item.number}</span>
                            <span className="text-sm text-slate-500 font-medium">{item.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StatsBar;

