"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { createAdmissionForm, updateAdmissionForm } from "@/actions/admission-actions";

interface FormField {
    label: string;
    name: string;
    type: string;
    required: boolean;
    options?: string[];
    placeholder?: string;
}

interface AdmissionFormBuilderProps {
    initialData?: any;
    onSuccess: () => void;
    onCancel: () => void;
}

const FIELD_TYPES = [
    { label: "Text", value: "text" },
    { label: "Number", value: "number" },
    { label: "Email", value: "email" },
    { label: "Phone", value: "tel" },
    { label: "Textarea", value: "textarea" },
    { label: "Select", value: "select" },
    { label: "Radio", value: "radio" },
    { label: "Checkbox", value: "checkbox" },
    { label: "Date", value: "date" },
    { label: "File Upload", value: "file" },
    { label: "Image Upload", value: "image" },
    { label: "Section Header", value: "header" },
    { label: "Helper Text", value: "subtext" },
];

export default function AdmissionFormBuilder({ initialData, onSuccess, onCancel }: AdmissionFormBuilderProps) {
    const [title, setTitle] = useState(initialData?.title || "");
    const [slug, setSlug] = useState(initialData?.slug || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [fields, setFields] = useState<FormField[]>(initialData?.fields || [
        { label: "Full Name", name: "fullName", type: "text", required: true, placeholder: "Enter full name" }
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleTitleChange = (val: string) => {
        setTitle(val);
        if (!initialData) {
            setSlug(val.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
        }
    };

    const addField = () => {
        setFields([...fields, { label: "", name: "", type: "text", required: false }]);
    };

    const removeField = (index: number) => {
        setFields(fields.filter((_, i) => i !== index));
    };

    const updateField = (index: number, updates: Partial<FormField>) => {
        const newFields = [...fields];
        newFields[index] = { ...newFields[index], ...updates };

        // Auto-generate name from label if name is empty and it's not a header/subtext
        if (updates.label && !newFields[index].name && !['header', 'subtext'].includes(newFields[index].type)) {
            newFields[index].name = updates.label.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
        }

        // For header and subtext, we can use a generic name if not set
        if (['header', 'subtext'].includes(newFields[index].type) && !newFields[index].name) {
            newFields[index].name = `${newFields[index].type}_${Date.now()}_${index}`;
        }

        setFields(newFields);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            toast.error("Please enter a form title");
            return;
        }
        if (!slug.trim()) {
            toast.error("Please enter a form slug");
            return;
        }
        if (fields.length === 0) {
            toast.error("Please add at least one field");
            return;
        }

        setIsSubmitting(true);
        const formData = { title, slug, description, fields };

        try {
            const result = initialData?._id
                ? await updateAdmissionForm(initialData._id, formData)
                : await createAdmissionForm(formData);

            if (result.success) {
                toast.success(`Form ${initialData ? "updated" : "created"} successfully`);
                onSuccess();
            } else {
                toast.error(result.error || "Operation failed");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl border border-slate-200">
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Form Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => handleTitleChange(e.target.value)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. Admission Form 2024"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Slug (URL Path)</label>
                        <div className="flex items-center">
                            <span className="bg-slate-50 border border-r-0 border-slate-300 px-3 py-2 rounded-l-lg text-slate-500 text-sm">/forms/</span>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))}
                                className="w-full px-4 py-2 border border-slate-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="standard-admission"
                                required
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Description (Optional)</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        rows={2}
                        placeholder="Briefly describe the purpose of this form"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-800">Form Fields</h3>
                    <button
                        type="button"
                        onClick={addField}
                        className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
                    >
                        + Add Field
                    </button>
                </div>

                {fields.map((field, index) => (
                    <div key={index} className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
                        <div className="flex justify-between items-start">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Field #{index + 1}</span>
                            <button
                                type="button"
                                onClick={() => removeField(index)}
                                className="text-red-400 hover:text-red-600"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">
                                    {(field.type === 'header' || field.type === 'subtext') ? 'Text Content' : 'Label'}
                                </label>
                                <input
                                    type="text"
                                    value={field.label}
                                    onChange={(e) => updateField(index, { label: e.target.value })}
                                    className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-sm outline-none"
                                    placeholder={field.type === 'header' ? "e.g. Academic Information" : "e.g. Current School"}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">Type</label>
                                <select
                                    value={field.type}
                                    onChange={(e) => updateField(index, { type: e.target.value })}
                                    className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-sm outline-none"
                                >
                                    {FIELD_TYPES.map(type => (
                                        <option key={type.value} value={type.value}>{type.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {(field.type === 'select' || field.type === 'radio' || field.type === 'checkbox') && (
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">Options (comma separated)</label>
                                <input
                                    type="text"
                                    value={field.options?.join(", ") || ""}
                                    onChange={(e) => updateField(index, { options: e.target.value.split(",").map(o => o.trim()).filter(o => o) })}
                                    className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-sm outline-none"
                                    placeholder="Option A, Option B, Option C"
                                />
                            </div>
                        )}

                        {!(field.type === 'header' || field.type === 'subtext') && (
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
                                    <input
                                        type="checkbox"
                                        checked={field.required}
                                        onChange={(e) => updateField(index, { required: e.target.checked })}
                                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    Required Field
                                </label>
                            </div>
                        )}
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addField}
                    className="w-full py-3 border-2 border-dashed border-slate-200 rounded-lg text-slate-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all font-medium flex items-center justify-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add Another Field
                </button>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t sticky bottom-0 bg-white pb-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                    {isSubmitting ? "Saving..." : initialData ? "Update Form" : "Create Form"}
                </button>
            </div>
        </form>
    );
}
