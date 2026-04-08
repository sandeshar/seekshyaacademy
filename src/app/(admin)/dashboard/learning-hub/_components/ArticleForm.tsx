"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { createArticle, updateArticle, getArticleById } from "@/actions/articles";
import { getHubCategories, getHubSubcategories } from "@/actions/categories";
import ImageUploader from "../../_components/ImageUploader";
import RichTextEditor from "../../_components/RichTextEditor";

export default function ArticleForm({ params }: { params?: { id: string } }) {
    const router = useRouter();
    const isEditing = !!params?.id;

    const [categories, setCategories] = useState<any[]>([]);
    const [subcategories, setSubcategories] = useState<any[]>([]);
    const [showSEO, setShowSEO] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        author: "",
        content: "",
        excerpt: "",
        categoryId: "",
        subcategoryId: "",
        status: "draft",
        featured: false,
        featuredImage: "",
        seo: {
            title: "",
            description: "",
            keywords: ""
        }
    });

    useEffect(() => {
        fetchCategories();
        if (isEditing) {
            fetchArticle();
        }
    }, [isEditing]);

    const fetchCategories = async () => {
        const data = await getHubCategories();
        setCategories(data);
    };

    const fetchSubcategories = async (catId: string) => {
        const data = await getHubSubcategories(catId);
        setSubcategories(data);
    };

    const fetchArticle = async () => {
        if (!params?.id) return;
        const data = await getArticleById(params.id);
        setFormData(data);
        if (data.categoryId) fetchSubcategories(data.categoryId?._id || data.categoryId);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Clean payload: remove empty subcategoryId to prevent Mongoose CastError
        const payload = { ...formData };
        if (!payload.subcategoryId) {
            delete (payload as any).subcategoryId;
        }

        try {
            if (isEditing && params?.id) {
                await updateArticle(params.id, payload);
                toast.success("Article updated successfully");
            } else {
                await createArticle(payload);
                toast.success("Article created successfully");
            }
            router.push("/dashboard/learning-hub");
        } catch (error: any) {
            console.error("Error saving article", error);
            toast.error(error.message || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="sticky top-0 z-50 bg-gray-50/80 backdrop-blur-md -mx-8 px-8 py-6 mb-8 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">{isEditing ? "Edit" : "Create"} Article</h1>
                    <p className="text-gray-500 mt-1">Write and publish educational content for the Learning Hub.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => router.push("/dashboard/learning-hub")}
                        className="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-sm"
                    >
                        Back to List
                    </button>
                    <button
                        onClick={(e) => {
                            handleSubmit(e as any);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        disabled={isSubmitting}
                        className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2 disabled:opacity-50"
                    >
                        {isSubmitting ? "Saving..." : "Save Article"}
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => {
                                const title = e.target.value;
                                setFormData({
                                    ...formData,
                                    title,
                                    slug: isEditing ? formData.slug : title.toLowerCase().replace(/\s+/g, '-')
                                });
                            }}
                            className="w-full px-4 py-2.5 text-base bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug (permalink)</label>
                        <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                            className="w-full px-4 py-2.5 text-base bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="seo-friendly-url (auto-generated from title)"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                        <input
                            type="text"
                            value={formData.author || ""}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            className="w-full px-4 py-2.5 text-base bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="Author name (e.g., Jane Doe)"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Publication Status</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                            className="w-full px-4 py-2.5 text-base bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Featured</label>
                        <div className="flex items-center gap-3">
                            <label className="inline-flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={!!formData.featured}
                                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                    className="w-4 h-4"
                                />
                                <span className="text-sm text-gray-700">Feature on Learning Hub</span>
                            </label>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <ImageUploader
                            label="Hero Image (Featured Image)"
                            value={formData.featuredImage}
                            onChange={(url) => setFormData({ ...formData, featuredImage: url })}
                            description="Main hero image displayed at the top of the article"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            value={formData.categoryId}
                            onChange={(e) => {
                                setFormData({ ...formData, categoryId: e.target.value, subcategoryId: "" });
                                fetchSubcategories(e.target.value);
                            }}
                            className="w-full px-4 py-2.5 text-base bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory (Optional)</label>
                        <select
                            value={formData.subcategoryId}
                            onChange={(e) => setFormData({ ...formData, subcategoryId: e.target.value })}
                            className="w-full px-4 py-2.5 text-base bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        >
                            <option value="">Select Subcategory</option>
                            {subcategories.map((sub) => (
                                <option key={sub._id} value={sub._id}>{sub.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Summary (Excerpt)</label>
                        <textarea
                            value={formData.excerpt}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            className="w-full px-4 py-2.5 text-base bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            rows={2}
                            placeholder="A short summary of the article, shown in lists and previews"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Article Content</label>
                        <RichTextEditor
                            value={formData.content}
                            onChange={(content) => setFormData({ ...formData, content })}
                            placeholder="Write your article content here..."
                            heightClasses="h-80 sm:h-96 md:h-[520px]"
                        />
                    </div>
                </div>

                {/* SEO Section */}
                <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                    <button
                        type="button"
                        onClick={() => setShowSEO(!showSEO)}
                        className="w-full flex items-center justify-between px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                        <span className="flex items-center gap-2 font-semibold text-gray-700">
                            <span className="material-symbols-outlined text-[20px]">search</span>
                            Search Engine Optimization (SEO)
                        </span>
                        <span className={`material-symbols-outlined transition-transform duration-200 ${showSEO ? 'rotate-180' : ''}`}>
                            keyboard_arrow_down
                        </span>
                    </button>

                    {showSEO && (
                        <div className="p-6 bg-white space-y-5 border-t border-gray-100 animate-fadeIn">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">SEO Title</label>
                                <input
                                    type="text"
                                    value={formData.seo?.title || ""}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        seo: { ...formData.seo, title: e.target.value }
                                    })}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                                    placeholder="Enter SEO title for search results..."
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">SEO Description</label>
                                <textarea
                                    value={formData.seo?.description || ""}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        seo: { ...formData.seo, description: e.target.value }
                                    })}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                                    rows={3}
                                    placeholder="Enter a compelling description for search snippets..."
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-8 py-2 bg-blue-600 text-white rounded-lg font-medium shadow-sm shadow-blue-200 transition-all ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
                            }`}
                    >
                        {isSubmitting ? "Processing..." : isEditing ? "Save Changes" : "Create Article"}
                    </button>
                </div>
            </form>
        </div>
    );
}


