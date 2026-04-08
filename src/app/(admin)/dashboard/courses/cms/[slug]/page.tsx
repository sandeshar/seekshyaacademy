"use client";

import { useState, use } from "react";
import Link from "next/link";
import ImageUploader from "../../../_components/ImageUploader";
import IconChooser from "../../../_components/IconChooser";
import CMSSection from "../../../_components/CMSSection";
import CMSPage from "../../../_components/CMSPage";
import RichTextEditor from "@/app/(admin)/dashboard/_components/RichTextEditor";
import { toast } from "react-hot-toast";
import { getCoursePage, updateCoursePage } from "@/actions/cms-actions";

const TABS = [
    { id: "hero", label: "Hero", icon: "home" },
    { id: "courses", label: "Course List", icon: "school" },
    { id: "content", label: "Body Content", icon: "article" },
    { id: "rich-text", label: "Rich Blocks", icon: "widgets" },
    { id: "seo", label: "SEO", icon: "search" },
    { id: "settings", label: "Settings", icon: "settings" },
];

interface IRichTextItem {
    title: string;
    content: string;
    icon?: string;
}

interface ICourseConfig {
    name: string;
    slug: string;
    type: 'category' | 'subcategory' | 'default';
    hero: {
        isVisible: boolean;
        badgeText: string;
        title: string;
        description: string;
        backgroundImage: string;
        overlayOpacity?: number;
        primaryButton: { text: string; link: string; icon?: string; };
        secondaryButton: { text: string; link: string; icon?: string; };
    };
    content?: string;
    richTextItems?: IRichTextItem[];
    courses?: {
        title: string;
        subtitle: string;
        items: Array<{
            level: string;
            slug: string;
            type: string;
            description: string;
            icon: string;
            popular: boolean;
            features: string[];
        }>;
    };
    seo?: { title: string; description: string; };
}

export default function CourseConfigEditor({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium";

    return (
        <CMSPage
            title="Course Page Content"
            description={`Designing the presence for ${slug}`}
            getAction={getCoursePage}
            updateAction={(data) => {
                if (data.categories) {
                    data.categories = data.categories.map((cat: any) => ({
                        ...cat,
                        courses: cat.courses ? {
                            ...cat.courses,
                            items: cat.courses.items?.map((item: any) => ({
                                ...item,
                                features: item.features?.filter((f: string) => f.trim()) || []
                            }))
                        } : cat.courses
                    }));
                }
                return updateCoursePage(data);
            }}
            tabs={TABS}
            renderTabContent={(activeTab: string, data: any, setData: (d: any) => void) => {
                const configs = data?.categories || [];
                const index = configs.findIndex((c: ICourseConfig) => c.slug === slug);

                if (index === -1) {
                    return (
                        <div className="p-12 text-center bg-white rounded-xl border border-dashed">
                            <h3 className="text-lg font-bold text-gray-900">Configuration Not Found</h3>
                            <p className="text-gray-500 mb-6">This page hasn't been initialized yet.</p>
                            <Link href="/dashboard/courses/cms" className="text-blue-600 font-bold hover:text-blue-700 transition-colors">
                                Return to listings
                            </Link>
                        </div>
                    );
                }

                const config = configs[index];

                const updateConfig = (updates: Partial<ICourseConfig>) => {
                    const newConfigs = [...configs];
                    newConfigs[index] = { ...newConfigs[index], ...updates };
                    setData({ ...data, categories: newConfigs });
                };

                const updateHero = (updates: any) => {
                    updateConfig({ hero: { ...config.hero, ...updates } });
                };

                return (
                    <div className="space-y-8">
                        {activeTab === "hero" && (
                            <CMSSection
                                title="Hero Presentation"
                                isVisible={config.hero.isVisible}
                                onVisibilityChange={(v) => updateHero({ isVisible: v })}
                            >
                                <div className="space-y-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Display Name (Admin Only)</label>
                                        <input
                                            type="text"
                                            value={config.name}
                                            onChange={(e) => updateConfig({ name: e.target.value })}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image</label>
                                        <ImageUploader
                                            value={config.hero.backgroundImage}
                                            onChange={(url) => updateHero({ backgroundImage: url })}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Overlay Opacity (%)</label>
                                        <div className="flex items-center gap-4">
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                step="5"
                                                value={config.hero.overlayOpacity ?? 40}
                                                onChange={(e) => updateHero({ overlayOpacity: parseInt(e.target.value) })}
                                                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                            />
                                            <span className="text-sm font-bold text-gray-900 w-12">{config.hero.overlayOpacity ?? 40}%</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Badge Text</label>
                                            <input
                                                type="text"
                                                value={config.hero.badgeText}
                                                onChange={(e) => updateHero({ badgeText: e.target.value })}
                                                className={inputClass}
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Main Title</label>
                                            <input
                                                type="text"
                                                value={config.hero.title}
                                                onChange={(e) => updateHero({ title: e.target.value })}
                                                className={inputClass}
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                            <textarea
                                                rows={3}
                                                value={config.hero.description}
                                                onChange={(e) => updateHero({ description: e.target.value })}
                                                className={inputClass}
                                            />
                                        </div>
                                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-4">
                                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Primary Action</h4>
                                            <IconChooser
                                                value={config.hero.primaryButton.icon || ''}
                                                onChange={(icon) => updateHero({ primaryButton: { ...config.hero.primaryButton, icon } })}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Button Text"
                                                value={config.hero.primaryButton.text}
                                                onChange={(e) => updateHero({ primaryButton: { ...config.hero.primaryButton, text: e.target.value } })}
                                                className={inputClass}
                                            />
                                            <input
                                                type="text"
                                                placeholder="URL / Link"
                                                value={config.hero.primaryButton.link}
                                                onChange={(e) => updateHero({ primaryButton: { ...config.hero.primaryButton, link: e.target.value } })}
                                                className={inputClass}
                                            />
                                        </div>
                                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-4">
                                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Secondary Action</h4>
                                            <IconChooser
                                                value={config.hero.secondaryButton.icon || ''}
                                                onChange={(icon) => updateHero({ secondaryButton: { ...config.hero.secondaryButton, icon } })}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Button Text"
                                                value={config.hero.secondaryButton.text}
                                                onChange={(e) => updateHero({ secondaryButton: { ...config.hero.secondaryButton, text: e.target.value } })}
                                                className={inputClass}
                                            />
                                            <input
                                                type="text"
                                                placeholder="URL / Link"
                                                value={config.hero.secondaryButton.link}
                                                onChange={(e) => updateHero({ secondaryButton: { ...config.hero.secondaryButton, link: e.target.value } })}
                                                className={inputClass}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CMSSection>
                        )}

                        {activeTab === "courses" && (
                            <CMSSection title="Course Offerings">
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Grid Title</label>
                                            <input
                                                type="text"
                                                value={config.courses?.title || ""}
                                                onChange={(e) => {
                                                    const currentCourses = config.courses || { title: "", subtitle: "", items: [] };
                                                    updateConfig({ courses: { ...currentCourses, title: e.target.value } });
                                                }}
                                                className={inputClass}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Grid Subtitle</label>
                                            <input
                                                type="text"
                                                value={config.courses?.subtitle || ""}
                                                onChange={(e) => {
                                                    const currentCourses = config.courses || { title: "", subtitle: "", items: [] };
                                                    updateConfig({ courses: { ...currentCourses, subtitle: e.target.value } });
                                                }}
                                                className={inputClass}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-4 border-t border-slate-100">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-bold text-slate-800 tracking-tight">Manage Program Cards</h4>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const currentCourses = config.courses || { title: "", subtitle: "", items: [] };
                                                    updateConfig({
                                                        courses: {
                                                            ...currentCourses,
                                                            items: [...(currentCourses.items || []), { level: "", slug: "", type: "", description: "", features: [], icon: "school", popular: false }]
                                                        }
                                                    });
                                                }}
                                                className="text-primary font-black text-[10px] uppercase tracking-widest flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full hover:bg-primary/10 transition-all"
                                            >
                                                <span className="material-symbols-outlined text-sm">add</span>
                                                Add Course Card
                                            </button>
                                        </div>

                                        {(config.courses?.items || []).map((item: any, idx: number) => (
                                            <div key={idx} className="p-8 bg-slate-50/50 rounded-4xl border border-slate-100 space-y-6 relative group/item">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const currentCourses = config.courses || { title: "", subtitle: "", items: [] };
                                                        updateConfig({
                                                            courses: {
                                                                ...currentCourses,
                                                                items: currentCourses.items.filter((_: any, i: number) => i !== idx)
                                                            }
                                                        });
                                                    }}
                                                    className="absolute top-6 right-6 text-slate-300 hover:text-rose-500 transition-colors"
                                                >
                                                    <span className="material-symbols-outlined">delete_sweep</span>
                                                </button>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                    <div>
                                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Program Title / Level</label>
                                                        <input
                                                            value={item.level}
                                                            onChange={(e) => {
                                                                const items = [...(config.courses?.items || [])];
                                                                items[idx] = { ...items[idx], level: e.target.value };
                                                                updateConfig({ courses: { ...config.courses, items } });
                                                            }}
                                                            className={inputClass}
                                                            placeholder="e.g. CA Foundation"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Internal Slug</label>
                                                        <input
                                                            value={item.slug}
                                                            onChange={(e) => {
                                                                const items = [...(config.courses?.items || [])];
                                                                items[idx] = { ...items[idx], slug: e.target.value };
                                                                updateConfig({ courses: { ...config.courses, items } });
                                                            }}
                                                            className={inputClass}
                                                            placeholder="foundation"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Course Type Tag</label>
                                                        <input
                                                            value={item.type}
                                                            onChange={(e) => {
                                                                const items = [...(config.courses?.items || [])];
                                                                items[idx] = { ...items[idx], type: e.target.value };
                                                                updateConfig({ courses: { ...config.courses, items } });
                                                            }}
                                                            className={inputClass}
                                                            placeholder="Full Course"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                                    <div className="md:col-span-1">
                                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Visual Icon</label>
                                                        <IconChooser
                                                            value={item.icon || "school"}
                                                            onChange={(icon) => {
                                                                const items = [...(config.courses?.items || [])];
                                                                items[idx] = { ...items[idx], icon };
                                                                updateConfig({ courses: { ...config.courses, items } });
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="md:col-span-3">
                                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Short Description</label>
                                                        <textarea
                                                            value={item.description}
                                                            onChange={(e) => {
                                                                const items = [...(config.courses?.items || [])];
                                                                items[idx] = { ...items[idx], description: e.target.value };
                                                                updateConfig({ courses: { ...config.courses, items } });
                                                            }}
                                                            className={inputClass}
                                                            rows={2}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 p-4 bg-white rounded-2xl border border-slate-100 w-fit">
                                                    <input
                                                        type="checkbox"
                                                        id={`popular-${idx}`}
                                                        checked={item.popular}
                                                        onChange={(e) => {
                                                            const items = [...(config.courses?.items || [])];
                                                            items[idx] = { ...items[idx], popular: e.target.checked };
                                                            updateConfig({ courses: { ...config.courses, items } });
                                                        }}
                                                        className="w-5 h-5 rounded-lg text-primary border-slate-200 focus:ring-primary/20"
                                                    />
                                                    <label htmlFor={`popular-${idx}`} className="text-sm font-bold text-slate-600 cursor-pointer">Feature as Popular</label>
                                                </div>

                                                <div>
                                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Highlights (One per line)</label>
                                                    <textarea
                                                        value={(item.features || []).join('\n')}
                                                        onChange={(e) => {
                                                            const items = [...(config.courses?.items || [])];
                                                            items[idx] = { ...items[idx], features: e.target.value.split('\n') };
                                                            updateConfig({ courses: { ...config.courses, items } });
                                                        }}
                                                        className={inputClass}
                                                        rows={3}
                                                        placeholder="Expert Faculty&#10;Study Materials&#10;Mock Tests"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CMSSection>
                        )}

                        {activeTab === "content" && (
                            <CMSSection title="Page Narrative Content">
                                <RichTextEditor
                                    value={config.content || ""}
                                    onChange={(html) => updateConfig({ content: html })}
                                    placeholder="Write main course details here..."
                                />
                            </CMSSection>
                        )}

                        {activeTab === "rich-text" && (
                            <CMSSection title="Content Modules">
                                <div className="space-y-6">
                                    {(config.richTextItems || []).map((item: IRichTextItem, idx: number) => (
                                        <div key={idx} className="p-8 border border-slate-100 rounded-[2.5rem] relative bg-slate-50/50">
                                            <button
                                                onClick={() => {
                                                    const items = [...(config.richTextItems || [])];
                                                    items.splice(idx, 1);
                                                    updateConfig({ richTextItems: items });
                                                }}
                                                className="absolute top-6 right-6 text-slate-300 hover:text-rose-500 transition-colors"
                                            >
                                                <span className="material-symbols-outlined">delete_sweep</span>
                                            </button>
                                            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                                                <div className="md:col-span-2">
                                                    <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">Module Icon</label>
                                                    <IconChooser
                                                        value={item.icon || "menu_book"}
                                                        onChange={(icon) => {
                                                            const items = [...(config.richTextItems || [])];
                                                            items[idx].icon = icon;
                                                            updateConfig({ richTextItems: items });
                                                        }}
                                                    />
                                                </div>
                                                <div className="md:col-span-10 space-y-4">
                                                    <div>
                                                        <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">Module Heading</label>
                                                        <input
                                                            type="text"
                                                            value={item.title}
                                                            onChange={(e) => {
                                                                const items = [...(config.richTextItems || [])];
                                                                items[idx].title = e.target.value;
                                                                updateConfig({ richTextItems: items });
                                                            }}
                                                            className={inputClass}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">Module Description</label>
                                                        <RichTextEditor
                                                            value={item.content}
                                                            onChange={(html) => {
                                                                const items = [...(config.richTextItems || [])];
                                                                items[idx].content = html;
                                                                updateConfig({ richTextItems: items });
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => {
                                            const items = [...(config.richTextItems || []), { title: "New Section", content: "", icon: "add" }];
                                            updateConfig({ richTextItems: items });
                                        }}
                                        className="w-full py-6 border-2 border-dashed border-slate-200 rounded-4xl text-slate-400 hover:text-primary hover:border-primary transition-all font-black"
                                    >
                                        + Add New Content Module
                                    </button>
                                </div>
                            </CMSSection>
                        )}

                        {activeTab === "seo" && (
                            <CMSSection title="Global Optimization">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Meta Title</label>
                                        <input
                                            type="text"
                                            value={config.seo?.title || ""}
                                            onChange={(e) => updateConfig({ seo: { ...(config.seo || { description: "" }), title: e.target.value } })}
                                            className={inputClass}
                                            placeholder="Page Title"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Meta Description</label>
                                        <textarea
                                            rows={4}
                                            value={config.seo?.description || ""}
                                            onChange={(e) => updateConfig({ seo: { ...(config.seo || { title: "" }), description: e.target.value } })}
                                            className={inputClass}
                                            placeholder="Optimize for search engines..."
                                        />
                                    </div>
                                </div>
                            </CMSSection>
                        )}

                        {activeTab === "settings" && (
                            <div className="space-y-12">
                                <CMSSection title="Danger Zone">
                                    <div className="p-8 bg-rose-50 rounded-4xl border border-rose-100">
                                        <h3 className="text-xl font-black text-rose-900 mb-2 tracking-tight">Destroy Configuration</h3>
                                        <p className="text-rose-600 font-medium mb-8 text-sm">
                                            This will permanently delete specifically designed content for this course slug. This action cannot be undone.
                                        </p>
                                        <button
                                            type="button"
                                            onClick={async () => {
                                                if (!confirm("Permanently destroy this configuration?")) return;
                                                const updated = {
                                                    ...data,
                                                    categories: configs.filter((_: any, i: number) => i !== index)
                                                };
                                                const loadingToast = toast.loading("Destroying...");
                                                try {
                                                    await updateCoursePage(updated);
                                                    toast.success("Destroyed", { id: loadingToast });
                                                    window.location.href = "/dashboard/courses/cms";
                                                } catch (error) {
                                                    toast.error("Failed to destroy", { id: loadingToast });
                                                }
                                            }}
                                            className="px-8 py-3 bg-rose-600 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-rose-700 transition-all shadow-lg shadow-rose-200"
                                        >
                                            Confirm Destruction
                                        </button>
                                    </div>
                                </CMSSection>
                            </div>
                        )}
                    </div>
                );
            }}
        />
    );
}



