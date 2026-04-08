import React from 'react';
import { getArticles } from '@/actions/articles';

const FeaturedStrip = async () => {
    let featured: any[] = [];
    try {
        featured = await getArticles({ featured: true, status: 'published' }, { createdAt: -1 });
    } catch (err) {
        console.error('Failed to load featured articles for strip', err);
    }

    if (!Array.isArray(featured) || featured.length <= 1) return null;

    const rest = featured.slice(1);

    return (
        <section className="mb-8">
            <h3 className="text-xl font-bold text-[#0e121b] mb-4">Featured Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rest.map((a: any) => (
                    <article key={a._id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3">
                            <div className="w-20 h-14 bg-gray-200 rounded overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url('${a.featuredImage || '/placeholder.jpg'}')` }}></div>
                            <div>
                                <h4 className="font-semibold text-gray-900">{a.title}</h4>
                                <p className="text-xs text-gray-400 mt-1">{a.createdAt ? new Date(a.createdAt).toLocaleDateString() : ''}</p>
                                <p className="text-sm text-gray-500 mt-2 line-clamp-2">{a.excerpt || (a.content && a.content.substring(0, 120) + '...')}</p>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default FeaturedStrip;
