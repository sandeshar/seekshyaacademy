import React from "react";
import Link from "next/link";

import { getHomepage } from "@/actions/cms-actions";

const fees = [
    ["Applied Knowledge", "NPR 15,000", "£89 (One-time)", "NPR 12,000"],
    ["Applied Skills", "--", "--", "NPR 18,000"],
    ["Strategic Professional", "--", "--", "NPR 25,000"],
];

const faqs = [
    {
        question: "How long does it take to complete ACCA?",
        answer: "Most students finish ACCA in 2.5 to 3 years, depending on exemptions, pace, and exam scheduling.",
    },
    {
        question: "Can I work while studying ACCA?",
        answer: "Yes. ACCA is designed for flexibility, and many students balance part-time work or internships with study.",
    },
    {
        question: "Does Seekshya Academy provide mock exams?",
        answer: "Yes. Mock exams, revision plans, and guided feedback are part of the academic support structure.",
    },
];

export const HomeMentors = async () => {
    const data = await getHomepage();
    const mentors = data?.mentors;

    if (!mentors || !mentors.isVisible) return null;

    return (
        <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
            <div className="mb-20 text-center">
                <h2 className="mb-4 font-headline text-3xl font-extrabold text-on-surface md:text-4xl">
                    {mentors.title}
                </h2>
                <p className="text-on-surface-variant max-w-2xl mx-auto">{mentors.description}</p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
                {mentors.teacherIds && mentors.teacherIds.map((teacher: any) => {
                    if (!teacher || typeof teacher === 'string') return null;

                    return (
                        <article key={teacher._id} className="rounded-3xl border border-outline-variant/10 bg-surface-bright px-8 pb-8 pt-16 text-center shadow-lg transition-transform hover:-translate-y-2 flex flex-col items-center">
                            <img className="mentor-card-img mx-auto h-28 w-28 rounded-2xl object-cover shadow-md border-4 border-white" src={teacher.image} alt={teacher.name} />
                            <h3 className="mt-4 font-headline text-xl font-bold text-on-surface uppercase tracking-wide">{teacher.name}</h3>
                            <p className="mb-3 text-sm font-extrabold text-primary">{teacher.qualifications}</p>
                            <p className="mb-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">{teacher.subject}</p>
                            {teacher.quote && (
                                <p className="mb-6 text-sm leading-relaxed text-on-surface-variant italic font-medium">"{teacher.quote}"</p>
                            )}
                            {teacher.badge && (
                                <div className="flex justify-center gap-3 mt-auto">
                                    <span className="rounded-full bg-secondary/10 px-4 py-1.5 text-[10px] font-black tracking-widest text-secondary uppercase border border-secondary/20">
                                        {teacher.badge}
                                    </span>
                                </div>
                            )}
                        </article>
                    );
                })}
            </div>
        </section>
    );
};

export const HomePricing = async () => {
    const data = await getHomepage();
    const pricing = data?.pricing;

    if (!pricing || !pricing.isVisible) return null;

    return (
        <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
            <div className="mb-16 text-center">
                <h2 className="mb-4 font-headline text-3xl font-extrabold text-on-surface md:text-4xl">{pricing.title}</h2>
                <p className="text-on-surface-variant">{pricing.description}</p>
            </div>
            <div className="overflow-hidden rounded-4xl border border-outline-variant/10 shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-primary text-white">
                                {pricing.columns?.map((col: string, i: number) => (
                                    <th key={i} className={`px-8 py-6 text-sm font-bold uppercase tracking-wider ${i === pricing.columns.length - 1 ? 'text-right' : ''}`}>
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/10">
                            {pricing.rows?.map((row: string[], index: number) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-surface-container-lowest transition-colors hover:bg-surface-container-low" : "bg-surface-container-low transition-colors hover:bg-surface-container-high"}>
                                    {row.map((cell: string, ci: number) => (
                                        <td key={ci} className={`px-8 py-6 ${ci === 0 ? 'font-bold text-on-surface' : 'text-on-surface-variant'} ${ci === row.length - 1 ? 'text-right font-bold text-primary' : ''}`}>
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <p className="mt-6 text-center text-xs text-on-surface-variant">{pricing.note}</p>
        </section>
    );
};

export const HomeFAQ = async () => {
    const data = await getHomepage();
    const faqs = data?.faqs;

    if (!faqs || !faqs.isVisible) return null;

    return (
        <section className="bg-surface-container-lowest py-24">
            <div className="mx-auto max-w-4xl px-4 md:px-8">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 font-headline text-3xl font-extrabold text-on-surface md:text-4xl">{faqs.title}</h2>
                    <div className="mx-auto h-1.5 w-16 rounded-full bg-secondary" />
                </div>
                <div className="space-y-4">
                    {faqs.items?.map((faq: any, idx: number) => (
                        <details key={idx} className="group cursor-pointer rounded-2xl bg-surface-container-low p-6 transition-colors hover:bg-surface-container-high">
                            <summary className="flex list-none items-center justify-between [&::-webkit-details-marker]:hidden">
                                <h3 className="text-lg font-bold text-on-surface">{faq.question}</h3>
                                <span className="material-symbols-outlined flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-open:rotate-45">add</span>
                            </summary>
                            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-on-surface-variant font-medium">{faq.answer}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
};

export const HomeCTA = async () => {
    const data = await getHomepage();
    const cta = data?.cta;

    if (!cta || !cta.isVisible) return null;

    return (
        <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
            <div className="overflow-hidden rounded-[3rem] bg-primary-container/20 md:flex">
                <div className="p-12 md:w-1/2 md:p-20">
                    <h2 className="mb-6 font-headline text-3xl font-extrabold text-on-surface md:text-4xl">{cta.title}</h2>
                    <p className="mb-8 text-lg leading-relaxed text-on-surface-variant font-medium">
                        {cta.description}
                    </p>
                    <div className="flex flex-wrap gap-4">
                        {cta.primaryButton && (
                            <Link
                                href={cta.primaryButton.link}
                                className="inline-flex items-center gap-3 rounded-2xl bg-primary px-8 py-4 font-headline text-lg font-bold text-white shadow-xl shadow-primary/30 transition-all hover:scale-105"
                            >
                                {cta.primaryButton.text}
                                <span className="material-symbols-outlined">{cta.primaryButton.icon || 'arrow_forward'}</span>
                            </Link>
                        )}
                        {cta.secondaryButton && (
                            <Link
                                href={cta.secondaryButton.link}
                                className="inline-flex items-center gap-3 rounded-2xl bg-surface-bright px-8 py-4 font-headline text-lg font-bold text-on-surface shadow-sm transition-all hover:scale-105 border border-outline-variant/10"
                            >
                                {cta.secondaryButton.text}
                                <span className="material-symbols-outlined">{cta.secondaryButton.icon || 'chat'}</span>
                            </Link>
                        )}
                    </div>
                </div>
                <div className="relative hidden aspect-square overflow-hidden md:block md:w-1/2">
                    <img
                        className="absolute h-full w-full object-cover"
                        src={data?.hero?.backgroundImage || "/hero-image.jpg"}
                        alt="Join Seekshya"
                    />
                    <div className="absolute inset-0 bg-primary/10" />
                </div>
            </div>
        </section>
    );
};
