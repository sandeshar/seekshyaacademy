"use client";

import { useRouter } from "next/navigation";
import { createLocation, updateLocation } from "@/actions/locations";
import RichTextEditor from "../../_components/RichTextEditor";
import ImageUploader from "../../_components/ImageUploader";
import CMSPage from "../../_components/CMSPage";
import {
    MapPin,
    Globe,
    Search,
    Settings,
    FileText,
    Image as ImageIcon,
    Phone,
    Mail,
    Map
} from "lucide-react";
import { ILocation } from "@/db/locations";

interface ILocationFormProps {
    id?: string;
    initialData?: ILocation;
}

const EMPTY_DATA = {
    name: "",
    slug: "",
    address: "",
    phone: "",
    email: "",
    mapUrl: "",
    image: "",
    content: "",
    status: "draft" as const,
    isMainBranch: false,
    seo: {
        title: "",
        description: "",
        keywords: ""
    }
};

export default function LocationForm({ id, initialData }: ILocationFormProps) {
    const router = useRouter();
    const isEditing = !!id;

    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^\w- ]+/g, "")
            .trim()
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .substring(0, 50);
    };

    const tabs = [
        { id: "general", label: "General Info", icon: "settings" },
        { id: "content", label: "Page Content", icon: "description" },
        { id: "seo", label: "SEO & Social", icon: "share" },
    ];

    const inputClass = "w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-200 placeholder:text-slate-400 font-medium";

    const renderTabContent = (activeTab: string, data: any, setData: (data: any) => void) => {
        switch (activeTab) {
            case "general":
                return (
                    <div className="space-y-8">
                        <section className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                <div className="flex items-center gap-3 text-slate-400">
                                    <Settings className="w-5 h-5" />
                                    <h2 className="text-[10px] font-black uppercase tracking-[0.2em]">Basic Information</h2>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <label className="text-xs font-bold text-slate-500">Main Branch?</label>
                                        <input
                                            type="checkbox"
                                            checked={data.isMainBranch}
                                            onChange={(e) => setData({ ...data, isMainBranch: e.target.checked })}
                                            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <label className="text-xs font-bold text-slate-500">Status:</label>
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
                                    <label className="text-sm font-bold text-slate-700 ml-1">Branch Name</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => {
                                            const name = e.target.value;
                                            setData({
                                                ...data,
                                                name,
                                                slug: isEditing ? data.slug : generateSlug(name)
                                            });
                                        }}
                                        placeholder="e.g. Kathmandu Main Branch"
                                        className={inputClass}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">URL Slug</label>
                                    <div className="relative">
                                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type="text"
                                            value={data.slug}
                                            onChange={(e) => setData({ ...data, slug: e.target.value })}
                                            className={`${inputClass} pl-11`}
                                            placeholder="kathmandu-main-branch"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                                        <MapPin className="w-4 h-4" /> Address
                                    </label>
                                    <input
                                        type="text"
                                        value={data.address}
                                        onChange={(e) => setData({ ...data, address: e.target.value })}
                                        placeholder="Full address of the branch"
                                        className={inputClass}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                                        <Phone className="w-4 h-4" /> Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) => setData({ ...data, phone: e.target.value })}
                                        placeholder="Contact phone number"
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                                        <Mail className="w-4 h-4" /> Email (Optional)
                                    </label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData({ ...data, email: e.target.value })}
                                        placeholder="branch-email@seekshya.com"
                                        className={inputClass}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                                        <Map className="w-4 h-4" /> Google Map URL
                                    </label>
                                    <input
                                        type="text"
                                        value={data.mapUrl}
                                        onChange={(e) => setData({ ...data, mapUrl: e.target.value })}
                                        placeholder="Google Maps Embed URL or Link"
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6">
                            <div className="flex items-center gap-3 text-slate-400 border-b border-slate-100 pb-4 mb-6">
                                <ImageIcon className="w-5 h-5" />
                                <h2 className="text-[10px] font-black uppercase tracking-[0.2em]">Featured Image</h2>
                            </div>
                            <ImageUploader
                                value={data.image}
                                onChange={(url) => setData({ ...data, image: url })}
                            />
                        </section>
                    </div>
                );
            case "content":
                return (
                    <section className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 min-h-[500px]">
                        <div className="flex items-center gap-3 text-slate-400 border-b border-slate-100 pb-4 mb-6">
                            <FileText className="w-5 h-5" />
                            <h2 className="text-[10px] font-black uppercase tracking-[0.2em]">Branch Story & Details</h2>
                        </div>
                        <RichTextEditor
                            value={data.content}
                            onChange={(content) => setData({ ...data, content })}
                        />
                    </section>
                );
            case "seo":
                return (
                    <section className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 space-y-6">
                        <div className="flex items-center gap-3 text-slate-400 border-b border-slate-100 pb-4 mb-1">
                            <Search className="w-5 h-5" />
                            <h2 className="text-[10px] font-black uppercase tracking-[0.2em]">SEO Metadata</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Meta Title</label>
                                <input
                                    type="text"
                                    value={data.seo?.title || ""}
                                    onChange={(e) => setData({ ...data, seo: { ...data.seo, title: e.target.value } })}
                                    className={inputClass}
                                    placeholder="Better than the page title for SEO"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Meta Description</label>
                                <textarea
                                    value={data.seo?.description || ""}
                                    onChange={(e) => setData({ ...data, seo: { ...data.seo, description: e.target.value } })}
                                    className={`${inputClass} min-h-[120px] resize-none`}
                                    placeholder="Keep it under 160 characters for best results..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Keywords</label>
                                <input
                                    type="text"
                                    value={data.seo?.keywords || ""}
                                    onChange={(e) => setData({ ...data, seo: { ...data.seo, keywords: e.target.value } })}
                                    className={inputClass}
                                    placeholder="location, branch, kathmandu, academy"
                                />
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
            title={isEditing ? "Edit Branch" : "New Branch"}
            description={isEditing ? `Editing: ${initialData?.name}` : "Establish a new location"}
            getAction={async () => initialData || EMPTY_DATA}
            updateAction={async (data) => {
                if (!data.name || !data.slug || !data.content || !data.address || !data.phone) {
                    throw new Error("Please fill in all required fields (Name, Slug, Address, Phone, Content)");
                }
                if (isEditing) {
                    await updateLocation(id, data);
                } else {
                    const res = await createLocation(data);
                    router.push(`/dashboard/locations/${(res as any)._id}`);
                }
            }}
            tabs={tabs as any}
            renderTabContent={renderTabContent}
        />
    );
}
