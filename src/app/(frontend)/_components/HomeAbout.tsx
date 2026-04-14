import React from "react";
import { getHomepage } from "@/actions/cms-actions";

const highlights = [
    {
        title: "Internship Assistance",
        description: "Placement support in top audit firms and corporate houses.",
        icon: "work_history",
    },
    {
        title: "Expert Mentors",
        description: "Learn from industry veterans and qualified chartered accountants.",
        icon: "groups",
    },
    {
        title: "Flexible Fees",
        description: "Affordable installments and scholarship opportunities for deserving students.",
        icon: "payments",
    },
];

export const WhatIsACCA = async () => {
    const data = await getHomepage();
    const about = data?.about;

    if (!about || !about.isVisible) return null;

    return (
        <section className="mx-auto grid max-w-7xl gap-16 px-4 py-24 md:grid-cols-2 md:px-8">
            <div className="relative">
                <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-primary/5 blur-3xl" />
                <img
                    className="relative z-10 aspect-square w-full rounded-[2.5rem] object-cover shadow-2xl"
                    src={about.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuDKVfH8M0RAbASaqparGmVahpGOdNOY69d_uiRqmdJ5zsLOTauLZztPeLp02m2ogO7r_zOe1w2CRtmtykGQ5sCm1GDbiXKvRY2_XwM4YJ7648ITbwqAi1OsWrq5b-X3_HwyBydS8laWra_THqt7xO44qWNdFCgMu9XyF3uyImhhmKK37AzRBn-38lR7WBdKfrUsEZiuj6vQo_sTy7fCVWqg2lWqlEkiPLlaruaxClyJZAOQLFRl923AawKqWwV7_-BzBMlXz86BoRpQ"}
                    alt={about.title}
                />
                {about.stats && about.stats.length > 0 && (
                    <div className="absolute -bottom-6 -right-6 z-20 rounded-3xl bg-secondary p-6 text-white shadow-xl">
                        <p className="font-headline text-3xl font-extrabold">{about.stats[0].value}</p>
                        <p className="text-xs font-bold uppercase tracking-widest opacity-80">{about.stats[0].label}</p>
                    </div>
                )}
            </div>
            <div>
                {about.badgeText && (
                    <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.3em] text-primary">
                        {about.badgeText}
                    </span>
                )}
                <h2 className="mb-6 font-headline text-3xl font-extrabold leading-tight text-on-surface md:text-4xl">
                    {about.title}
                </h2>
                <p className="mb-6 text-lg leading-relaxed text-on-surface-variant">
                    {about.description}
                </p>
                <div className="space-y-4">
                    {about.bullets.map((bullet: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-4">
                            <span className="material-symbols-outlined text-primary">check_circle</span>
                            <p className="font-semibold text-on-surface">{bullet}</p>
                        </div>
                    ))}
                </div>

                {about.stats && about.stats.length > 1 && (
                    <div className="mt-10 grid grid-cols-2 gap-6 border-t border-outline-variant/20 pt-8">
                        {about.stats.slice(1).map((stat: any, idx: number) => (
                            <div key={idx}>
                                <p className="font-headline text-2xl font-extrabold text-primary">{stat.value}</p>
                                <p className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export const WhySeekshya = async () => {
    const data = await getHomepage();
    const why = data?.whyChooseUs;

    if (!why || !why.isVisible) return null;

    return (
        <section className="bg-surface-container-low py-24">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 font-headline text-3xl font-extrabold text-on-surface md:text-4xl">
                        {why.title}
                    </h2>
                    <div className="mx-auto h-1.5 w-24 rounded-full bg-secondary" />
                    {why.description && (
                        <p className="mt-6 text-on-surface-variant max-w-2xl mx-auto">{why.description}</p>
                    )}
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {why.mainCard && (
                        <div className="md:col-span-2 flex flex-col justify-between rounded-4xl border border-outline-variant/10 bg-surface-container-lowest p-10 shadow-sm transition-shadow hover:shadow-xl">
                            <div>
                                <span className="material-symbols-outlined mb-6 text-4xl text-primary">
                                    {why.mainCard.icon}
                                </span>
                                <h3 className="mb-4 font-headline text-2xl font-extrabold text-on-surface md:text-3xl">
                                    {why.mainCard.title}
                                </h3>
                                <p className="max-w-md text-lg text-on-surface-variant">
                                    {why.mainCard.description}
                                </p>
                            </div>
                            <div className="mt-8 flex flex-wrap gap-4">
                                {why.mainCard.tags.map((tag: string, idx: number) => (
                                    <span key={idx} className="rounded-full bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {why.statsCard && (
                        <div className="flex flex-col justify-between rounded-4xl bg-primary p-10 text-white">
                            <span className="material-symbols-outlined mb-6 text-4xl">
                                {why.statsCard.icon}
                            </span>
                            <div>
                                <h3 className="mb-2 font-headline text-5xl font-extrabold">
                                    {why.statsCard.value}
                                </h3>
                                <p className="font-semibold text-on-primary/90">
                                    {why.statsCard.label}
                                </p>
                            </div>
                        </div>
                    )}

                    {why.items && why.items.map((item: any, idx: number) => (
                        <div key={idx} className="flex flex-col items-center rounded-4xl border border-outline-variant/10 bg-surface-container-lowest p-10 text-center transition-shadow hover:shadow-md">
                            <span className="material-symbols-outlined mb-6 text-4xl text-primary">
                                {item.icon}
                            </span>
                            <h3 className="mb-2 font-headline text-lg font-bold text-on-surface">
                                {item.title}
                            </h3>
                            <p className="text-sm text-on-surface-variant">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
