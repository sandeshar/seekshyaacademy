import React from 'react';
import { getStudentRanks } from '@/actions/student-ranks';

export const SuccessStories = async () => {
    const ranks = await getStudentRanks({ status: 'active' }, { order: 1 });
    
    // Fallback if DB is empty
    const displayRanks = (ranks && ranks.length > 0) ? ranks.map((r: any) => ({
        name: r.name,
        rank: r.rank,
        quote: r.description,
        image: r.image
    })) : [
        {
            name: "Pukar Thapa",
            rank: "All Nepal Rank 1 - SBR",
            quote: "Seekshya provided the perfect environment for my professional growth.",
            place: "Placed at KPMG",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmbEyXvH6EhEk6ndH3evP92ppbUNkI7UTsbMe9tc13F8zcoRkYtLobXW-1egTGQ80h4QvQeaHafv_C0SzAx06Ke17LjLG8g6XJQtJ_-qdde1FKJSQ41_eSzlFI-7-7uCjRywMC2YHc35gFm4NbzqLSNHZgZivD6DTl0nKJbwsp3lwnzqeU9DctQ7rp0doOtn5OSgr0ZzyV26IIbrGvCLedGsss2khKcu1qhzue78G5LfeR7HHgScpnIgmB9A0xbppz_YFGZVWKdZKs",
        },
        {
            name: "Anisha Gurung",
            rank: "Global Rank 5 - FM",
            quote: "The mentorship here is truly world-class and deeply personalized.",
            place: "Placed at EY",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_vetSNCcrhFOPJRBW-Ffgpfmko8PJVNqVPGaT-KkyPYKWDGoSxUcd_HvQdeQMB1CGcHK9NzpQYtDDGih9Sw33yul-J5zgeMcZpqWq8lBQeMHyHNxlKzQH3yNbhn7QJX5pBAkpejWjrKlz2SFP1cjFZUbKqugMupOsB0Rb3DWpkZr7j7MLlVLDjooFcGCTGNBU13XYh52Tjhchdzf4ihiY13q6Dt_O5V3EHMwFhNlGUE8mFE9XZSbMy2pVqEGv_F9Q2bJgfdltF4db",
        }
    ];

    const marqueeStories = [...displayRanks, ...displayRanks];

    return (
        <section className="overflow-hidden bg-surface-container-low pb-24 pt-48">
            <div className="mx-auto mb-12 max-w-7xl px-4 text-center md:px-8">
                <h2 className="mb-4 font-headline text-3xl font-extrabold text-on-surface md:text-4xl">Our Success Stories</h2>
                <div className="mx-auto h-1.5 w-24 rounded-full bg-primary" />
                <p className="mx-auto mt-6 max-w-2xl text-on-surface-variant">Meet our high-achievers who have set benchmarks globally and across Nepal.</p>
            </div>
            <div className="relative overflow-hidden">
                <div className="flex w-max animate-marquee gap-6 px-4 py-4">
                    {marqueeStories.map((story: any, index: number) => (
                        <article key={`${story.name}-${index}`} className="flex w-87.5 shrink-0 flex-col items-center rounded-2xl border border-outline-variant/10 bg-surface-bright p-8 text-center shadow-lg">
                            <img className="mb-4 h-24 w-24 rounded-full object-cover ring-4 ring-primary/10" src={story.image || '/placeholder-avatar.jpg'} alt={story.name} />
                            <h3 className="font-headline text-xl font-bold text-on-surface">{story.name}</h3>
                            <p className="mb-2 text-sm font-bold text-secondary">{story.rank}</p>
                            <p className="whitespace-normal text-sm italic text-on-surface-variant">&quot;{story.quote}&quot;</p>
                            {story.place && (
                                <div className="mt-4 w-full border-t border-outline-variant/10 pt-4">
                                    <span className="text-xs font-bold uppercase tracking-wider text-primary">{story.place}</span>
                                </div>
                            )}
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export const FeaturedTestimonial = () => {
    return (
        <section className="overflow-hidden bg-surface-container-low py-24">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
                <div className="relative rounded-[3rem] border border-outline-variant/10 bg-surface-container-lowest p-12 shadow-xl md:p-20">
                    <span className="material-symbols-outlined absolute -top-12 -left-4 select-none text-9xl text-primary/10">format_quote</span>
                    <div className="flex flex-col items-center gap-12 md:flex-row">
                        <div className="md:w-1/3">
                            <img className="h-48 w-48 rounded-3xl object-cover shadow-lg ring-8 ring-background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmbEyXvH6EhEk6ndH3evP92ppbUNkI7UTsbMe9tc13F8zcoRkYtLobXW-1egTGQ80h4QvQeaHafv_C0SzAx06Ke17LjLG8g6XJQtJ_-qdde1FKJSQ41_eSzlFI-7-7uCjRywMC2YHc35gFm4NbzqLSNHZgZivD6DTl0nKJbwsp3lwnzqeU9DctQ7rp0doOtn5OSgr0ZzyV26IIbrGvCLedGsss2khKcu1qhzue78G5LfeR7HHgScpnIgmB9A0xbppz_YFGZVWKdZKs" alt="Pukar Thapa" />
                        </div>
                        <div className="md:w-2/3">
                            <p className="mb-8 text-xl font-medium italic leading-snug text-on-surface md:text-2xl">
                                &quot;The personalized mentorship at Seekshya Academy was instrumental in my success. The tutors don't just teach for exams; they prepare you for the professional world.&quot;
                            </p>
                            <p className="font-headline text-lg font-bold text-on-surface md:text-xl">Mr. Pukar Thapa</p>
                            <p className="font-semibold text-primary">ACCA Affiliate | Placed at Big Four Audit Firm</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
