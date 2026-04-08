import React from 'react';

interface CourseBreadcrumbsProps {
    category?: { name: string; slug: string };
    subcategoryName?: string;
}

const CourseBreadcrumbs = ({ category, subcategoryName }: CourseBreadcrumbsProps) => {
    return (
        <div className="bg-slate-50 border-b border-slate-200">
            <div className="layout-container flex h-full grow flex-col">
                <div className="px-4 sm:px-6 lg:px-8 flex flex-1 justify-center py-3">
                    <div className="layout-content-container flex flex-col max-w-7xl flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <a className="text-slate-500 text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors" href="/">Home</a>
                            <span className="material-symbols-outlined text-slate-300 text-[14px]">chevron_right</span>
                            <a className="text-slate-500 text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors" href="/courses">Courses</a>

                            {category && (
                                <>
                                    <span className="material-symbols-outlined text-slate-300 text-[14px]">chevron_right</span>
                                    <a
                                        className={`text-xs font-bold uppercase tracking-widest transition-colors ${!subcategoryName ? 'text-primary' : 'text-slate-500 hover:text-primary'}`}
                                        href={`/courses/${category.slug}`}
                                    >
                                        {category.name}
                                    </a>
                                </>
                            )}

                            {subcategoryName && (
                                <>
                                    <span className="material-symbols-outlined text-slate-300 text-[14px]">chevron_right</span>
                                    <span className="text-primary text-xs font-bold uppercase tracking-widest">{subcategoryName}</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseBreadcrumbs;


