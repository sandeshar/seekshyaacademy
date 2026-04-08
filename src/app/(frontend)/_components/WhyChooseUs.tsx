import React from 'react';

interface WhyChooseUsProps {
    data: {
        badgeText: string;
        title: string;
        description?: string;
        imageUrl: string;
        stats: {
            number: string;
            text: string;
        };
        reasons: {
            icon: string;
            title: string;
            description: string;
        }[];
    };
}

const WhyChooseUs = ({ data }: WhyChooseUsProps) => {
    const reasons = data?.reasons || [];

    return (
        <div className="w-full py-16 md:py-24 bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-1/2">
                        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-tr from-secondary/60 to-transparent z-10"></div>
                            <img
                                alt="Students studying together in a modern library"
                                className="w-full h-[550px] object-cover"
                                src={data?.imageUrl || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"}
                            />
                            <div className="absolute bottom-10 left-10 z-20 text-white max-w-sm">
                                <div className="text-5xl font-black mb-3 text-accent-orange">{data?.stats?.number}</div>
                                <p className="font-bold text-xl leading-tight">{data?.stats?.text}</p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2">
                        <span className="text-primary font-bold tracking-widest uppercase text-xs mb-3 block px-3 py-1 bg-primary/10 w-fit rounded-full">{data?.badgeText}</span>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight leading-tight">{data?.title}</h2>
                        <div className="space-y-8">
                            {reasons.map((reason, index) => (
                                <div key={index} className="flex gap-5 group">
                                    <div className="flex-shrink-0 size-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 overflow-hidden text-center">
                                        <span className="material-symbols-outlined text-2xl shrink-0">{reason.icon}</span>
                                    </div>
                                    <div className="pt-1">
                                        <h4 className="text-lg font-bold text-slate-900 mb-1.5 group-hover:text-primary transition-colors">{reason.title}</h4>
                                        <p className="text-slate-500 text-sm leading-relaxed">{reason.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;

