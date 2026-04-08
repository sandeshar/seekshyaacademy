"use client";

import ImageUploader from "../../_components/ImageUploader";
import IconChooser from "../../_components/IconChooser";
import CMSSection from "../../_components/CMSSection";
import CMSPage from "../../_components/CMSPage";
import { getFacultyPage, updateFacultyPage } from "@/actions/cms-actions";

const TABS = [
    { id: "hero", label: "Hero Section", icon: "home" },
    { id: "grid", label: "Faculty Grid", icon: "grid_view" },
    { id: "cta", label: "CTA Section", icon: "call_to_action" },
    { id: "seo", label: "SEO Settings", icon: "search" },
];

export default function FacultyCMS() {
    return (
        <CMSPage
            title="Faculty Page Management"
            description="Manage the content and settings for your faculty listing page"
            getAction={getFacultyPage}
            updateAction={updateFacultyPage}
            tabs={TABS}
            renderTabContent={(activeTab: string, data: any, setData: (d: any) => void) => (
                <>
                    {activeTab === "hero" && (
                        <CMSSection
                            title="Hero Section Settings"
                            isVisible={data.hero.isVisible}
                            onVisibilityChange={(v: boolean) => setData({ ...data, hero: { ...data.hero, isVisible: v } })}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Hero Image</label>
                                    <ImageUploader
                                        value={data.hero.backgroundImage}
                                        onChange={(url: string) => setData({ ...data, hero: { ...data.hero, backgroundImage: url } })}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-sm font-bold text-gray-700 mb-2 flex justify-between">
                                        <span>Image Overlay Intensity</span>
                                        <span className="text-primary">{data.hero.overlayOpacity || 20}%</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        step="5"
                                        value={data.hero.overlayOpacity || 20}
                                        onChange={(e) => setData({ ...data, hero: { ...data.hero, overlayOpacity: parseInt(e.target.value) } })}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                    <div className="flex justify-between text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-wider">
                                        <span>None</span>
                                        <span>Soft</span>
                                        <span>Strong</span>
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Badge Text</label>
                                    <input
                                        type="text"
                                        value={data.hero.badgeText}
                                        onChange={(e) => setData({ ...data, hero: { ...data.hero, badgeText: e.target.value } })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={data.hero.title}
                                        onChange={(e) => setData({ ...data, hero: { ...data.hero, title: e.target.value } })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                    <textarea
                                        rows={3}
                                        value={data.hero.description}
                                        onChange={(e) => setData({ ...data, hero: { ...data.hero, description: e.target.value } })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                                    />
                                </div>
                                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                    <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-lg">link</span>
                                        Primary Button
                                    </h3>
                                    <div className="space-y-4">
                                        <IconChooser
                                            value={data.hero.primaryButton.icon || ''}
                                            onChange={(icon) => setData({ ...data, hero: { ...data.hero, primaryButton: { ...data.hero.primaryButton, icon } } })}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Button Text"
                                            value={data.hero.primaryButton.text}
                                            onChange={(e) => setData({ ...data, hero: { ...data.hero, primaryButton: { ...data.hero.primaryButton, text: e.target.value } } })}
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
                                        />
                                        <input
                                            type="text"
                                            placeholder="URL / Link"
                                            value={data.hero.primaryButton.link}
                                            onChange={(e) => setData({ ...data, hero: { ...data.hero, primaryButton: { ...data.hero.primaryButton, link: e.target.value } } })}
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
                                        />
                                    </div>
                                </div>
                                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                    <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-secondary text-lg">link</span>
                                        Secondary Button
                                    </h3>
                                    <div className="space-y-4">
                                        <IconChooser
                                            value={data.hero.secondaryButton.icon || ''}
                                            onChange={(icon) => setData({ ...data, hero: { ...data.hero, secondaryButton: { ...data.hero.secondaryButton, icon } } })}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Button Text"
                                            value={data.hero.secondaryButton.text}
                                            onChange={(e) => setData({ ...data, hero: { ...data.hero, secondaryButton: { ...data.hero.secondaryButton, text: e.target.value } } })}
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-secondary/20"
                                        />
                                        <input
                                            type="text"
                                            placeholder="URL / Link"
                                            value={data.hero.secondaryButton.link}
                                            onChange={(e) => setData({ ...data, hero: { ...data.hero, secondaryButton: { ...data.hero.secondaryButton, link: e.target.value } } })}
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-secondary/20"
                                        />
                                    </div>
                                </div>
                            </div>
                        </CMSSection>
                    )}

                    {activeTab === "grid" && (
                        <CMSSection title="Faculty Grid Content">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Section Title</label>
                                    <input
                                        type="text"
                                        value={data.grid.title}
                                        onChange={(e) => setData({ ...data, grid: { ...data.grid, title: e.target.value } })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Section Description</label>
                                    <textarea
                                        rows={2}
                                        value={data.grid.description}
                                        onChange={(e) => setData({ ...data, grid: { ...data.grid, description: e.target.value } })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    />
                                </div>
                            </div>
                        </CMSSection>
                    )}

                    {activeTab === "cta" && (
                        <CMSSection
                            title="CTA Section Settings"
                            isVisible={data.cta?.isVisible}
                            onVisibilityChange={(v: boolean) => setData({ ...data, cta: { ...data.cta, isVisible: v } })}
                        >
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={data.cta?.title || ""}
                                        onChange={(e) => setData({ ...data, cta: { ...data.cta, title: e.target.value } })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                    <textarea
                                        rows={3}
                                        value={data.cta?.description || ""}
                                        onChange={(e) => setData({ ...data, cta: { ...data.cta, description: e.target.value } })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                        <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">Primary Button</h3>
                                        <div className="space-y-4">
                                            <IconChooser
                                                value={data.cta?.primaryButton?.icon || ""}
                                                onChange={(icon) => setData({ ...data, cta: { ...data.cta, primaryButton: { ...data.cta.primaryButton, icon } } })}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Text"
                                                value={data.cta?.primaryButton?.text || ""}
                                                onChange={(e) => setData({ ...data, cta: { ...data.cta, primaryButton: { ...data.cta.primaryButton, text: e.target.value } } })}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-xl"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Link"
                                                value={data.cta?.primaryButton?.link || ""}
                                                onChange={(e) => setData({ ...data, cta: { ...data.cta, primaryButton: { ...data.cta.primaryButton, link: e.target.value } } })}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-xl"
                                            />
                                        </div>
                                    </div>
                                    <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                        <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">Secondary Button</h3>
                                        <div className="space-y-4">
                                            <IconChooser
                                                value={data.cta?.secondaryButton?.icon || ""}
                                                onChange={(icon) => setData({ ...data, cta: { ...data.cta, secondaryButton: { ...data.cta.secondaryButton, icon } } })}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Text"
                                                value={data.cta?.secondaryButton?.text || ""}
                                                onChange={(e) => setData({ ...data, cta: { ...data.cta, secondaryButton: { ...data.cta.secondaryButton, text: e.target.value } } })}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-xl"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Link"
                                                value={data.cta?.secondaryButton?.link || ""}
                                                onChange={(e) => setData({ ...data, cta: { ...data.cta, secondaryButton: { ...data.cta.secondaryButton, link: e.target.value } } })}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-xl"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CMSSection>
                    )}

                    {activeTab === "seo" && (
                        <CMSSection title="SEO Settings">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Page Title (Meta Title)</label>
                                    <input
                                        type="text"
                                        value={data.seo.title}
                                        onChange={(e) => setData({ ...data, seo: { ...data.seo, title: e.target.value } })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Meta Description</label>
                                    <textarea
                                        rows={4}
                                        value={data.seo.description}
                                        onChange={(e) => setData({ ...data, seo: { ...data.seo, description: e.target.value } })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                                    />
                                    <p className="mt-2 text-xs text-gray-400 font-medium">Character count: {data.seo.description?.length || 0} (Recommended: 150-160 characters)</p>
                                </div>
                            </div>
                        </CMSSection>
                    )}
                </>
            )}
        />
    );
}
