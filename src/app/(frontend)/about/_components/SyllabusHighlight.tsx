import React from 'react';

interface SyllabusHighlightProps {
    data: {
        badgeText: string;
        title: string;
        description: string;
        primaryButton: { text: string; link: string; icon?: string };
        imageUrl: string;
    };
}

const SyllabusHighlight = ({ data }: SyllabusHighlightProps) => {
    return (
        <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex justify-center">
            <div className="relative overflow-hidden rounded-xl bg-primary text-white shadow-lg w-full max-w-7xl">
                {/* Background Pattern Overlay */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}
                ></div>
                <div className="relative z-10 flex flex-col md:flex-row items-stretch">
                    <div className="flex flex-1 flex-col justify-center gap-6 p-8 md:p-12">
                        <div className="flex items-center gap-2 text-accent-gold font-bold tracking-wide text-sm uppercase">
                            <span className="material-symbols-outlined text-sm">verified</span>
                            {data?.badgeText}
                        </div>
                        <h3 className="text-3xl font-bold leading-tight font-display">{data?.title}</h3>
                        <p className="text-white/90 text-lg leading-relaxed">
                            {data?.description}
                        </p>
                        {data?.primaryButton?.text && (
                            <a
                                href={data.primaryButton.link}
                                className="flex w-fit items-center gap-2 rounded-lg bg-white px-6 py-3 text-primary font-bold hover:bg-slate-50 transition-colors"
                            >
                                <span>{data.primaryButton.text}</span>
                                <span className="material-symbols-outlined text-sm">{data.primaryButton.icon || 'arrow_forward'}</span>
                            </a>
                        )}
                    </div>
                    <div
                        className="w-full md:w-1/3 min-h-[250px] bg-center bg-cover bg-no-repeat"
                        style={{ backgroundImage: `url("${data?.imageUrl || 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2022&auto=format&fit=crop'}")` }}
                    >
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SyllabusHighlight;

