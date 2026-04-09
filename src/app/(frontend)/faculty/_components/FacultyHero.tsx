import React from 'react';
import Link from 'next/link';

interface FacultyHeroProps {
    data?: {
        badgeText: string;
        title: string;
        description: string;
        backgroundImage: string;
        overlayOpacity?: number;
        primaryButton: {
            text: string;
            link: string;
            icon?: string;
        };
        secondaryButton: {
            text: string;
            link: string;
            icon?: string;
        };
    };
}

const FacultyHero = ({ data }: FacultyHeroProps) => {
    if (!data) return null;

    return (
        <section className="relative h-[650px] flex items-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    className="w-full h-full object-cover opacity-20"
                    alt="Modern academic library hall with high ceilings and soft natural sunlight, blurred professional environment"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9FjJqV3LRHmwHcLQe9ItyjofWWaT1o2Jqbe7czDifiOabrAClY5HLFErF0sCTZsWusYNTZAD3tVroFtI8yjfzNNaR6A7po5O5jYZLVgieWTTmu1vtgsIFgiGX95hlD42faxTu05p5NfAYXIjd9mVi1Jzhz44d0gB5Z5__EUFq753howoR8ZshPMD9bVr5G5n6-QBYy5XwLjzD7udmOwwqBaaRxxYyEBlCCj5wN17RugzMg_nrMDCE6fmM1w2Rgi-rxL7P7mPTi06F"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
                <div className="max-w-2xl">
                    <span className="text-secondary font-headline font-bold tracking-widest text-xs uppercase mb-4 block">Chartered Excellence</span>
                    <h1 className="text-6xl md:text-7xl font-headline font-extrabold text-on-surface tracking-tight mb-6">
                        Meet Your <span className="text-primary">Mentors</span>
                    </h1>
                    <p className="text-lg text-on-surface-variant leading-relaxed max-w-xl">
                        Learn from the industry's most distinguished financial minds. Our faculty comprises ACCA members, industry veterans, and passionate educators dedicated to your professional elevation.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-6">
                        {data?.primaryButton?.text && (
                            <Link
                                href={data.primaryButton.link}
                                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-bold text-white shadow-xl shadow-primary/20 transition-all hover:scale-105 hover:bg-primary/90 gap-2 group"
                            >
                                {data.primaryButton.text}
                                {data.primaryButton.icon && (
                                    <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                                        {data.primaryButton.icon}
                                    </span>
                                )}
                            </Link>
                        )}
                        {data?.secondaryButton?.text && (
                            <Link
                                href={data.secondaryButton.link}
                                className="inline-flex items-center justify-center rounded-full border-2 border-outline-variant px-8 py-3.5 text-base font-bold text-primary transition-all hover:bg-surface-container-low gap-2 group"
                            >
                                <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                                    {data.secondaryButton.icon || "explore"}
                                </span>
                                {data.secondaryButton.text}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FacultyHero;

