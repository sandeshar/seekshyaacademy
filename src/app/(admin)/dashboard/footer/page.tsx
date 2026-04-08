"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import CMSSection from "../_components/CMSSection";
import ImageUploader from "../_components/ImageUploader";
import { getFooter, updateFooter } from "@/actions/footer";

interface IFooterItem {
    _id?: string;
    label: string;
    href: string;
}

interface IFooterSection {
    _id?: string;
    title: string;
    links: IFooterItem[];
}

interface IFooterData {
    logo: {
        url: string;
        alt: string;
        height: number;
        width: number;
    };
    description: string;
    footerSections: IFooterSection[];
    contactInfo: {
        address: string;
        phone: string;
        email: string;
    };
    socialLinks: {
        facebook: string;
        instagram: string;
        linkedin?: string;
        twitter?: string;
        youtube?: string;
        whatsapp?: string;
    };
    copyrightText: string;
    developedBy: {
        text: string;
        link: string;
    };
}

export default function FooterManager() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [data, setData] = useState<IFooterData | null>(null);

    useEffect(() => {
        fetchFooter();
    }, []);

    const fetchFooter = async () => {
        try {
            const footerData = await getFooter();
            setData(footerData);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load footer data");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!data) return;
        setIsSaving(true);
        try {
            await updateFooter(data);
            toast.success("Footer updated successfully");
            router.refresh();
            fetchFooter();
        } catch (error) {
            console.error(error);
            toast.error("Error saving footer");
        } finally {
            setIsSaving(false);
        }
    };

    // Unified Section Management
    const addSection = () => {
        if (!data) return;
        setData({
            ...data,
            footerSections: [...data.footerSections, { title: "New Section", links: [] }]
        });
    };

    const removeSection = (index: number) => {
        if (!data) return;
        const newSections = [...data.footerSections];
        newSections.splice(index, 1);
        setData({ ...data, footerSections: newSections });
    };

    const updateSectionTitle = (index: number, title: string) => {
        if (!data) return;
        const newSections = [...data.footerSections];
        newSections[index].title = title;
        setData({ ...data, footerSections: newSections });
    };

    const addLinkToSection = (sectionIndex: number) => {
        if (!data) return;
        const newSections = [...data.footerSections];
        newSections[sectionIndex].links.push({ label: "New Link", href: "#" });
        setData({ ...data, footerSections: newSections });
    };

    const removeLinkFromSection = (sectionIndex: number, linkIndex: number) => {
        if (!data) return;
        const newSections = [...data.footerSections];
        newSections[sectionIndex].links.splice(linkIndex, 1);
        setData({ ...data, footerSections: newSections });
    };

    const updateLinkInSection = (sectionIndex: number, linkIndex: number, field: keyof IFooterItem, value: string) => {
        if (!data) return;
        const newSections = [...data.footerSections];
        newSections[sectionIndex].links[linkIndex] = { ...newSections[sectionIndex].links[linkIndex], [field]: value };
        setData({ ...data, footerSections: newSections });
    };

    if (isLoading) return <div className="p-8">Loading...</div>;
    if (!data) return null;

    return (
        <div className="pb-32">
            {/* Sticky Header with Z-Index > Sidebar (Sidebar is usually z-30 or z-40) */}
            <div className="sticky top-0 z-100 bg-white border-b border-gray-200 px-8 py-4 mb-6 flex items-center justify-between shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">Footer Management</h1>
                <button
                    onClick={() => handleSave()}
                    disabled={isSaving}
                    className={`px-6 py-2.5 bg-blue-600 text-white rounded-lg font-bold shadow-md shadow-blue-200 transition-all ${isSaving ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700 hover:scale-[1.02]"}`}
                >
                    {isSaving ? "Saving..." : "Save Changes"}
                </button>
            </div>

            <div className="max-w-5xl mx-auto px-6 space-y-6">

                <CMSSection title="Logo & Branding" isVisible={true}>
                    <div className="space-y-6">
                        <ImageUploader
                            label="Footer Logo (Optional)"
                            value={data.logo?.url}
                            onChange={(url) => setData({ ...data, logo: { ...data.logo, url } })}
                            description="If not set, the Site Logo (Main) from General Settings will be used."
                        />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
                                <input
                                    type="text"
                                    value={data.logo?.alt}
                                    onChange={(e) => setData({ ...data, logo: { ...data.logo, alt: e.target.value } })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Height (px)</label>
                                <input
                                    type="number"
                                    value={data.logo?.height}
                                    onChange={(e) => setData({ ...data, logo: { ...data.logo, height: parseInt(e.target.value) || 0 } })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Width (px)</label>
                                <input
                                    type="number"
                                    value={data.logo?.width}
                                    onChange={(e) => setData({ ...data, logo: { ...data.logo, width: parseInt(e.target.value) || 0 } })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData({ ...data, description: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                rows={3}
                                placeholder="Short description about the organization..."
                            />
                        </div>
                    </div>
                </CMSSection>

                <CMSSection title="Footer Link Sections" isVisible={true}>
                    <p className="text-sm text-gray-500 mb-6">Connect and organize your footer links. Re-order and customize as needed. Quick Links and Educational Pillars are created by default but can be modified or removed.</p>
                    <div className="space-y-8">

                        {data.footerSections.map((section, sIndex) => (
                            <div key={sIndex} className="bg-white p-4 rounded-xl border-2 border-dashed border-blue-200 relative group">
                                <button
                                    onClick={() => removeSection(sIndex)}
                                    className="absolute top-2 right-2 p-1.5 text-red-500 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    title="Remove Section"
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>

                                <div className="mb-4">
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Section Title</label>
                                    <input
                                        type="text"
                                        value={section.title}
                                        onChange={(e) => updateSectionTitle(sIndex, e.target.value)}
                                        className="w-full px-3 py-2 font-bold text-gray-900 border-b border-gray-300 focus:border-blue-500 outline-none bg-transparent"
                                        placeholder="Enter section title..."
                                    />
                                </div>

                                <div className="space-y-3 pl-2 border-l-2 border-gray-100">
                                    {section.links.map((link, lIndex) => (
                                        <div key={lIndex} className="flex gap-3 items-start">
                                            <div className="flex-1 grid grid-cols-2 gap-3">
                                                <input
                                                    type="text"
                                                    placeholder="Label"
                                                    value={link.label}
                                                    onChange={(e) => updateLinkInSection(sIndex, lIndex, 'label', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Link / URL"
                                                    value={link.href}
                                                    onChange={(e) => updateLinkInSection(sIndex, lIndex, 'href', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                                                />
                                            </div>
                                            <button type="button" onClick={() => removeLinkFromSection(sIndex, lIndex)} className="text-red-500 p-2 hover:bg-red-50 rounded">
                                                <span className="material-symbols-outlined text-lg">delete</span>
                                            </button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => addLinkToSection(sIndex)} className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">add</span> Add Link
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addSection}
                            className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-medium hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined">add_circle</span>
                            Add New Section
                        </button>

                    </div>
                </CMSSection>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CMSSection title="Contact Information" isVisible={true}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <input
                                    type="text"
                                    value={data.contactInfo?.address || ""}
                                    onChange={(e) => setData({ ...data, contactInfo: { ...data.contactInfo, address: e.target.value } })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input
                                    type="text"
                                    value={data.contactInfo?.phone || ""}
                                    onChange={(e) => setData({ ...data, contactInfo: { ...data.contactInfo, phone: e.target.value } })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="text"
                                    value={data.contactInfo?.email || ""}
                                    onChange={(e) => setData({ ...data, contactInfo: { ...data.contactInfo, email: e.target.value } })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </CMSSection>

                    <CMSSection title="Social Media" isVisible={true}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                                <input
                                    type="text"
                                    value={data.socialLinks?.facebook || ""}
                                    onChange={(e) => setData({ ...data, socialLinks: { ...data.socialLinks, facebook: e.target.value } })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="https://facebook.com/..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                                <input
                                    type="text"
                                    value={data.socialLinks?.instagram || ""}
                                    onChange={(e) => setData({ ...data, socialLinks: { ...data.socialLinks, instagram: e.target.value } })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="https://instagram.com/..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                                <input
                                    type="text"
                                    value={data.socialLinks?.linkedin || ""}
                                    onChange={(e) => setData({ ...data, socialLinks: { ...data.socialLinks, linkedin: e.target.value } })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="https://linkedin.com/in/..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
                                <input
                                    type="text"
                                    value={data.socialLinks?.twitter || ""}
                                    onChange={(e) => setData({ ...data, socialLinks: { ...data.socialLinks, twitter: e.target.value } })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="https://twitter.com/..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">YouTube</label>
                                <input
                                    type="text"
                                    value={data.socialLinks?.youtube || ""}
                                    onChange={(e) => setData({ ...data, socialLinks: { ...data.socialLinks, youtube: e.target.value } })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="https://youtube.com/..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                                <input
                                    type="text"
                                    value={data.socialLinks?.whatsapp || ""}
                                    onChange={(e) => setData({ ...data, socialLinks: { ...data.socialLinks, whatsapp: e.target.value } })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="+977XXXXXXXXXX"
                                />
                                <p className="text-[10px] text-gray-400 mt-1">Enter phone number with country code. Used for Footer WhatsApp link.</p>
                            </div>
                        </div>
                    </CMSSection>
                </div>

                <CMSSection title="Copyright & Credits" isVisible={true}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Copyright Text</label>
                            <input
                                type="text"
                                value={data.copyrightText}
                                onChange={(e) => setData({ ...data, copyrightText: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Developed By (Text)</label>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={data.developedBy?.text || ""}
                                    onChange={(e) => setData({ ...data, developedBy: { ...data.developedBy, text: e.target.value } })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g. Pixel Studio"
                                />
                                <input
                                    type="text"
                                    value={data.developedBy?.link || ""}
                                    onChange={(e) => setData({ ...data, developedBy: { ...data.developedBy, link: e.target.value } })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Link (Optional)"
                                />
                            </div>
                        </div>
                    </div>
                </CMSSection>
            </div>
        </div>
    );
}
