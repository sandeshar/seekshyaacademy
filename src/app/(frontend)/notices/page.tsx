"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getNotices } from "@/actions/notices";
import { getNoticeCategories } from "@/actions/categories";
import { getNoticesPage } from "@/actions/cms-actions";

interface INotice {
    _id: string;
    title: string;
    slug: string;
    description: string;
    categoryId: any;
    tag?: string;
    date: string;
    documents?: {
        title: string;
        url: string;
    }[];
}

interface ICategory {
    _id: string;
    name: string;
    slug: string;
}

interface INoticesPage {
    hero: {
        isVisible: boolean;
        badge: string;
        title: string;
        subtitle: string;
    };
    search: {
        isVisible: boolean;
        placeholder: string;
        allNoticesText: string;
    };
    quickLinksWidget: {
        isVisible: boolean;
        title: string;
        links: Array<{
            text: string;
            url: string;
            icon: string;
            external: boolean;
        }>;
    };
    supportWidget: {
        isVisible: boolean;
        title: string;
        description: string;
        phone: string;
        email: string;
    };
}

export default function NoticePage() {
    const searchParams = useSearchParams();
    const categorySlug = searchParams.get('category');

    const [notices, setNotices] = useState<INotice[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState("all");
    const [pageData, setPageData] = useState<INoticesPage | null>(null);

    // Initial Data Fetch
    useEffect(() => {
        const init = async () => {
            try {
                const [cats, page] = await Promise.all([
                    getNoticeCategories(),
                    getNoticesPage()
                ]);
                setCategories(Array.isArray(cats) ? cats : []);
                setPageData(page);
            } catch (error) {
                console.error("Failed to load initial data", error);
            }
        };
        init();
    }, []);

    // Handle URL category changes
    useEffect(() => {
        if (categorySlug && categories.length > 0) {
            const cat = categories.find(c => c.slug === categorySlug);
            setSelectedCategoryId(cat?._id || "all");
        } else if (!categorySlug) {
            setSelectedCategoryId("all");
        }
    }, [categorySlug, categories]);

    // Fetch Notices based on category
    useEffect(() => {
        const fetchNotices = async () => {
            setIsLoading(true);
            try {
                const filter: any = { status: 'active' };
                if (selectedCategoryId !== "all") {
                    filter.categoryId = selectedCategoryId;
                }
                const data = await getNotices(filter);
                setNotices(data);
            } catch (error) {
                console.error("Failed to fetch notices", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNotices();
    }, [selectedCategoryId]);

    const stripHtml = (html: string) => {
        return html.replace(/<[^>]*>?/gm, '');
    };

    const filteredNotices = notices
        .filter(notice =>
            notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            notice.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            notice.tag?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <main className="grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            {/* Page Header */}
            {pageData?.hero.isVisible && (
                <div className="mb-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-2 py-0.5 rounded text-xs font-bold bg-primary/10 text-primary uppercase tracking-wider">{pageData.hero.badge}</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-3">{pageData.hero.title}</h2>
                            <p className="text-slate-500 text-lg leading-relaxed">
                                {pageData.hero.subtitle}
                            </p>
                        </div>
                        {/* Date Widget */}
                        <div className="hidden md:flex items-center gap-3 bg-white p-2 pr-4 rounded-xl border border-slate-200 shadow-sm">
                            <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined">calendar_month</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-medium text-slate-500">Today's Date</span>
                                <span className="text-sm font-bold text-slate-900">
                                    {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Filters & Notices List */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    {/* Search & Filters Toolbar */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm sticky top-16 z-40 transition-all duration-300">
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Search */}
                            <div className="relative flex-1">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 material-symbols-outlined">search</span>
                                <input
                                    className="w-full h-10 pl-10 pr-4 rounded-lg bg-background-light border-none text-sm text-slate-900 focus:ring-2 focus:ring-primary placeholder:text-slate-500 transition-all"
                                    placeholder={pageData?.search.placeholder || "Search notices..."}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* Categories Chips */}
                        <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar pb-1 text-nowrap">
                            <Link
                                href="/notices"
                                className={`shrink-0 h-8 px-4 rounded-full text-sm font-medium transition-all flex items-center justify-center ${selectedCategoryId === "all"
                                    ? "bg-primary text-white hover:shadow-md"
                                    : "bg-background-light hover:bg-slate-200 text-slate-500 border border-transparent hover:border-slate-300"
                                    }`}
                            >
                                {pageData?.search.allNoticesText || "All Notices"}
                            </Link>
                            {categories.map(cat => (
                                <Link
                                    key={cat._id}
                                    href={`/notices?category=${cat.slug}`}
                                    className={`shrink-0 h-8 px-4 rounded-full text-sm font-medium transition-all flex items-center justify-center ${selectedCategoryId === cat._id
                                        ? "bg-primary text-white hover:shadow-md"
                                        : "bg-background-light hover:bg-slate-200 text-slate-500 border border-transparent hover:border-slate-300"
                                        }`}
                                >
                                    {cat.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="py-20 text-center">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto"></div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {filteredNotices.map(notice => (
                                <div key={notice._id} className="bg-white rounded-xl p-5 border border-slate-200 hover:shadow-md transition-shadow group">
                                    <div className="flex items-start gap-4">
                                        {/* Date Box */}
                                        <div className="hidden sm:flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-background-light border border-slate-200 shrink-0">
                                            <span className="text-xs font-semibold text-slate-500 uppercase">
                                                {new Date(notice.date).toLocaleDateString('en-US', { month: 'short' })}
                                            </span>
                                            <span className="text-xl font-bold text-slate-900">
                                                {new Date(notice.date).getDate()}
                                            </span>
                                        </div>
                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                                {notice.tag && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-secondary/10 text-secondary uppercase tracking-wider">
                                                        {notice.tag}
                                                    </span>
                                                )}
                                                <span className="text-xs text-slate-500 font-medium">
                                                    {typeof notice.categoryId === 'object' && notice.categoryId !== null ? (notice.categoryId as any).name : ''}
                                                </span>
                                            </div>
                                            <Link href={`/notices/${notice.slug}`}>
                                                <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">{notice.title}</h3>
                                            </Link>
                                            <p className="text-sm text-slate-500 line-clamp-2 mb-3 leading-relaxed">{stripHtml(notice.description)}</p>
                                            {notice.documents && notice.documents.length > 0 && (
                                                <div className="flex flex-wrap items-center gap-4">
                                                    {notice.documents.slice(0, 2).map((doc, i) => (
                                                        <a key={i} href={doc.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-dark transition-colors uppercase tracking-wide">
                                                            <span className="material-symbols-outlined text-base">
                                                                {doc.url.includes('pdf') ? 'download' : 'open_in_new'}
                                                            </span>
                                                            {doc.title || "View Document"}
                                                        </a>
                                                    ))}
                                                    {notice.documents.length > 2 && (
                                                        <span className="text-xs text-slate-400 font-bold">
                                                            +{notice.documents.length - 2} more
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        {/* Mobile Date */}
                                        <div className="sm:hidden text-xs text-slate-500 font-bold">
                                            {new Date(notice.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {filteredNotices.length === 0 && (
                        <div className="py-20 text-center text-slate-400">
                            <span className="material-symbols-outlined text-6xl">search_off</span>
                            <p className="mt-2 font-medium">No notices found matching your criteria.</p>
                        </div>
                    )}
                </div>

                {/* Right Column: Sidebar Widgets */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    {/* Quick Links */}
                    {pageData?.quickLinksWidget.isVisible && (
                        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">link</span> {pageData.quickLinksWidget.title || "Quick Links"}
                            </h3>
                            <div className="flex flex-col gap-3">
                                {pageData.quickLinksWidget.links?.map((link, index) => (
                                    <a key={index} className="flex items-center justify-between p-3 rounded-lg bg-background-light hover:bg-slate-100 transition-colors group" href={link.url} target={link.external ? "_blank" : "_self"}>
                                        <span className="text-sm font-medium text-slate-900">{link.text}</span>
                                        <span className="material-symbols-outlined text-sm text-slate-500 group-hover:text-primary transition-colors">{link.icon}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Support Widget */}
                    {pageData?.supportWidget.isVisible && (
                        <div className="bg-primary/5 rounded-xl border border-primary/10 p-5">
                            <h3 className="text-base font-bold text-slate-900 mb-2 font-display">{pageData.supportWidget.title || "Need Help?"}</h3>
                            <p className="text-sm text-slate-600 mb-4 leading-relaxed">{pageData.supportWidget.description || "If you have any queries regarding notices or admissions, feel free to contact administration."}</p>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-sm text-slate-900 font-bold">
                                    <span className="material-symbols-outlined text-primary text-xl">call</span> {pageData.supportWidget.phone || "+977-1-4XXXXXX"}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-900 font-bold">
                                    <span className="material-symbols-outlined text-primary text-xl">mail</span> {pageData.supportWidget.email || "info@lakshyaca.com"}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

