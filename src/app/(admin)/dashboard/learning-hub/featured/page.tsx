"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { getArticles, updateArticle } from "@/actions/articles";

export default function ManageFeatured() {
    const [articles, setArticles] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        setIsLoading(true);
        try {
            const data = await getArticles({ featured: true }, { createdAt: -1 }, 100);
            setArticles(data);
        } catch (err) {
            console.error('Failed to fetch articles', err);
            toast.error('Failed to load articles');
            setArticles([]);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleFeatured = async (id: string, current: boolean) => {
        try {
            await updateArticle(id, { featured: !current });
            toast.success(!current ? 'Marked featured' : 'Removed featured');
            fetchArticles();
        } catch (err) {
            console.error('toggle featured failed', err);
            toast.error('Network error');
        }
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Featured Articles</h1>
                    <p className="text-gray-500 mt-1">These articles are currently featured on the front page.</p>
                </div>
                <Link
                    href="/dashboard/learning-hub"
                    className="px-5 py-2.5 bg-gray-100 text-gray-800 font-semibold rounded-xl hover:bg-gray-200 transition-all shadow-sm flex items-center gap-2"
                >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    All Articles
                </Link>
            </div>

            <div className="bg-white border border-gray-100 shadow-xl shadow-gray-200/50 rounded-2xl overflow-hidden">
                <table className="w-full text-left font-medium text-sm">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="px-8 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-8 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-8 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-8 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Featured</th>
                            <th className="px-8 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {isLoading ? (
                            <tr><td colSpan={5} className="px-8 py-20 text-center text-gray-500">Loading...</td></tr>
                        ) : articles.length === 0 ? (
                            <tr><td colSpan={5} className="px-8 py-20 text-center text-gray-500">No featured articles found. Go to All Articles to feature some.</td></tr>
                        ) : (
                            articles.map(article => (
                                <tr key={article._id} className="group hover:bg-gray-50/80 transition-colors">
                                    <td className="px-8 py-5">
                                        <p className="font-semibold text-gray-900">{article.title}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">{article.slug}</p>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                                            {article.categoryId?.name || 'Uncategorized'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${article.status === 'published' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                                            {article.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-50 text-amber-700 text-sm font-bold ring-1 ring-inset ring-yellow-600/20">
                                            <span className="material-symbols-outlined text-[18px]">star</span>
                                            Featured
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => toggleFeatured(article._id, true)}
                                                className="px-4 py-2 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-all text-sm flex items-center gap-2"
                                                title="Remove from featured"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">star_outline</span>
                                                Unfeature
                                            </button>
                                            <Link
                                                href={`/dashboard/learning-hub/edit/${article._id}`}
                                                className="px-4 py-2 bg-blue-50 text-blue-600 font-bold rounded-xl hover:bg-blue-100 transition-all text-sm flex items-center gap-2"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">edit</span>
                                                Edit
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
