"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import CMSPage from "../../_components/CMSPage";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { getCourseCategories, getCourseSubcategories } from "@/actions/categories";
import { getCoursePage, updateCoursePage } from "@/actions/cms-actions";

interface ICategory {
    _id: string;
    name: string;
    slug: string;
}

interface ISubcategory {
    _id: string;
    name: string;
    slug: string;
    categoryId: string | { _id: string };
}

interface ICourseConfig {
    name: string;
    slug: string;
    type: 'category' | 'subcategory';
    hero: {
        isVisible: boolean;
        badgeText: string;
        title: string;
        description: string;
        backgroundImage: string;
        primaryButton: { text: string; link: string };
        secondaryButton: { text: string; link: string };
    };
    content: string;
}

interface ICoursePageData {
    categories: ICourseConfig[];
}

export default function CourseCMSListing() {
    const router = useRouter();
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchTaxonomy = async () => {
            try {
                const [cats, subs] = await Promise.all([
                    getCourseCategories(),
                    getCourseSubcategories()
                ]);
                setCategories(Array.isArray(cats) ? cats : []);
                setSubcategories(Array.isArray(subs) ? subs : []);
            } catch (error) {
                console.error("Failed to fetch taxonomy", error);
            }
        };
        fetchTaxonomy();
    }, []);

    const handleAddConfiguration = async (target: { name: string, slug: string, type: string }, data: ICoursePageData, setData: (data: ICoursePageData) => void) => {
        const newConfig: ICourseConfig = {
            name: target.name,
            slug: target.slug,
            type: target.type as any,
            hero: {
                isVisible: true,
                badgeText: target.type.toUpperCase(),
                title: target.name,
                description: `Explore our specialized ${target.name} courses and programs.`,
                backgroundImage: "",
                primaryButton: { text: "Enroll Now", link: "/contact" },
                secondaryButton: { text: "Learn More", link: "#content" }
            },
            content: `<h2>Welcome to ${target.name}</h2><p>Experience excellence in learning with our ${target.name} curriculum.</p>`
        };

        const updatedData = {
            ...data,
            categories: [...(data?.categories || []), newConfig]
        };

        const loadingToast = toast.loading(`Initializing ${target.name}...`);

        try {
            await updateCoursePage(updatedData);
            setData(updatedData);
            toast.success("Ready to edit!", { id: loadingToast });
            router.push(`/dashboard/courses/cms/${target.slug}`);
        } catch (error) {
            toast.error("Failed to initialize", { id: loadingToast });
        }
    };

    const handleDelete = async (targetSlug: string, targetName: string, data: ICoursePageData, setData: (data: ICoursePageData) => void) => {
        if (!confirm(`Permanently remove configuration for ${targetName}?`)) return;

        const updated = {
            ...data,
            categories: (data.categories || []).filter((c: any) => c.slug !== targetSlug)
        };

        const loadingToast = toast.loading("Removing...");
        try {
            await updateCoursePage(updated);
            setData(updated);
            toast.success("Removed", { id: loadingToast });
        } catch (error) {
            toast.error("Failed to remove", { id: loadingToast });
        }
    };

    return (
        <CMSPage
            title="Course CMS"
            description="Manage landing pages for course categories and subcategories."
            getAction={getCoursePage}
            updateAction={updateCoursePage}
        >
            {(data: ICoursePageData, setData: (data: ICoursePageData) => void) => {
                const configs = data?.categories || [];

                const renderRow = (target: { name: string, slug: string, type: string }, isSub = false) => {
                    if (searchQuery && !target.name.toLowerCase().includes(searchQuery.toLowerCase())) return null;

                    const config = configs.find((c: any) => c.slug === target.slug);
                    const frontendLink = target.slug === 'default' ? '/courses' : `/courses/${target.slug}`;

                    return (
                        <tr key={target.slug} className="group border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-4">
                                    {isSub && <span className="text-slate-300 ml-6 material-symbols-outlined text-sm">subdirectory_arrow_right</span>}
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-slate-900 text-sm tracking-tight">{target.name}</span>
                                            {target.type === 'default' && <span className="text-[9px] px-1.5 py-0.5 bg-indigo-50 text-indigo-600 rounded font-bold uppercase tracking-wider border border-indigo-100">Hub</span>}
                                            {target.type === 'category' && <span className="text-[9px] px-1.5 py-0.5 bg-sky-50 text-sky-600 rounded font-bold uppercase tracking-wider border border-sky-100">Category</span>}
                                        </div>
                                        <span className="text-[10px] text-slate-400 font-mono mt-0.5">/{target.slug}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                                {config ? (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 uppercase tracking-tight">
                                        <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                                        Configured
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-50 text-slate-400 border border-slate-100 uppercase tracking-tight">
                                        Not Set
                                    </span>
                                )}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {config ? (
                                        <>
                                            <Link
                                                href={`/dashboard/courses/cms/${config.slug}`}
                                                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                                title="Edit Page"
                                            >
                                                <span className="material-symbols-outlined text-lg">edit_note</span>
                                            </Link>
                                            <a
                                                href={frontendLink}
                                                target="_blank"
                                                className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
                                                title="View Live"
                                            >
                                                <span className="material-symbols-outlined text-lg">visibility</span>
                                            </a>
                                            <button
                                                onClick={() => handleDelete(config.slug, config.name, data, setData)}
                                                className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <span className="material-symbols-outlined text-lg">delete</span>
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => handleAddConfiguration(target, data, setData)}
                                            className="text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-wider transition-all border border-indigo-100"
                                        >
                                            Initialize
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    );
                };

                return (
                    <div className="space-y-4 animate-in fade-in duration-700">
                        <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-slate-200/60 shadow-sm transition-all focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-50">
                            <span className="material-symbols-outlined text-slate-400">search</span>
                            <input
                                type="text"
                                placeholder="Search courses or categories..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 bg-transparent outline-none font-medium text-slate-700 placeholder:text-slate-300 text-sm"
                            />
                        </div>

                        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100">
                                        <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Page Name</th>
                                        <th className="px-6 py-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                        <th className="px-6 py-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {renderRow({ name: "Global Course Hub", slug: "default", type: "default" })}
                                    {categories.map(cat => (
                                        <React.Fragment key={cat._id}>
                                            {renderRow({ name: cat.name, slug: cat.slug, type: 'category' })}
                                            {subcategories
                                                .filter(sub => (typeof sub.categoryId === 'string' ? sub.categoryId : sub.categoryId?._id) === cat._id)
                                                .map(sub => renderRow({ name: sub.name, slug: sub.slug, type: 'subcategory' }, true))
                                            }
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>

                            {searchQuery && ![...categories, ...subcategories].some(x => x.name.toLowerCase().includes(searchQuery.toLowerCase())) && (
                                <div className="py-16 text-center">
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="material-symbols-outlined text-2xl text-slate-300">search_off</span>
                                    </div>
                                    <p className="text-slate-400 text-sm font-medium">No results found for "{searchQuery}"</p>
                                </div>
                            )}
                        </div>
                    </div>
                );
            }}
        </CMSPage>
    );
}





