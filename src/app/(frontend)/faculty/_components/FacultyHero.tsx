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
        <section className="relative w-full overflow-hidden bg-linear-to-b from-surface-container-low to-background py-16 md:py-24">
            <div className="pointer-events-none absolute -left-20 -top-20 size-64 rounded-full bg-primary/8 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-16 size-72 rounded-full bg-secondary/8 blur-3xl" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-16 items-center">
                    {/* Text Content */}
                    <div className="flex flex-col gap-6 lg:w-1/2">
                        <div className="flex flex-col gap-3">
                            <span className="inline-block w-fit rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                                {data.badgeText}
                            </span>
                            <h1 className="font-headline text-4xl font-extrabold leading-tight tracking-tight text-on-surface sm:text-5xl lg:text-6xl">
                                {data.title}
                            </h1>
                            <p className="text-lg text-on-surface-variant">
                                {data.description}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-4 pt-2">
                            <Link href={data.primaryButton.link} className="rounded-full bg-primary px-7 py-3 text-base font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary-dark transition-colors flex items-center gap-2 group">
                                {data.primaryButton.text}
                                {data.primaryButton.icon && (
                                    <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">{data.primaryButton.icon}</span>
                                )}
                            </Link>
                            <Link href={data.secondaryButton.link} className="flex items-center gap-2 rounded-full border border-outline-variant bg-surface-container-lowest px-7 py-3 text-base font-semibold text-on-surface hover:bg-surface-container-low transition-colors group">
                                <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">{data.secondaryButton.icon || 'play_circle'}</span>
                                {data.secondaryButton.text}
                            </Link>
                        </div>
                    </div>
                    {/* Image */}
                    <div className="w-full lg:w-1/2">
                        <div className="relative aspect-video w-full overflow-hidden rounded-[2rem] border border-outline-variant/20 shadow-2xl lg:aspect-4/3">
                            <div
                                className="absolute inset-0 bg-primary z-10"
                                style={{ opacity: (data.overlayOpacity !== undefined ? data.overlayOpacity : 20) / 100 }}
                            ></div>
                            <div
                                className="h-full w-full bg-cover bg-center"
                                style={{ backgroundImage: `url('${data.backgroundImage}')` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FacultyHero;

