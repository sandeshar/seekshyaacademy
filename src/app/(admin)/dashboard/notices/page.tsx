"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { getNotices, deleteNotice } from "@/actions/notices";

interface INotice {
    _id: string;
    title: string;
    slug: string;
    categoryId: any;
    tag?: string;
    date: string;
    status: "active" | "inactive";
}

export default function NoticesAdmin() {
    const router = useRouter();
    const [notices, setNotices] = useState<INotice[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const data = await getNotices();
            setNotices(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch notices", error);
            setNotices([]);
            toast.error("Failed to load notices");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this notice?")) return;
        try {
            await deleteNotice(id);
            toast.success("Notice deleted");
            router.refresh();
            fetchNotices();
        } catch (error) {
            console.error("Failed to delete notice", error);
            toast.error("Network error");
        }
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="sticky top-0 z-30 flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 bg-gray-50/80 backdrop-blur-md border-b mb-6 -mx-4 px-4 sm:-mx-8 sm:px-8">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Notice Manager</h1>
                    <p className="text-gray-500 mt-1">Manage official announcements and updates.</p>
                </div>
                <Link
                    href="/dashboard/notices/new"
                    className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
                >
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    Create New Notice
                </Link>
            </div>

            <div className="bg-white border border-gray-100 shadow-xl shadow-gray-200/50 rounded-2xl overflow-hidden overflow-x-auto transition-all">
                <table className="w-full text-left font-medium text-sm">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="px-8 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Notice Details</th>
                            <th className="px-8 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-8 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-8 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {isLoading ? (
                            <tr><td colSpan={4} className="px-8 py-20 text-center">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
                                <p className="italic font-medium text-gray-500">Loading notices...</p>
                            </td></tr>
                        ) : notices.length === 0 ? (
                            <tr><td colSpan={4} className="px-8 py-20 text-center">
                                <div className="flex flex-col items-center gap-2 text-gray-400">
                                    <span className="material-symbols-outlined text-6xl">campaign</span>
                                    <p className="font-medium">No notices found. Start by creating one!</p>
                                </div>
                            </td></tr>
                        ) : (
                            notices.map((notice) => (
                                <tr key={notice._id} className="hover:bg-gray-50/80 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2">
                                            <p className="text-gray-900 font-bold group-hover:text-blue-600 transition-colors">{notice.title}</p>
                                        </div>
                                        <p className="text-xs text-gray-400 font-normal mt-0.5">
                                            {new Date(notice.date).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                            {notice.tag && ` • ${notice.tag}`}
                                        </p>
                                    </td>
                                    <td className="px-8 py-5 text-gray-600">
                                        <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold uppercase tracking-wide">
                                            {typeof notice.categoryId === 'object' && notice.categoryId !== null ? (notice.categoryId as any).name : 'Uncategorized'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${notice.status === "active"
                                            ? "bg-green-50 text-green-700 border-green-100"
                                            : "bg-red-50 text-red-700 border-red-100"
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${notice.status === "active" ? "bg-green-600" : "bg-red-600"}`}></span>
                                            {notice.status === "active" ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-right space-x-2">
                                        <Link href={`/dashboard/notices/${notice._id}/edit`} className="text-blue-600 hover:text-blue-900 font-bold">Edit</Link>
                                        <button onClick={() => handleDelete(notice._id)} className="text-red-500 hover:text-red-700 font-bold">Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
