import { getPageBySlug } from "@/actions/pages";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Hero from "../_components/Hero";
import Link from "next/link";

interface IPartialPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: IPartialPageProps): Promise<Metadata> {
    const { slug } = await params;
    const page = await getPageBySlug(slug);

    if (!page || page.status !== 'published') {
        return {
            title: "Page Not Found",
        };
    }

    return {
        title: page.seo?.title || page.title,
        description: page.seo?.description,
        keywords: page.seo?.keywords,
    };
}

export default async function CustomDynamicPage({ params }: IPartialPageProps) {
    const { slug } = await params;
    const page = await getPageBySlug(slug);

    if (!page || page.status !== 'published') {
        return notFound();
    }

    return (
        <main className="min-h-screen bg-[#f6f6f8]">
            <style dangerouslySetInnerHTML={{
                __html: `
                .editor-columns { display: flex; gap: 2rem; margin: 2rem 0; flex-wrap: wrap; }
                .editor-column { flex: 1; min-width: 280px; }
                
                .collapsible { 
                    border: 1px solid #e2e8f0; 
                    border-radius: 1.25rem; 
                    margin: 1.5rem 0; 
                    overflow: hidden;
                    background: #fff;
                    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05);
                }
                .collapsible-summary { 
                    background: #fff; 
                    padding: 1.25rem 1.5rem; 
                    cursor: pointer; 
                    display: flex; 
                    align-items: center; 
                    gap: 1.25rem;
                    font-weight: 700;
                    list-style: none;
                    color: var(--primary);
                }
                .collapsible-summary::-webkit-details-marker { display: none; }
                .collapsible-icon { 
                    font-family: 'Material Symbols Outlined';
                    font-weight: normal;
                    font-style: normal;
                    font-size: 24px;
                    line-height: 1;
                    letter-spacing: normal;
                    text-transform: none;
                    display: inline-block;
                    white-space: nowrap;
                    word-wrap: normal;
                    direction: ltr;
                    -webkit-font-smoothing: antialiased;
                    color: var(--secondary);
                    background: #fff5f5;
                    padding: 8px;
                    border-radius: 12px;
                }
                .dropdown-arrow {
                    margin-left: auto;
                    font-family: 'Material Symbols Outlined';
                    transition: transform 0.3s ease;
                    color: #94a3b8;
                }
                .collapsible[open] .dropdown-arrow { transform: rotate(180deg); }
                .collapsible-content { padding: 1.5rem; border-top: 1px solid #f1f5f9; background: #fff; }
                
                .material-symbols-outlined {
                    font-family: 'Material Symbols Outlined';
                    font-weight: normal;
                    font-style: normal;
                    font-size: 24px;
                    line-height: 1;
                    display: inline-block;
                    vertical-align: middle;
                }
                
                @media (max-width: 768px) {
                    .editor-columns { flex-direction: column; }
                }
            `}} />

            {page.heroes?.filter(h => h.isVisible).map((hero, index) => (
                <Hero key={index} data={hero as any} />
            ))}

            {page.header?.isVisible && (
                <section
                    className={`relative flex items-center overflow-hidden border-b border-slate-200 
                        ${page.header.height === 'small' ? 'min-h-[300px]' :
                            page.header.height === 'medium' ? 'min-h-[450px]' : 'min-h-[600px]'}
                        ${page.header.textAlign === 'left' ? 'justify-start' :
                            page.header.textAlign === 'right' ? 'justify-end' : 'justify-center'}
                        ${page.header.textColor === 'dark' ? 'bg-white' : 'bg-primary'}`}
                >
                    {page.header.backgroundImage && (
                        <div className="absolute inset-0 pointer-events-none">
                            <img
                                src={page.header.backgroundImage}
                                alt={page.header.title || page.title}
                                className="w-full h-full object-cover"
                            />
                            <div
                                className={`absolute inset-0 ${page.header.textColor === 'dark' ? 'bg-white' : 'bg-primary'}`}
                                style={{ opacity: (page.header.overlayOpacity || 40) / 100 }}
                            />
                        </div>
                    )}
                    <div className={`layout-container px-6 md:px-12 lg:px-24 relative z-10 py-12 
                        ${page.header.textAlign === 'left' ? 'text-left' :
                            page.header.textAlign === 'right' ? 'text-right' : 'text-center'}
                        ${page.header.textColor === 'dark' ? 'text-slate-900' : 'text-white'}`}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight mb-6 animate-in slide-in-from-bottom-4 duration-500">
                            {page.header.title || page.title}
                        </h1>
                        {page.header.subtitle && (
                            <p className={`text-lg md:text-2xl max-w-3xl font-medium animate-in slide-in-from-bottom-6 duration-700 delay-100 leading-relaxed
                                ${page.header.textAlign === 'center' ? 'mx-auto' : ''}
                                ${page.header.textColor === 'dark' ? 'text-slate-600' : 'text-slate-100'}`}
                            >
                                {page.header.subtitle}
                            </p>
                        )}
                        <div className={`h-1.5 w-24 bg-secondary rounded-full mt-10 shadow-lg shadow-secondary/20 
                            ${page.header.textAlign === 'center' ? 'mx-auto' :
                                page.header.textAlign === 'right' ? 'ml-auto' : ''}`}
                        />

                        {(page.header.primaryButton?.text || page.header.secondaryButton?.text) && (
                            <div className={`flex flex-wrap gap-4 mt-12 animate-in slide-in-from-bottom-8 duration-1000 delay-200
                                ${page.header.textAlign === 'center' ? 'justify-center' :
                                    page.header.textAlign === 'right' ? 'justify-end' : 'justify-start'}`}
                            >
                                {page.header.primaryButton?.text && (
                                    <Link
                                        href={page.header.primaryButton.link || "#"}
                                        className={`px-10 py-4 rounded-xl font-bold transition-all active:scale-95 shadow-xl shadow-secondary/20 uppercase tracking-wide text-sm flex items-center gap-2
                                            ${page.header.primaryButton.variant === 'outline' ?
                                                'border-2 border-secondary text-secondary hover:bg-secondary hover:text-white' :
                                                page.header.primaryButton.variant === 'ghost' ?
                                                    'text-secondary hover:bg-red-50' :
                                                    'bg-secondary text-white hover:bg-secondary-dark'}`}
                                    >
                                        {page.header.primaryButton.icon && (
                                            <span className="material-symbols-outlined text-[20px]">{page.header.primaryButton.icon}</span>
                                        )}
                                        {page.header.primaryButton.text}
                                    </Link>
                                )}
                                {page.header.secondaryButton?.text && (
                                    <Link
                                        href={page.header.secondaryButton.link || "#"}
                                        className={`px-10 py-4 rounded-xl font-bold transition-all active:scale-95 uppercase tracking-wide text-sm flex items-center gap-2
                                            ${page.header.secondaryButton.variant === 'solid' ?
                                                'bg-white text-primary hover:bg-slate-100 shadow-xl' :
                                                page.header.secondaryButton.variant === 'ghost' ?
                                                    (page.header.textColor === 'dark' ? 'text-slate-600 hover:bg-slate-100' : 'text-white/80 hover:text-white hover:bg-white/10') :
                                                    `border-2 ${page.header.textColor === 'dark' ? 'border-primary text-primary hover:bg-slate-50' : 'border-white/30 text-white hover:border-white hover:bg-white/10'}`}`}
                                    >
                                        {page.header.secondaryButton.icon && (
                                            <span className="material-symbols-outlined text-[20px]">{page.header.secondaryButton.icon}</span>
                                        )}
                                        {page.header.secondaryButton.text}
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </section>
            )}

            <div className="layout-container md:px-12 lg:px-24 py-16 md:py-24 lg:py-28 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <article
                    className="prose prose-slate prose-lg max-w-none 
                        prose-headings:text-primary prose-headings:font-black
                        prose-h1:text-4xl prose-h1:lg:text-5xl prose-h1:mb-8
                        prose-h2:text-3xl prose-h2:lg:text-4xl prose-h2:mt-16 prose-h2:mb-6
                        prose-p:text-slate-600 prose-p:leading-loose prose-p:text-lg
                        prose-a:text-secondary prose-a:no-underline hover:prose-a:underline prose-a:font-bold
                        prose-img:rounded-[2rem] prose-img:shadow-2xl prose-img:my-12
                        prose-table:border prose-table:border-slate-200 prose-table:rounded-3xl prose-table:overflow-hidden
                        prose-th:bg-primary prose-th:text-white prose-th:p-5 prose-th:uppercase prose-th:text-xs prose-th:tracking-widest
                        prose-td:p-5 prose-td:border-t prose-td:border-slate-100 prose-td:bg-white
                        prose-blockquote:border-l-8 prose-blockquote:border-secondary prose-blockquote:bg-white prose-blockquote:py-8 prose-blockquote:px-10 prose-blockquote:rounded-3xl prose-blockquote:shadow-xl prose-blockquote:shadow-slate-200/50 prose-blockquote:text-slate-900 prose-blockquote:font-bold prose-blockquote:italic"
                    dangerouslySetInnerHTML={{ __html: page.content }}
                />
            </div>
        </main>
    );
}
