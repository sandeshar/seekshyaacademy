import React from "react";

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

export const EligibilityPath = () => {
    return (
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
    );
};

export const CourseStructure = () => {
    return (
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
    );
};
