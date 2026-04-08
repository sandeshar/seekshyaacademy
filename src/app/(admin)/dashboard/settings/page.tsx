"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import CMSSection from "../_components/CMSSection";
import ImageUploader from "../_components/ImageUploader";
import { getSettings, updateSettings, testSMTPSettings } from "@/actions/settings";

interface ISiteSettingsData {
    siteName: string;
    siteDescription: string;
    tagline: string;
    contactEmail: string;
    contactPhone: string;
    address: string;
    googleMapsUrl: string;
    logos: {
        main: string;
        favicon: string;
    };
    socialLinks: {
        facebook: string;
        instagram: string;
        linkedin: string;
        twitter: string;
        youtube: string;
        whatsapp: string;
    };
    seo: {
        title: string;
        description: string;
        titleTemplate: string;
    };
    smtp: {
        host: string;
        port: number;
        user: string;
        pass: string;
        from: string;
        fromName?: string;
    };
}

export default function SettingsManager() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isTestingSMTP, setIsTestingSMTP] = useState(false);
    const [data, setData] = useState<ISiteSettingsData | null>(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const settingsData = await getSettings();

            // Ensure smtp and other nested objects exist for old documents
            const sanitizedData = {
                ...settingsData,
                smtp: settingsData.smtp || { host: '', port: 587, user: '', pass: '', from: '', fromName: '' },
                socialLinks: settingsData.socialLinks || { facebook: '', instagram: '', linkedin: '', twitter: '', youtube: '', whatsapp: '' },
                seo: settingsData.seo || { title: '', description: '', titleTemplate: '' },
                logos: settingsData.logos || { main: '', favicon: '' }
            };

            setData(sanitizedData);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load settings");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        if (!data) return;
        setIsSaving(true);
        try {
            await updateSettings(data);
            toast.success("Settings updated successfully");
            router.refresh();
            fetchSettings();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update settings");
        } finally {
            setIsSaving(false);
        }
    };

    const handleTestSMTP = async () => {
        if (!data?.smtp) return;
        setIsTestingSMTP(true);
        try {
            const result = await testSMTPSettings(data.smtp);
            if (result.success) {
                toast.success(result.message || "SMTP settings are correct and test email sent!");
            } else {
                toast.error(result.error || "SMTP verification failed");
            }
        } catch (error: any) {
            toast.error("An unexpected error occurred during SMTP test");
        } finally {
            setIsTestingSMTP(false);
        }
    };

    if (isLoading) {
        return <div className="p-8">Loading settings...</div>;
    }

    if (!data) return null;

    return (
        <div className="max-w-5xl mx-auto pb-20">
            <div className="sticky top-0 z-50 bg-gray-50/80 backdrop-blur-md -mx-8 px-8 py-6 mb-8 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">General Settings</h1>
                    <p className="text-slate-500 text-sm">Manage your website identity and global configuration</p>
                </div>
                <button
                    onClick={() => {
                        handleSave();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    disabled={isSaving}
                    className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2 disabled:opacity-50"
                >
                    {isSaving ? "Saving..." : "Save Changes"}
                </button>
            </div>

            <div className="space-y-8 px-4 md:px-0">
                {/* General Info */}
                <CMSSection title="Website Identity">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Site Name</label>
                            <input
                                type="text"
                                value={data.siteName}
                                onChange={(e) => setData({ ...data, siteName: e.target.value })}
                                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Tagline</label>
                            <input
                                type="text"
                                value={data.tagline}
                                onChange={(e) => setData({ ...data, tagline: e.target.value })}
                                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-medium text-slate-700">Site Description</label>
                            <textarea
                                value={data.siteDescription}
                                onChange={(e) => setData({ ...data, siteDescription: e.target.value })}
                                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-24"
                            />
                        </div>
                    </div>
                </CMSSection>

                {/* Contact Info */}
                <CMSSection title="Contact Information">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Email Address</label>
                            <input
                                type="email"
                                value={data.contactEmail}
                                onChange={(e) => setData({ ...data, contactEmail: e.target.value })}
                                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Phone Number</label>
                            <input
                                type="text"
                                value={data.contactPhone}
                                onChange={(e) => setData({ ...data, contactPhone: e.target.value })}
                                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-medium text-slate-700">Physical Address</label>
                            <input
                                type="text"
                                value={data.address}
                                onChange={(e) => setData({ ...data, address: e.target.value })}
                                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-medium text-slate-700">Google Maps URL</label>
                            <input
                                type="text"
                                value={data.googleMapsUrl}
                                onChange={(e) => setData({ ...data, googleMapsUrl: e.target.value })}
                                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="https://www.google.com/maps/embed?..."
                            />
                        </div>
                    </div>
                </CMSSection>

                {/* Social Links */}
                <CMSSection title="Social Media Links">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(data.socialLinks).map(([platform, url]) => (
                            <div key={platform} className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 capitalize">{platform}</label>
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => setData({
                                        ...data,
                                        socialLinks: { ...data.socialLinks, [platform]: e.target.value }
                                    })}
                                    className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder={`https://${platform}.com/...`}
                                />
                            </div>
                        ))}
                    </div>
                </CMSSection>

                {/* WhatsApp Chat */}
                <CMSSection title="Direct Communication">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">WhatsApp Number</label>
                            <input
                                type="text"
                                value={data.socialLinks.whatsapp}
                                onChange={(e) => setData({
                                    ...data,
                                    socialLinks: { ...data.socialLinks, whatsapp: e.target.value }
                                })}
                                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="e.g. 97798XXXXXXXX"
                            />
                            <p className="text-xs text-slate-500">Enter number with country code (e.g. 97798XXXXXXXX) for the floating chat button.</p>
                        </div>
                    </div>
                </CMSSection>

                {/* Logos */}
                <CMSSection title="Logos & Brand">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <ImageUploader
                                value={data.logos.main}
                                onChange={(url) => setData({ ...data, logos: { ...data.logos, main: url } })}
                                label="Site Logo (Main)"
                            />
                        </div>
                        <div className="space-y-2">
                            <ImageUploader
                                value={data.logos.favicon}
                                onChange={(url) => setData({ ...data, logos: { ...data.logos, favicon: url } })}
                                label="Favicon"
                            />
                        </div>
                    </div>
                </CMSSection>

                {/* SEO Settings */}
                <CMSSection title="Global SEO (Fallbacks)">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Meta Title Template</label>
                            <input
                                type="text"
                                value={data.seo.titleTemplate}
                                onChange={(e) => setData({
                                    ...data,
                                    seo: { ...data.seo, titleTemplate: e.target.value }
                                })}
                                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="%s | Seekshya Academy"
                            />
                            <p className="text-[10px] text-slate-400 font-bold">Use %s where the page title should appear. Example: %s | BrandName</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Global Meta Title (Fallback)</label>
                            <input
                                type="text"
                                value={data.seo.title}
                                onChange={(e) => setData({
                                    ...data,
                                    seo: { ...data.seo, title: e.target.value }
                                })}
                                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Seekshya Academy | Your Target to Chartered Accountancy Success"
                            />
                            <p className="text-[10px] text-slate-400 font-bold">This is used if a page doesn't have its own meta title.</p>
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-medium text-slate-700">Global Meta Description (Fallback)</label>
                            <textarea
                                value={data.seo.description}
                                onChange={(e) => setData({
                                    ...data,
                                    seo: { ...data.seo, description: e.target.value }
                                })}
                                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-24"
                                placeholder="Brief description of the entire platform..."
                            />
                            <p className="text-[10px] text-slate-400 font-bold">This is used if a page doesn't have its own meta description.</p>
                        </div>
                    </div>
                </CMSSection>

                {/* SMTP Settings */}
                <CMSSection title="SMTP Configuration (Mailing System)">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">SMTP Host</label>
                            <input
                                type="text"
                                value={data.smtp.host}
                                onChange={(e) => setData({
                                    ...data,
                                    smtp: { ...data.smtp, host: e.target.value }
                                })}
                                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="smtp.gmail.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">SMTP Port</label>
                            <input
                                type="number"
                                value={data.smtp.port}
                                onChange={(e) => setData({
                                    ...data,
                                    smtp: { ...data.smtp, port: parseInt(e.target.value) }
                                })}
                                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="587"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">SMTP User (Username/Email)</label>
                            <input
                                type="text"
                                value={data.smtp.user}
                                onChange={(e) => setData({
                                    ...data,
                                    smtp: { ...data.smtp, user: e.target.value }
                                })}
                                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="your-email@gmail.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">SMTP Password (App Password)</label>
                            <input
                                type="password"
                                value={data.smtp.pass}
                                onChange={(e) => setData({
                                    ...data,
                                    smtp: { ...data.smtp, pass: e.target.value }
                                })}
                                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="••••••••••••••••"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Sender Name (From Name)</label>
                            <input
                                type="text"
                                value={data.smtp.fromName || ""}
                                onChange={(e) => setData({
                                    ...data,
                                    smtp: { ...data.smtp, fromName: e.target.value }
                                })}
                                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Seekshya Academy"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">From Email Address</label>
                            <input
                                type="email"
                                value={data.smtp.from}
                                onChange={(e) => setData({
                                    ...data,
                                    smtp: { ...data.smtp, from: e.target.value }
                                })}
                                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="noreply@lakshyaca.edu.np"
                            />
                        </div>
                        <div className="flex items-end">
                            <button
                                type="button"
                                onClick={handleTestSMTP}
                                disabled={isTestingSMTP || !data.smtp.host || !data.smtp.user}
                                className="w-full px-6 py-2.5 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-900 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isTestingSMTP ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Testing Connection...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-[20px]">send</span>
                                        Test & Verify SMTP
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </CMSSection>
            </div>
        </div>
    );
}
