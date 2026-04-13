"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { createStudentRank, updateStudentRank, getStudentRankById } from "@/actions/student-ranks";
import ImageUploader from "../../_components/ImageUploader";

interface IStudentRankFormProps {
    id?: string;
}

export default function StudentRankForm({ id }: IStudentRankFormProps) {
    const router = useRouter();
    const isEditing = !!id;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(isEditing);

    const [formData, setFormData] = useState({
        name: "",
        rank: "",
        description: "",
        image: "",
        status: "active",
        order: 0
    });

    useEffect(() => {
        if (isEditing) {
            fetchStudentRank();
        }
    }, [isEditing]);

    const fetchStudentRank = async () => {
        if (!id) return;
        try {
            const data = await getStudentRankById(id);
            setFormData({
                name: data.name || "",
                rank: data.rank || "",
                description: data.description || "",
                image: data.image || "",
                status: data.status || "active",
                order: data.order || 0
            });
        } catch (error) {
            toast.error("Failed to fetch student rank data");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (isEditing && id) {
                await updateStudentRank(id, formData);
                toast.success("Student rank updated successfully");
            } else {
                await createStudentRank(formData);
                toast.success("Student rank created successfully");
            }
            router.push("/dashboard/student-ranks");
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center p-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Student Name</label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base py-2.5 px-4 border"
                        placeholder="e.g. John Doe"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Rank / Achievement</label>
                    <input
                        type="text"
                        required
                        value={formData.rank}
                        onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base py-2.5 px-4 border"
                        placeholder="e.g. AIR 1, Distinction, etc."
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Order</label>
                    <input
                        type="number"
                        value={formData.order}
                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base py-2.5 px-4 border"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base py-2.5 px-4 border"
                        placeholder="Brief description about the student's achievement..."
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Student Image</label>
                    <ImageUploader
                        value={formData.image}
                        onChange={(url) => setFormData({ ...formData, image: url })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base py-2.5 px-4 border"
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-end pt-6">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-50"
                >
                    {isSubmitting ? "Saving..." : (isEditing ? "Update Rank" : "Create Rank")}
                </button>
            </div>
        </form>
    );
}
