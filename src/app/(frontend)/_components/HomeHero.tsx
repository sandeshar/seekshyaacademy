import Link from "next/link";
import React from "react";
import { getHomepage } from "@/actions/cms-actions";

export const HomeHero = async () => {
    const data = await getHomepage();
    const hero = data?.hero;
    const stats = data?.stats;

    if (!hero || !hero.isVisible) return null;

    return (
        <>
            <section className="relative flex min-h-[min(100vh,920px)] items-center overflow-hidden pt-10">
                <div className="absolute inset-0 z-0">
                    <img
                        className="h-full w-full object-cover"
                        src={hero.backgroundImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuD9FjJqV3LRHmwHcLQe9ItyjofWWaT1o2Jqbe7czDifiOabrAClY5HLFErF0sCTZsWusYNTZAD3tVroFtI8yjfzNNaR6A7po5O5jYZLVgieWTTmu1vtgsIFgiGX95hlD42faxTu05p5NfAYXIjd9mVi1Jzhz44d0gB5Z5__EUFq753howoR8ZshPMD9bVr5G5n6-QBYy5XwLjzD7udmOwwqBaaRxxYyEBlCCj5wN17RugzMg_nrMDCE6fmM1w2Rgi-rxL7P7mPTi06F"}
                        alt={hero.title}
                    />
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundColor: hero.overlayColor || "#ffffff",
                            opacity: (hero.overlayOpacity || 10) / 100
                        }}
                    />
                </div>

                <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-4 py-16 md:grid-cols-2 md:px-8 lg:py-24">
                    <div>
                        {hero.badgeText && (
                            <span className="mb-6 inline-block rounded-full bg-secondary/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.3em] text-secondary">
                                {hero.badgeText}
                            </span>
                        )}
                        <h1 className="mb-6 max-w-xl font-headline text-4xl font-extrabold leading-[1.05] text-on-background md:text-6xl">
                            {hero.title}
                        </h1>
                        <p className="mb-8 max-w-lg text-lg leading-relaxed text-on-surface-variant md:text-xl">
                            {hero.description}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            {hero.primaryButton?.text && (
                                <Link href={hero.primaryButton.link || "/contact"} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-bold text-white shadow-xl shadow-primary/20 transition-transform hover:scale-105">
                                    {hero.primaryButton.icon && <span className="material-symbols-outlined text-xl">{hero.primaryButton.icon}</span>}
                                    {hero.primaryButton.text}
                                </Link>
                            )}
                            {hero.secondaryButton?.text && (
                                <Link href={hero.secondaryButton.link || "/courses"} className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-outline-variant px-8 py-4 font-bold text-primary transition-colors hover:bg-surface-container-low">
                                    {hero.secondaryButton.icon && <span className="material-symbols-outlined text-xl">{hero.secondaryButton.icon}</span>}
                                    {hero.secondaryButton.text}
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="rounded-4xl border border-outline-variant/15 bg-surface-bright p-8 shadow-2xl shadow-on-surface/5">
                        <h2 className="mb-6 font-headline text-xl font-bold text-on-surface">Get a Free Consultation</h2>
                        <div className="space-y-4">
                            <input className="w-full rounded-xl border border-transparent bg-surface-container px-5 py-4 text-sm outline-none transition-colors focus:border-primary focus:bg-white" placeholder="Full Name" type="text" />
                            <input className="w-full rounded-xl border border-transparent bg-surface-container px-5 py-4 text-sm outline-none transition-colors focus:border-primary focus:bg-white" placeholder="Phone Number" type="tel" />
                            <input className="w-full rounded-xl border border-transparent bg-surface-container px-5 py-4 text-sm outline-none transition-colors focus:border-primary focus:bg-white" placeholder="Email Address" type="email" />
                            <textarea className="w-full rounded-xl border border-transparent bg-surface-container px-5 py-4 text-sm outline-none transition-colors focus:border-primary focus:bg-white" placeholder="How can we help you?" rows={3} />
                            <button type="button" className="w-full rounded-xl bg-secondary py-4 font-bold text-white transition-colors hover:bg-secondary-container">
                                Submit Inquiry
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {stats && stats.isVisible && stats.items && stats.items.length > 0 && (
                <section className="relative z-20 mx-auto -mt-14 -mb-28 max-w-7xl px-4 md:px-8">
                    <div className={`grid overflow-hidden rounded-4xl border border-outline-variant/20 bg-surface-container-lowest shadow-[0_20px_60px_-24px_rgba(15,23,42,0.45)] md:grid-cols-${Math.min(stats.items.length, 4)} md:divide-x md:divide-y-0 divide-y divide-outline-variant/20`}>
                        {stats.items.map((item: any, idx: number) => (
                            <div key={idx} className="flex items-center gap-6 p-8 md:p-9">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                    <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant font-sans">{item.label}</p>
                                    <p className="font-headline text-xl font-bold text-on-surface">{item.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </>
    );
};

// Removing static component as it's now integrated above
// export const HomeValueProps = () => { ... }
