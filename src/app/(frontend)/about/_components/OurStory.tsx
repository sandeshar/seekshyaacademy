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
        <section className="px-4 sm:px-6 lg:px-8 flex justify-center py-16 md:py-24 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent -z-10"></div>
            <div className="flex flex-col max-w-7xl flex-1 gap-12 md:gap-16">
                <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center">
                    <div className="flex flex-col gap-6 flex-1">
                        <div className="flex flex-col gap-3">
                            <span className="text-secondary font-black tracking-[0.2em] text-xs uppercase bg-secondary/5 w-fit px-4 py-1.5 rounded-full border border-secondary/10">{data?.badgeText}</span>
                            <h2 className="text-slate-900 text-3xl lg:text-4xl font-black leading-tight font-lexend tracking-tight">
                                {data?.title}
                            </h2>
                        </div>
                        <div className="text-slate-600 text-base lg:text-lg leading-relaxed whitespace-pre-wrap font-sans opacity-90">
                            {data?.description}
                        </div>
                    </div>
                    <div className="flex-1 w-full relative group">
                        <div className="absolute inset-0 bg-primary/20 rounded-2xl transform rotate-3 scale-102 blur-sm group-hover:rotate-0 transition-transform duration-700"></div>
                        <div
                            className="relative w-full bg-center bg-no-repeat aspect-[4/3] bg-cover rounded-2xl shadow-2xl z-10"
                            style={{ backgroundImage: `url("${data?.imageUrl || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop'}")` }}
                        >
                            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent rounded-2xl"></div>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {data?.cards?.map((card, idx) => (
                        <div key={idx} className="group relative flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-10 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500 overflow-hidden">
                            <div className="absolute -right-4 -bottom-4 size-32 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                            <div className="size-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-sm relative z-10">
                                <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>{card.icon}</span>
                            </div>
                            <div className="relative z-10 flex flex-col gap-3">
                                <h3 className="text-slate-900 text-xl font-bold leading-tight font-lexend">{card.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed font-sans opacity-95">
                                    {card.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurStory;

