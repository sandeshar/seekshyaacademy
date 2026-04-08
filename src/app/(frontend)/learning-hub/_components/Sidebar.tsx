import React from 'react';
import Link from 'next/link';
import { getNotices } from '@/actions/notices';
import { getArticles } from '@/actions/articles';

const Sidebar = async ({ showWidgets = true }: { showWidgets?: boolean }) => {
    if (!showWidgets) {
        return <aside className="lg:col-span-4" />;
    }

    const notices = await getNotices({ status: 'active' }, { date: -1 }, 3);
    const latestNotices = Array.isArray(notices) ? notices.slice(0, 3) : [];

    const featuredArticles = await getArticles({ featured: true, status: 'published' }, { createdAt: -1 }, 3);
    const articles = Array.isArray(featuredArticles) ? featuredArticles : [];

    return (
        <aside className="lg:col-span-4 flex flex-col gap-8 sticky top-20">
            {/* Newsletter Widget - Keep as is but maybe add action later */}
            <div className="bg-primary rounded-xl p-6 text-white shadow-lg relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-white opacity-10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-white/20 p-2 rounded-lg">
                            <span className="material-symbols-outlined">mail</span>
                        </div>
                        <h3 className="text-lg font-bold font-lexend">Subscribe for CA Updates</h3>
                    </div>
                    <p className="text-sm text-white/80 mb-4">Get the latest ICAN notices, study tips, and free resources delivered to your inbox.</p>
                    <div className="flex flex-col gap-3">
                        <input
                            className="w-full rounded-lg bg-white/10 border border-white/20 placeholder:text-white/50 text-white text-sm focus:ring-2 focus:ring-white/50 focus:border-white/50 p-2 outline-none"
                            placeholder="Enter your email"
                            type="email"
                        />
                        <button className="w-full bg-white text-primary font-bold text-sm py-2 rounded-lg hover:bg-white/90 transition-colors">
                            Subscribe Free
                        </button>
                    </div>
                </div>
            </div>

            {/* Dynamic Notices Widget */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2 font-lexend">
                        <span className="material-symbols-outlined text-primary text-[20px]">notifications_active</span>
                        Latest Notices
                    </h3>
                </div>
                <div className="flex flex-col">
                    {latestNotices.length > 0 ? (
                        latestNotices.map((notice: any) => (
                            <Link
                                key={notice._id}
                                href={`/notices/${notice.slug}`}
                                className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors group"
                            >
                                <span className="text-xs font-semibold text-primary mb-1 block">
                                    {notice.tag || 'Update'} • {new Date(notice.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </span>
                                <p className="text-sm font-medium text-gray-800 group-hover:text-primary leading-snug">
                                    {notice.title}
                                </p>
                            </Link>
                        ))
                    ) : (
                        <p className="p-4 text-sm text-gray-500 italic">No recent notices</p>
                    )}
                    <Link href="/notices" className="p-4 hover:bg-gray-50 transition-colors text-center">
                        <span className="text-xs font-bold text-primary">View All Notices</span>
                    </Link>
                </div>
            </div>

            {/* Featured Articles Widget */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2 font-lexend">
                        <span className="material-symbols-outlined text-accent-orange text-[20px]">star_rate</span>
                        Featured Posts
                    </h3>
                </div>
                <div className="flex flex-col">
                    {articles.length > 0 ? (
                        articles.map((article: any) => (
                            <Link
                                key={article._id}
                                href={`/learning-hub/${article.slug}`}
                                className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors group flex gap-4"
                            >
                                {article.featuredImage && (
                                    <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                                        <img
                                            src={article.featuredImage}
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                )}
                                <div className="flex flex-col justify-center">
                                    <p className="text-sm font-bold text-gray-800 group-hover:text-primary leading-tight line-clamp-2">
                                        {article.title}
                                    </p>
                                    <span className="text-[11px] text-gray-500 mt-1">
                                        {new Date(article.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="p-4 text-sm text-gray-500 italic">No featured articles</p>
                    )}
                </div>
            </div>

            {/* Free Resources Widget - Kept as is for now, could be dynamic later */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2 font-lexend">
                        <span className="material-symbols-outlined text-secondary text-[20px]">folder_open</span>
                        Free Resources
                    </h3>
                </div>
                <div className="p-4 flex flex-col gap-3">
                    {[
                        { icon: 'picture_as_pdf', label: 'CAP I Accounts Notes', ext: 'PDF', size: '2.4 MB', color: 'bg-primary/10 text-primary' },
                        { icon: 'description', label: 'Tax Rate Sheet 2024', ext: 'XLSX', size: '1.1 MB', color: 'bg-accent-orange/10 text-accent-orange' },
                        { icon: 'slideshow', label: 'Audit Process Flowchart', ext: 'PPT', size: '5.0 MB', color: 'bg-secondary/10 text-secondary' },
                    ].map((res, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-primary/30 hover:bg-secondary/5 transition-colors cursor-pointer group">
                            <div className={`${res.color} p-2 rounded shrink-0`}>
                                <span className="material-symbols-outlined text-[20px]">{res.icon}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-gray-800 group-hover:text-primary">{res.label}</span>
                                <span className="text-xs text-gray-500">{res.ext} • {res.size}</span>
                            </div>
                            <span className="material-symbols-outlined text-gray-400 ml-auto text-[20px] group-hover:text-primary">download</span>
                        </div>
                    ))}
                </div>
                <button className="w-full py-3 text-sm font-bold text-primary border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    Access Resource Library
                </button>
            </div>

            {/* Enroll CTA */}
            <div className="bg-slate-900 rounded-xl p-6 text-white shadow-lg text-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-amber-400">star</span>
                </div>
                <h3 className="text-lg font-bold mb-2 font-lexend">Join Seekshya Academy</h3>
                <p className="text-sm text-gray-400 mb-6">Enroll now for the upcoming session and secure your success with Nepal's top faculty.</p>
                <Link href="/contact" className="w-full block bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-colors">
                    Enroll Now
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;

