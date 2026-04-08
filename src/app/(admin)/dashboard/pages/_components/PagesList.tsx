"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Edit2, Layout, Globe, FileText, Search, ExternalLink, Calendar, MoreVertical, Trash2 } from "lucide-react";
import DeletePageButton from "./DeletePageButton";
import { IPage } from "@/db/pages";

interface PagesListProps {
    initialPages: IPage[];
}

export default function PagesList({ initialPages }: PagesListProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    useEffect(() => {
        router.refresh();
    }, [router]);

    const filteredPages = initialPages.filter(page =>
        page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-200/60 shadow-sm">
                <div className="flex-1 max-w-sm relative group">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search pages..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium placeholder:text-slate-400"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total:</span>
                        <span className="text-xs font-black text-slate-700">{filteredPages.length}</span>
                    </div>
                    <Link
                        href="/dashboard/pages/new"
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                    >
                        <Plus className="w-4 h-4" />
                        New Page
                    </Link>
                </div>
            </div>

            {filteredPages.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-[2.5rem] p-20 flex flex-col items-center justify-center text-center space-y-6 shadow-sm">
                    <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center border border-slate-100">
                        <FileText className="w-10 h-10 text-slate-300" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-black text-slate-800 tracking-tight">No Results Found</h3>
                        <p className="text-slate-500 max-w-xs font-medium text-sm">
                            {searchQuery ? `No pages match "${searchQuery}"` : "You haven't created any custom pages yet."}
                        </p>
                    </div>
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="text-blue-600 font-bold hover:underline underline-offset-4"
                        >
                            Clear search filters
                        </button>
                    )}
                </div>
            ) : (
                <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/50">
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Page Details</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Status</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredPages.map((page: IPage) => (
                                    <tr key={page._id as unknown as string} className="group hover:bg-slate-50/80 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 border border-blue-100 group-hover:scale-110 transition-transform">
                                                    <Layout className="w-5 h-5" />
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-sm font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                                                        {page.title}
                                                    </span>
                                                    <div className="flex items-center gap-1.5 text-slate-400 group-hover:text-slate-500 transition-colors">
                                                        <Globe className="w-3 h-3" />
                                                        <span className="text-[11px] font-medium tracking-tight">/{page.slug}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex justify-center">
                                                <div className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg border shadow-sm ${page.status === 'published'
                                                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                                    : 'bg-amber-50 text-amber-600 border-amber-100'
                                                    }`}>
                                                    {page.status}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-1">
                                                <Link
                                                    href={`/${page.slug}`}
                                                    target="_blank"
                                                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                    title="View Live Page"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={`/dashboard/pages/${page._id}`}
                                                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                    title="Edit Page"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Link>
                                                <DeletePageButton
                                                    id={page._id as unknown as string}
                                                    title={page.title}
                                                    variant="minimal"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}