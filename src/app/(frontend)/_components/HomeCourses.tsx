import React from "react";

import { getHomepage } from "@/actions/cms-actions";

export const EligibilityPath = async () => {
    const data = await getHomepage();
    const eligibility = data?.eligibility;

    if (!eligibility || !eligibility.isVisible || !eligibility.steps || eligibility.steps.length === 0) return null;

    return (
        <section className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-4 py-24 md:flex-row md:px-8">
            <div className="md:w-1/2">
                <h2 className="mb-8 font-headline text-3xl font-extrabold text-on-surface md:text-4xl">
                    {eligibility.title}
                </h2>
                <div className="relative space-y-8">
                    <div className="absolute bottom-8 left-6 top-8 hidden w-0.5 bg-outline-variant/30 md:block" />
                    {eligibility.steps && eligibility.steps.map((item: any) => (
                        <div key={item.step} className="relative flex gap-6">
                            <div className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-white shadow-lg shadow-primary/30">
                                {item.step}
                            </div>
                            <div>
                                <h3 className="mb-2 font-headline text-lg font-bold text-on-surface">{item.title}</h3>
                                <p className="text-on-surface-variant font-medium leading-relaxed">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="md:w-1/2">
                <img
                    className="rounded-[3rem] shadow-2xl transition-transform duration-500 rotate-3 hover:rotate-0 aspect-[4/5] object-cover"
                    src={eligibility.imageUrl}
                    alt={eligibility.title}
                />
            </div>
        </section>
    );
};

export const CourseStructure = async () => {
    const data = await getHomepage();
    const structure = data?.structure;

    if (!structure || !structure.isVisible || !structure.levels || structure.levels.length === 0) return null;

    return (
        <section className="bg-surface-container py-24">
            <div className="mx-auto max-w-4xl px-4 md:px-8">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 font-headline text-3xl font-extrabold text-on-surface md:text-4xl">
                        {structure.title}
                    </h2>
                    <p className="text-on-surface-variant max-w-2xl mx-auto">{structure.description}</p>
                </div>
                <div className="space-y-4">
                    {structure.levels && structure.levels.map((level: any, idx: number) => (
                        <details key={idx} open={level.isOpen} className="group overflow-hidden rounded-2xl bg-surface-bright shadow-sm border border-outline-variant/10">
                            <summary className="flex cursor-pointer list-none items-center justify-between px-8 py-6 [&::-webkit-details-marker]:hidden">
                                <span className="font-headline text-lg font-bold text-on-surface md:text-xl">{level.title}</span>
                                <span className="material-symbols-outlined text-primary transition-transform group-open:rotate-180">expand_more</span>
                            </summary>
                            <div className="px-8 pb-8">
                                <div className="rounded-xl bg-surface-container-high p-6">
                                    <ul className="grid gap-4 md:grid-cols-2">
                                        {level.items && level.items.map((item: string, i: number) => (
                                            <li key={i} className="flex items-center gap-3 text-on-surface font-medium">
                                                <span className="h-2 w-2 rounded-full bg-primary shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
};
