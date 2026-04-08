"use client";

import { useState, useEffect, useRef } from "react";
import { getMediaFiles, deleteMediaFile } from "@/actions/media";
import { toast } from "react-hot-toast";
import Image from "next/image";

interface MediaFile {
    name: string;
    url: string;
    size: number;
    createdAt: Date;
}

export default function MediaDashboard() {
    const [files, setFiles] = useState<MediaFile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        setIsLoading(true);
        try {
            const data = await getMediaFiles();
            setFiles(data);
        } catch (error) {
            toast.error("Failed to load media files");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const loadingToast = toast.loading("Uploading file...");

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("/api/media/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Upload failed");
            }

            toast.success("File uploaded successfully", { id: loadingToast });
            fetchFiles();
        } catch (error: any) {
            toast.error(error.message || "Failed to upload", { id: loadingToast });
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleDelete = async (filename: string) => {
        if (!confirm("Are you sure you want to delete this file? This cannot be undone and may break links in your content.")) return;

        try {
            const result = await deleteMediaFile(filename);
            if (result.success) {
                toast.success("File deleted");
                fetchFiles();
            } else {
                toast.error(result.error || "Delete failed");
            }
        } catch (error) {
            toast.error("Failed to delete file");
        }
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const filteredFiles = files.filter(file =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const isImage = (filename: string) => {
        const ext = filename.split('.').pop()?.toLowerCase();
        return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '');
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Media Library</h1>
                    <p className="text-gray-500 mt-1">Manage all uploaded images and files.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                        <input
                            type="text"
                            placeholder="Search files..."
                            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleUploadClick}
                        disabled={isUploading}
                        className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2 disabled:opacity-50"
                    >
                        <span className="material-symbols-outlined text-[20px]">upload</span>
                        {isUploading ? "Uploading..." : "Upload"}
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="aspect-square bg-gray-100 animate-pulse rounded-xl"></div>
                    ))}
                </div>
            ) : filteredFiles.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-500">
                    <span className="material-symbols-outlined text-6xl mb-4 text-gray-200">photo_library</span>
                    <p>No media files found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {filteredFiles.map((file) => (
                        <div key={file.name} className="group relative bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                            <div className="aspect-square relative bg-gray-50 flex items-center justify-center overflow-hidden">
                                {isImage(file.name) ? (
                                    <img
                                        src={file.url}
                                        alt={file.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                ) : (
                                    <span className="material-symbols-outlined text-4xl text-gray-300">description</span>
                                )}

                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => window.open(file.url, '_blank')}
                                        className="p-2 bg-white rounded-full text-gray-700 hover:bg-blue-600 hover:text-white transition-colors"
                                        title="View"
                                    >
                                        <span className="material-symbols-outlined text-sm">visibility</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(file.url);
                                            toast.success("URL copied to clipboard");
                                        }}
                                        className="p-2 bg-white rounded-full text-gray-700 hover:bg-green-600 hover:text-white transition-colors"
                                        title="Copy URL"
                                    >
                                        <span className="material-symbols-outlined text-sm">content_copy</span>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(file.name)}
                                        className="p-2 bg-white rounded-full text-gray-700 hover:bg-red-600 hover:text-white transition-colors"
                                        title="Delete"
                                    >
                                        <span className="material-symbols-outlined text-sm">delete</span>
                                    </button>
                                </div>
                            </div>
                            <div className="p-2 truncate">
                                <p className="text-xs font-medium text-gray-700 truncate" title={file.name}>{file.name}</p>
                                <p className="text-[10px] text-gray-400">{formatSize(file.size)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
