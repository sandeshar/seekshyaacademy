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
    categoryId: { _id?: string; name?: string; slug?: string } | string | null;
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
                const filter: Record<string, string> = { status: 'active' };
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

    const getCategoryName = (categoryId: INotice["categoryId"]) => {
        if (categoryId && typeof categoryId === "object" && "name" in categoryId) {
            return String((categoryId as { name?: string }).name || "");
        }
        return "";
    };

    const filteredNotices = notices
        .filter(notice =>
            notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            notice.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            notice.tag?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <main className="relative isolate mx-auto flex w-full max-w-7xl grow flex-col gap-8 overflow-hidden px-4 py-14 sm:px-6 lg:px-8 md:py-20">
            <div className="pointer-events-none absolute -left-20 -top-24 -z-10 size-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-20 -z-10 size-80 rounded-full bg-secondary/10 blur-3xl" />

            {pageData?.hero.isVisible && (
                <section className="overflow-hidden rounded-[2.2rem] border border-outline-variant/30 bg-linear-to-br from-surface-container-low to-surface-container-lowest p-7 shadow-lg sm:p-10">
                    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div className="max-w-2xl">
                            <span className="mb-3 inline-flex items-center rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                                {pageData.hero.badge}
                            </span>
                            <h1 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface md:text-4xl">
                                {pageData.hero.title}
                            </h1>
                            <p className="mt-3 text-base leading-relaxed text-on-surface-variant md:text-lg">
                                {pageData.hero.subtitle}
                            </p>
                        </div>

                        <div className="inline-flex items-center gap-3 rounded-2xl border border-outline-variant/30 bg-white/70 px-3 py-2 shadow-sm backdrop-blur-sm">
                            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <span className="material-symbols-outlined">calendar_month</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-medium text-on-surface-variant">Date</span>
                                <span className="text-sm font-semibold text-on-surface">
                                    {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                <section className="lg:col-span-8">
                    <div className="sticky top-16 z-40 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/95 p-4 shadow-sm backdrop-blur">
                        <div className="relative">
                            <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                            <input
                                className="h-11 w-full rounded-xl border-0 bg-surface-container-low pl-10 pr-4 text-sm text-on-surface ring-1 ring-inset ring-outline-variant placeholder:text-on-surface-variant focus:ring-2 focus:ring-primary outline-none"
                                placeholder={pageData?.search.placeholder || "Search notices..."}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1 text-nowrap">
                            <Link
                                href="/notices"
                                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${selectedCategoryId === "all"
                                    ? "bg-primary text-white shadow-sm"
                                    : "bg-surface-container-low text-on-surface hover:bg-surface-container"
                                    }`}
                            >
                                {pageData?.search.allNoticesText || "All Notices"}
                            </Link>
                            {categories.map((cat) => (
                                <Link
                                    key={cat._id}
                                    href={`/notices?category=${cat.slug}`}
                                    className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${selectedCategoryId === cat._id
                                        ? "bg-primary text-white shadow-sm"
                                        : "bg-surface-container-low text-on-surface hover:bg-surface-container"
                                        }`}
                                >
                                    {cat.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="py-20 text-center">
                            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-b-2 border-primary" />
                        </div>
                    ) : (
                        <div className="mt-6 flex flex-col gap-4">
                            {filteredNotices.map((notice) => (
                                <article key={notice._id} className="group relative overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                                    <div className="absolute left-0 top-0 h-full w-1.5 bg-linear-to-b from-primary via-primary to-secondary" />

                                    <div className="flex items-start gap-4 pl-2">
                                        <div className="hidden w-16 shrink-0 flex-col items-center justify-center rounded-xl border border-outline-variant/30 bg-surface-container-low py-2 sm:flex">
                                            <span className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
                                                {new Date(notice.date).toLocaleDateString('en-US', { month: 'short' })}
                                            </span>
                                            <span className="text-2xl font-bold text-on-surface">
                                                {new Date(notice.date).getDate()}
                                            </span>
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="mb-2 flex flex-wrap items-center gap-2">
                                                {notice.tag && (
                                                    <span className="inline-flex items-center rounded-full bg-secondary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-secondary">
                                                        {notice.tag}
                                                    </span>
                                                )}
                                                {getCategoryName(notice.categoryId) && (
                                                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                                                        {getCategoryName(notice.categoryId)}
                                                    </span>
                                                )}
                                                <span className="sm:hidden text-xs font-semibold text-on-surface-variant">
                                                    {new Date(notice.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                </span>
                                            </div>

                                            <Link href={`/notices/${notice.slug}`}>
                                                <h2 className="mb-2 font-headline text-lg font-bold text-on-surface transition-colors group-hover:text-primary md:text-xl">
                                                    {notice.title}
                                                </h2>
                                            </Link>

                                            <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-on-surface-variant md:text-[15px]">
                                                {stripHtml(notice.description)}
                                            </p>

                                            {notice.documents && notice.documents.length > 0 && (
                                                <div className="flex flex-wrap items-center gap-3">
                                                    {notice.documents.slice(0, 2).map((doc, i) => (
                                                        <a
                                                            key={i}
                                                            href={doc.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1.5 rounded-full bg-surface-container-low px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
                                                        >
                                                            <span className="material-symbols-outlined text-base">
                                                                {doc.url.includes('pdf') ? 'download' : 'open_in_new'}
                                                            </span>
                                                            {doc.title || "View Document"}
                                                        </a>
                                                    ))}
                                                    {notice.documents.length > 2 && (
                                                        <span className="text-xs font-semibold text-on-surface-variant">
                                                            +{notice.documents.length - 2} more
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                    {!isLoading && filteredNotices.length === 0 && (
                        <div className="mt-6 flex flex-col items-center rounded-2xl border border-dashed border-outline-variant/40 bg-surface-container-low py-16 text-center text-on-surface-variant">
                            <span className="material-symbols-outlined text-6xl text-primary/50">search_off</span>
                            <p className="mt-2 font-medium">No notices found matching your criteria.</p>
                        </div>
                    )}
                </section>

                <aside className="flex flex-col gap-6 lg:col-span-4">
                    {pageData?.quickLinksWidget.isVisible && (
                        <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-sm">
                            <h3 className="mb-4 flex items-center gap-2 font-headline text-lg font-bold text-on-surface">
                                <span className="material-symbols-outlined text-primary">link</span>
                                {pageData.quickLinksWidget.title || "Quick Links"}
                            </h3>
                            <div className="flex flex-col gap-2.5">
                                {pageData.quickLinksWidget.links?.map((link, index) => (
                                    <a
                                        key={index}
                                        className="group flex items-center justify-between rounded-xl border border-transparent bg-surface-container-low px-3.5 py-3 transition-colors hover:border-outline-variant/40 hover:bg-surface-container"
                                        href={link.url}
                                        target={link.external ? "_blank" : "_self"}
                                    >
                                        <span className="text-sm font-medium text-on-surface">{link.text}</span>
                                        <span className="material-symbols-outlined text-sm text-on-surface-variant transition-colors group-hover:text-primary">{link.icon}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    {pageData?.supportWidget.isVisible && (
                        <div className="rounded-2xl border border-primary/20 bg-linear-to-br from-primary/8 to-secondary/8 p-5 shadow-sm">
                            <h3 className="mb-2 font-headline text-lg font-bold text-on-surface">
                                {pageData.supportWidget.title || "Need Help?"}
                            </h3>
                            <p className="mb-4 text-sm leading-relaxed text-on-surface-variant">
                                {pageData.supportWidget.description || "If you have any queries regarding notices or admissions, feel free to contact administration."}
                            </p>
                            <div className="flex flex-col gap-2.5">
                                <div className="flex items-center gap-2 text-sm font-semibold text-on-surface">
                                    <span className="material-symbols-outlined text-primary">call</span>
                                    {pageData.supportWidget.phone || "+977-1-4XXXXXX"}
                                </div>
                                <div className="flex items-center gap-2 text-sm font-semibold text-on-surface">
                                    <span className="material-symbols-outlined text-primary">mail</span>
                                    {pageData.supportWidget.email || "info@seekshyaacademy.com"}
                                </div>
                            </div>
                        </div>
                    )}
                </aside>
            </div>
        </main>
    );
}

