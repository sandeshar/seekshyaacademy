"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ISEO {
    title?: string;
    description?: string;
    keywords?: string;
}

interface ICategory {
    _id: string;
    name: string;
    slug: string;
    order: number;
    description?: string;
    seo?: ISEO;
}

interface ISubcategory {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    categoryId: string | { _id: string; name: string };
    seo?: ISEO;
}

interface TaxonomyManagerProps {
    title: string;
    description: string;
    endpoints?: {
        categories: string;
        subcategories: string;
        reorder: string;
    };
    actions?: {
        getCategories: () => Promise<any>;
        createCategory: (data: any) => Promise<any>;
        updateCategory: (id: string, data: any) => Promise<any>;
        deleteCategory: (id: string) => Promise<any>;
        getSubcategories: (catId?: string) => Promise<any>;
        createSubcategory: (data: any) => Promise<any>;
        updateSubcategory: (id: string, data: any) => Promise<any>;
        deleteSubcategory: (id: string) => Promise<any>;
    };
    enableSEO?: boolean;
}

export default function TaxonomyManager({
    title,
    description,
    endpoints,
    actions,
    enableSEO = false
}: TaxonomyManagerProps) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"categories" | "subcategories">("categories");
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCategories = useCallback(async () => {
        try {
            let data;
            if (actions) {
                data = await actions.getCategories();
            } else if (endpoints) {
                const res = await fetch(endpoints.categories, { cache: 'no-store' });
                data = await res.json();
            }
            setCategories(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch categories", error);
        }
    }, [endpoints, actions]);

    const fetchSubcategories = useCallback(async () => {
        try {
            let data;
            if (actions) {
                data = await actions.getSubcategories();
            } else if (endpoints) {
                const res = await fetch(endpoints.subcategories, { cache: 'no-store' });
                data = await res.json();
            }
            setSubcategories(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch subcategories", error);
        }
    }, [endpoints, actions]);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            await Promise.all([fetchCategories(), fetchSubcategories()]);
            setIsLoading(false);
        };
        loadData();
    }, [fetchCategories, fetchSubcategories]);

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">{title}</h1>
                <p className="text-gray-500 mt-1">{description}</p>
            </div>

            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setActiveTab("categories")}
                    className={`px-6 py-3 font-medium text-sm transition-colors relative ${activeTab === "categories"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    Categories
                </button>
                <button
                    onClick={() => setActiveTab("subcategories")}
                    className={`px-6 py-3 font-medium text-sm transition-colors relative ${activeTab === "subcategories"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    Subcategories
                </button>
            </div>

            <div className="mt-6">
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                ) : activeTab === "categories" ? (
                    <CategorySection
                        categories={categories}
                        onUpdate={fetchCategories}
                        endpoint={endpoints?.categories || ""}
                        reorderEndpoint={endpoints?.reorder || ""}
                        enableSEO={enableSEO}
                        actions={actions}
                    />
                ) : (
                    <SubcategorySection
                        categories={categories}
                        subcategories={subcategories}
                        onUpdate={fetchSubcategories}
                        endpoint={endpoints?.subcategories || ""}
                        enableSEO={enableSEO}
                        actions={actions}
                    />
                )}
            </div>
        </div>
    );
}

function CategorySection({
    categories,
    onUpdate,
    endpoint,
    reorderEndpoint,
    enableSEO,
    actions
}: {
    categories: ICategory[];
    onUpdate: () => void;
    endpoint: string;
    reorderEndpoint: string;
    enableSEO: boolean;
    actions?: TaxonomyManagerProps["actions"];
}) {
    const router = useRouter();
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [seo, setSeo] = useState<ISEO>({ title: "", description: "", keywords: "" });
    const [showSEO, setShowSEO] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            name,
            slug,
            description,
            ...(enableSEO ? { seo } : {})
        };
        try {
            if (actions) {
                if (editingId) {
                    await actions.updateCategory(editingId, payload);
                } else {
                    await actions.createCategory(payload);
                }
                toast.success(editingId ? "Category updated" : "Category created");
                resetForm();
                router.refresh();
                onUpdate();
            } else if (endpoint) {
                const url = editingId ? `${endpoint}/${editingId}` : endpoint;
                const method = editingId ? "PUT" : "POST";
                const res = await fetch(url, {
                    method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
                if (res.ok) {
                    toast.success(editingId ? "Category updated" : "Category created");
                    resetForm();
                    router.refresh();
                    onUpdate();
                } else {
                    const data = await res.json();
                    toast.error(data.error || "Failed to save category");
                }
            }
        } catch (error) {
            toast.error("Error occurred while saving");
        }
    };

    const resetForm = () => {
        setName("");
        setSlug("");
        setDescription("");
        setSeo({ title: "", description: "", keywords: "" });
        setShowSEO(false);
        setEditingId(null);
    };

    const handleEdit = (cat: ICategory) => {
        setName(cat.name);
        setSlug(cat.slug);
        setDescription(cat.description || "");
        if (enableSEO) {
            setSeo({
                title: cat.seo?.title || "",
                description: cat.seo?.description || "",
                keywords: cat.seo?.keywords || ""
            });
        }
        setEditingId(cat._id);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure? This might affect associated items.")) return;
        try {
            if (actions) {
                await actions.deleteCategory(id);
                toast.success("Category deleted");
                router.refresh();
                onUpdate();
            } else if (endpoint) {
                const res = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
                if (res.ok) {
                    toast.success("Category deleted");
                    router.refresh();
                    onUpdate();
                } else {
                    toast.error("Failed to delete category");
                }
            }
        } catch (error) {
            toast.error("Error occurred");
        }
    };

    const handleReorder = async (id: string, direction: "up" | "down") => {
        const index = categories.findIndex((cat) => cat._id === id);
        if (index === -1) return;
        if (direction === "up" && index === 0) return;
        if (direction === "down" && index === categories.length - 1) return;

        const newCategories = [...categories];
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        [newCategories[index], newCategories[targetIndex]] = [
            newCategories[targetIndex],
            newCategories[index],
        ];

        const items = newCategories.map((cat, idx) => ({
            id: cat._id,
            order: idx,
        }));

        try {
            if (actions) {
                // Reorder via multiple updates
                await Promise.all(items.map(item => actions.updateCategory(item.id, { order: item.order })));
                onUpdate();
            } else if (reorderEndpoint) {
                const res = await fetch(reorderEndpoint, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ items }),
                });
                if (res.ok) {
                    onUpdate();
                } else {
                    toast.error("Failed to reorder");
                }
            }
        } catch (error) {
            toast.error("Error occurred");
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900">{editingId ? "Edit Category" : "Add Category"}</h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                if (!editingId) setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, ""));
                            }}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                        <input
                            type="text"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            rows={3}
                        />
                    </div>

                    {enableSEO && (
                        <div className="border border-gray-100 rounded-lg overflow-hidden">
                            <button
                                type="button"
                                onClick={() => setShowSEO(!showSEO)}
                                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                            >
                                <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <span className="material-symbols-outlined text-[18px]">search</span>
                                    SEO Information
                                </span>
                                <span className={`material-symbols-outlined transition-transform duration-200 ${showSEO ? 'rotate-180' : ''}`}>
                                    keyboard_arrow_down
                                </span>
                            </button>

                            {showSEO && (
                                <div className="p-4 bg-white space-y-3 border-t border-gray-100 animate-slideDown">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Meta Title</label>
                                        <input
                                            type="text"
                                            value={seo.title}
                                            onChange={(e) => setSeo({ ...seo, title: e.target.value })}
                                            className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Meta Description</label>
                                        <textarea
                                            value={seo.description}
                                            onChange={(e) => setSeo({ ...seo, description: e.target.value })}
                                            className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                            rows={2}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Keywords</label>
                                        <input
                                            type="text"
                                            value={seo.keywords}
                                            onChange={(e) => setSeo({ ...seo, keywords: e.target.value })}
                                            className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex gap-2">
                        <button type="submit" className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                            {editingId ? "Update" : "Create"}
                        </button>
                        {editingId && (
                            <button type="button" onClick={resetForm} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="lg:col-span-2">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden text-sm">
                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider w-16 text-center">Order</th>
                                    <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider">Category Details</th>
                                    <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 font-medium">
                                {categories.length === 0 ? (
                                    <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500">No categories found.</td></tr>
                                ) : (
                                    categories.map((cat, idx) => (
                                        <tr key={cat._id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex flex-col items-center">
                                                    <button
                                                        onClick={() => handleReorder(cat._id, "up")}
                                                        disabled={idx === 0}
                                                        className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-gray-400"
                                                    >
                                                        <span className="material-symbols-outlined text-[18px]">keyboard_arrow_up</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleReorder(cat._id, "down")}
                                                        disabled={idx === categories.length - 1}
                                                        className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-gray-400"
                                                    >
                                                        <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-gray-900 font-bold">{cat.name}</p>
                                                <p className="text-xs text-gray-400 font-normal mt-0.5">{cat.slug}</p>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => handleEdit(cat)} className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all">
                                                        <span className="material-symbols-outlined text-[20px]">edit</span>
                                                    </button>
                                                    <button onClick={() => handleDelete(cat._id)} className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all">
                                                        <span className="material-symbols-outlined text-[20px]">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SubcategorySection({
    categories,
    subcategories,
    onUpdate,
    endpoint,
    enableSEO,
    actions
}: {
    categories: ICategory[];
    subcategories: ISubcategory[];
    onUpdate: () => void;
    endpoint: string;
    enableSEO: boolean;
    actions?: TaxonomyManagerProps["actions"];
}) {
    const router = useRouter();
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [seo, setSeo] = useState<ISEO>({ title: "", description: "", keywords: "" });
    const [showSEO, setShowSEO] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            name,
            slug,
            description,
            categoryId,
            ...(enableSEO ? { seo } : {})
        };
        try {
            if (actions) {
                if (editingId) {
                    await actions.updateSubcategory(editingId, payload);
                } else {
                    await actions.createSubcategory(payload);
                }
                toast.success(editingId ? "Subcategory updated" : "Subcategory created");
                resetForm();
                router.refresh();
                onUpdate();
            } else if (endpoint) {
                const url = editingId ? `${endpoint}/${editingId}` : endpoint;
                const method = editingId ? "PUT" : "POST";
                const res = await fetch(url, {
                    method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
                if (res.ok) {
                    toast.success(editingId ? "Subcategory updated" : "Subcategory created");
                    resetForm();
                    router.refresh();
                    onUpdate();
                } else {
                    const data = await res.json();
                    toast.error(data.error || "Failed to save subcategory");
                }
            }
        } catch (error) {
            toast.error("Error occurred");
        }
    };

    const resetForm = () => {
        setName("");
        setSlug("");
        setDescription("");
        setCategoryId("");
        setSeo({ title: "", description: "", keywords: "" });
        setShowSEO(false);
        setEditingId(null);
    };

    const handleEdit = (sub: ISubcategory) => {
        setName(sub.name);
        setSlug(sub.slug);
        setDescription(sub.description || "");
        setCategoryId(typeof sub.categoryId === 'string' ? sub.categoryId : sub.categoryId._id);
        if (enableSEO) {
            setSeo({
                title: sub.seo?.title || "",
                description: sub.seo?.description || "",
                keywords: sub.seo?.keywords || ""
            });
        }
        setEditingId(sub._id);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            if (actions) {
                await actions.deleteSubcategory(id);
                toast.success("Subcategory deleted");
                router.refresh();
                onUpdate();
            } else if (endpoint) {
                const res = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
                if (res.ok) {
                    toast.success("Subcategory deleted");
                    router.refresh();
                    onUpdate();
                } else {
                    toast.error("Failed to delete subcategory");
                }
            }
        } catch (error) {
            toast.error("Error occurred");
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
            <div className="lg:col-span-1">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900">{editingId ? "Edit Subcategory" : "Add Subcategory"}</h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Parent Category</label>
                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                if (!editingId) setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, ""));
                            }}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                        <input
                            type="text"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            required
                        />
                    </div>

                    {enableSEO && (
                        <div className="border border-gray-100 rounded-lg overflow-hidden">
                            <button
                                type="button"
                                onClick={() => setShowSEO(!showSEO)}
                                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                            >
                                <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <span className="material-symbols-outlined text-[18px]">search</span>
                                    SEO Information
                                </span>
                                <span className={`material-symbols-outlined transition-transform duration-200 ${showSEO ? 'rotate-180' : ''}`}>
                                    keyboard_arrow_down
                                </span>
                            </button>

                            {showSEO && (
                                <div className="p-4 bg-white space-y-3 border-t border-gray-100 animate-slideDown">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Meta Title</label>
                                        <input
                                            type="text"
                                            value={seo.title}
                                            onChange={(e) => setSeo({ ...seo, title: e.target.value })}
                                            className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Meta Description</label>
                                        <textarea
                                            value={seo.description}
                                            onChange={(e) => setSeo({ ...seo, description: e.target.value })}
                                            className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                            rows={2}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Keywords</label>
                                        <input
                                            type="text"
                                            value={seo.keywords}
                                            onChange={(e) => setSeo({ ...seo, keywords: e.target.value })}
                                            className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex gap-2">
                        <button type="submit" className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                            {editingId ? "Update" : "Create"}
                        </button>
                        {editingId && (
                            <button type="button" onClick={resetForm} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="lg:col-span-2">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden text-sm">
                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider">Subcategory Details</th>
                                    <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider">Parent Category</th>
                                    <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 font-medium">
                                {subcategories.length === 0 ? (
                                    <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500">No subcategories found.</td></tr>
                                ) : (
                                    subcategories.map((sub) => (
                                        <tr key={sub._id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <p className="text-gray-900 font-bold">{sub.name}</p>
                                                <p className="text-xs text-gray-400 font-normal mt-0.5">{sub.slug}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2.5 py-1 text-xs font-semibold bg-blue-50 text-blue-700 rounded-full border border-blue-100">
                                                    {typeof sub.categoryId === 'object' && sub.categoryId !== null ? (sub.categoryId as any).name : 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => handleEdit(sub)} className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all">
                                                        <span className="material-symbols-outlined text-[20px]">edit</span>
                                                    </button>
                                                    <button onClick={() => handleDelete(sub._id)} className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all">
                                                        <span className="material-symbols-outlined text-[20px]">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}


