"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { getAdmissionSubmissions, updateSubmissionStatus, deleteSubmission, getAdmissionForms } from "@/actions/admission-actions";
import Link from "next/link";
import "./print.css";

export default function AdmissionSubmissions() {
    const [submissions, setSubmissions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedSubmission, setSelectedSubmission] = useState<any | null>(null);
    const [forms, setForms] = useState<any[]>([]);
    const [selectedFormFilter, setSelectedFormFilter] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchSubmissions();
        fetchForms();
    }, []);

    const fetchForms = async () => {
        const data = await getAdmissionForms();
        setForms(data);
    };

    const fetchSubmissions = async () => {
        setIsLoading(true);
        try {
            const data = await getAdmissionSubmissions();
            setSubmissions(data);
        } catch (error) {
            toast.error("Failed to load submissions");
        } finally {
            setIsLoading(false);
        }
    };

    const filteredSubmissions = submissions.filter(s => {
        const matchesForm = selectedFormFilter === "all" || s.formId?._id === selectedFormFilter;
        if (!matchesForm) return false;

        if (!searchQuery.trim()) return true;

        const query = searchQuery.toLowerCase();
        // Search in submission data values
        const dataMatch = Object.values(s.data || {}).some(val =>
            String(val).toLowerCase().includes(query)
        );

        // Search in form title
        const formMatch = s.formId?.title?.toLowerCase().includes(query);

        return dataMatch || formMatch;
    });

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        try {
            const result = await updateSubmissionStatus(id, newStatus);
            if (result.success) {
                toast.success(`Status updated to ${newStatus}`);
                setSubmissions(prev => prev.map(s => s._id === id ? { ...s, status: newStatus } : s));
                if (selectedSubmission?._id === id) {
                    setSelectedSubmission({ ...selectedSubmission, status: newStatus });
                }
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure? This cannot be undone.")) return;
        try {
            const result = await deleteSubmission(id);
            if (result.success) {
                toast.success("Submission deleted");
                setSubmissions(prev => prev.filter(s => s._id !== id));
                if (selectedSubmission?._id === id) setSelectedSubmission(null);
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            toast.error("Failed to delete");
        }
    };

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'reviewed': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'accepted': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
            case 'archived': return 'bg-slate-100 text-slate-600 border-slate-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Form Submissions</h1>
                    <p className="text-slate-500 mt-1">Review and manage student admission applications.</p>
                </div>
                <Link
                    href="/dashboard/admissions"
                    className="inline-flex items-center px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-all font-medium"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Forms
                </Link>
            </div>

            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200">
                <div className="flex-1 relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search by student name, phone, or any field..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Filter:</label>
                    <select
                        value={selectedFormFilter}
                        onChange={(e) => setSelectedFormFilter(e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                    >
                        <option value="all">All Forms</option>
                        {forms.map(f => (
                            <option key={f._id} value={f._id}>{f.title}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* List View */}
                <div className={`flex-1 transition-all ${selectedSubmission ? 'hidden lg:block lg:w-1/3' : 'w-full'}`}>
                    {isLoading ? (
                        <div className="flex items-center justify-center p-20 bg-white border border-slate-200 rounded-2xl">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                        </div>
                    ) : filteredSubmissions.length === 0 ? (
                        <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-20 text-center">
                            <p className="text-slate-500">No submissions found for the selected filter.</p>
                        </div>
                    ) : (
                        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50 border-b border-slate-100">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Student Name</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Form</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {filteredSubmissions.map((sub) => {
                                            // Extract a potential name from common field keys
                                            const studentName = sub.data?.fullName || sub.data?.full_name || sub.data?.name || sub.data?.student_name || "N/A";

                                            return (
                                                <tr
                                                    key={sub._id}
                                                    onClick={() => setSelectedSubmission(sub)}
                                                    className={`cursor-pointer hover:bg-blue-50/50 transition-colors ${selectedSubmission?._id === sub._id ? 'bg-blue-50' : ''}`}
                                                >
                                                    <td className="px-6 py-4">
                                                        <span className="text-sm font-bold text-slate-900 line-clamp-1">{studentName}</span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">
                                                        {new Date(sub.createdAt).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-sm font-medium text-slate-900 line-clamp-1">{sub.formId?.title || 'Unknown Form'}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusStyles(sub.status)}`}>
                                                            {sub.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                {/* Details View */}
                {selectedSubmission && (
                    <div className="w-full lg:w-2/3 animate-in slide-in-from-right-4 duration-300 submissions-details-container">
                        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg sticky top-6 print:static print:border-none print:shadow-none">
                            <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Submission Details</h2>
                                    <p className="text-sm text-slate-500 mt-1">
                                        Received on {new Date(selectedSubmission.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => window.print()}
                                        className="p-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl transition-all flex items-center gap-2 px-4 py-2 font-semibold text-sm mr-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                        </svg>
                                        Print
                                    </button>
                                    <button
                                        onClick={() => setSelectedSubmission(null)}
                                        className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all flex items-center gap-2 px-4 py-2 font-semibold text-sm"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                        Close
                                    </button>
                                </div>
                            </div>

                            <div className="p-6 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                                    {Object.entries(selectedSubmission.data).map(([key, value]: [string, any]) => (
                                        <div key={key}>
                                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{key.replace(/_/g, ' ')}</label>
                                            <div className="text-slate-800 font-medium break-words">
                                                {typeof value === 'string' && (value.endsWith('.jpg') || value.endsWith('.png') || value.endsWith('.jpeg') || value.endsWith('.webp') || value.startsWith('/uploads/')) ? (
                                                    <div className="space-y-2">
                                                        {(value.match(/\.(jpg|jpeg|png|webp)$|admissions/i)) ? (
                                                            <div className="relative group">
                                                                <img
                                                                    src={value}
                                                                    alt={key}
                                                                    className="max-w-xs rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-zoom-in"
                                                                    onClick={() => window.open(value, '_blank')}
                                                                />
                                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 rounded-lg transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                                                                    <span className="bg-white/90 px-3 py-1 rounded-full text-xs font-bold shadow-sm">View Full Image</span>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <a
                                                                href={value}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:underline bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 transition-all"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                </svg>
                                                                View Document
                                                            </a>
                                                        )}
                                                    </div>
                                                ) : typeof value === 'boolean' ? (
                                                    value ? 'Yes' : 'No'
                                                ) : (
                                                    value || '-'
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-8 border-t border-slate-100">
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Set Status</label>
                                    <div className="flex flex-wrap gap-2">
                                        {['pending', 'reviewed', 'accepted', 'rejected', 'archived'].map((status) => (
                                            <button
                                                key={status}
                                                onClick={() => handleStatusUpdate(selectedSubmission._id, status)}
                                                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${selectedSubmission.status === status
                                                        ? getStatusStyles(status)
                                                        : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50'
                                                    }`}
                                            >
                                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end">
                                    <button
                                        onClick={() => handleDelete(selectedSubmission._id)}
                                        className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Delete Submission
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
