import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seekshya Academy | Best ACCA College in Nepal",
  description: "Seekshya Academy helps ACCA aspirants build professional mastery through expert guidance, practical learning, and proven results.",
};

const valueProps = [
  {
    label: "Course Levels",
    title: "3 Comprehensive Stages",
    icon: "layers",
  },
  {
    label: "Duration",
    title: "2.5 to 3 Years",
    icon: "schedule",
  },
  {
    label: "Delivery Mode",
    title: "Hybrid & Classroom",
    icon: "laptop_mac",
  },
];

const successStories = [
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
  },
  {
    name: "Roshan Adhikari",
    rank: "Nepal Rank 2 - AA",
    quote: "Exams felt easier thanks to the rigorous mock sessions at Seekshya.",
    place: "Placed at Deloitte",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmHoWr2rXlwfkbsEVlJKoQMxGlDLQnzgUhccGb7ofWxDk9rSSAcFj51rqd2Ql3dDpzxO0Wayit9si8ZJyhm2htIxXQOzMfcrvvdGmZeofKCa6raJlg_jCfmKL8bXWqhbeKPlSwrUVmebhWp6QzGhBzvvDFs4MBiHMOlVzW_PvFkdr_SNlRGctX-xpT8_ThnTES_o8ezzSqgRZHhm8sQimNs30OKCgENR9ZDNnnIorRRskAEWNKmytVhI2t8UTpX5CPPVDBCBqAQMAs",
  },
  {
    name: "Sameer Giri",
    rank: "Global Rank 12 - TX",
    quote: "A transformational journey from a student to a finance professional.",
    place: "Placed at PwC",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBy-eyuVXh8WjQR5n7iIRqad6rogjtyOzXylNvqSXZplrQjYH4F-9HeWzQKFGUFvBiIVTBKQAnZuy8_hJbVVniLpKtd7Iiz898OsJjJByWvWZcIKcopKxTnFec5v60kbZ9ztgzZ8bE71RpK2fl3XROD-UyVFz0CKnlAe5A5beprqPNorKCRrBD4MOXt_UTyUMQlJHlGbRFv4xlwtfBJwT7EIUibt1qsqS3wfgY125OoP9ZMnTvQcJcF9k7GgmI18sEmyeM39sj0lrCp",
  },
];

const highlights = [
  {
    title: "Gold Approved Learning Partner",
    description: "We maintain the highest standards of tuition and student support as recognized by ACCA global.",
    icon: "military_tech",
    accent: "md:col-span-2",
    chips: ["Certified Excellence", "Premium Quality"],
  },
  {
    title: "92% Consistent Pass Rate",
    description: "Consistently outperforming the global average with disciplined preparation.",
    icon: "analytics",
    stat: "92%",
    inverse: true,
  },
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

const eligibilitySteps = [
  {
    step: "1",
    title: "+2 Graduates (Science/Mgmt)",
    description: "Students who have completed +2 can directly join the ACCA Applied Knowledge level.",
  },
  {
    step: "2",
    title: "Bachelors/Masters Holders",
    description: "Eligible for specific exemptions based on previous academic qualifications in commerce.",
  },
  {
    step: "3",
    title: "School Leavers (SEE)",
    description: "Can start via the Foundations in Accountancy (FIA) route to build core competencies.",
  },
];

const courseLevels = [
  {
    title: "Applied Knowledge Level",
    items: ["Business and Technology (BT)", "Management Accounting (MA)", "Financial Accounting (FA)"],
    open: true,
  },
  {
    title: "Applied Skills Level",
    items: ["Corporate and Business Law (LW)", "Performance Management (PM)", "Taxation (TX)", "Financial Reporting (FR)", "Audit and Assurance (AA)", "Financial Management (FM)"],
  },
  {
    title: "Strategic Professional Level",
    items: ["Strategic Business Leader (SBL)", "Strategic Business Reporting (SBR)", "Optional Professional Papers"],
  },
];

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
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBy-eyuVXh8WjQR5n7iIRqad6rogjtyOzXylNvqSXZplrQjYH4F-9HeWzQKFGUFvBiIVTBKQAnZuy8_hJbVVniLpKtd7Iiz898OsJjJByWvWZcIKcopKxTnFec5v60kbZ9ztgzZ8bE71RpK2fl3XROD-UyVFz0CKnlAe5A5beprqPNorKCRrBD4MOXt_UTyUMQlJHlGbRFv4xlwtfBJwT7EIUibt1qsqS3wfgY125OoP9ZMnTvQcJcF9k7GgmI18sEmyeM39sj0lrCp",
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

export default function Home() {
  const marqueeStories = [...successStories, ...successStories];

  return (
    <main className="min-h-screen overflow-hidden bg-background text-on-background">
      <section className="relative flex min-h-[min(100vh,920px)] items-center overflow-hidden pt-10">
        <div className="absolute inset-0 -z-10">
          <img
            className="h-full w-full object-cover opacity-20"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAih4JvkaSs_na-KDh2YgK39Vj30nh9pM0Z7acomB5Krip_q50L0sM9FNkcxjqpqfBXgoWSHsbz2PoBx5EnLPYYm4728ZUAQZlIjD8kgonPCZxLfzBWrgUFFuWIEqzSo634vjFnnn46iV3nT9y-VRa-kyuK7Ot8OQCe9gQWYy52nVZh7xhBd_6_qk-6FQ0XfkOPgixIdL1nYi-IWf9d4NWS9pRI1IxxxWjxCPUstX0kLytdVOJbEWtcJaALq7Ajr9dxzjJOR8E3rhGE"
            alt="vibrant modern classroom setting with diverse ambitious students collaborating on laptops"
          />
          <div className="absolute inset-0 bg-linear-to-r from-background via-background/92 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-4 py-16 md:grid-cols-2 md:px-8 lg:py-24">
          <div>
            <span className="mb-6 inline-block rounded-full bg-secondary/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.3em] text-secondary">
              Excellence in Finance
            </span>
            <h1 className="mb-6 max-w-xl font-headline text-4xl font-extrabold leading-[1.05] text-on-background md:text-6xl">
              Best <span className="text-primary">ACCA</span> College in Nepal
            </h1>
            <p className="mb-8 max-w-lg text-lg leading-relaxed text-on-surface-variant md:text-xl">
              Become a globally recognized professional with the Association of Chartered Certified Accountants. We curate your path to financial mastery.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 font-bold text-white shadow-xl shadow-primary/20 transition-transform hover:scale-105">
                Enquire Now
              </Link>
              <Link href="/courses" className="inline-flex items-center justify-center rounded-full border-2 border-outline-variant px-8 py-4 font-bold text-primary transition-colors hover:bg-surface-container-low">
                Download Brochure
              </Link>
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

      <section className="relative z-20 mx-auto -mt-14 mb-10 max-w-7xl px-4 md:px-8">
        <div className="grid overflow-hidden rounded-4xl border border-outline-variant/20 bg-surface-container-lowest shadow-[0_20px_60px_-24px_rgba(15,23,42,0.45)] md:grid-cols-3 md:divide-x md:divide-y-0 divide-y divide-outline-variant/20">
          {valueProps.map((item) => (
            <div key={item.label} className="flex items-center gap-6 p-8 md:p-9">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-3xl">{item.icon}</span>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">{item.label}</p>
                <p className="font-headline text-xl font-bold text-on-surface">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="overflow-hidden bg-surface-container-low pb-24 pt-28">
        <div className="mx-auto mb-12 max-w-7xl px-4 text-center md:px-8">
          <h2 className="mb-4 font-headline text-3xl font-extrabold text-on-surface md:text-4xl">Our Success Stories</h2>
          <div className="mx-auto h-1.5 w-24 rounded-full bg-primary" />
          <p className="mx-auto mt-6 max-w-2xl text-on-surface-variant">Meet our high-achievers who have set benchmarks globally and across Nepal.</p>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex w-max animate-marquee gap-6 px-4 py-4">
            {marqueeStories.map((story, index) => (
              <article key={`${story.name}-${index}`} className="flex w-87.5 shrink-0 flex-col items-center rounded-2xl border border-outline-variant/10 bg-surface-bright p-8 text-center shadow-lg">
                <img className="mb-4 h-24 w-24 rounded-full object-cover ring-4 ring-primary/10" src={story.image} alt={story.name} />
                <h3 className="font-headline text-xl font-bold text-on-surface">{story.name}</h3>
                <p className="mb-2 text-sm font-bold text-secondary">{story.rank}</p>
                <p className="whitespace-normal text-sm italic text-on-surface-variant">&quot;{story.quote}&quot;</p>
                <div className="mt-4 w-full border-t border-outline-variant/10 pt-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">{story.place}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-16 px-4 py-24 md:grid-cols-2 md:px-8">
        <div className="relative">
          <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-primary/5 blur-3xl" />
          <img
            className="relative z-10 aspect-square w-full rounded-[2.5rem] object-cover shadow-2xl"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKVfH8M0RAbASaqparGmVahpGOdNOY69d_uiRqmdJ5zsLOTauLZztPeLp02m2ogO7r_zOe1w2CRtmtykGQ5sCm1GDbiXKvRY2_XwM4YJ7648ITbwqAi1OsWrq5b-X3_HwyBydS8laWra_THqt7xO44qWNdFCgMu9XyF3uyImhhmKK37AzRBn-38lR7WBdKfrUsEZiuj6vQo_sTy7fCVWqg2lWqlEkiPLlaruaxClyJZAOQLFRl923AawKqWwV7_-BzBMlXz86BoRpQ"
            alt="professional accounting documents on a clean white desk"
          />
          <div className="absolute -bottom-6 -right-6 z-20 rounded-3xl bg-secondary p-6 text-white shadow-xl">
            <p className="font-headline text-3xl font-extrabold">180+</p>
            <p className="text-xs font-bold uppercase tracking-widest opacity-80">Countries Recognized</p>
          </div>
        </div>
        <div>
          <h2 className="mb-6 font-headline text-3xl font-extrabold leading-tight text-on-surface md:text-4xl">
            What is <span className="text-primary">ACCA?</span>
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-on-surface-variant">
            ACCA (the Association of Chartered Certified Accountants) is the global body for professional accountants. It offers business-relevant, first-choice qualifications to people of application, ability and ambition around the world who seek a rewarding career in accountancy, finance and management.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-primary">check_circle</span>
              <p className="font-semibold text-on-surface">Global mobility in over 180 countries.</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-primary">check_circle</span>
              <p className="font-semibold text-on-surface">Employers across the globe seek ACCA members.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-headline text-3xl font-extrabold text-on-surface md:text-4xl">Why Seekshya Academy?</h2>
            <div className="mx-auto h-1.5 w-24 rounded-full bg-secondary" />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="md:col-span-2 flex flex-col justify-between rounded-4xl border border-outline-variant/10 bg-surface-container-lowest p-10 shadow-sm transition-shadow hover:shadow-xl">
              <div>
                <span className="material-symbols-outlined mb-6 text-4xl text-primary">military_tech</span>
                <h3 className="mb-4 font-headline text-2xl font-extrabold text-on-surface md:text-3xl">Gold Approved Learning Partner</h3>
                <p className="max-w-md text-lg text-on-surface-variant">We maintain the highest standards of tuition and student support as recognized by ACCA global.</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <span className="rounded-full bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary">Certified Excellence</span>
                <span className="rounded-full bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary">Premium Quality</span>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-4xl bg-primary p-10 text-white">
              <span className="material-symbols-outlined mb-6 text-4xl">analytics</span>
              <div>
                <h3 className="mb-2 font-headline text-5xl font-extrabold">92%</h3>
                <p className="font-semibold text-on-primary/90">Consistent pass rate above the global average.</p>
              </div>
            </div>

            {highlights.slice(2).map((item) => (
              <div key={item.title} className="flex flex-col items-center rounded-4xl border border-outline-variant/10 bg-surface-container-lowest p-10 text-center">
                <span className="material-symbols-outlined mb-6 text-4xl text-primary">{item.icon}</span>
                <h3 className="mb-2 font-headline text-lg font-bold text-on-surface">{item.title}</h3>
                <p className="text-sm text-on-surface-variant">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-4 py-24 md:flex-row md:px-8">
        <div className="md:w-1/2">
          <h2 className="mb-8 font-headline text-3xl font-extrabold text-on-surface md:text-4xl">Eligibility Path</h2>
          <div className="relative space-y-8">
            <div className="absolute bottom-8 left-6 top-8 hidden w-0.5 bg-outline-variant/30 md:block" />
            {eligibilitySteps.map((item) => (
              <div key={item.step} className="relative flex gap-6">
                <div className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-white shadow-lg shadow-primary/30">
                  {item.step}
                </div>
                <div>
                  <h3 className="mb-2 font-headline text-lg font-bold text-on-surface">{item.title}</h3>
                  <p className="text-on-surface-variant">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="md:w-1/2">
          <img
            className="rounded-[3rem] shadow-2xl transition-transform duration-500 rotate-3 hover:rotate-0"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXYpUN3HEF4MncjjH6OPB33Bw-y_VO8-qGLNgum9AVPjfx_wc-pcjcLE5wGicGz7SoZU42Iz7yli4BhSbhNDrDF31x77SxC1qu2LF0e2aHbwh5H9Z1qwaMC-eKVCNbjvp60Rf-PExF8H9UHSlReXdK7ww-krAHFar7gQLXhMVCfdBGXBQqjdggBTnqB1eZq7Fo7aAdybVRSZV9QTvoEZ2zpfcaBiCxrZg2yKyle34mG2I9LxmZ_l9UCoD3_FqniTrKXOcKuYL_Hh21"
            alt="close-up of a student holding a leather-bound diploma"
          />
        </div>
      </section>

      <section className="bg-surface-container py-24">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-headline text-3xl font-extrabold text-on-surface md:text-4xl">Course Structure</h2>
            <p className="text-on-surface-variant">A modular approach to professional excellence</p>
          </div>
          <div className="space-y-4">
            {courseLevels.map((level) => (
              <details key={level.title} open={level.open} className="group overflow-hidden rounded-2xl bg-surface-bright shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between px-8 py-6 [&::-webkit-details-marker]:hidden">
                  <span className="font-headline text-lg font-bold text-on-surface md:text-xl">{level.title}</span>
                  <span className="material-symbols-outlined text-primary transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <div className="px-8 pb-8">
                  <div className="rounded-xl bg-surface-container-high p-6">
                    <ul className="grid gap-4 md:grid-cols-2">
                      {level.items.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-on-surface">
                          <span className="h-2 w-2 rounded-full bg-primary" />
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

      <section className="overflow-hidden bg-surface-container-low py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="relative rounded-[3rem] border border-outline-variant/10 bg-surface-container-lowest p-12 shadow-xl md:p-20">
            <span className="material-symbols-outlined absolute -top-12 -left-4 select-none text-9xl text-primary/10">format_quote</span>
            <div className="flex flex-col items-center gap-12 md:flex-row">
              <div className="md:w-1/3">
                <img className="h-48 w-48 rounded-3xl object-cover shadow-lg ring-8 ring-background" src={successStories[0].image} alt={successStories[0].name} />
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
    </main>
  );
}

