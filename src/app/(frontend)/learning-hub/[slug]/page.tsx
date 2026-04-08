import { notFound } from 'next/navigation';
import apiUrl from '@/utils/apiUrl';
import Link from 'next/link';
import ShareButtons from '../../_components/ShareButtons';
import { getArticleBySlug, getArticles } from '@/actions/articles';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    try {
        const article = await getArticleBySlug(slug);
        if (!article || !article._id || article.status !== 'published') return { title: 'Learning Hub' };

        const title = article.seo?.title || article.title;
        const description = article.seo?.description || article.excerpt || 'Insights and articles from Lakshya Academy.';

        return {
            title,
            description,
        };
    } catch (err) {
        console.error('generateMetadata failed', err);
        return { title: 'Learning Hub' };
    }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    try {
        const article = await getArticleBySlug(slug);

        if (!article || !article._id || article.status !== 'published') notFound();

        // Fetch related articles (same category if available) and limit (kept but will not be displayed in TOC-only sidebar)
        let related: any[] = [];
        try {
            const relatedDocs = await getArticles({ status: 'published' }, { createdAt: -1 }, 6);

            if (relatedDocs && relatedDocs.length > 0) {
                const articleIdStr = article._id.toString();
                const categoryIdStr = article.categoryId && typeof article.categoryId === 'object' && '_id' in article.categoryId
                    ? (article.categoryId as any)._id.toString()
                    : null;

                // Prefer same category, exclude current article
                related = relatedDocs
                    .filter((a: any) => {
                        const aIdStr = a._id.toString();
                        if (aIdStr === articleIdStr) return false;
                        if (!categoryIdStr) return true;
                        const aCategoryIdStr = a.categoryId && typeof a.categoryId === 'object' && '_id' in a.categoryId
                            ? (a.categoryId as any)._id.toString()
                            : null;
                        return aCategoryIdStr === categoryIdStr;
                    })
                    .slice(0, 4);

                if (related.length < 4) {
                    // fill with other articles if needed
                    const extras = relatedDocs
                        .filter((a: any) => {
                            const aIdStr = a._id.toString();
                            if (aIdStr === articleIdStr) return false;
                            return !related.some(r => r._id.toString() === aIdStr);
                        })
                        .slice(0, 4 - related.length);
                    related = related.concat(extras);
                }
            }
        } catch (err) {
            console.error('Failed to load related articles', err);
        }

        // Generate Table of Contents from article HTML headings and add ids to headings
        const slugify = (text: string) => text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const usedIds = new Set<string>();
        const toc: { id: string; text: string; level: number }[] = [];
        let processedContent = article.content || '';

        // Replace headings with ids
        processedContent = processedContent.replace(/<(h[1-6])([^>]*)>([\s\S]*?)<\/\1>/gi, (match: string, tag: string, attrs: string, inner: string) => {
            const text = (inner.replace(/<[^>]+>/g, '') || '').trim();
            if (!text) return match;
            let baseId = slugify(text);
            let id = baseId || 'section';
            let i = 1;
            while (usedIds.has(id)) {
                id = `${baseId}-${i++}`;
            }
            usedIds.add(id);
            const level = parseInt(tag.charAt(1), 10);
            toc.push({ id, text, level });
            return `<${tag} id="${id}"${attrs}>${inner}</${tag}>`;
        });

        const words = article.content ? (article.content.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length) : 0;
        const readTime = Math.max(1, Math.ceil(words / 200));
        const pageUrl = apiUrl(`/learning-hub/${article.slug || article._id}`);

        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                    <Link
                        href="/learning-hub"
                        className="inline-flex items-center gap-2 text-sm font-bold text-primary group transition-all"
                    >
                        <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-1">arrow_back</span>
                        Back to Learning Hub
                    </Link>
                    <div className="hidden sm:flex items-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                            {readTime} Min Read
                        </span>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <span className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px] text-secondary">visibility</span>
                            Article
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <main className="lg:col-span-8">
                        <article className="bg-white rounded-2xl overflow-hidden shadow-lg">
                            {article.featuredImage ? (
                                <div className="relative h-72 sm:h-96 md:h-130 lg:h-105 overflow-hidden">
                                    <img src={article.featuredImage} alt={article.title} className="w-full h-full object-cover brightness-90" />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute left-6 bottom-6 right-6">
                                        <span className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Featured</span>
                                        <h1 className="text-3xl md:text-5xl font-black text-white mt-4 leading-tight max-w-3xl">{article.title}</h1>
                                        {article.excerpt && <p className="text-white/90 mt-3 max-w-2xl">{article.excerpt}</p>}
                                        <div className="mt-4 flex items-center gap-3 text-white/90 text-sm">
                                            <span>By {article.author || 'Lakshya Team'}</span>
                                            <span className="mx-2">•</span>
                                            <span>{typeof article.categoryId === 'object' && article.categoryId !== null && 'name' in article.categoryId ? (article.categoryId as any).name : 'Uncategorized'}</span>
                                            <span className="mx-2">•</span>
                                            <span>{article.createdAt ? new Date(article.createdAt).toLocaleDateString() : ''}</span>
                                            <span className="mx-2">•</span>
                                            <span>{readTime} min read</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="px-6 py-6 sm:px-10">
                                    <h1 className="text-3xl md:text-5xl font-black leading-tight">{article.title}</h1>
                                    <p className="text-sm text-gray-500 mt-2">By {article.author || 'Lakshya Team'} • {article.createdAt ? new Date(article.createdAt).toLocaleDateString() : ''} • {readTime} min read</p>
                                    {article.excerpt && <p className="mt-4 text-gray-600">{article.excerpt}</p>}
                                </div>
                            )}

                            <div className="prose prose-lg max-w-none px-6 sm:px-10 lg:px-12 py-8 text-gray-800">
                                <div dangerouslySetInnerHTML={{ __html: processedContent }} />
                            </div>

                            <div className="px-6 sm:px-10 lg:px-12 py-6 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    {article.seo?.keywords && article.seo.keywords.split(',').slice(0, 4).map((k: string) => (
                                        <span key={k} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{k.trim()}</span>
                                    ))}
                                </div>
                                <ShareButtons title={article.title} url={pageUrl} />
                            </div>
                        </article>

                        {/* Related Articles Bottom Section */}
                        {related && related.length > 0 && (
                            <div className="mt-12">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-2xl font-black text-slate-900 font-lexend">Continue Reading</h3>
                                    <Link href="/learning-hub" className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
                                        View All
                                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                    </Link>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {related.slice(0, 2).map((rel: any) => (
                                        <Link key={rel._id} href={`/learning-hub/${rel.slug || rel._id}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col h-full">
                                            {rel.featuredImage && (
                                                <div className="relative h-48 overflow-hidden">
                                                    <img src={rel.featuredImage} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                    <div className="absolute top-4 left-4">
                                                        <span className="bg-primary/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase">
                                                            {rel.categoryId?.name || 'Article'}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="p-6 flex flex-col flex-1">
                                                <h4 className="font-bold text-lg text-slate-900 group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-3">
                                                    {rel.title}
                                                </h4>
                                                <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">
                                                    {rel.excerpt || 'Read more about this topic from our expert faculty.'}
                                                </p>
                                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-7 h-7 bg-secondary/10 rounded-full flex items-center justify-center">
                                                            <span className="material-symbols-outlined text-secondary text-[16px]">person</span>
                                                        </div>
                                                        <span className="text-xs font-bold text-slate-700">{rel.author || 'Lakshya Team'}</span>
                                                    </div>
                                                    <span className="text-[11px] text-gray-400">{rel.createdAt ? new Date(rel.createdAt).toLocaleDateString() : ''}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </main>

                    <aside className="lg:col-span-4">
                        <div className="sticky top-20 space-y-6">
                            {/* Table of Contents Widget */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-[20px]">format_list_bulleted</span>
                                    <h4 className="font-bold text-slate-900 font-lexend">Table of Contents</h4>
                                </div>
                                <div className="p-4">
                                    <nav className="space-y-2 text-sm text-gray-700">
                                        {toc.length === 0 ? (
                                            <p className="text-sm text-gray-500 italic">No headings found in this article.</p>
                                        ) : (
                                            toc.map(item => (
                                                <a
                                                    key={item.id}
                                                    href={`#${item.id}`}
                                                    style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
                                                    className="block hover:text-primary transition-colors border-l-2 border-transparent hover:border-primary pl-2 py-0.5 rounded-sm"
                                                >
                                                    {item.text}
                                                </a>
                                            ))
                                        )}
                                    </nav>
                                </div>
                            </div>

                            {/* Share Widget */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-secondary text-[20px]">share</span>
                                    <h4 className="font-bold text-slate-900 font-lexend">Share Article</h4>
                                </div>
                                <div className="p-4 flex justify-start">
                                    <ShareButtons title={article.title} url={pageUrl} hideTitle />
                                </div>
                            </div>

                            {/* Related Articles Widget */}
                            {related && related.length > 0 && (
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-[20px]">auto_stories</span>
                                        <h4 className="font-bold text-slate-900 font-lexend">Related Articles</h4>
                                    </div>
                                    <div className="p-4 space-y-5">
                                        {related.map((rel: any) => (
                                            <Link key={rel._id} href={`/learning-hub/${rel.slug || rel._id}`} className="group block">
                                                <div className="flex gap-4">
                                                    {rel.featuredImage && (
                                                        <div className="relative shrink-0">
                                                            <img src={rel.featuredImage} alt={rel.title} className="w-16 h-16 object-cover rounded-xl group-hover:ring-2 ring-primary/30 transition-all shadow-xs" />
                                                            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors rounded-xl"></div>
                                                        </div>
                                                    )}
                                                    <div className="flex flex-col justify-center min-w-0">
                                                        <h5 className="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors line-clamp-2 leading-tight mb-1">{rel.title}</h5>
                                                        <div className="flex flex-wrap items-center gap-2 mt-auto">
                                                            <span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-md uppercase tracking-tight">
                                                                {rel.categoryId?.name || 'News'}
                                                            </span>
                                                            <span className="text-[10px] text-gray-400 font-medium">{rel.createdAt ? new Date(rel.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : ''}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </aside>
                </div>
            </div>
        );
    } catch (err) {
        console.error('Article page failed', err);
        notFound();
    }
}