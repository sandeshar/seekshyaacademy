"use client";

import { deletePage } from "@/actions/pages";
import { Trash2, AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface DeletePageButtonProps {
    id: string;
    title: string;
    variant?: "default" | "minimal";
}

export default function DeletePageButton({ id, title, variant = "default" }: DeletePageButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deletePage(id);
            toast.success("Page deleted successfully");
        } catch (error: any) {
            toast.error(error.message || "Failed to delete page");
        } finally {
            setIsDeleting(false);
            setShowConfirm(false);
        }
    };

    if (showConfirm) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                <div className="bg-white rounded-2xl p-6 md:p-8 max-w-sm w-full shadow-2xl scale-in-center overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-rose-500" />
                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className="p-4 bg-rose-50 rounded-full">
                            <AlertCircle className="w-10 h-10 text-rose-600" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Confirm Deletion</h3>
                            <p className="text-slate-500 leading-relaxed">
                                Are you sure you want to delete <span className="font-bold text-slate-800">"{title}"</span>? This action is permanent and cannot be undone.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all active:scale-95"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="flex-1 px-4 py-2.5 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 transition-all shadow-md shadow-rose-200 active:scale-95 disabled:opacity-50 flex items-center justify-center"
                            >
                                {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Delete Page"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (variant === "minimal") {
        return (
            <button
                onClick={() => setShowConfirm(true)}
                className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                title="Delete Page"
            >
                <Trash2 className="w-4.5 h-4.5" />
            </button>
        );
    }

    return (
        <button
            onClick={() => setShowConfirm(true)}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
            title="Delete Page"
        >
            <Trash2 className="w-5 h-5 transition-transform group-hover:scale-110" />
        </button>
    );
}