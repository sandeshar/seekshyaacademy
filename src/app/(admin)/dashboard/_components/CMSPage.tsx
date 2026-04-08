"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Tab {
    id: string;
    label: string;
    icon: string;
}

interface CMSPageProps {
    title: string;
    description: string;
    apiEndpoint?: string;
    getAction?: () => Promise<any>;
    updateAction?: (data: any) => Promise<any>;
    tabs?: Tab[];
    renderTabContent?: (activeTab: string, data: any, setData: (data: any) => void) => React.ReactNode;
    children?: (data: any, setData: (data: any) => void) => React.ReactNode;
}

const CMSPage = ({
    title,
    description,
    apiEndpoint,
    getAction,
    updateAction,
    tabs = [],
    renderTabContent,
    children
}: CMSPageProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [data, setData] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<string>(tabs && tabs.length > 0 ? tabs[0].id : "");

    useEffect(() => {
        fetchData();
    }, [apiEndpoint, getAction]);

    const fetchData = async () => {
        try {
            let json;
            if (getAction) {
                json = await getAction();
            } else if (apiEndpoint) {
                const res = await fetch(apiEndpoint, { cache: 'no-store' });
                if (!res.ok) throw new Error("Fetch failed");
                json = await res.json();
            }

            setData(json);
        } catch (error) {
            console.error(`Failed to fetch data`, error);
            toast.error("Failed to load page data");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            let success = false;
            if (updateAction) {
                await updateAction(data);
                success = true;
            } else if (apiEndpoint) {
                const res = await fetch(apiEndpoint, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });
                success = res.ok;
            }

            if (success) {
                toast.success(`${title} updated successfully`);
                router.refresh();
                fetchData();
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                toast.error(`Failed to update ${title}`);
            }
        } catch (error) {
            console.error(`Failed to save data`, error);
            toast.error("Failed to save changes");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="max-w-5xl mx-auto pb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Stickied Topbar & Tabs Wrapper */}
            <div className="sticky top-16 lg:top-0 z-20 bg-gray-50/95 backdrop-blur-md -mx-4 md:-mx-8 px-4 md:px-8 pt-2 pb-1 mb-4 border-b border-gray-200/50">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-3">
                    <div>
                        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{title}</h1>
                        <p className="text-sm text-slate-500 mt-0.5 font-medium">{description}</p>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="group relative px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-primary transition-all shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_25px_-4px_rgba(126,25,27,0.3)] flex items-center gap-2 disabled:opacity-50 active:scale-95"
                    >
                        {saving ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        ) : (
                            <span className="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform">save</span>
                        )}
                        <span className="text-xs uppercase tracking-widest">{saving ? "Saving..." : "Save Changes"}</span>
                    </button>
                </div>

                {/* Tabs inside sticky container */}
                {tabs && tabs.length > 0 && (
                    <div className="flex p-1 bg-gray-200/50 rounded-2xl mb-2 overflow-x-auto no-scrollbar w-fit">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                }}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${activeTab === tab.id
                                    ? "bg-white text-primary shadow-sm"
                                    : "text-gray-500 hover:text-gray-800 hover:bg-white/50"
                                    }`}
                            >
                                <span className="material-symbols-outlined text-[20px]">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {renderTabContent && renderTabContent(activeTab, data, setData)}
            {typeof children === "function" ? children(data, setData) : children}
        </div>
    );
};

export default CMSPage;
