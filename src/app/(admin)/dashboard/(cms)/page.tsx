"use client";

import Link from "next/link";

const cmsPages = [
    {
        title: "Homepage CMS",
        description: "Transform your main landing page - Hero sections, highlight bars, and call-to-action blocks.",
        href: "/dashboard/homepage",
        icon: "home_app_logo",
        stats: "Full Control"
    },
    {
        title: "Course Directory",
        description: "Build custom landing pages for your categories and subcategories with modular sections.",
        href: "/dashboard/courses/cms",
        icon: "auto_stories",
        stats: "Dynamic"
    },
    {
        title: "About Page CMS",
        description: "Refine your narrative - Story blocks, philosophy sections, and syllabus highlights.",
        href: "/dashboard/about-page",
        icon: "auto_awesome",
        stats: "5 Modules"
    },
    {
        title: "Faculty Page CMS",
        description: "Showcase your experts - Department descriptions and faculty showcase sections.",
        href: "/dashboard/faculty-page",
        icon: "verified",
        stats: "Expertise"
    },
    {
        title: "Contact Page CMS",
        description: "Manage hero imagery, location details, and contact form configuration.",
        href: "/dashboard/contact-page",
        icon: "alternate_email",
        stats: "Utility"
    },
    {
        title: "Notices CMS",
        description: "Design the updates hub - Hero section and body content for critical announcements.",
        href: "/dashboard/notices-page",
        icon: "foreground_normal",
        stats: "Real-time"
    },
    {
        title: "Learning Hub CMS",
        description: "Configure your blog and resource center - Hero titles and CTA sections.",
        href: "/dashboard/learning-hub-page",
        icon: "menu_book",
        stats: "Content"
    },
];

export default function CMSDirectory() {
    return (
        <div className="p-12 lg:p-20 min-h-screen bg-slate-50/50">
            <header className="mb-20">
                <div className="flex items-center gap-4 mb-3">
                    <div className="h-0.5 w-12 bg-indigo-600 rounded-full" />
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em]">Design System</span>
                </div>
                <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-4">
                    CMS <span className="text-slate-400">Master</span>
                </h1>
                <p className="text-lg text-slate-500 max-w-2xl font-medium">
                    Architecture and content management for Lakshya's digital presence. Professional tools for professional content.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {cmsPages.map((page) => (
                    <Link
                        key={page.href}
                        href={page.href}
                        className="group relative flex flex-col p-10 bg-white border border-slate-100 rounded-[2.5rem] transition-all hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-500/10 active:scale-[0.98]"
                    >
                        {/* Status Bar */}
                        <div className="absolute top-8 right-8 flex items-center gap-2">
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none group-hover:text-indigo-400 transition-colors">
                                {page.stats}
                            </span>
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-100 group-hover:bg-indigo-500 group-hover:shadow-[0_0_8px_rgba(99,102,241,0.5)] transition-all" />
                        </div>

                        {/* Icon */}
                        <div className="w-16 h-16 mb-8 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all">
                            <span className="material-symbols-outlined text-3xl">{page.icon}</span>
                        </div>

                        {/* Content */}
                        <h2 className="text-2xl font-black text-slate-900 mb-3 tracking-tight group-hover:text-indigo-600 transition-colors">
                            {page.title}
                        </h2>
                        <p className="text-slate-500 text-sm leading-relaxed font-medium mb-10 group-hover:text-slate-600 transition-colors">
                            {page.description}
                        </p>

                        {/* Footer Action */}
                        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                            <span className="text-[10px] font-black tracking-[0.2em] text-slate-300 uppercase group-hover:text-slate-900 transition-colors">
                                Configure Module
                            </span>
                            <span className="material-symbols-outlined text-slate-200 group-hover:translate-x-1 group-hover:text-slate-900 transition-all">
                                arrow_forward
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

            <footer className="mt-32 pt-12 border-top border-slate-100">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] text-center">
                    Lakshya CMS Architecture 2024
                </p>
            </footer>
        </div>
    );
}
