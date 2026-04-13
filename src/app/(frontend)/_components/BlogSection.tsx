import Link from "next/link";
import Image from "next/image";
import { getArticles } from "@/actions/articles";

export default async function BlogSection() {
    const blogs = await getArticles({ status: 'published' }, { createdAt: -1 }, 3);

    if (!blogs || blogs.length === 0) return null;

    return (
        <section className="bg-surface-container-lowest py-24">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
                    <div className="max-w-2xl text-center md:text-left">
                        <h2 className="mb-4 font-headline text-3xl font-extrabold text-on-surface md:text-4xl">Latest from Our Blog</h2>
                        <div className="mx-auto h-1.5 w-24 rounded-full bg-primary md:mx-0" />
                        <p className="mt-6 text-on-surface-variant">Stay updated with the latest trends in finance, exam tips, and success stories from Seekshya Academy.</p>
                    </div>
                    <Link href="/blogs" className="group flex items-center gap-2 font-bold text-primary transition-colors hover:text-primary/80">
                        View All Articles
                        <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                    </Link>
                </div>

                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {blogs.map((blog: any) => (
                        <article key={blog._id} className="group overflow-hidden rounded-3xl border border-outline-variant/10 bg-surface-bright shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
                            <Link href={`/blogs/${blog.slug}`} className="block relative h-60 w-full overflow-hidden">
                                <Image
                                    src={blog.featuredImage || blog.image || "/placeholder-blog.jpg"}
                                    alt={blog.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                {blog.categoryId && (
                                    <span className="absolute left-4 top-4 rounded-full bg-primary/90 px-4 py-1 text-xs font-bold text-white backdrop-blur-sm">
                                        {blog.categoryId.name || "General"}
                                    </span>
                                )}
                            </Link>
                            <div className="p-6">
                                <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-on-surface-variant/70">
                                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                                    {new Date(blog.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                                </div>
                                <Link href={`/blogs/${blog.slug}`}>
                                    <h3 className="mb-3 font-headline text-xl font-bold leading-snug text-on-surface transition-colors hover:text-primary">
                                        {blog.title}
                                    </h3>
                                </Link>
                                <p className="mb-4 line-clamp-2 text-sm text-on-surface-variant">
                                    {blog.excerpt || blog.description || blog.content?.replace(/<[^>]*>/g, '').substring(0, 120) + "..."}
                                </p>
                                <Link href={`/blogs/${blog.slug}`} className="inline-flex items-center gap-1 text-sm font-bold text-secondary hover:underline">
                                    Read More
                                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
