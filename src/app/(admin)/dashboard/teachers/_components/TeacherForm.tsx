"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { createTeacher, updateTeacher, getTeacherById } from "@/actions/teachers";
import { getTeacherCategories, getTeacherSubcategories } from "@/actions/categories";
import IconChooser from "../../_components/IconChooser";
import ImageUploader from "../../_components/ImageUploader";

interface ITeacherFormProps {
    id?: string;
}

export default function TeacherForm({ id }: ITeacherFormProps) {
    const router = useRouter();
    const isEditing = !!id;

    const [categories, setCategories] = useState<any[]>([]);
    const [subcategories, setSubcategories] = useState<any[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        qualifications: "",
        subject: "",
        image: "",
        quote: "",
        badge: "",
        badgeIcon: "",
        categoryIds: [] as string[],
        subcategoryId: "",
        status: "active",
        order: 0
    });

    useEffect(() => {
        fetchCategories();
        if (isEditing) {
            fetchTeacher();
        }
    }, [isEditing]);

    const fetchCategories = async () => {
        const data = await getTeacherCategories();
        setCategories(data);
    };

    const fetchSubcategories = async (catId: string) => {
        const data = await getTeacherSubcategories(catId);
        setSubcategories(data);
    };

    const fetchTeacher = async () => {
        if (!id) return;
        const data = await getTeacherById(id);
        setFormData({
            ...data,
            categoryIds: data.categoryIds?.map((cat: any) => cat._id || cat) || [],
            subcategoryId: data.subcategoryId?._id || data.subcategoryId
        });
        if (data.categoryIds?.length > 0) {
            const firstCatId = data.categoryIds[0]?._id || data.categoryIds[0];
            fetchSubcategories(firstCatId);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Create a clean payload without metadata
        const { _id, __v, createdAt, updatedAt, ...payload } = formData as any;
        if (!payload.subcategoryId) delete payload.subcategoryId;

        try {
            if (isEditing && id) {
                await updateTeacher(id, payload);
                toast.success("Teacher updated successfully");
            } else {
                await createTeacher(payload);
                toast.success("Teacher created successfully");
            }
            router.push("/dashboard/teachers");
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCategoryChange = (catId: string) => {
        let newCategoryIds = [...formData.categoryIds];
        if (newCategoryIds.includes(catId)) {
            newCategoryIds = newCategoryIds.filter(id => id !== catId);
        } else {
            newCategoryIds.push(catId);
        }
        setFormData(prev => ({ ...prev, categoryIds: newCategoryIds, subcategoryId: "" }));
        if (newCategoryIds.length > 0) fetchSubcategories(newCategoryIds[0]);
        else setSubcategories([]);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setFormData(prev => ({
            ...prev,
            name,
            slug: isEditing ? prev.slug : name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleNameChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base py-2.5 px-4"
                        placeholder="e.g. CA. राजेश शर्मा"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Slug</label>
                    <input
                        type="text"
                        required
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base py-2.5 px-4"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Qualifications</label>
                    <input
                        type="text"
                        required
                        value={formData.qualifications}
                        onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base py-2.5 px-4"
                        placeholder="e.g. FCA, LLB"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Subject</label>
                    <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base py-2.5 px-4"
                        placeholder="e.g. Corporate Law"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Categories (One or more)</label>
                    <div className="grid grid-cols-2 gap-2 border rounded-md p-3 max-h-48 overflow-y-auto bg-gray-50">
                        {categories.map(cat => (
                            <label key={cat._id} className="flex items-center space-x-2 text-sm cursor-pointer hover:text-blue-600">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    checked={formData.categoryIds.includes(cat._id)}
                                    onChange={() => handleCategoryChange(cat._id)}
                                />
                                <span>{cat.name}</span>
                            </label>
                        ))}
                    </div>
                    {formData.categoryIds.length === 0 && (
                        <p className="text-red-500 text-xs mt-1">Please select at least one category</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Primary Subcategory (Optional)</label>
                    <select
                        value={formData.subcategoryId}
                        onChange={(e) => setFormData({ ...formData, subcategoryId: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base py-2.5 px-4"
                        disabled={formData.categoryIds.length === 0}
                    >
                        <option value="">None</option>
                        {subcategories.map(sub => (
                            <option key={sub._id} value={sub._id}>{sub.name}</option>
                        ))}
                    </select>
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
                <div>
                    <ImageUploader
                        label="Profile Image"
                        value={formData.image}
                        onChange={(url) => setFormData({ ...formData, image: url })}
                        description="Professional faculty photo"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Order</label>
                    <input
                        type="number"
                        value={formData.order}
                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base py-2.5 px-4"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Quote / Bio</label>
                    <textarea
                        value={formData.quote}
                        onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base py-2.5 px-4"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Badge (Optional)</label>
                        <input
                            type="text"
                            value={formData.badge}
                            onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base py-2.5 px-4"
                            placeholder="e.g. Senior Faculty"
                        />
                    </div>
                    <div>
                        <IconChooser
                            label="Badge Icon"
                            value={formData.badgeIcon}
                            onChange={(icon) => setFormData({ ...formData, badgeIcon: icon })}
                        />
                        <p className="text-[11px] text-gray-400 mt-1">Select from library or type Material icon name</p>
                    </div>
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
                    {isSubmitting ? "Saving..." : isEditing ? "Update Teacher" : "Create Teacher"}
                </button>
            </div>
        </form>
    );
}


