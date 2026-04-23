"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { getAdmissionForms, toggleFormStatus, deleteAdmissionForm } from "@/actions/admission-actions";
import AdmissionFormBuilder from "./_components/AdmissionFormBuilder";
import Link from "next/link";

export default function AdmissionManagement() {
    const [forms, setForms] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showBuilder, setShowBuilder] = useState(false);
    const [editingForm, setEditingForm] = useState<any | null>(null);

    useEffect(() => {
        fetchForms();
    }, []);

    const fetchForms = async () => {
        setIsLoading(true);
        try {
            const data = await getAdmissionForms();
            setForms(data);
        } catch (error) {
            toast.error("Failed to load admission forms");
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            const result = await toggleFormStatus(id, !currentStatus);
            if (result.success) {
                toast.success(`Form ${!currentStatus ? 'activated' : 'deactivated'}`);
                setForms(prev => prev.map(f => f._id === id ? { ...f, isActive: !currentStatus } : f));
            } else {
                toast.error(result.error || "Action failed");
            }
        } catch (error) {
            toast.error("An error occurred");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure? This will also delete all submissions for this form.")) return;
        try {
            const result = await deleteAdmissionForm(id);
            if (result.success) {
                toast.success("Form deleted");
                setForms(prev => prev.filter(f => f._id !== id));
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            toast.error("Failed to delete form");
        }
    };

    const startEditing = (form: any) => {
        setEditingForm(form);
        setShowBuilder(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Admission Forms</h1>
                    <p className="text-slate-500 mt-1">Create and manage customized admission forms for students.</p>
                </div>
                {!showBuilder && (
                    <div className="flex gap-3">
                        <Link
                            href="/dashboard/admissions/submissions"
                            className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-medium shadow-sm"
                        >
                            View Submissions
                        </Link>
                        <button
                            onClick={() => setShowBuilder(true)}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-medium shadow-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Create New Form
                        </button>
                    </div>
                )}
            </div>

            {showBuilder ? (
                <div className="animate-in fade-in duration-300">
                    <div className="flex items-center gap-3 mb-6">
                        <button
                            onClick={() => { setShowBuilder(false); setEditingForm(null); }}
                            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </button>
                        <h2 className="text-xl font-semibold text-slate-800">
                            {editingForm ? `Edit Form: ${editingForm.title}` : "Create New Admission Form"}
                        </h2>
                    </div>
                    <AdmissionFormBuilder
                        initialData={editingForm}
                        onSuccess={() => { setShowBuilder(false); setEditingForm(null); fetchForms(); }}
                        onCancel={() => { setShowBuilder(false); setEditingForm(null); }}
                    />
                </div>
            ) : isLoading ? (
                <div className="flex items-center justify-center p-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : forms.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-20 text-center">
                    <div className="mx-auto w-16 h-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800">No forms created yet</h3>
                    <p className="text-slate-500 mt-2 mb-8">Start by creating your first admission form to enroll students.</p>
                    <button
                        onClick={() => setShowBuilder(true)}
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-medium shadow-md shadow-blue-500/20"
                    >
                        + Create Your First Form
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {forms.map((form) => (
                        <div key={form._id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${form.isActive
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                        : 'bg-slate-50 text-slate-500 border-slate-200'
                                    }`}>
                                    {form.isActive ? 'Active' : 'Inactive'}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => startEditing(form)}
                                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Edit Form"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.707.707-2.828-2.828.707-.707zM11.314 5.858L2 15.172V18h2.828l9.314-9.314-2.828-2.828z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(form._id)}
                                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete Form"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{form.title}</h3>
                            <p className="text-slate-500 text-sm mt-2 line-clamp-2 min-h-[2.5rem]">{form.description || "No description provided."}</p>

                            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                                <span className="text-sm text-slate-400 italic">
                                    {form.fields?.length || 0} fields
                                </span>
                                <button
                                    onClick={() => handleToggleStatus(form._id, form.isActive)}
                                    className={`text-sm font-medium ${form.isActive ? 'text-slate-400 hover:text-slate-600' : 'text-blue-600 hover:text-blue-700'}`}
                                >
                                    {form.isActive ? 'Deactivate' : 'Activate Form'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
