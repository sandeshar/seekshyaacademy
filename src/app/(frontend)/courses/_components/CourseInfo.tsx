import React from 'react';

const CourseInfo = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 flex flex-col gap-6">
                <div>
                    <h2 className="text-slate-900 text-2xl font-bold leading-tight tracking-tight mb-4 flex items-center gap-3 font-display">
                        <span className="bg-primary/10 text-primary p-2 rounded-lg material-symbols-outlined">menu_book</span>
                        Course Introduction
                    </h2>
                    <p className="text-slate-600 text-lg leading-relaxed">
                        The CA Foundation Course is the entry-level examination for the Chartered Accountancy course offered by the Institute of Chartered Accountants of Nepal (ICAN). Our comprehensive program is meticulously designed to build a strong conceptual framework for students entering the profession under the new 2025 syllabus. We focus on bridging the gap between theoretical knowledge and practical application.
                    </p>
                </div>
                <div className="bg-secondary/5 p-6 rounded-xl border border-secondary/20 mt-2">
                    <h3 className="text-slate-900 text-xl font-bold mb-4 flex items-center gap-2 font-display">
                        <span className="material-symbols-outlined text-primary">check_circle</span>
                        Eligibility Criteria
                    </h3>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3 text-slate-700">
                            <div className="min-w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                            <span>Completed Higher Secondary Education (10+2) or equivalent with minimum GPA requirements.</span>
                        </li>
                        <li className="flex items-start gap-3 text-slate-700">
                            <div className="min-w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                            <span>Students awaiting Class 12 results can apply for provisional registration.</span>
                        </li>
                        <li className="flex items-start gap-3 text-slate-700">
                            <div className="min-w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                            <span>Graduates from any stream seeking a career in finance and accounting.</span>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Quick Stats / Trust Signals Card */}
            <div className="lg:col-span-5">
                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 h-full">
                    <h3 className="text-xl font-bold text-slate-900 mb-6 font-display">Why Choose Seekshya Academy?</h3>
                    <div className="grid grid-cols-1 gap-6">
                        <div className="flex items-center gap-4">
                            <div className="size-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                                <span className="material-symbols-outlined">groups</span>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-900">1,500+</p>
                                <p className="text-sm text-slate-500 font-medium">Successful Alumni</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="size-12 rounded-full bg-accent-orange/10 flex items-center justify-center text-accent-orange">
                                <span className="material-symbols-outlined">workspace_premium</span>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-900">#1</p>
                                <p className="text-sm text-slate-500 font-medium">Ranked Institute in Valley</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="size-12 rounded-full bg-accent-gold/10 flex items-center justify-center text-accent-gold">
                                <span className="material-symbols-outlined">library_books</span>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-900">Updated</p>
                                <p className="text-sm text-slate-500 font-medium">2025 ICAN Syllabus</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-slate-100">
                        <p className="italic text-slate-500 text-sm">"The faculty at Lakshya made complex accounting concepts simple. Best decision for my foundation prep!"</p>
                        <div className="flex items-center gap-3 mt-3">
                            <div className="size-8 rounded-full bg-slate-200 overflow-hidden">
                                <img
                                    alt="Student Portrait"
                                    className="w-full h-full object-cover"
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
                                />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900">Priya Sharma</p>
                                <p className="text-xs text-slate-500">Foundation Topper 2023</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseInfo;

