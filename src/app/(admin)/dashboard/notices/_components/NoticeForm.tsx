"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { createNotice, updateNotice, getNoticeById } from "@/actions/notices";
import { getNoticeCategories, getNoticeSubcategories } from "@/actions/categories";
import RichTextEditor from "../../_components/RichTextEditor";
import FileUploader from "../../_components/FileUploader";

interface INoticeFormProps {
    id?: string;
}

export default function NoticeForm({ id }: INoticeFormProps) {
    const router = useRouter();
    const isEditing = !!id;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);
    const [subcategories, setSubcategories] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        description: "",
        categoryId: "",
        subcategoryId: "",
        tag: "",
        date: "",
        documents: [] as { title: string; url: string }[],
        status: "active"
    });

    useEffect(() => {
        fetchCategories();
        if (isEditing) {
            fetchNotice();
        } else {
            setFormData(prev => ({
                ...prev,
                date: new Date().toISOString().split('T')[0]
            }));
        }
    }, [isEditing]);

    const fetchCategories = async () => {
        try {
            const data = await getNoticeCategories();
            setCategories(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch categories", error);
        }
    };

    const fetchSubcategories = async (catId: string) => {
        try {
            const data = await getNoticeSubcategories(catId);
            setSubcategories(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch subcategories", error);
        }
    };

    const fetchNotice = async () => {
        try {
            if (!id) return;
            const data = await getNoticeById(id);
            setFormData({
                ...data,
                slug: data.slug || "",
                categoryId: data.categoryId?._id || data.categoryId,
                subcategoryId: data.subcategoryId?._id || data.subcategoryId,
                date: new Date(data.date).toISOString().split('T')[0],
                documents: data.documents || []
            });
            if (data.categoryId) {
                fetchSubcategories(data.categoryId?._id || data.categoryId);
            }
        } catch (error) {
            toast.error("Failed to fetch notice data");
        }
    };

    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^\w ]+/g, "")
            .replace(/ +/g, "-");
    };

    const handleTitleChange = (title: string) => {
        setFormData(prev => ({
            ...prev,
            title,
            slug: isEditing ? prev.slug : generateSlug(title)
        }));
    };

    const handleCategoryChange = (catId: string) => {
        setFormData(prev => ({ ...prev, categoryId: catId, subcategoryId: "" }));
        if (catId) fetchSubcategories(catId);
        else setSubcategories([]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const { _id, __v, createdAt, updatedAt, ...payload } = formData as any;
        if (!payload.subcategoryId) delete payload.subcategoryId;

        try {
            if (isEditing && id) {
                await updateNotice(id, payload);
                toast.success("Notice updated successfully");
            } else {
                await createNotice(payload);
                toast.success("Notice created successfully");
            }
            router.push("/dashboard/notices");
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto pb-20">
            <div className="sticky top-0 z-50 bg-gray-50/80 backdrop-blur-md -mx-8 px-8 py-6 mb-8 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">{isEditing ? "Edit" : "Post"} Notice</h1>
                    <p className="text-gray-500 mt-1">Official announcements, updates and board results.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-sm"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2 disabled:opacity-50"
                    >
                        {isSubmitting ? "Saving..." : "Save Notice"}
                    </button>
                </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-8">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Notice Title</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => handleTitleChange(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base py-2.5 px-4"
                            placeholder="e.g. CAP-II Exam Schedule December 2025"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Slug (URL identifier)</label>
                        <input
                            type="text"
                            required
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/ /g, '-') })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base py-2.5 px-4 bg-gray-50"
                            placeholder="auto-generated-from-title"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <RichTextEditor
                            value={formData.description}
                            onChange={(content) => setFormData({ ...formData, description: content })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                required
                                value={formData.categoryId}
                                onChange={(e) => handleCategoryChange(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base py-2.5 px-4"
                            >
                                <option value="">Select a Category</option>
                                {categories.map(cat => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Subcategory (Optional)</label>
                            <select
                                value={formData.subcategoryId}
                                onChange={(e) => setFormData({ ...formData, subcategoryId: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base py-2.5 px-4"
                                disabled={!formData.categoryId}
                            >
                                <option value="">None</option>
                                {subcategories.map(sub => (
                                    <option key={sub._id} value={sub._id}>{sub.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tag (Optional badge)</label>
                            <input
                                type="text"
                                value={formData.tag}
                                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base py-2.5 px-4"
                                placeholder="e.g. Exam Alert, New Syllabus"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base py-2.5 px-4"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Notice Date</label>
                            <input
                                type="date"
                                required
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base py-2.5 px-4"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium text-gray-700">Documents & Downloads</label>
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({
                                    ...prev,
                                    documents: [...prev.documents, { title: "", url: "" }]
                                }))}
                                className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                            >
                                <span className="material-symbols-outlined text-sm">add</span>
                                Add Document
                            </button>
                        </div>

                        {formData.documents?.map((doc, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                <div className="md:col-span-5">
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Document Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={doc.title}
                                        onChange={(e) => {
                                            const newDocs = [...(formData.documents || [])];
                                            newDocs[index].title = e.target.value;
                                            setFormData({ ...formData, documents: newDocs });
                                        }}
                                        className="w-full rounded-md border-gray-300 text-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="e.g. Exam Schedule PDF"
                                    />
                                </div>
                                <div className="md:col-span-6">
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">File / Link</label>
                                    <FileUploader
                                        value={doc.url}
                                        onChange={(url) => {
                                            const newDocs = [...(formData.documents || [])];
                                            newDocs[index].url = url;
                                            if (url && !newDocs[index].title) {
                                                const filename = url.split('/').pop()?.split('-').slice(1).join('-') || "Document";
                                                newDocs[index].title = filename.split('.')[0];
                                            }
                                            setFormData({ ...formData, documents: newDocs });
                                        }}
                                    />
                                </div>
                                <div className="md:col-span-1 flex items-end justify-center pb-1">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newDocs = (formData.documents || []).filter((_, i) => i !== index);
                                            setFormData({ ...formData, documents: newDocs });
                                        }}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <span className="material-symbols-outlined">delete</span>
                                    </button>
                                </div>
                            </div>
                        ))}

                        {(!formData.documents || formData.documents.length === 0) && (
                            <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-sm">
                                No documents attached. Click "Add Document" to upload files.
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isSubmitting ? "Saving..." : isEditing ? "Update Notice" : "Create Notice"}
                    </button>
                </div>
            </div>
        </form>
    );
}

