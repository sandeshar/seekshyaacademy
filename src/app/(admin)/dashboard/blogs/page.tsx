"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { getArticlesWithPagination, deleteArticle, updateArticle } from "@/actions/articles";

interface IArticle {
    _id: string;
    title: string;
    slug: string;
    author?: string;
    status: "draft" | "published";
    categoryId: { name: string };
    createdAt: string;
    featured?: boolean;
}

export default function BlogsAdmin() {
    const router = useRouter();
    const [articles, setArticles] = useState<IArticle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchArticles();
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery, currentPage]);

    const fetchArticles = async () => {
        setIsLoading(true);
        try {
            const filter = searchQuery ? {
                $or: [
                    { title: { $regex: searchQuery, $options: "i" } },
                    { author: { $regex: searchQuery, $options: "i" } }
                ]
            } : {};

            const data = await getArticlesWithPagination(filter, { createdAt: -1 }, 10, currentPage);

            setArticles(Array.isArray(data.articles) ? data.articles : []);
            setTotalPages(data.totalPages || 1);
            setTotalResults(data.total || 0);
        } catch (error: any) {
            console.error("Failed to fetch articles", error);
            setArticles([]);
            toast.error(error.message || "Failed to load articles");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this article?")) return;
        try {
            await deleteArticle(id);
            toast.success("Article deleted");
            router.refresh();
            fetchArticles();
        } catch (error) {
            console.error("Failed to delete article", error);
            toast.error("Network error");
        }
    };

    const handleToggleFeatured = async (id: string, current: boolean) => {
        try {
            await updateArticle(id, { featured: !current });
            toast.success(!current ? 'Article marked as featured' : 'Article unfeatured');
            router.refresh();
            fetchArticles();
        } catch (err: any) {
            console.error('Failed to toggle featured', err);
            toast.error(err.message || 'Network error');
        }
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Learning Hub</h1>
                    <p className="text-gray-500 mt-1">Manage blog posts, articles, and educational content.</p>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">search</span>
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <Link
                            href="/dashboard/blogs/featured"
                            className="px-4 py-2.5 bg-amber-50 text-amber-700 font-semibold rounded-xl hover:bg-amber-100 transition-all shadow-sm flex items-center gap-2 whitespace-nowrap"
                        >
                            <span className="material-symbols-outlined text-[20px]">star</span>
                            Featured Articles
                        </Link>
                        <Link
                            href="/dashboard/blogs/new"
                            className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2 whitespace-nowrap"
                        >
                            <span className="material-symbols-outlined text-[20px]">add</span>
                            Create New Article
                        </Link>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-gray-100 shadow-xl shadow-gray-200/50 rounded-2xl overflow-hidden overflow-x-auto transition-all">
                <table className="w-full text-left font-medium text-sm">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="px-8 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Article Details</th>
                            <th className="px-8 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Author</th>
                            <th className="px-8 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-8 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-8 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Featured</th>
                            <th className="px-8 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {isLoading ? (
                            <tr><td colSpan={4} className="px-8 py-20 text-center text-gray-500 flex-col items-center justify-center gap-4">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
                                <p className="italic font-medium">Loading articles...</p>
                            </td></tr>
                        ) : !Array.isArray(articles) || articles.length === 0 ? (
                            <tr><td colSpan={4} className="px-8 py-20 text-center">
                                <div className="flex flex-col items-center gap-2 text-gray-400">
                                    <span className="material-symbols-outlined text-6xl">article</span>
                                    <p className="font-medium">No articles found. Start by creating one!</p>
                                </div>
                            </td></tr>
                        ) : (
                            articles.map((article) => (
                                <tr key={article._id} className="hover:bg-gray-50/80 transition-colors group">
                                    <td className="px-8 py-5">
                                        <p className="text-gray-900 font-bold group-hover:text-blue-600 transition-colors">{article.title}</p>
                                        <p className="text-xs text-gray-400 font-normal mt-0.5">{new Date(article.createdAt).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}</p>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="text-gray-600 font-medium">{article.author || "-"}</span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full ring-1 ring-inset ring-gray-200">
                                            {article.categoryId?.name || "Uncategorized"}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${article.status === 'published'
                                            ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20'
                                            : 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${article.status === 'published' ? 'bg-green-600' : 'bg-amber-600'}`}></span>
                                            {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                        <button
                                            onClick={() => handleToggleFeatured(article._id, !!article.featured)}
                                            className={`p-2 rounded-lg transition-colors ${article.featured ? 'bg-yellow-50 text-amber-700 hover:bg-yellow-100' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                                            title={article.featured ? 'Unfeature' : 'Mark as featured'}
                                        >
                                            <span className="material-symbols-outlined">{article.featured ? 'star' : 'star_outline'}</span>
                                        </button>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link
                                                href={`/dashboard/blogs/edit/${article._id}`}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">edit</span>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(article._id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-sm text-gray-500 font-medium">
                        Showing <span className="text-gray-900 font-bold">{articles.length}</span> of <span className="text-gray-900 font-bold">{totalResults}</span> articles
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                        </button>

                        <div className="flex items-center gap-1">
                            {[...Array(totalPages)].map((_, i) => {
                                const pageNum = i + 1;
                                // Simple logic to show current, first, last, and neighbors
                                if (
                                    pageNum === 1 ||
                                    pageNum === totalPages ||
                                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                                ) {
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${currentPage === pageNum
                                                ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                                                : 'text-gray-600 hover:bg-gray-100'
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                                    return <span key={pageNum} className="px-1 text-gray-400">...</span>;
                                }
                                return null;
                            })}
                        </div>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

