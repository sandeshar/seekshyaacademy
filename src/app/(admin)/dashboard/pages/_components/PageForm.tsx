"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { createPage, updatePage } from "@/actions/pages";
import CMSPage from "../../_components/CMSPage";
import RichTextEditor from "../../_components/RichTextEditor";
import ImageUploader from "../../_components/ImageUploader";
import IconChooser from "../../_components/IconChooser";
import { Loader2, Save, ArrowLeft, Plus, Trash2, ChevronDown, ChevronUp, Layout, Globe, Search, MoreVertical, Eye, Settings, FileText, Image as ImageIcon, Share2, Code } from "lucide-react";
import Link from "next/link";
import { IPage } from "@/db/pages";

interface IPageFormProps {
    id?: string;
    initialData?: IPage & {
        header?: {
            isVisible: boolean;
            title: string;
            subtitle?: string;
            backgroundImage?: string;
            overlayOpacity?: number;
            textAlign?: 'left' | 'center' | 'right';
            textColor?: 'light' | 'dark';
            height?: 'small' | 'medium' | 'large';
            primaryButton?: { text: string; link: string; variant?: 'solid' | 'outline' | 'ghost' };
            secondaryButton?: { text: string; link: string; variant?: 'solid' | 'outline' | 'ghost' };
        }
    };
}

const EMPTY_HERO = {
    isVisible: true,
    badgeText: "",
    title: "",
    description: "",
    backgroundImage: "",
    overlayOpacity: 40,
    primaryButton: { text: "", link: "", icon: "" },
    secondaryButton: { text: "", link: "", icon: "" }
};

const EMPTY_HEADER = {
    isVisible: false,
    title: "",
    subtitle: "",
    backgroundImage: "",
    overlayOpacity: 40,
    textAlign: 'center' as const,
    textColor: 'light' as const,
    height: 'small' as const,
    primaryButton: { text: "", link: "", variant: "solid" as const },
    secondaryButton: { text: "", link: "", variant: "outline" as const }
};

type TabType = "general" | "content" | "header" | "seo";

export default function PageForm({ id, initialData }: IPageFormProps) {
    const router = useRouter();
    const isEditing = !!id;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>("general");
    const [expandedHeroes, setExpandedHeroes] = useState<number[]>([0]);

    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        slug: initialData?.slug || "",
        content: initialData?.content || "",
        status: (initialData?.status as "draft" | "published") || "draft",
        heroes: initialData?.heroes || [],
        header: initialData?.header || { ...EMPTY_HEADER },
        seo: {
            title: initialData?.seo?.title || "",
            description: initialData?.seo?.description || "",
            keywords: initialData?.seo?.keywords || ""
        }
    });

    const toggleHeroExpand = (index: number) => {
        setExpandedHeroes(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    const addHero = () => {
        setFormData(prev => ({
            ...prev,
            heroes: [...prev.heroes, { ...EMPTY_HERO }]
        }));
        setExpandedHeroes(prev => [...prev, formData.heroes.length]);
    };

    const removeHero = (index: number) => {
        setFormData(prev => ({
            ...prev,
            heroes: prev.heroes.filter((_, i) => i !== index)
        }));
    };

    const updateHero = (index: number, updates: any) => {
        setFormData(prev => {
            const newHeroes = [...prev.heroes];
            newHeroes[index] = { ...newHeroes[index], ...updates };
            return { ...prev, heroes: newHeroes };
        });
    };

    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^\w- ]+/g, "") // Keep alphanumeric, hyphens, and spaces
            .trim()
            .replace(/\s+/g, "-")     // Replace spaces with single hyphen
            .replace(/-+/g, "-")      // Replace multiple hyphens with single one
            .substring(0, 50);
    };

    const handleTitleChange = (title: string) => {
        setFormData(prev => ({
            ...prev,
            title,
            slug: isEditing ? prev.slug : generateSlug(title)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.slug || !formData.content) {
            toast.error("Please fill in all required fields (Title, Slug, Content)");
            return;
        }

        setIsSubmitting(true);
        try {
            if (isEditing) {
                await updatePage(id, formData as Partial<IPage>);
                toast.success("Page updated successfully");
            } else {
                await createPage(formData as Partial<IPage>);
                toast.success("Page created successfully");
            }
            router.refresh();
            router.push("/dashboard/pages");
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Something went wrong";
            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClass = "w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-200 placeholder:text-slate-400 font-medium";

    const tabs = [
        { id: "general", label: "General", icon: "settings" },
        { id: "header", label: "Header", icon: "vertical_align_top" },
        { id: "content", label: "Page Content", icon: "description" },
        { id: "seo", label: "SEO & Social", icon: "share" },
    ];

    const renderTabContent = (activeTab: string, data: any, setData: (data: any) => void) => {
        switch (activeTab) {
            case "general":
                return (
                    <section className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden p-6 space-y-6">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-1">
                            <div className="flex items-center gap-3 text-slate-400">
                                <Layout className="w-5 h-5" />
                                <h2 className="text-[10px] font-black uppercase tracking-[0.2em]">Basic Information</h2>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <label className="text-[10px] font-bold text-slate-500">Status:</label>
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData({ ...data, status: e.target.value as "draft" | "published" })}
                                        className="text-xs font-bold bg-slate-100 border-none rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Page Title</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => {
                                        const title = e.target.value;
                                        setData({
                                            ...data,
                                            title,
                                            slug: isEditing ? data.slug : generateSlug(title)
                                        });
                                    }}
                                    className={inputClass}
                                    placeholder="Enter descriptive title..."
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">URL Path (Slug)</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold hover:text-blue-500 transition-colors pointer-events-none">/</div>
                                    <input
                                        type="text"
                                        value={data.slug}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            // Only auto-format if it's not the user's manual deletion of a hyphen
                                            setData({ ...data, slug: val.toLowerCase().replace(/[^\w-]/g, "").replace(/\s+/g, "-") });
                                        }}
                                        className={`${inputClass} pl-8`}
                                        placeholder="page-slug"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setData({ ...data, slug: generateSlug(data.title) })}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                        title="Regenerate from title"
                                    >
                                        <ArrowLeft className="w-4 h-4 rotate-180" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                );
            case "header":
                return (
                    <div className="space-y-6">
                        {/* Header Activation Switch */}
                        <section className="bg-white rounded-3xl border border-slate-200/60 p-6 flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${data.header.isVisible ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'}`}>
                                    <Layout className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">Page Header Banner</h3>
                                    <p className="text-xs text-slate-500 font-medium">Enable a hero section at the top of this page</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setData({ ...data, header: { ...data.header, isVisible: !data.header.isVisible } })}
                                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all focus:outline-none ${data.header.isVisible ? 'bg-blue-600 shadow-md shadow-blue-500/20' : 'bg-slate-200'}`}
                            >
                                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-200 shadow-sm ${data.header.isVisible ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                        </section>

                        {data.header.isVisible ? (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
                                {/* Left Column: Content Settings */}
                                <div className="lg:col-span-2 space-y-6">
                                    <section className="bg-white rounded-3xl border border-slate-200/60 p-8 space-y-8 shadow-sm">
                                        <div className="flex items-center gap-3 text-slate-400 border-b border-slate-100 pb-4">
                                            <FileText className="w-4 h-4" />
                                            <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Content & Typography</h2>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 ml-1">Header Title</label>
                                                <input
                                                    type="text"
                                                    value={data.header.title || ""}
                                                    onChange={(e) => setData({ ...data, header: { ...data.header, title: e.target.value } })}
                                                    className={inputClass}
                                                    placeholder="Leave empty to use page title..."
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 ml-1">Subtitle / Description</label>
                                                <textarea
                                                    value={data.header.subtitle || ""}
                                                    onChange={(e) => setData({ ...data, header: { ...data.header, subtitle: e.target.value } })}
                                                    className={`${inputClass} min-h-[100px] resize-none py-4`}
                                                    placeholder="Enter a brief, catchy subtitle for your header..."
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-100 pt-8 mt-4">
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2 text-blue-600">
                                                        <Plus className="w-4 h-4" />
                                                        <span className="text-xs font-black uppercase tracking-widest">Primary CTA</span>
                                                    </div>
                                                    <div className="space-y-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                                                        <input
                                                            type="text"
                                                            value={data.header.primaryButton?.text || ""}
                                                            onChange={(e) => setData({ ...data, header: { ...data.header, primaryButton: { ...data.header.primaryButton, text: e.target.value } } })}
                                                            className={`${inputClass} bg-white`}
                                                            placeholder="Button Text"
                                                        />
                                                        <div className="grid grid-cols-2 gap-3">
                                                            <input
                                                                type="text"
                                                                value={data.header.primaryButton?.link || ""}
                                                                onChange={(e) => setData({ ...data, header: { ...data.header, primaryButton: { ...data.header.primaryButton, link: e.target.value } } })}
                                                                className={`${inputClass} bg-white`}
                                                                placeholder="URL / Link"
                                                            />
                                                            <IconChooser
                                                                value={data.header.primaryButton?.icon || ""}
                                                                onChange={(icon) => setData({ ...data, header: { ...data.header, primaryButton: { ...data.header.primaryButton, icon } } })}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2 text-slate-500">
                                                        <Plus className="w-4 h-4" />
                                                        <span className="text-xs font-black uppercase tracking-widest">Secondary CTA</span>
                                                    </div>
                                                    <div className="space-y-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                                                        <input
                                                            type="text"
                                                            value={data.header.secondaryButton?.text || ""}
                                                            onChange={(e) => setData({ ...data, header: { ...data.header, secondaryButton: { ...data.header.secondaryButton, text: e.target.value } } })}
                                                            className={`${inputClass} bg-white`}
                                                            placeholder="Button Text"
                                                        />
                                                        <div className="grid grid-cols-2 gap-3">
                                                            <input
                                                                type="text"
                                                                value={data.header.secondaryButton?.link || ""}
                                                                onChange={(e) => setData({ ...data, header: { ...data.header, secondaryButton: { ...data.header.secondaryButton, link: e.target.value } } })}
                                                                className={`${inputClass} bg-white`}
                                                                placeholder="URL / Link"
                                                            />
                                                            <IconChooser
                                                                value={data.header.secondaryButton?.icon || ""}
                                                                onChange={(icon) => setData({ ...data, header: { ...data.header, secondaryButton: { ...data.header.secondaryButton, icon } } })}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>

                                {/* Right Column: Appearance Settings */}
                                <div className="space-y-6">
                                    <section className="bg-white rounded-3xl border border-slate-200/60 p-6 space-y-6 shadow-sm">
                                        <div className="flex items-center gap-3 text-slate-400 border-b border-slate-100 pb-4">
                                            <Settings className="w-4 h-4" />
                                            <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Styling & Visuals</h2>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">Banner Height</label>
                                                <div className="grid grid-cols-3 gap-2">
                                                    {['small', 'medium', 'large'].map((h) => (
                                                        <button
                                                            key={h}
                                                            type="button"
                                                            onClick={() => setData({ ...data, header: { ...data.header, height: h } })}
                                                            className={`py-2 px-1 text-[10px] font-bold rounded-xl border transition-all ${data.header.height === h ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-blue-300'}`}
                                                        >
                                                            {h.charAt(0).toUpperCase() + h.slice(1)}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-2 pt-2">
                                                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">Alignment</label>
                                                <div className="flex border border-slate-200 rounded-xl overflow-hidden">
                                                    {['left', 'center', 'right'].map((align) => (
                                                        <button
                                                            key={align}
                                                            type="button"
                                                            onClick={() => setData({ ...data, header: { ...data.header, textAlign: align } })}
                                                            className={`flex-1 py-2.5 flex items-center justify-center transition-colors ${data.header.textAlign === align ? 'bg-blue-50 text-blue-600' : 'bg-white text-slate-400 hover:text-slate-600'}`}
                                                        >
                                                            <span className="material-symbols-outlined text-lg">{`format_align_${align}`}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-2 pt-2">
                                                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">Theme Color</label>
                                                <div className="flex gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => setData({ ...data, header: { ...data.header, textColor: 'light' } })}
                                                        className={`flex-1 flex items-center gap-2 p-3 rounded-2xl border transition-all ${data.header.textColor === 'light' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200 bg-white'}`}
                                                    >
                                                        <div className="w-4 h-4 rounded-full bg-slate-900 border border-slate-800" />
                                                        <span className="text-xs font-bold text-slate-700">Light Text</span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setData({ ...data, header: { ...data.header, textColor: 'dark' } })}
                                                        className={`flex-1 flex items-center gap-2 p-3 rounded-2xl border transition-all ${data.header.textColor === 'dark' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200 bg-white'}`}
                                                    >
                                                        <div className="w-4 h-4 rounded-full bg-white border border-slate-200 shadow-sm" />
                                                        <span className="text-xs font-bold text-slate-700">Dark Text</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="bg-white rounded-3xl border border-slate-200/60 p-6 space-y-4 shadow-sm">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3 text-slate-400">
                                                <ImageIcon className="w-4 h-4" />
                                                <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Backdrop</h2>
                                            </div>
                                            <div className="px-2 py-0.5 bg-blue-50 rounded-full">
                                                <span className="text-[10px] font-black text-blue-600 uppercase">{data.header.overlayOpacity || 40}% Overlay</span>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <ImageUploader
                                                value={data.header.backgroundImage || ""}
                                                onChange={(val) => setData({ ...data, header: { ...data.header, backgroundImage: val } })}
                                            />
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                step="5"
                                                value={data.header.overlayOpacity || 40}
                                                onChange={(e) => setData({ ...data, header: { ...data.header, overlayOpacity: parseInt(e.target.value) } })}
                                                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                            />
                                        </div>
                                    </section>
                                </div>
                            </div>
                        ) : (
                            <div className="py-20 flex flex-col items-center justify-center text-center space-y-6 bg-white rounded-[2.5rem] border border-dashed border-slate-200 shadow-sm animate-in fade-in zoom-in-95 duration-500">
                                <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-200 border border-slate-100">
                                    <Layout className="w-10 h-10" />
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-lg font-bold text-slate-400">Header is currently disabled</h4>
                                    <p className="text-sm text-slate-400 max-w-xs font-medium">Use the toggle above to enable a customized banner for this page.</p>
                                </div>
                            </div>
                        )}
                    </div>
                );
            case "content":
                return (
                    <section className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden p-6 space-y-6">
                        <div className="flex items-center gap-3 text-slate-400 border-b border-slate-100 pb-4 mb-1">
                            <FileText className="w-5 h-5" />
                            <h2 className="text-[10px] font-black uppercase tracking-[0.2em]">Page Body</h2>
                        </div>
                        <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-xs">
                            <RichTextEditor
                                value={data.content}
                                onChange={(content) => setData({ ...data, content })}
                            />
                        </div>
                    </section>
                );
            case "seo":
                return (
                    <section className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden p-6 space-y-4">
                        <div className="flex items-center gap-3 text-slate-400 border-b border-slate-100 pb-4 mb-1">
                            <Search className="w-5 h-5" />
                            <h2 className="text-[10px] font-black uppercase tracking-[0.2em]">Search Optimization</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Meta Title</label>
                                <input
                                    type="text"
                                    value={data.seo.title}
                                    onChange={(e) => setData({ ...data, seo: { ...data.seo, title: e.target.value } })}
                                    className={inputClass}
                                    placeholder="Defaults to page title..."
                                />
                                <div className="flex justify-between px-1">
                                    <span className="text-[9px] text-slate-400 font-medium">Goal: 60 chars</span>
                                    <span className={`text-[9px] font-black ${data.seo.title.length > 60 ? 'text-red-500' : 'text-slate-400'}`}>{data.seo.title.length}</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Meta Description</label>
                                <textarea
                                    value={data.seo.description}
                                    onChange={(e) => setData({ ...data, seo: { ...data.seo, description: e.target.value } })}
                                    className={`${inputClass} min-h-[80px] resize-none px-4 py-3`}
                                    placeholder="Summary for search results..."
                                />
                                <div className="flex justify-between px-1">
                                    <span className="text-[9px] text-slate-400 font-medium">Goal: 160 chars</span>
                                    <span className={`text-[9px] font-black ${data.seo.description.length > 160 ? 'text-red-500' : 'text-slate-400'}`}>{data.seo.description.length}</span>
                                </div>
                            </div>
                        </div>
                    </section>
                );
            default:
                return null;
        }
    };

    return (
        <CMSPage
            title={isEditing ? "Edit Page" : "Create Page"}
            description={isEditing ? `Managing "${formData.title}"` : "Configure a new landing page for your website."}
            getAction={async () => formData}
            updateAction={async (updatedData) => {
                if (!updatedData.title || !updatedData.slug || !updatedData.content) {
                    toast.error("Please fill in all required fields (Title, Slug, Content)");
                    return;
                }
                if (isEditing) {
                    await updatePage(id, updatedData as Partial<IPage>);
                } else {
                    await createPage(updatedData as Partial<IPage>);
                    router.push("/dashboard/pages");
                }
            }}
            tabs={tabs}
            renderTabContent={renderTabContent}
        />
    );
}