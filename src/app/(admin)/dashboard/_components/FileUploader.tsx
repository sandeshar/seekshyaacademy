"use client";

import { useState, useRef } from "react";
import { toast } from "react-hot-toast";

interface FileUploaderProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
    description?: string;
    accept?: string;
}

export default function FileUploader({
    value,
    onChange,
    label,
    description,
    accept = ".pdf,.doc,.docx,.xls,.xlsx,.zip"
}: FileUploaderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<"upload" | "url">("upload");
    const [urlInput, setUrlInput] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Basic validation
        if (file.size > 10 * 1024 * 1024) { // 10MB limit
            toast.error("File size should be less than 10MB");
            return;
        }

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("/api/media/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to upload file");
            }

            onChange(data.url);
            setIsOpen(false);
            setIsUploading(false);
            toast.success("File uploaded successfully");
        } catch (error: any) {
            console.error("Upload error:", error);
            toast.error(error.message || "Failed to upload file");
            setIsUploading(false);
        }
    };

    const handleUrlSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!urlInput.trim()) return;
        onChange(urlInput);
        setIsOpen(false);
        setUrlInput("");
        toast.success("File URL updated");
    };

    const removeFile = () => {
        onChange("");
        toast.success("File removed");
    };

    const getFileName = (url: string) => {
        if (!url) return "";
        try {
            const parts = url.split("/");
            return decodeURIComponent(parts[parts.length - 1]);
        } catch {
            return url;
        }
    };

    const getFileIcon = (url: string) => {
        const ext = url.split(".").pop()?.toLowerCase();
        if (ext === "pdf") return "picture_as_pdf";
        if (["doc", "docx"].includes(ext || "")) return "description";
        if (["xls", "xlsx"].includes(ext || "")) return "table_chart";
        if (["zip", "rar"].includes(ext || "")) return "archive";
        return "draft";
    };

    return (
        <div className="space-y-1.5 min-w-0">
            {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}

            <div className="flex items-center gap-3 w-full">
                {value ? (
                    <div className="flex-1 min-w-0 flex items-center gap-3 p-3 border border-gray-200 rounded-xl bg-gray-50 group overflow-hidden">
                        <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-blue-600 shrink-0">
                            <span className="material-symbols-outlined">{getFileIcon(value)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-900 truncate" title={getFileName(value)}>{getFileName(value)}</p>
                            <a href={value} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:text-blue-700 font-medium truncate block">View File</a>
                        </div>
                        <button
                            type="button"
                            onClick={removeFile}
                            className="w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 shrink-0"
                        >
                            <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => setIsOpen(true)}
                        className="flex-1 flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-500 hover:border-blue-400 hover:bg-blue-50/30 hover:text-blue-600 transition-all group"
                    >
                        <span className="material-symbols-outlined group-hover:scale-110 transition-transform">cloud_upload</span>
                        <span className="text-sm font-bold">Upload Document</span>
                    </button>
                )}

                {value && (
                    <button
                        type="button"
                        onClick={() => setIsOpen(true)}
                        className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors"
                        title="Change file"
                    >
                        <span className="material-symbols-outlined">edit</span>
                    </button>
                )}
            </div>

            {description && <p className="text-xs text-gray-400 mt-1">{description}</p>}

            {/* Upload Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-xl font-black text-gray-900">Upload File</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors flex items-center justify-center"
                            >
                                <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                        </div>

                        <div className="p-6">
                            {/* Tabs */}
                            <div className="flex p-1 bg-gray-100 rounded-lg mb-6">
                                <button
                                    onClick={() => setActiveTab("upload")}
                                    className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === "upload"
                                        ? "bg-white text-blue-600 shadow-sm"
                                        : "text-gray-500 hover:text-gray-700"
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-[18px]">upload</span>
                                    Upload
                                </button>
                                <button
                                    onClick={() => setActiveTab("url")}
                                    className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === "url"
                                        ? "bg-white text-blue-600 shadow-sm"
                                        : "text-gray-500 hover:text-gray-700"
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-[18px]">link</span>
                                    URL
                                </button>
                            </div>

                            {activeTab === "upload" ? (
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer ${isUploading ? "pointer-events-none opacity-50" : "hover:border-blue-400 hover:bg-blue-50/30"
                                        }`}
                                >
                                    <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                        {isUploading ? (
                                            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <span className="material-symbols-outlined text-2xl">upload_file</span>
                                        )}
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-bold text-gray-900">Click to upload file</p>
                                        <p className="text-xs text-gray-400 mt-1">PDF, DOCX, ZIP up to 10MB</p>
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        accept={accept}
                                        className="hidden"
                                    />
                                </div>
                            ) : (
                                <form onSubmit={handleUrlSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">File URL</label>
                                        <input
                                            type="url"
                                            value={urlInput}
                                            onChange={(e) => setUrlInput(e.target.value)}
                                            placeholder="https://example.com/file.pdf"
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                                    >
                                        Add URL
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
