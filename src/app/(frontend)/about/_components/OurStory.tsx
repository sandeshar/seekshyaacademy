import React from 'react';

interface OurStoryProps {
    data: {
        badgeText: string;
        title: string;
        description: string;
        imageUrl: string;
        cards: {
            icon: string;
            title: string;
            description: string;
        }[];
    };
}

const OurStory = ({ data }: OurStoryProps) => {
    return (
        <section className="px-4 sm:px-6 lg:px-8 flex justify-center py-16 md:py-24">
            <div className="flex flex-col max-w-7xl flex-1 gap-16">
                <div className="flex flex-col md:flex-row gap-10 items-center">
                    <div className="flex flex-col gap-6 flex-1">
                        <div className="flex flex-col gap-2">
                            <span className="text-primary font-bold tracking-wider text-sm uppercase">{data?.badgeText}</span>
                            <h2 className="text-slate-900 text-3xl lg:text-4xl font-bold leading-tight font-display">
                                {data?.title}
                            </h2>
                        </div>
                        <div className="text-slate-700 text-base lg:text-lg leading-relaxed whitespace-pre-wrap">
                            {data?.description}
                        </div>
                    </div>
                    <div className="flex-1 w-full">
                        <div
                            className="w-full bg-center bg-no-repeat aspect-[4/3] bg-cover rounded-xl shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-500"
                            style={{ backgroundImage: `url("${data?.imageUrl || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop'}")` }}
                        >
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data?.cards?.map((card, idx) => (
                        <div key={idx} className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
                            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>{card.icon}</span>
                            </div>
                            <h3 className="text-slate-900 text-xl font-bold leading-tight font-display">{card.title}</h3>
                            <p className="text-slate-500 leading-relaxed">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurStory;

