"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { getStudentRanks, deleteStudentRank } from "@/actions/student-ranks";
import Image from "next/image";

interface IStudentRank {
    _id: string;
    name: string;
    rank: string;
    description: string;
    image?: string;
    status: string;
    order: number;
    categoryId?: {
        _id: string;
        name: string;
    } | string;
}

export default function StudentRanksPage() {
    const router = useRouter();
    const [ranks, setRanks] = useState<IStudentRank[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchRanks = async () => {
        try {
            const data = await getStudentRanks();
            setRanks(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch student ranks", error);
            setRanks([]);
            toast.error("Failed to load student ranks");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRanks();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this student rank?")) return;

        try {
            await deleteStudentRank(id);
            toast.success("Student rank deleted successfully");
            fetchRanks();
        } catch (error) {
            toast.error("An error occurred while deleting");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Student Ranks</h1>
                    <p className="text-gray-500 mt-1">Manage top-performing students and their achievements.</p>
                </div>
                <div className="flex gap-4">
                    <Link
                        href="/dashboard/student-ranks/categories"
                        className="px-5 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-[20px]">category</span>
                        Manage Categories
                    </Link>
                    <Link
                        href="/dashboard/student-ranks/new"
                        className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-[20px]">add</span>
                        Add New Rank
                    </Link>
                </div>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                {isLoading ? (
                    <div className="p-12 flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                ) : ranks.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="text-gray-400 mb-4">
                            <span className="material-symbols-outlined text-6xl">grade</span>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No student ranks found</h3>
                        <p className="text-gray-500">Get started by adding your first student rank.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {ranks.map((rank) => (
                                    <tr key={rank._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0">
                                                    {rank.image ? (
                                                        <Image
                                                            src={rank.image}
                                                            alt={rank.name}
                                                            width={40}
                                                            height={40}
                                                            className="h-10 w-10 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                                                            <span className="material-symbols-outlined text-gray-400">person</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-bold text-gray-900">{rank.name}</div>
                                                    <div className="text-xs text-gray-500">
                                                        {typeof rank.categoryId === 'object' ? rank.categoryId.name : 'No Category'}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {rank.rank}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {rank.order}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${rank.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {rank.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3 flex items-center justify-end h-full">
                                            <Link
                                                href={`/dashboard/student-ranks/${rank._id}/edit`}
                                                className="text-blue-600 hover:text-blue-900 bg-blue-50 p-2 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <span className="material-symbols-outlined text-[20px] block">edit</span>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(rank._id)}
                                                className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <span className="material-symbols-outlined text-[20px] block">delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
