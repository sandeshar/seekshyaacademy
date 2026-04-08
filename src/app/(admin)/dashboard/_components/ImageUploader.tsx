"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import { getMediaFiles } from "@/actions/media";

interface ImageUploaderProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
    description?: string;
}

export default function ImageUploader({ value, onChange, label, description }: ImageUploaderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<"upload" | "url" | "library">("upload");
    const [urlInput, setUrlInput] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [mediaFiles, setMediaFiles] = useState<any[]>([]);
    const [isLoadingLibrary, setIsLoadingLibrary] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && activeTab === "library") {
            loadMediaLibrary();
        }
    }, [isOpen, activeTab]);

    const loadMediaLibrary = async () => {
        setIsLoadingLibrary(true);
        try {
            const files = await getMediaFiles();
            setMediaFiles(files);
        } catch (error) {
            console.error("Failed to load media library:", error);
            toast.error("Failed to load media library");
        } finally {
            setIsLoadingLibrary(false);
        }
    };

    const filteredMediaFiles = mediaFiles.filter(file =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Basic validation
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            toast.error("Image size should be less than 5MB");
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
                throw new Error(data.error || "Failed to upload image");
            }

            onChange(data.url);
            setIsOpen(false);
            setIsUploading(false);
            toast.success("Image uploaded successfully");
        } catch (error: any) {
            console.error("Upload error:", error);
            toast.error(error.message || "Failed to upload image");
            setIsUploading(false);
        }
    };

    const handleUrlSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!urlInput.trim()) return;
        onChange(urlInput);
        setIsOpen(false);
        setUrlInput("");
        toast.success("Image URL updated");
    };

    const removeImage = () => {
        onChange("");
        toast.success("Image removed");
    };

    return (
        <div className="space-y-1.5">
            {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}

            <div className="flex items-center gap-2">
                {/* Mini Preview */}
                <div className="relative group shrink-0">
                    {value ? (
                        <div className="relative h-11 w-11 rounded-lg overflow-hidden border border-gray-200 bg-white">
                            <img
                                src={value}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="w-8 h-8 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors flex items-center justify-center"
                                    title="Remove"
                                >
                                    <span className="material-symbols-outlined text-sm">delete</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="h-11 w-11 rounded-lg border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-gray-400">
                            <span className="material-symbols-outlined text-xl">image</span>
                        </div>
                    )}
                </div>

                {/* Main Action Field - Looks like an input */}
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="flex-1 flex items-center justify-between px-4 h-11 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 hover:bg-gray-100 hover:border-blue-400 transition-all outline-none"
                >
                    <span className="truncate">
                        {value ? "Update Image" : "Select or link image..."}
                    </span>
                    <span className="material-symbols-outlined text-gray-400">
                        {value ? "sync" : "add_photo_alternate"}
                    </span>
                </button>
            </div>

            {description && <p className="text-[11px] text-gray-400 mt-1">{description}</p>}

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
                    <div
                        className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-scaleUp"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                            <h3 className="text-base font-bold text-gray-900">Add Image</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-full transition-all"
                            >
                                <span className="material-symbols-outlined text-xl">close</span>
                            </button>
                        </div>

                        <div className="p-5">
                            {/* Tabs */}
                            <div className="flex bg-gray-100 p-1 rounded-lg mb-4">
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
                                    onClick={() => setActiveTab("library")}
                                    className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === "library"
                                        ? "bg-white text-blue-600 shadow-sm"
                                        : "text-gray-500 hover:text-gray-700"
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-[18px]">photo_library</span>
                                    Library
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

                            <div className="min-h-[200px]">
                                {activeTab === "upload" && (
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer ${isUploading ? "pointer-events-none opacity-50" : "hover:border-blue-400 hover:bg-blue-50/30"
                                            } border-gray-200`}
                                    >
                                        <input
                                            type="file"
                                            className="hidden"
                                            ref={fileInputRef}
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                            {isUploading ? (
                                                <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent" />
                                            ) : (
                                                <span className="material-symbols-outlined text-2xl">cloud_upload</span>
                                            )}
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs font-semibold text-gray-900">
                                                {isUploading ? "Processing..." : "Click to upload file"}
                                            </p>
                                            <p className="text-[10px] text-gray-500 mt-0.5">PNG, JPG up to 5MB</p>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "library" && (
                                    <div className="flex flex-col h-[300px] gap-3">
                                        <div className="relative shrink-0">
                                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">search</span>
                                            <input
                                                type="text"
                                                placeholder="Search by filename..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                            />
                                        </div>

                                        <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
                                            {isLoadingLibrary ? (
                                                <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-400">
                                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                                    <span className="text-xs font-medium">Loading library...</span>
                                                </div>
                                            ) : filteredMediaFiles.length === 0 ? (
                                                <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-400">
                                                    <span className="material-symbols-outlined text-4xl">
                                                        {searchQuery ? "search_off" : "inventory_2"}
                                                    </span>
                                                    <span className="text-xs font-medium">
                                                        {searchQuery ? "No matching images found" : "No images uploaded yet"}
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-3 gap-2 pb-2">
                                                    {filteredMediaFiles.map((file) => (
                                                        <div
                                                            key={file.url}
                                                            onClick={() => {
                                                                onChange(file.url);
                                                                setIsOpen(false);
                                                                toast.success("Image selected from library");
                                                            }}
                                                            className="relative aspect-square rounded-lg overflow-hidden border border-gray-100 hover:border-blue-500 cursor-pointer group transition-all"
                                                        >
                                                            <img
                                                                src={file.url}
                                                                alt={file.name}
                                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                            />
                                                            {file.url === value && (
                                                                <div className="absolute inset-0 bg-blue-600/20 flex items-center justify-center">
                                                                    <span className="material-symbols-outlined text-white text-xl drop-shadow-md">check_circle</span>
                                                                </div>
                                                            )}
                                                            <div className="absolute inset-x-0 bottom-0 bg-black/60 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <p className="text-[9px] text-white truncate text-center font-medium px-1">{file.name}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {activeTab === "url" && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1.5">Image Source URL</label>
                                            <div className="relative">
                                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">link</span>
                                                <input
                                                    type="url"
                                                    required
                                                    placeholder="https://images.unsplash.com/..."
                                                    value={urlInput}
                                                    onChange={(e) => setUrlInput(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            handleUrlSubmit(e as any);
                                                        }
                                                    }}
                                                    className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleUrlSubmit}
                                            className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-sm"
                                        >
                                            Apply URL
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

