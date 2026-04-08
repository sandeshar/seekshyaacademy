import React from 'react';

const methodologies = [
    {
        title: "Concept Clarity First",
        icon: "psychology",
        desc: "We deconstruct complex topics into simple, relatable concepts ensuring a strong foundation for advanced levels."
    },
    {
        title: "Exam-Oriented Practice",
        icon: "quiz",
        desc: "Regular weekly tests and mock exams that simulate the real ICAN examination environment."
    },
    {
        title: "Personalized Mentorship",
        icon: "person_raised_hand",
        desc: "Dedicated doubt-clearing sessions and one-on-one mentorship to track individual progress."
    }
];

const CourseMethodology = () => {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-slate-900 text-2xl font-bold mb-4 font-display">Teaching Methodology</h2>
                <p className="text-slate-600">We don't just teach; we prepare you for the exam and the profession. Our methodology is rooted in three core pillars.</p>
            </div>
            <div className="flex flex-col gap-4">
                {methodologies.map((m, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-lg bg-white border border-slate-100 shadow-sm">
                        <div className="mt-1">
                            <span className="material-symbols-outlined text-primary text-3xl">{m.icon}</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 text-lg font-display">{m.title}</h3>
                            <p className="text-sm text-slate-500 mt-1">{m.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseMethodology;

