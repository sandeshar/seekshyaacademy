import React from 'react';

const subjects = [
    {
        paper: "Paper 1",
        title: "Fundamentals of Accounting",
        icon: "account_balance",
        desc: "In-depth understanding of accounting principles, financial statements, and partnership accounts."
    },
    {
        paper: "Paper 2",
        title: "Mercantile Laws & Economics",
        icon: "gavel",
        desc: "Basic concepts of business laws, contract acts, and fundamental micro & macro economics."
    },
    {
        paper: "Paper 3",
        title: "Business Mathematics & Stats",
        icon: "calculate",
        desc: "Focus on logical reasoning, statistics, and mathematics tailored for business applications."
    },
    {
        paper: "Paper 4",
        title: "Business Comm. & Knowledge",
        icon: "campaign",
        desc: "Developing professional communication skills and general business awareness."
    }
];

const CourseCurriculum = () => {
    return (
        <div className="flex flex-col gap-8 w-full">
            <div className="text-center max-w-2xl mx-auto">
                <span className="text-primary font-semibold tracking-wide uppercase text-sm">Curriculum</span>
                <h2 className="text-3xl font-bold text-slate-900 mt-2 font-display">Subjects Covered</h2>
                <p className="text-slate-500 mt-2">Comprehensive coverage of all four papers as per the new ICAN syllabus.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {subjects.map((s, i) => (
                    <div key={i} className="group bg-white p-6 rounded-xl border border-slate-200 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-default">
                        <div className="size-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined">{s.icon}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">{s.paper}</h4>
                        <h3 className="text-lg font-bold text-slate-900 mb-3 font-display">{s.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseCurriculum;

