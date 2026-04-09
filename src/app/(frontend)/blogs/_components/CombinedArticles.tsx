import React from 'react';
import Link from 'next/link';
import CardShare from './CardShare';
import apiUrl from '@/utils/apiUrl';
import Pagination from './Pagination';
import { getArticlesWithPagination } from '@/actions/articles';
import { getHubCategoryBySlug, getHubSubcategoryBySlug } from '@/actions/categories';

const CombinedArticles = async ({ selectedCategory, selectedSubcategory, searchQuery, page = 1 }: { selectedCategory?: string; selectedSubcategory?: string; searchQuery?: string; page?: number }) => {
    let articles: any[] = [];
    let totalCount = 0;
    const limit = 12;

    try {
        let query: any = { status: 'published' };

        if (selectedCategory) {
            const categoryDoc = await getHubCategoryBySlug(selectedCategory);
            if (categoryDoc) {
                query.categoryId = categoryDoc._id;
            }
        }

        if (selectedSubcategory) {
            const subcategoryDoc = await getHubSubcategoryBySlug(selectedSubcategory);
            if (subcategoryDoc) {
                query.subcategoryId = subcategoryDoc._id;
            }
        }

        if (searchQuery) {
            query.$or = [
                { title: { $regex: searchQuery, $options: 'i' } },
                { content: { $regex: searchQuery, $options: 'i' } },
                { excerpt: { $regex: searchQuery, $options: 'i' } }
            ];
        }

        const result = await getArticlesWithPagination(query, { createdAt: -1 }, limit, page);
        articles = result.articles;
        totalCount = result.total;

    } catch (err) {
        console.error('Failed to load articles', err);
    }

    const totalPages = Math.ceil(totalCount / limit);

    if (articles.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="flex flex-col items-center">
                    <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">search_off</span>
                    <h3 className="text-xl font-bold text-gray-900">No articles found</h3>
                    <p className="text-sm text-gray-500 mt-2">
                        {searchQuery ? `No results for "${searchQuery}". Try different keywords.` : 'There are no published articles yet.'}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-[#0e121b] text-2xl font-bold font-lexend">
                    {searchQuery ? `Search Results for "${searchQuery}"` : 'Latest Articles'}
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {articles.map((article) => (
                    <Link key={article._id} href={`/blogs/${article.slug || article._id}`} className="block h-full">
                        <article className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 h-full">
                            <div
                                className="h-48 w-full bg-gray-200 bg-cover bg-center relative"
                                style={{ backgroundImage: `url('${article.featuredImage || '/placeholder.jpg'}')` }}
                            >
                                {article.featured && (
                                    <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">Featured</div>
                                )}
                            </div>

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
                                            {article.author ? (
                                                <div className="bg-primary w-full h-full flex items-center justify-center text-white text-[10px]">{article.author[0]}</div>
                                            ) : (
                                                <div className="bg-primary w-full h-full flex items-center justify-center text-white text-[10px]">LCA</div>
                                            )}
                                        </div>
                                        <span className="text-xs font-medium text-gray-600">By {article.author || 'Seekshya Team'}</span>
                                    </div>
                                    <CardShare title={article.title} url={apiUrl(`/blogs/${article.slug || article._id}`)} />
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>

            <Pagination currentPage={page} totalPages={totalPages} />
        </section>
    );
};

export default CombinedArticles;
