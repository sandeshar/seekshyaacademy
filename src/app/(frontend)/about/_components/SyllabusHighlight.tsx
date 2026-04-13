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
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary via-primary to-primary-dark text-white shadow-2xl w-full max-w-7xl group">
                {/* Background Pattern Overlay */}
                <div
                    className="absolute inset-0 opacity-15 mix-blend-overlay"
                    style={{ backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, white 0.5px, transparent 0)', backgroundSize: '32px 32px' }}
                ></div>
                <div className="absolute top-0 right-0 size-96 bg-white/5 rounded-full blur-3xl -mr-48 -mt-48 transition-all group-hover:bg-white/10 duration-700"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-stretch">
                    <div className="flex flex-[1.5] flex-col justify-center gap-6 p-8 md:p-12 lg:p-16">
                        <div className="flex items-center gap-3 text-accent-gold font-semibold tracking-[0.2em] text-xs uppercase bg-white/10 w-fit px-4 py-2 rounded-lg backdrop-blur-md border border-white/10 shadow-sm">
                            <span className="material-symbols-outlined text-[1rem] font-semibold">verified</span>
                            {data?.badgeText}
                        </div>
                        <h3 className="text-2xl lg:text-4xl font-bold leading-tight font-lexend tracking-tight drop-shadow-md">{data?.title}</h3>
                        <p className="text-blue-50/90 text-sm lg:text-base font-sans leading-relaxed max-w-2xl font-normal opacity-95">
                            {data?.description}
                        </p>
                        {data?.primaryButton?.text && (
                            <a
                                href={data.primaryButton.link}
                                className="flex w-fit items-center gap-3 rounded-full bg-white px-6 py-3 text-primary text-sm font-semibold hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 group/btn"
                            >
                                <span>{data.primaryButton.text}</span>
                                <span className="material-symbols-outlined text-lg group-hover/btn:translate-x-2 transition-transform">{data.primaryButton.icon || 'arrow_forward'}</span>
                            </a>
                        )}
                    </div>
                    <div
                        className="w-full md:w-1/3 min-h-[250px] bg-center bg-cover bg-no-repeat transition-all duration-700 md:group-hover:scale-105"
                        style={{ backgroundImage: `url("${data?.imageUrl}")` }}
                    >
                        <div className="absolute inset-0 bg-linear-to-r from-primary/50 to-transparent md:from-primary/20"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SyllabusHighlight;

