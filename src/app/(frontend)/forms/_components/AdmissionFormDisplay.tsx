"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { submitAdmissionForm } from "@/actions/admission-actions";

interface Field {
    label: string;
    name: string;
    type: string;
    required: boolean;
    options?: string[];
    placeholder?: string;
}

interface AdmissionFormDisplayProps {
    form: {
        _id: string;
        title: string;
        description?: string;
        fields: Field[];
    };
}

export default function AdmissionFormDisplay({ form }: AdmissionFormDisplayProps) {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (name: string, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = async (name: string, file: File | null) => {
        if (!file) {
            handleChange(name, null);
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/admissions/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.url) {
                handleChange(name, data.url);
            } else {
                toast.error("Upload failed");
            }
        } catch (error) {
            toast.error("Error uploading file");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const result = await submitAdmissionForm(form._id, formData);
            if (result.success) {
                toast.success("Admission application submitted successfully!");
                setIsSubmitted(true);
            } else {
                toast.error(result.error || "Submission failed. Please try again.");
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-12 text-center shadow-sm">
                <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Application Submitted!</h2>
                <p className="text-slate-600">Thank you for applying to Seekshya Academy. We have received your application and will contact you soon.</p>
                <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 text-emerald-600 font-semibold hover:underline"
                >
                    Submit another application
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="bg-primary/5 p-8 md:p-10 border-b border-slate-100">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{form.title}</h2>
                {form.description && (
                    <p className="text-slate-600 mt-2">{form.description}</p>
                )}
            </div>

            <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {form.fields.map((field, idx) => {
                        const isFullWidth = field.type === 'textarea' || field.type === 'checkbox' || field.type === 'radio' || field.type === 'header' || field.type === 'subtext';

                        if (field.type === 'header') {
                            return (
                                <div key={idx} className="md:col-span-2 pt-6 pb-2 border-b border-slate-100 mb-2">
                                    <h3 className="text-xl font-bold text-slate-800">{field.label}</h3>
                                </div>
                            );
                        }

                        if (field.type === 'subtext') {
                            return (
                                <div key={idx} className="md:col-span-2 text-slate-500 text-sm -mt-4 mb-2">
                                    {field.label}
                                </div>
                            );
                        }

                        return (
                            <div key={idx} className={isFullWidth ? "md:col-span-2" : ""}>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    {field.label} {field.required && <span className="text-red-500">*</span>}
                                </label>

                                {field.type === 'textarea' ? (
                                    <textarea
                                        required={field.required}
                                        placeholder={field.placeholder}
                                        onChange={(e) => handleChange(field.name, e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all min-h-[120px]"
                                    />
                                ) : field.type === 'select' ? (
                                    <select
                                        required={field.required}
                                        onChange={(e) => handleChange(field.name, e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%20stroke%3D%22currentColor%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22M6%208l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat"
                                    >
                                        <option value="">Select an option</option>
                                        {field.options?.map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                ) : field.type === 'radio' ? (
                                    <div className="flex flex-wrap gap-3 mt-1">
                                        {field.options?.map(opt => (
                                            <label key={opt} className={`flex-1 min-w-[140px] flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${formData[field.name] === opt
                                                ? 'bg-primary/5 border-primary ring-1 ring-primary'
                                                : 'bg-white border-slate-200 hover:border-slate-300'
                                                }`}>
                                                <input
                                                    type="radio"
                                                    name={field.name}
                                                    value={opt}
                                                    required={field.required}
                                                    checked={formData[field.name] === opt}
                                                    onChange={(e) => handleChange(field.name, e.target.value)}
                                                    className="w-5 h-5 border-slate-300 text-primary focus:ring-primary/20"
                                                />
                                                <span className={`text-sm font-medium transition-colors ${formData[field.name] === opt ? 'text-primary' : 'text-slate-600'
                                                    }`}>{opt}</span>
                                            </label>
                                        ))}
                                    </div>
                                ) : field.type === 'checkbox' ? (
                                    <div className="flex flex-wrap gap-3 mt-1">
                                        {field.options?.map(opt => {
                                            const isChecked = (formData[field.name] || []).includes(opt);
                                            return (
                                                <label key={opt} className={`flex-1 min-w-[140px] flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${isChecked
                                                    ? 'bg-primary/5 border-primary ring-1 ring-primary'
                                                    : 'bg-white border-slate-200 hover:border-slate-300'
                                                    }`}>
                                                    <input
                                                        type="checkbox"
                                                        value={opt}
                                                        checked={isChecked}
                                                        onChange={(e) => {
                                                            const current = formData[field.name] || [];
                                                            const newValue = e.target.checked
                                                                ? [...current, opt]
                                                                : current.filter((v: string) => v !== opt);
                                                            handleChange(field.name, newValue);
                                                        }}
                                                        className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary/20"
                                                    />
                                                    <span className={`text-sm font-medium transition-colors ${isChecked ? 'text-primary' : 'text-slate-600'
                                                        }`}>{opt}</span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                ) : field.type === 'file' || field.type === 'image' ? (
                                    <div className="space-y-3">
                                        <div className={`relative border-2 border-dashed rounded-xl p-6 transition-all ${formData[field.name] ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 hover:border-primary/30'
                                            }`}>
                                            <input
                                                type="file"
                                                accept={field.type === 'image' ? "image/*" : "*/*"}
                                                required={field.required && !formData[field.name]}
                                                onChange={(e) => handleFileChange(field.name, e.target.files?.[0] || null)}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            />
                                            <div className="text-center">
                                                {formData[field.name] ? (
                                                    <div className="flex flex-col items-center">
                                                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </div>
                                                        <p className="text-sm font-medium text-emerald-700">File Uploaded</p>
                                                        <p className="text-xs text-emerald-500 mt-1 truncate max-w-[200px]">{formData[field.name].split('/').pop()}</p>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center">
                                                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-primary/10 transition-colors">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                            </svg>
                                                        </div>
                                                        <p className="text-sm font-medium text-slate-600">Click to upload {field.type}</p>
                                                        <p className="text-xs text-slate-400 mt-1">Maximum file size: 5MB</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {field.type === 'image' && formData[field.name] && (
                                            <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-slate-200">
                                                <img src={formData[field.name]} alt="Preview" className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => handleChange(field.name, null)}
                                                    className="absolute top-1 right-1 bg-white/80 hover:bg-white text-red-500 rounded-full p-1 shadow-sm"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <input
                                        type={field.type}
                                        required={field.required}
                                        placeholder={field.placeholder}
                                        onChange={(e) => handleChange(field.name, e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="pt-6">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full md:w-auto px-10 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all transform hover:-translate-y-1 shadow-lg shadow-primary/20 disabled:opacity-70 disabled:transform-none"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </span>
                        ) : "Submit Application"}
                    </button>
                </div>
            </form>
        </div>
    );
}
