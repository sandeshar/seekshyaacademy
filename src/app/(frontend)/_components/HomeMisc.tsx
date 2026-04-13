import React from "react";
import Link from "next/link";

const mentors = [
    {
        name: "Arju Bagale",
        role: "Audit & Assurance Expert",
        bio: "Dedicated to simplifying complex audit standards through practical case studies.",
        tags: ["FCCA", "MBA"],
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmHoWr2rXlwfkbsEVlJKoQMxGlDLQnzgUhccGb7ofWxDk9rSSAcFj51rqd2Ql3dDpzxO0Wayit9si8ZJyhm2htIxXQOzMfcrvvdGmZeofKCa6raJlg_jCfmKL8bXWqhbeKPlSwrUVmebhWp6QzGhBzvvDFs4MBiHMOlVzW_PvFkdr_SNlRGctX-xpT8_ThnTES_o8ezzSqgRZHhm8sQimNs30OKCgENR9ZDNnnIorRRskAEWNKmytVhI2t8UTpX5CPPVDBCBqAQMAs",
    },
    {
        name: "Deepak Kayastha",
        role: "Financial Management",
        bio: "Bringing over a decade of financial strategy experience to the classroom.",
        tags: ["CA", "M.Com"],
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_vetSNCcrhFOPJRBW-Ffgpfmko8PJVNqVPGaT-KkyPYKWDGoSxUcd_HvQdeQMB1CGcHK9NzpQYtDDGih9Sw33yul-J5zgeMcZpqWq8lBQeMHyHNxlKzQH3yNbhn7QJX5pBAkpejWjrKlz2SFP1cjFZUbKqugMupOsB0Rb3DWpkZr7j7MLlVLDjooFcGCTGNBU13XYh52Tjhchdzf4ihiY13q6Dt_O5V3EHMwFhNlGUE8mFE9XZSbMy2pVqEGv_F9Q2bJgfdltF4db",
    },
    {
        name: "Suman Giri",
        role: "Taxation Specialist",
        bio: "Expert in local and international taxation frameworks for modern businesses.",
        tags: ["ACCA", "Adv Dip Tax"],
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBy-eyuVXh8WjQR5n7iIRad6rogjtyOzXylNvqSXZplrQjYH4F-9HeWzQKFGUFvBiIVTBKQAnZuy8_hJbVVniLpKtd7Iiz898OsJjJByWvWZcIKcopKxTnFec5v60kbZ9ztgzZ8bE71RpK2fl3XROD-UyVFz0CKnlAe5A5beprqPNorKCRrBD4MOXt_UTyUMQlJHlGbRFv4xlwtfBJwT7EIUibt1qsqS3wfgY125OoP9ZMnTvQcJcF9k7GgmI18sEmyeM39sj0lrCp",
    },
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

const fees = [
    ["Applied Knowledge", "NPR 15,000", "£89 (One-time)", "NPR 12,000"],
    ["Applied Skills", "--", "--", "NPR 18,000"],
    ["Strategic Professional", "--", "--", "NPR 25,000"],
];

export const HomeMentors = () => {
    return (
        <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
            <div className="mb-20 text-center">
                <h2 className="mb-4 font-headline text-3xl font-extrabold text-on-surface md:text-4xl">Learn from the Best</h2>
                <p className="text-on-surface-variant">Our tutors are qualified experts with years of corporate experience.</p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
                {mentors.map((mentor) => (
                    <article key={mentor.name} className="rounded-3xl border border-outline-variant/10 bg-surface-bright px-8 pb-8 pt-16 text-center shadow-lg transition-transform hover:-translate-y-2">
                        <img className="mentor-card-img mx-auto h-28 w-28 rounded-2xl object-cover" src={mentor.image} alt={mentor.name} />
                        <h3 className="mt-4 font-headline text-xl font-bold text-on-surface">{mentor.name}</h3>
                        <p className="mb-4 text-sm font-semibold text-primary">{mentor.role}</p>
                        <p className="mb-6 text-sm leading-relaxed text-on-surface-variant">{mentor.bio}</p>
                        <div className="flex justify-center gap-3">
                            {mentor.tags.map((tag) => (
                                <span key={tag} className="rounded-full bg-surface-container px-3 py-1 text-xs font-bold text-on-surface">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export const HomePricing = () => {
    return (
        <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
            <div className="mb-16 text-center">
                <h2 className="mb-4 font-headline text-3xl font-extrabold text-on-surface md:text-4xl">Investment in Your Future</h2>
                <p className="text-on-surface-variant">Transparent fee structure for all academic levels.</p>
            </div>
            <div className="overflow-hidden rounded-4xl border border-outline-variant/10 shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-primary text-white">
                                <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider">Course Level</th>
                                <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider">Admission Fee</th>
                                <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider">Registration</th>
                                <th className="px-8 py-6 text-right text-sm font-bold uppercase tracking-wider">Tuition (Per Paper)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/10">
                            {fees.map((row, index) => (
                                <tr key={row[0]} className={index % 2 === 0 ? "bg-surface-container-lowest transition-colors hover:bg-surface-container-low" : "bg-surface-container-low transition-colors hover:bg-surface-container-high"}>
                                    <td className="px-8 py-6 font-bold text-on-surface">{row[0]}</td>
                                    <td className="px-8 py-6 text-on-surface-variant">{row[1]}</td>
                                    <td className="px-8 py-6 text-on-surface-variant">{row[2]}</td>
                                    <td className="px-8 py-6 text-right font-bold text-primary">{row[3]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <p className="mt-6 text-center text-xs text-on-surface-variant">* ACCA UK fees (Registration & Exams) are subject to exchange rate fluctuations and UK pricing updates.</p>
        </section>
    );
};

export const HomeFAQ = () => {
    return (
        <section className="bg-surface-container-lowest py-24">
            <div className="mx-auto max-w-4xl px-4 md:px-8">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 font-headline text-3xl font-extrabold text-on-surface md:text-4xl">Frequently Asked Questions</h2>
                    <div className="mx-auto h-1.5 w-16 rounded-full bg-secondary" />
                </div>
                <div className="space-y-4">
                    {faqs.map((faq) => (
                        <details key={faq.question} className="group cursor-pointer rounded-2xl bg-surface-container-low p-6 transition-colors hover:bg-surface-container-high">
                            <summary className="flex list-none items-center justify-between [&::-webkit-details-marker]:hidden">
                                <h3 className="text-lg font-bold text-on-surface">{faq.question}</h3>
                                <span className="material-symbols-outlined text-primary transition-transform group-open:rotate-45">add</span>
                            </summary>
                            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-on-surface-variant">{faq.answer}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
};

export const HomeCTA = () => {
    return (
        <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
            <div className="overflow-hidden rounded-[3rem] bg-primary-container/20 md:flex">
                <div className="p-12 md:w-1/2 md:p-20">
                    <h2 className="mb-6 font-headline text-3xl font-extrabold text-on-surface md:text-4xl">Start Your Journey Today</h2>
                    <p className="mb-8 text-lg leading-relaxed text-on-surface-variant">
                        Join hundreds of successful students who have transformed their careers with Seekshya Academy. Get in touch with our counselors now.
                    </p>
                    <div className="flex max-w-md items-center rounded-2xl bg-white p-2 shadow-lg">
                        <input className="min-w-0 flex-1 border-none px-4 text-sm outline-none" placeholder="Enter your email" type="email" />
                        <Link href="/contact" className="rounded-xl bg-primary px-6 py-3 font-bold text-white transition-transform hover:scale-95">
                            Get Started
                        </Link>
                    </div>
                </div>
                <div className="relative min-h-75 md:w-1/2">
                    <img className="absolute inset-0 h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7ioFnQiLHGD6pQY20KVhwYp_xueH9ZpGGOIv3KXIjOUGr7-W8TrmJqOXaovbJCH4LFwENIvz6vKH_wTSxBUEpJqprA7R8-CzJox_sIyT3GJoKWsq0dHNDbu29rlqfJto3MQUSFYNXATdRkxr550zszPi2BTbBPrgjlm25NwlFtfUqYKppHEYz75jl7-MEOS6P3iUVpSyvaR5TP4G4uSRVXs2rXf-Wi3XmSVYRGZ_cHFfQUPMlQHM6lVGYZ4OmFPQmt7ufF5d_7rYQ" alt="a cheerful confident student with a backpack smiling broadly" />
                </div>
            </div>
        </section>
    );
};
