"use client";

import Link from "next/link";
import ShareButtons from "../../_components/ShareButtons";

interface INotice {
    _id: string;
    title: string;
    description: string;
    categoryId: any;
    tag?: string;
    date: string;
    documents?: {
        title: string;
        url: string;
    }[];
    slug: string;
}

export default function NoticeDetailClient({ notice }: { notice: INotice }) {
    const getFileIcon = (url: string) => {
        const ext = url.split(".").pop()?.toLowerCase();
        if (ext === "pdf") return "picture_as_pdf";
        if (["doc", "docx"].includes(ext || "")) return "description";
        if (["xls", "xlsx"].includes(ext || "")) return "table_chart";
        if (["zip", "rar"].includes(ext || "")) return "archive";
        return "link";
    };

    return (
        <main className="grow w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <Link
                href="/notices"
                className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-dark transition-colors mb-8"
            >
                <span className="material-symbols-outlined">arrow_back</span>
                Back to All Notices
            </Link>

            <article className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-8 md:p-12">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        {notice.tag && (
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-secondary/10 text-secondary uppercase tracking-widest">
                                {notice.tag}
                            </span>
                        )}
                        <span className="text-sm text-slate-500 font-medium">
                            {new Date(notice.date).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 leading-tight">
                        {notice.title}
                    </h1>

                    <div
                        className="prose prose-slate max-w-none text-slate-600 leading-relaxed mb-10"
                        dangerouslySetInnerHTML={{ __html: notice.description }}
                    />

                    {notice.documents && notice.documents.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {notice.documents.map((doc, index) => (
                                <div key={index} className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex flex-col items-start justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-primary text-white rounded-lg">
                                            <span className="material-symbols-outlined">
                                                {getFileIcon(doc.url)}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 line-clamp-1">{doc.title}</h3>
                                            <p className="text-xs text-slate-500">Attachment</p>
                                        </div>
                                    </div>
                                    <a
                                        href={doc.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
                                    >
                                        Download / View
                                        <span className="material-symbols-outlined text-sm">download</span>
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-12 pt-8 border-t border-slate-100">
                        <ShareButtons
                            title={notice.title}
                            url={typeof window !== 'undefined' ? window.location.href : ""}
                            type="notice"
                        />
                    </div>
                </div>
            </article>
        </main>
    );
}
