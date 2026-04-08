"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { getTeachers, deleteTeacher } from "@/actions/teachers";

interface ITeacher {
    _id: string;
    name: string;
    subject: string;
    status: string;
    categoryIds: {
        _id: string;
        name: string;
    }[];
    subcategoryId?: {
        _id: string;
        name: string;
    };
}

export default function TeachersPage() {
    const router = useRouter();
    const [teachers, setTeachers] = useState<ITeacher[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchTeachers = async () => {
        try {
            const data = await getTeachers();
            setTeachers(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch teachers", error);
            setTeachers([]);
            toast.error("Failed to load teachers");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this teacher?")) return;

        try {
            await deleteTeacher(id);
            toast.success("Teacher deleted successfully");
            router.refresh();
            fetchTeachers();
        } catch (error) {
            toast.error("An error occurred while deleting");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Faculty Members</h1>
                    <p className="text-gray-500 mt-1">Manage your faculty members and their profiles.</p>
                </div>
                <div className="flex gap-4">
                    <Link
                        href="/dashboard/teachers/categories"
                        className="px-5 py-2.5 border border-gray-200 rounded-xl text-gray-700 font-bold hover:bg-gray-50 transition-colors"
                    >
                        Categories
                    </Link>
                    <Link
                        href="/dashboard/teachers/new"
                        className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-[20px]">add</span>
                        Add New Teacher
                    </Link>
                </div>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                {isLoading ? (
                    <div className="p-12 flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                ) : !Array.isArray(teachers) || teachers.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="text-gray-400 mb-4">
                            <span className="material-symbols-outlined text-6xl">school</span>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No teachers found</h3>
                        <p className="text-gray-500">Get started by adding your first teacher.</p>
                    </div>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subcategory</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {teachers.map((teacher) => (
                                <tr key={teacher._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{teacher.subject}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {teacher.categoryIds && teacher.categoryIds.length > 0
                                                ? teacher.categoryIds.map(cat => cat.name).join(', ')
                                                : 'N/A'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{teacher.subcategoryId?.name || 'N/A'}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${teacher.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                            {teacher.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link href={`/dashboard/teachers/${teacher._id}/edit`} className="text-blue-600 hover:text-blue-900 mr-4">Edit</Link>
                                        <button onClick={() => handleDelete(teacher._id)} className="text-red-600 hover:text-red-900">Delete</button>
                                    </td>
                                </tr>
                            ))}
                            {teachers.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        No teachers found. Click &quot;Add New Teacher&quot; to get started.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

