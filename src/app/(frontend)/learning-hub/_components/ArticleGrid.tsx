import React from 'react';
import Link from 'next/link';
import { getArticles } from '@/actions/articles';

const ArticleGrid = async () => {
    let articles: any[] = [];
    try {
        articles = await getArticles({ featured: false, status: 'published' }, { createdAt: -1 });
    } catch (err) {
        console.error('Failed to load articles', err);
    }

    if (!Array.isArray(articles)) articles = [];


    if (articles.length === 0) {
        return (
            <main className="lg:col-span-8 flex flex-col gap-8">
                <div className="text-center py-24 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-bold">No articles yet</h3>
                    <p className="text-sm text-gray-500 mt-2">There are no articles published in the Learning Hub. Create one from the admin dashboard or add seed data.</p>
                </div>
            </main>
        );
    }

    // ArticleGrid still kept for backward compatibility if needed; use CombinedArticles for the mixed section.
    return (
        <main className="lg:col-span-8 flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <h2 className="text-[#0e121b] text-2xl font-bold font-lexend">More Articles</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {articles.map((article, index) => (
                    <Link key={article._id || index} href={`/learning-hub/${article.slug || article._id}`} className="block h-full">
                        <article className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 h-full">
                            <div
                                className="h-48 w-full bg-gray-200 bg-cover bg-center"
                                style={{ backgroundImage: `url('${article.featuredImage || '/placeholder.jpg'}')` }}
                            ></div>
                            <div className="p-5 flex flex-col grow">
                                <div className="flex justify-between items-start mb-3">
                                    <span className="text-xs font-bold text-primary bg-blue-50 px-2 py-1 rounded">{article.categoryId?.name || 'Uncategorized'}</span>
                                    <span className="text-xs text-gray-400">{article.createdAt ? new Date(article.createdAt).toLocaleDateString() : ''}</span>
                                </div>
                                <h3 className="text-lg font-bold text-[#0e121b] mb-2 line-clamp-2 hover:text-primary cursor-pointer transition-colors font-lexend">
                                    {article.title}
                                </h3>
                                <p className="text-sm text-[#506395] mb-4 line-clamp-3 grow">
                                    {article.excerpt || (article.content && article.content.substring(0, 150) + '...')}
                                </p>
                                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
                                            {article.authorImg ? (
                                                <img className="w-full h-full object-cover" src={article.authorImg} alt={article.author} />
                                            ) : (
                                                <div className="bg-primary w-full h-full flex items-center justify-center text-white text-[10px]">LCA</div>
                                            )}
                                        </div>
                                        <span className="text-xs font-medium text-gray-600">{article.author}</span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
            <div className="flex justify-center mt-8">
                <button className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    Load More Articles
                    <span className="material-symbols-outlined text-sm">expand_more</span>
                </button>
            </div>
        </main>
    );
};

export default ArticleGrid;

