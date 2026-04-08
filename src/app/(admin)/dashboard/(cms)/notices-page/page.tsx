"use client";

import CMSSection from "../../_components/CMSSection";
import CMSPage from "../../_components/CMSPage";
import IconChooser from "../../_components/IconChooser";

import { getNoticesPage, updateNoticesPage } from "@/actions/cms-actions";

const TABS = [
    { id: "hero", label: "Hero", icon: "campaign" },
    { id: "search", label: "Search", icon: "search" },
    { id: "widgets", label: "Widgets", icon: "widgets" },
    { id: "seo", label: "SEO", icon: "search" },
];

const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium";

export default function NoticesPageCMS() {
    return (
        <CMSPage
            title="Notices Page CMS"
            description="Manage the hero section content for the notices page."
            tabs={TABS}
            getAction={getNoticesPage}
            updateAction={updateNoticesPage}
            renderTabContent={(activeTab, data, setData) => (
                <>
                    {activeTab === "hero" && (
                        <CMSSection
                            title="Hero Section"
                            isVisible={data.hero.isVisible}
                            onVisibilityChange={(v) => setData({ ...data, hero: { ...data.hero, isVisible: v } })}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Badge</label>
                                    <input
                                        type="text"
                                        value={data.hero.badge}
                                        onChange={(e) => setData({ ...data, hero: { ...data.hero, badge: e.target.value } })}
                                        className={inputClass}
                                        placeholder="e.g., Seekshya Academy UPDATES"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={data.hero.title}
                                        onChange={(e) => setData({ ...data, hero: { ...data.hero, title: e.target.value } })}
                                        className={inputClass}
                                        placeholder="Page title"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Subtitle</label>
                                    <textarea
                                        value={data.hero.subtitle}
                                        onChange={(e) => setData({ ...data, hero: { ...data.hero, subtitle: e.target.value } })}
                                        rows={3}
                                        className={inputClass}
                                        placeholder="Page description"
                                    />
                                </div>
                            </div>
                        </CMSSection>
                    )}

                    {activeTab === "search" && (
                        <CMSSection
                            title="Search & Filters"
                            isVisible={data.search.isVisible}
                            onVisibilityChange={(v) => setData({ ...data, search: { ...data.search, isVisible: v } })}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Search Placeholder</label>
                                    <input
                                        type="text"
                                        value={data.search.placeholder}
                                        onChange={(e) => setData({ ...data, search: { ...data.search, placeholder: e.target.value } })}
                                        className={inputClass}
                                        placeholder="Search placeholder text"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">All Notices Button Text</label>
                                    <input
                                        type="text"
                                        value={data.search.allNoticesText}
                                        onChange={(e) => setData({ ...data, search: { ...data.search, allNoticesText: e.target.value } })}
                                        className={inputClass}
                                        placeholder="All Notices"
                                    />
                                </div>
                            </div>
                        </CMSSection>
                    )}

                    {activeTab === "widgets" && (
                        <>
                            <CMSSection
                                title="Quick Links Widget"
                                isVisible={data.quickLinksWidget.isVisible}
                                onVisibilityChange={(v) => setData({ ...data, quickLinksWidget: { ...data.quickLinksWidget, isVisible: v } })}
                            >
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Widget Title</label>
                                        <input
                                            type="text"
                                            value={data.quickLinksWidget.title}
                                            onChange={(e) => setData({ ...data, quickLinksWidget: { ...data.quickLinksWidget, title: e.target.value } })}
                                            className={inputClass}
                                            placeholder="Quick Links"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="block text-sm font-bold text-gray-700">Links</label>
                                        {data.quickLinksWidget.links?.map((link: { text: string; url: string; icon: string; external: boolean }, index: number) => (
                                            <div key={index} className="flex gap-2 items-end p-4 bg-gray-50 rounded-xl border border-gray-100">
                                                <div className="flex-1">
                                                    <label className="block text-xs text-gray-600 mb-1 font-bold">Link Text</label>
                                                    <input
                                                        type="text"
                                                        value={link.text}
                                                        onChange={(e) => {
                                                            const newLinks = [...data.quickLinksWidget.links];
                                                            newLinks[index].text = e.target.value;
                                                            setData({ ...data, quickLinksWidget: { ...data.quickLinksWidget, links: newLinks } });
                                                        }}
                                                        className={inputClass}
                                                        placeholder="Link text"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <label className="block text-xs text-gray-600 mb-1 font-bold">URL</label>
                                                    <input
                                                        type="text"
                                                        value={link.url}
                                                        onChange={(e) => {
                                                            const newLinks = [...data.quickLinksWidget.links];
                                                            newLinks[index].url = e.target.value;
                                                            setData({ ...data, quickLinksWidget: { ...data.quickLinksWidget, links: newLinks } });
                                                        }}
                                                        className={inputClass}
                                                        placeholder="https://example.com"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <label className="block text-xs text-gray-600 mb-1 font-bold">Icon</label>
                                                    <IconChooser
                                                        value={link.icon}
                                                        onChange={(icon) => {
                                                            const newLinks = [...data.quickLinksWidget.links];
                                                            newLinks[index].icon = icon;
                                                            setData({ ...data, quickLinksWidget: { ...data.quickLinksWidget, links: newLinks } });
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex items-center gap-1 mb-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={link.external}
                                                        onChange={(e) => {
                                                            const newLinks = [...data.quickLinksWidget.links];
                                                            newLinks[index].external = e.target.checked;
                                                            setData({ ...data, quickLinksWidget: { ...data.quickLinksWidget, links: newLinks } });
                                                        }}
                                                        className="w-4 h-4 rounded text-primary focus:ring-primary"
                                                    />
                                                    <label className="text-xs text-gray-600 font-bold">External</label>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        const newLinks = data.quickLinksWidget.links.filter((_: any, i: number) => i !== index);
                                                        setData({ ...data, quickLinksWidget: { ...data.quickLinksWidget, links: newLinks } });
                                                    }}
                                                    className="px-4 py-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            onClick={() => {
                                                const newLinks = [...(data.quickLinksWidget.links || []), { text: "", url: "", icon: "open_in_new", external: true }];
                                                setData({ ...data, quickLinksWidget: { ...data.quickLinksWidget, links: newLinks } });
                                            }}
                                            className="px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all font-bold text-sm"
                                        >
                                            Add Link
                                        </button>
                                    </div>
                                </div>
                            </CMSSection>

                            <CMSSection
                                title="Support Widget"
                                isVisible={data.supportWidget.isVisible}
                                onVisibilityChange={(v) => setData({ ...data, supportWidget: { ...data.supportWidget, isVisible: v } })}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                                        <input
                                            type="text"
                                            value={data.supportWidget.title}
                                            onChange={(e) => setData({ ...data, supportWidget: { ...data.supportWidget, title: e.target.value } })}
                                            className={inputClass}
                                            placeholder="Need Help?"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                        <textarea
                                            value={data.supportWidget.description}
                                            onChange={(e) => setData({ ...data, supportWidget: { ...data.supportWidget, description: e.target.value } })}
                                            rows={3}
                                            className={inputClass}
                                            placeholder="Support description"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                                        <input
                                            type="text"
                                            value={data.supportWidget.phone}
                                            onChange={(e) => setData({ ...data, supportWidget: { ...data.supportWidget, phone: e.target.value } })}
                                            className={inputClass}
                                            placeholder="+977-1-4XXXXXX"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                                        <input
                                            type="text"
                                            value={data.supportWidget.email}
                                            onChange={(e) => setData({ ...data, supportWidget: { ...data.supportWidget, email: e.target.value } })}
                                            className={inputClass}
                                            placeholder="info@lakshyaca.com"
                                        />
                                    </div>
                                </div>
                            </CMSSection>
                        </>
                    )}

                    {activeTab === "seo" && (
                        <CMSSection title="SEO Settings">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Meta Title</label>
                                    <input
                                        type="text"
                                        value={data.seo?.title || ""}
                                        onChange={(e) => setData({ ...data, seo: { ...data.seo, title: e.target.value } })}
                                        className={inputClass}
                                        placeholder="e.g. Notices | Seekshya Academy"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Meta Description</label>
                                    <textarea
                                        value={data.seo?.description || ""}
                                        onChange={(e) => setData({ ...data, seo: { ...data.seo, description: e.target.value } })}
                                        rows={3}
                                        className={inputClass}
                                        placeholder="Brief description for search engines..."
                                    />
                                </div>
                            </div>
                        </CMSSection>
                    )}
                </>
            )}
        />
    );
}
