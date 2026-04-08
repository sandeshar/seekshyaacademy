"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { getContactSubmissions, updateSubmissionStatus, deleteSubmission, getContactStats } from "@/actions/contact-actions";

interface IContactSubmission {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    course: string;
    message: string;
    status: 'pending' | 'reviewed' | 'responded' | 'archived';
    createdAt: string;
}

export default function ContactManagement() {
    const router = useRouter();
    const [submissions, setSubmissions] = useState<IContactSubmission[]>([]);
    const [stats, setStats] = useState({ total: 0, pending: 0, responded: 0, archived: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [selectedSubmission, setSelectedSubmission] = useState<IContactSubmission | null>(null);
    const [showArchived, setShowArchived] = useState(false);

    useEffect(() => {
        fetchSubmissions();
        fetchStats();
    }, []);

    const fetchSubmissions = async () => {
        try {
            const data = await getContactSubmissions();
            setSubmissions(data);
        } catch (error) {
            toast.error("Failed to fetch contact inquiries");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const data = await getContactStats();
            setStats(data);
        } catch (error) {
            console.error("Failed to fetch stats");
        }
    };

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        try {
            const result = await updateSubmissionStatus(id, newStatus);
            if (result.success) {
                toast.success(`Status updated to ${newStatus}`);
                router.refresh();
                fetchSubmissions();
                fetchStats();
                if (selectedSubmission && selectedSubmission._id === id) {
                    setSelectedSubmission({ ...selectedSubmission, status: newStatus as any });
                }
            } else {
                toast.error(result.error || "Update failed");
            }
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure? This action cannot be undone.")) return;
        try {
            const result = await deleteSubmission(id);
            if (result.success) {
                toast.success("Submission deleted");
                router.refresh();
                fetchSubmissions();
            } else {
                toast.error(result.error || "Delete failed");
            }
        } catch (error) {
            toast.error("Failed to delete submission");
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'reviewed': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'responded': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'archived': return 'bg-slate-100 text-slate-600 border-slate-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const filteredSubmissions = submissions.filter(sub =>
        showArchived ? sub.status === 'archived' : sub.status !== 'archived'
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Contact Inquiries</h1>
                    <p className="text-gray-500 mt-1">Manage and respond to sender inquiries from the website.</p>
                </div>
                <div className="flex bg-gray-100 p-1 rounded-xl w-fit">
                    <button
                        onClick={() => setShowArchived(false)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${!showArchived ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Active
                    </button>
                    <button
                        onClick={() => setShowArchived(true)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${showArchived ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Archived
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Total', value: stats.total, icon: 'inventory_2', color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Pending', value: stats.pending, icon: 'pending_actions', color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'Responded', value: stats.responded, icon: 'mark_email_read', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Archived', value: stats.archived, icon: 'archive', color: 'text-slate-600', bg: 'bg-slate-50' },
                ].map((s, i) => (
                    <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className={`${s.bg} ${s.color} p-3 rounded-xl`}>
                            <span className="material-symbols-outlined">{s.icon}</span>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{s.label}</p>
                            <p className="text-xl font-black text-gray-900">{s.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : filteredSubmissions.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
                    <span className="material-symbols-outlined text-[64px] text-gray-300 mb-4">
                        {showArchived ? 'archive' : 'mail_outline'}
                    </span>
                    <h2 className="text-xl font-bold text-gray-900">
                        {showArchived ? 'No Archived Inquiries' : 'No Active Inquiries Yet'}
                    </h2>
                    <p className="text-gray-500 mt-2">
                        {showArchived
                            ? 'Archived messages will show up here.'
                            : 'When senders contact you via the form, they will appear here.'}
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Sender</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Course</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 text-sm">
                                {filteredSubmissions.map((sub) => (
                                    <tr key={sub._id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-900">{sub.fullName}</div>
                                            <div className="text-gray-500 text-xs">{sub.email}</div>
                                            <div className="text-gray-500 text-xs">{sub.phone}</div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                                            {formatDate(sub.createdAt)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-xs font-medium border border-slate-200 capitalize">
                                                {sub.course.replace('-', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(sub.status)}`}>
                                                {sub.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => setSelectedSubmission(sub)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="View Message"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                                                </button>
                                                <select
                                                    value={sub.status}
                                                    onChange={(e) => handleStatusUpdate(sub._id, e.target.value)}
                                                    className="text-xs border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                >
                                                    <option value="pending">Mark Pending</option>
                                                    <option value="reviewed">Mark Reviewed</option>
                                                    <option value="responded">Mark Responded</option>
                                                    <option value="archived">Mark Archived</option>
                                                </select>
                                                <button
                                                    onClick={() => handleDelete(sub._id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Modal for viewing message content */}
            {selectedSubmission && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-scaleIn">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h2 className="text-xl font-black text-gray-900 tracking-tight">Inquiry Details</h2>
                                <p className="text-slate-500 text-sm mt-0.5">Submitted on {formatDate(selectedSubmission.createdAt)}</p>
                            </div>
                            <button
                                onClick={() => setSelectedSubmission(null)}
                                className="p-2 hover:bg-white rounded-full transition-colors text-slate-400 hover:text-slate-600 border border-transparent hover:border-slate-100"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1.5 font-display">Sender</label>
                                    <p className="text-slate-900 font-semibold">{selectedSubmission.fullName}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1.5 font-display">Interested Course</label>
                                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-100 capitalize">
                                        {selectedSubmission.course.replace('-', ' ')}
                                    </span>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1.5 font-display">Email Address</label>
                                    <p className="text-slate-600 select-all">{selectedSubmission.email}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1.5 font-display">Phone Number</label>
                                    <p className="text-slate-600 select-all">{selectedSubmission.phone}</p>
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1.5 font-display">Message Content</label>
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-slate-700 whitespace-pre-wrap leading-relaxed shadow-inner">
                                    {selectedSubmission.message}
                                </div>
                            </div>
                        </div>
                        <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex flex-wrap justify-between items-center gap-4">
                            <div className="flex items-center gap-3">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest font-display">Update Status:</label>
                                <select
                                    value={selectedSubmission.status}
                                    onChange={(e) => handleStatusUpdate(selectedSubmission._id, e.target.value)}
                                    className="text-xs border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="reviewed">Reviewed</option>
                                    <option value="responded">Responded</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setSelectedSubmission(null)}
                                    className="px-6 py-2.5 rounded-xl font-bold text-sm bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all hover:shadow-md"
                                >
                                    Close
                                </button>
                                {selectedSubmission.status !== 'archived' && (
                                    <button
                                        onClick={() => handleStatusUpdate(selectedSubmission._id, 'archived')}
                                        className="px-6 py-2.5 rounded-xl font-bold text-sm bg-slate-600 text-white hover:bg-slate-700 transition-all shadow-lg shadow-slate-200 flex items-center gap-2"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">archive</span>
                                        Archive
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
