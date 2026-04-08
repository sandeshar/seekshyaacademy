"use client";

import CMSSection from "../../_components/CMSSection";
import CMSPage from "../../_components/CMSPage";
import { getLearningHubPage, updateLearningHubPage } from "@/actions/cms-actions";

const TABS = [
    { id: "hero", label: "Hero", icon: "book" },
    { id: "cta", label: "CTA Section", icon: "campaign" },
    { id: "seo", label: "SEO Settings", icon: "search" },
];

const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium";

export default function LearningHubCMS() {
    return (
        <CMSPage
            title="Learning Hub Settings"
            description="Customize the appearance and content of your blog and resource center."
            getAction={getLearningHubPage}
            updateAction={updateLearningHubPage}
            tabs={TABS}
            renderTabContent={(activeTab, data, setData) => (
                <>
                    {activeTab === "hero" && (
                        <CMSSection
                            title="Hero Section"
                            isVisible={data.hero.isVisible}
                            onVisibilityChange={(v) => setData({ ...data, hero: { ...data.hero, isVisible: v } })}
                        >
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={data.hero.title}
                                        onChange={(e) => setData({ ...data, hero: { ...data.hero, title: e.target.value } })}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Subtitle</label>
                                    <textarea
                                        rows={3}
                                        value={data.hero.subtitle}
                                        onChange={(e) => setData({ ...data, hero: { ...data.hero, subtitle: e.target.value } })}
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                        </CMSSection>
                    )}

                    {activeTab === "cta" && (
                        <CMSSection
                            title="Call to Action Section"
                            isVisible={data.cta.isVisible}
                            onVisibilityChange={(v) => setData({ ...data, cta: { ...data.cta, isVisible: v } })}
                        >
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">CTA Title</label>
                                    <input
                                        type="text"
                                        value={data.cta.title}
                                        onChange={(e) => setData({ ...data, cta: { ...data.cta, title: e.target.value } })}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                    <textarea
                                        rows={3}
                                        value={data.cta.description}
                                        onChange={(e) => setData({ ...data, cta: { ...data.cta, description: e.target.value } })}
                                        className={inputClass}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <h4 className="font-bold text-sm mb-3">Primary Button</h4>
                                        <input
                                            type="text"
                                            placeholder="Text"
                                            value={data.cta.primaryButton.text}
                                            onChange={(e) => setData({ ...data, cta: { ...data.cta, primaryButton: { ...data.cta.primaryButton, text: e.target.value } } })}
                                            className={inputClass}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Link"
                                            value={data.cta.primaryButton.link}
                                            onChange={(e) => setData({ ...data, cta: { ...data.cta, primaryButton: { ...data.cta.primaryButton, link: e.target.value } } })}
                                            className={`${inputClass} mt-2`}
                                        />
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <h4 className="font-bold text-sm mb-3">Secondary Button</h4>
                                        <input
                                            type="text"
                                            placeholder="Text"
                                            value={data.cta.secondaryButton.text}
                                            onChange={(e) => setData({ ...data, cta: { ...data.cta, secondaryButton: { ...data.cta.secondaryButton, text: e.target.value } } })}
                                            className={inputClass}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Link"
                                            value={data.cta.secondaryButton.link}
                                            onChange={(e) => setData({ ...data, cta: { ...data.cta, secondaryButton: { ...data.cta.secondaryButton, link: e.target.value } } })}
                                            className={`${inputClass} mt-2`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CMSSection>
                    )}

                    {activeTab === "seo" && (
                        <CMSSection title="Search Engine Optimization">
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Meta Title</label>
                                    <input
                                        type="text"
                                        value={data.seo.title}
                                        onChange={(e) => setData({ ...data, seo: { ...data.seo, title: e.target.value } })}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Meta Description</label>
                                    <textarea
                                        rows={3}
                                        value={data.seo.description}
                                        onChange={(e) => setData({ ...data, seo: { ...data.seo, description: e.target.value } })}
                                        className={inputClass}
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
