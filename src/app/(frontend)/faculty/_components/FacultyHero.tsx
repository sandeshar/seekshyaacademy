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
                    alt={data?.title || "Modern academic library hall"}
                    src={data?.backgroundImage}
                />
                <div
                    className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"
                    style={{ opacity: (data?.overlayOpacity || 80) / 100 }}
                ></div>
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
                <div className="max-w-2xl">
                    <span className="text-secondary font-headline font-bold tracking-widest text-xs uppercase mb-4 block">
                        {data?.badgeText || "Chartered Excellence"}
                    </span>
                    <h1 className="text-6xl md:text-7xl font-headline font-extrabold text-on-surface tracking-tight mb-6">
                        {data?.title}
                    </h1>
                    <p className="text-lg text-on-surface-variant leading-relaxed max-w-xl">
                        {data?.description}
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

