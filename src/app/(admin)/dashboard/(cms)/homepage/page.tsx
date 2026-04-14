"use client";

import ImageUploader from "../../_components/ImageUploader";
import IconChooser from "../../_components/IconChooser";
import CMSSection from "../../_components/CMSSection";
import CMSPage from "../../_components/CMSPage";
import { getHomepage, updateHomepage } from "@/actions/cms-actions";
import { getTeachers } from "@/actions/teachers";
import { useEffect, useState } from "react";

const TABS = [
    { id: "hero", label: "Hero", icon: "bolt" },
    { id: "stats", label: "Stats Bar", icon: "account_balance_wallet" },
    { id: "about", label: "What is ACCA", icon: "info" },
    { id: "why", label: "Why Choose Us", icon: "thumb_up" },
    { id: "eligibility", label: "Eligibility", icon: "route" },
    { id: "structure", label: "Structure", icon: "account_tree" },
    { id: "mentors", label: "Mentors", icon: "groups" },
    { id: "pricing", label: "Pricing", icon: "payments" },
    { id: "faq", label: "FAQ", icon: "quiz" },
    { id: "cta", label: "CTA", icon: "campaign" },
    { id: "seo", label: "SEO", icon: "search" },
];

export default function HomepageCMS() {
    const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium";
    const [allTeachers, setAllTeachers] = useState<any[]>([]);

    useEffect(() => {
        getTeachers().then(setAllTeachers).catch(console.error);
    }, []);

    return (
        <CMSPage
            title="Homepage CMS"
            description="Manage the content of your landing page."
            getAction={getHomepage}
            updateAction={updateHomepage}
            tabs={TABS}
            renderTabContent={(activeTab: string, data: any, setData: (data: any) => void) => (
                <>
                    {activeTab === "hero" && (
                        <CMSSection
                            title="Hero Section"
                            isVisible={data.hero.isVisible}
                            onVisibilityChange={(v) => setData({ ...data, hero: { ...data.hero, isVisible: v } })}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Background Image</label>
                                    <ImageUploader
                                        value={data.hero.backgroundImage}
                                        onChange={(url) => setData({ ...data, hero: { ...data.hero, backgroundImage: url } })}
                                    />
                                </div>
                                <div className="md:col-span-1">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Overlay Color</label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="color"
                                            value={data.hero.overlayColor || "#ffffff"}
                                            onChange={(e) => setData({ ...data, hero: { ...data.hero, overlayColor: e.target.value } })}
                                            className="w-12 h-12 rounded-xl border border-gray-200 cursor-pointer overflow-hidden p-1 bg-white"
                                        />
                                        <input
                                            type="text"
                                            value={data.hero.overlayColor || "#ffffff"}
                                            onChange={(e) => setData({ ...data, hero: { ...data.hero, overlayColor: e.target.value } })}
                                            placeholder="#ffffff"
                                            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-mono text-sm uppercase"
                                        />
                                    </div>
                                </div>
                                <div className="md:col-span-1">
                                    <label className="text-sm font-bold text-gray-700 mb-2 flex justify-between">
                                        <span>Overlay Opacity</span>
                                        <span className="text-primary">{data.hero.overlayOpacity || 10}%</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        step="5"
                                        value={data.hero.overlayOpacity || 10}
                                        onChange={(e) => setData({ ...data, hero: { ...data.hero, overlayOpacity: parseInt(e.target.value) } })}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary mt-3"
                                    />
                                    <div className="flex justify-between text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-wider">
                                        <span>Clear</span>
                                        <span>Vibrant</span>
                                        <span>Dark</span>
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Badge Text</label>
                                    <input
                                        type="text"
                                        value={data.hero.badgeText}
                                        onChange={(e) => setData({ ...data, hero: { ...data.hero, badgeText: e.target.value } })}
                                        className={inputClass}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={data.hero.title}
                                        onChange={(e) => setData({ ...data, hero: { ...data.hero, title: e.target.value } })}
                                        className={inputClass}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                    <textarea
                                        rows={3}
                                        value={data.hero.description}
                                        onChange={(e) => setData({ ...data, hero: { ...data.hero, description: e.target.value } })}
                                        className={inputClass}
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

                    {activeTab === "stats" && (
                        <CMSSection
                            title="Floating Stats Bar"
                            isVisible={data.stats?.isVisible ?? true}
                            onVisibilityChange={(v) => setData({ ...data, stats: { ...data.stats, isVisible: v } })}
                        >
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 gap-6">
                                    {data.stats?.items?.map((item: any, idx: number) => (
                                        <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col md:flex-row gap-6 items-start">
                                            <div className="w-full md:w-64 space-y-4">
                                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Icon</label>
                                                <IconChooser
                                                    value={item.icon}
                                                    onChange={(icon) => {
                                                        const newItems = [...data.stats.items];
                                                        newItems[idx].icon = icon;
                                                        setData({ ...data, stats: { ...data.stats, items: newItems } });
                                                    }}
                                                />
                                            </div>
                                            <div className="flex-1 space-y-4 w-full">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Label (Small Text)</label>
                                                        <input
                                                            placeholder="e.g. Course Levels"
                                                            value={item.label}
                                                            onChange={(e) => {
                                                                const newItems = [...data.stats.items];
                                                                newItems[idx].label = e.target.value;
                                                                setData({ ...data, stats: { ...data.stats, items: newItems } });
                                                            }}
                                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Title (Bold Text)</label>
                                                        <input
                                                            placeholder="e.g. 3 Stage Levels"
                                                            value={item.title}
                                                            onChange={(e) => {
                                                                const newItems = [...data.stats.items];
                                                                newItems[idx].title = e.target.value;
                                                                setData({ ...data, stats: { ...data.stats, items: newItems } });
                                                            }}
                                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    const newItems = data.stats.items.filter((_: any, i: number) => i !== idx);
                                                    setData({ ...data, stats: { ...data.stats, items: newItems } });
                                                }}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg self-center"
                                            >
                                                <span className="material-symbols-outlined">delete_sweep</span>
                                            </button>
                                        </div>
                                    ))}

                                    <button
                                        onClick={() => {
                                            const currentStats = data.stats || { items: [] };
                                            setData({
                                                ...data,
                                                stats: {
                                                    ...currentStats,
                                                    items: [...(currentStats.items || []), { label: "", title: "", icon: "star" }]
                                                }
                                            });
                                        }}
                                        className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-500 font-bold hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2 bg-white"
                                    >
                                        <span className="material-symbols-outlined">add_circle</span>
                                        Add New Stat Card
                                    </button>
                                </div>
                            </div>
                        </CMSSection>
                    )}

                    {activeTab === "about" && (
                        <CMSSection
                            title="What is ACCA? Section"
                            isVisible={data.about?.isVisible ?? true}
                            onVisibilityChange={(v) => setData({ ...data, about: { ...data.about, isVisible: v } })}
                        >
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Illustration / Image</label>
                                        <ImageUploader
                                            value={data.about?.imageUrl || ""}
                                            onChange={(url) => setData({ ...data, about: { ...(data.about || {}), imageUrl: url } })}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Badge Text</label>
                                        <input
                                            type="text"
                                            value={data.about?.badgeText || ""}
                                            onChange={(e) => setData({ ...data, about: { ...(data.about || {}), badgeText: e.target.value } })}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                                        <input
                                            type="text"
                                            value={data.about?.title || ""}
                                            onChange={(e) => setData({ ...data, about: { ...(data.about || {}), title: e.target.value } })}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                        <textarea
                                            rows={3}
                                            value={data.about?.description || ""}
                                            onChange={(e) => setData({ ...data, about: { ...(data.about || {}), description: e.target.value } })}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t">
                                    <h4 className="font-bold text-gray-700 font-headline">Bullet Points</h4>
                                    {(data.about?.bullets || []).map((bullet: string, idx: number) => (
                                        <div key={idx} className="flex gap-2">
                                            <input
                                                value={bullet}
                                                onChange={(e) => {
                                                    const newBullets = [...(data.about?.bullets || [])];
                                                    newBullets[idx] = e.target.value;
                                                    setData({ ...data, about: { ...data.about, bullets: newBullets } });
                                                }}
                                                className="flex-1 px-4 py-2 border rounded-lg"
                                            />
                                            <button
                                                onClick={() => {
                                                    const newBullets = (data.about?.bullets || []).filter((_: any, i: number) => i !== idx);
                                                    setData({ ...data, about: { ...data.about, bullets: newBullets } });
                                                }}
                                                className="p-2 text-red-500"
                                            >
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => setData({ ...data, about: { ...(data.about || {}), bullets: [...(data.about?.bullets || []), ""] } })}
                                        className="text-sm text-primary font-bold flex items-center gap-1"
                                    >
                                        <span className="material-symbols-outlined text-base">add</span> Add Bullet
                                    </button>
                                </div>

                                <div className="space-y-4 pt-4 border-t">
                                    <h4 className="font-bold text-gray-700 font-headline">Small Stats Cards</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {(data.about?.stats || []).map((stat: any, idx: number) => (
                                            <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-2 relative">
                                                <input
                                                    placeholder="Value (e.g. 180+)"
                                                    value={stat.value}
                                                    onChange={(e) => {
                                                        const newStats = [...(data.about?.stats || [])];
                                                        newStats[idx].value = e.target.value;
                                                        setData({ ...data, about: { ...data.about, stats: newStats } });
                                                    }}
                                                    className="w-full px-3 py-1.5 border rounded-lg text-sm font-bold"
                                                />
                                                <input
                                                    placeholder="Label (e.g. Countries)"
                                                    value={stat.label}
                                                    onChange={(e) => {
                                                        const newStats = [...(data.about?.stats || [])];
                                                        newStats[idx].label = e.target.value;
                                                        setData({ ...data, about: { ...data.about, stats: newStats } });
                                                    }}
                                                    className="w-full px-3 py-1.5 border rounded-lg text-xs"
                                                />
                                                <button
                                                    onClick={() => {
                                                        const newStats = (data.about?.stats || []).filter((_: any, i: number) => i !== idx);
                                                        setData({ ...data, about: { ...data.about, stats: newStats } });
                                                    }}
                                                    className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full shadow-sm p-1 border"
                                                >
                                                    <span className="material-symbols-outlined text-xs">close</span>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setData({ ...data, about: { ...(data.about || {}), stats: [...(data.about?.stats || []), { value: "", label: "" }] } })}
                                        className="text-sm text-primary font-bold flex items-center gap-1"
                                    >
                                        <span className="material-symbols-outlined text-base">add</span> Add Stat
                                    </button>
                                </div>
                            </div>
                        </CMSSection>
                    )}

                    {activeTab === "highlights" && (
                        <CMSSection
                            title="Highlights Section"
                            isVisible={data.highlights.isVisible}
                            onVisibilityChange={(v) => setData({ ...data, highlights: { ...data.highlights, isVisible: v } })}
                        >
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Section Title</label>
                                    <input
                                        type="text"
                                        value={data.highlights.title}
                                        onChange={(e) => setData({ ...data, highlights: { ...data.highlights, title: e.target.value } })}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                    <textarea
                                        rows={2}
                                        value={data.highlights.description}
                                        onChange={(e) => setData({ ...data, highlights: { ...data.highlights, description: e.target.value } })}
                                        className={inputClass}
                                    />
                                </div>
                                <div className="space-y-4 pt-4 border-t">
                                    <h4 className="font-bold text-gray-700">Highlights Items</h4>
                                    {data.highlights.items.map((item: any, idx: number) => (
                                        <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col md:flex-row gap-4 items-start">
                                            <IconChooser
                                                value={item.icon}
                                                className="w-full md:w-48 shrink-0"
                                                onChange={(icon) => {
                                                    const newItems = [...data.highlights.items];
                                                    newItems[idx].icon = icon;
                                                    setData({ ...data, highlights: { ...data.highlights, items: newItems } });
                                                }}
                                            />
                                            <div className="flex-1 space-y-2">
                                                <input
                                                    placeholder="Item Title"
                                                    value={item.title}
                                                    onChange={(e) => {
                                                        const newItems = [...data.highlights.items];
                                                        newItems[idx].title = e.target.value;
                                                        setData({ ...data, highlights: { ...data.highlights, items: newItems } });
                                                    }}
                                                    className="w-full px-4 py-2 border rounded-lg text-gray-900"
                                                />
                                                <input
                                                    placeholder="Item Description"
                                                    value={item.description}
                                                    onChange={(e) => {
                                                        const newItems = [...data.highlights.items];
                                                        newItems[idx].description = e.target.value;
                                                        setData({ ...data, highlights: { ...data.highlights, items: newItems } });
                                                    }}
                                                    className="w-full px-4 py-2 border rounded-lg text-gray-900"
                                                />
                                            </div>
                                            <button
                                                onClick={() => {
                                                    const newItems = data.highlights.items.filter((_: any, i: number) => i !== idx);
                                                    setData({ ...data, highlights: { ...data.highlights, items: newItems } });
                                                }}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                            >
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => setData({ ...data, highlights: { ...data.highlights, items: [...data.highlights.items, { icon: "star", title: "", description: "" }] } })}
                                        className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-bold hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2"
                                    >
                                        <span className="material-symbols-outlined">add</span>
                                        Add New Highlight
                                    </button>
                                </div>
                            </div>
                        </CMSSection>
                    )}

                    {activeTab === "mentors" && (
                        <CMSSection
                            title="Mentors / Faculty Section"
                            isVisible={data.mentors?.isVisible ?? true}
                            onVisibilityChange={(v) => setData({ ...data, mentors: { ...data.mentors, isVisible: v } })}
                        >
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Section Title</label>
                                        <input
                                            value={data.mentors?.title || ""}
                                            onChange={(e) => setData({ ...data, mentors: { ...(data.mentors || {}), title: e.target.value } })}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                        <textarea
                                            rows={2}
                                            value={data.mentors?.description || ""}
                                            onChange={(e) => setData({ ...data, mentors: { ...(data.mentors || {}), description: e.target.value } })}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t">
                                    <h4 className="font-bold text-gray-700">Select Faculty Members</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {allTeachers.map((teacher: any) => (
                                            <label
                                                key={teacher._id}
                                                className={`p-4 border-2 rounded-2xl cursor-pointer transition-all flex items-center gap-3 ${(data.mentors?.teacherIds || []).some((t: any) => (typeof t === 'string' ? t : t._id) === teacher._id)
                                                    ? "border-primary bg-primary/5 shadow-md"
                                                    : "border-gray-100 bg-white grayscale opacity-60 hover:grayscale-0 hover:opacity-100"
                                                    }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="hidden"
                                                    checked={(data.mentors?.teacherIds || []).some((t: any) => (typeof t === 'string' ? t : t._id) === teacher._id)}
                                                    onChange={(e) => {
                                                        const currentIds = (data.mentors?.teacherIds || []).map((t: any) => typeof t === 'string' ? t : t._id);
                                                        if (e.target.checked) {
                                                            setData({ ...data, mentors: { ...data.mentors, teacherIds: [...currentIds, teacher._id] } });
                                                        } else {
                                                            setData({ ...data, mentors: { ...data.mentors, teacherIds: currentIds.filter((id: string) => id !== teacher._id) } });
                                                        }
                                                    }}
                                                />
                                                {teacher.image && <img src={teacher.image} className="w-10 h-10 rounded-full object-cover shrink-0" alt="" />}
                                                <div className="min-w-0">
                                                    <p className="font-bold text-sm truncate uppercase tracking-wide">{teacher.name}</p>
                                                    <p className="text-[10px] text-gray-500 truncate">{teacher.qualifications}</p>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-400 font-medium">Click on a teacher card to add/remove them from the homepage.</p>
                                </div>
                            </div>
                        </CMSSection>
                    )}

                    {activeTab === "pricing" && (
                        <CMSSection
                            title="Investment in Your Future Section"
                            isVisible={data.pricing?.isVisible ?? true}
                            onVisibilityChange={(v) => setData({ ...data, pricing: { ...data.pricing, isVisible: v } })}
                        >
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Section Title</label>
                                        <input
                                            value={data.pricing?.title || ""}
                                            onChange={(e) => setData({ ...data, pricing: { ...(data.pricing || {}), title: e.target.value } })}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Subtitle / Description</label>
                                        <input
                                            value={data.pricing?.description || ""}
                                            onChange={(e) => setData({ ...data, pricing: { ...(data.pricing || {}), description: e.target.value } })}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Bottom Note</label>
                                        <input
                                            value={data.pricing?.note || ""}
                                            onChange={(e) => setData({ ...data, pricing: { ...(data.pricing || {}), note: e.target.value } })}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t">
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-bold text-gray-700">Fee Structure Table</h4>
                                        <button
                                            onClick={() => {
                                                const currentRows = data.pricing?.rows || [];
                                                const colCount = data.pricing?.columns?.length || 4;
                                                const newRow = Array(colCount).fill("");
                                                setData({ ...data, pricing: { ...data.pricing, rows: [...currentRows, newRow] } });
                                            }}
                                            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold flex items-center gap-2"
                                        >
                                            <span className="material-symbols-outlined text-sm">add</span> Add Row
                                        </button>
                                    </div>

                                    <div className="overflow-x-auto border rounded-xl bg-white shadow-sm">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="bg-gray-50 border-b">
                                                    {(data.pricing?.columns || []).map((col: string, i: number) => (
                                                        <th key={i} className="px-4 py-3 font-bold text-gray-700 uppercase tracking-wider">
                                                            <input
                                                                value={col}
                                                                onChange={(e) => {
                                                                    const newCols = [...data.pricing.columns];
                                                                    newCols[i] = e.target.value;
                                                                    setData({ ...data, pricing: { ...data.pricing, columns: newCols } });
                                                                }}
                                                                className="bg-transparent border-none text-center outline-none w-full focus:ring-1 focus:ring-primary/20 rounded"
                                                            />
                                                        </th>
                                                    ))}
                                                    <th className="w-10"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(data.pricing?.rows || []).map((row: string[], ri: number) => (
                                                    <tr key={ri} className="border-b last:border-0 hover:bg-gray-50">
                                                        {row.map((cell: string, ci: number) => (
                                                            <td key={ci} className="px-4 py-3">
                                                                <input
                                                                    value={cell}
                                                                    onChange={(e) => {
                                                                        const newRows = [...data.pricing.rows];
                                                                        newRows[ri][ci] = e.target.value;
                                                                        setData({ ...data, pricing: { ...data.pricing, rows: newRows } });
                                                                    }}
                                                                    className={`w-full bg-transparent border-none outline-none ${ci === 0 ? 'font-bold' : ''} ${ci === row.length - 1 ? 'text-right font-bold text-primary' : ''}`}
                                                                />
                                                            </td>
                                                        ))}
                                                        <td className="px-2">
                                                            <button
                                                                onClick={() => {
                                                                    const newRows = data.pricing.rows.filter((_: any, i: number) => i !== ri);
                                                                    setData({ ...data, pricing: { ...data.pricing, rows: newRows } });
                                                                }}
                                                                className="text-red-400 hover:text-red-600 p-1"
                                                            >
                                                                <span className="material-symbols-outlined text-sm">delete</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center">Tip: You can edit cell values directly in the table above.</p>
                                </div>
                            </div>
                        </CMSSection>
                    )}

                    {activeTab === "faq" && (
                        <CMSSection
                            title="FAQ Section"
                            isVisible={data.faqs?.isVisible ?? true}
                            onVisibilityChange={(v) => setData({ ...data, faqs: { ...data.faqs, isVisible: v } })}
                        >
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Section Title</label>
                                    <input
                                        value={data.faqs?.title || ""}
                                        onChange={(e) => setData({ ...data, faqs: { ...(data.faqs || {}), title: e.target.value } })}
                                        className={inputClass}
                                    />
                                </div>

                                <div className="space-y-4 pt-4 border-t">
                                    <h4 className="font-bold text-gray-700">Questions & Answers</h4>
                                    {(data.faqs?.items || []).map((faq: any, idx: number) => (
                                        <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex gap-4">
                                            <div className="flex-1 space-y-4">
                                                <div>
                                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Question</label>
                                                    <input
                                                        placeholder="e.g. How long does it take?"
                                                        value={faq.question}
                                                        onChange={(e) => {
                                                            const newItems = [...data.faqs.items];
                                                            newItems[idx].question = e.target.value;
                                                            setData({ ...data, faqs: { ...data.faqs, items: newItems } });
                                                        }}
                                                        className="w-full px-4 py-2 border rounded-lg font-bold"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Answer</label>
                                                    <textarea
                                                        placeholder="e.g. It takes 3 years..."
                                                        rows={3}
                                                        value={faq.answer}
                                                        onChange={(e) => {
                                                            const newItems = [...data.faqs.items];
                                                            newItems[idx].answer = e.target.value;
                                                            setData({ ...data, faqs: { ...data.faqs, items: newItems } });
                                                        }}
                                                        className="w-full px-4 py-2 border rounded-lg font-medium"
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    const newItems = data.faqs.items.filter((_: any, i: number) => i !== idx);
                                                    setData({ ...data, faqs: { ...data.faqs, items: newItems } });
                                                }}
                                                className="p-2 text-red-500 self-start"
                                            >
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => setData({ ...data, faqs: { ...(data.faqs || {}), items: [...(data.faqs?.items || []), { question: "", answer: "" }] } })}
                                        className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-500 font-bold hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2"
                                    >
                                        <span className="material-symbols-outlined">add_circle</span> Add New Question
                                    </button>
                                </div>
                            </div>
                        </CMSSection>
                    )}

                    {activeTab === "courses" && (
                        <CMSSection
                            title="Courses Section"
                            isVisible={data.courses.isVisible}
                            onVisibilityChange={(v) => setData({ ...data, courses: { ...data.courses, isVisible: v } })}
                        >
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Section Title</label>
                                        <input
                                            type="text"
                                            value={data.courses.title}
                                            onChange={(e) => setData({ ...data, courses: { ...data.courses, title: e.target.value } })}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Section Subtitle</label>
                                        <input
                                            type="text"
                                            value={data.courses.subtitle}
                                            onChange={(e) => setData({ ...data, courses: { ...data.courses, subtitle: e.target.value } })}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t">
                                    <h4 className="font-bold text-gray-700">Course Items</h4>
                                    {data.courses.items && data.courses.items.map((item: any, idx: number) => (
                                        <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col md:flex-row gap-4 items-start">
                                            <IconChooser
                                                value={item.icon}
                                                className="w-full md:w-48 shrink-0"
                                                onChange={(icon) => {
                                                    const newItems = [...data.courses.items];
                                                    newItems[idx].icon = icon;
                                                    setData({ ...data, courses: { ...data.courses, items: newItems } });
                                                }}
                                            />
                                            <div className="flex-1 space-y-2">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <input
                                                        placeholder="Level (e.g. CAP-I)"
                                                        value={item.level}
                                                        onChange={(e) => {
                                                            const newItems = [...data.courses.items];
                                                            newItems[idx].level = e.target.value;
                                                            setData({ ...data, courses: { ...data.courses, items: newItems } });
                                                        }}
                                                        className="w-full px-4 py-2 border rounded-lg text-gray-900"
                                                    />
                                                    <input
                                                        placeholder="Type (e.g. Foundation)"
                                                        value={item.type}
                                                        onChange={(e) => {
                                                            const newItems = [...data.courses.items];
                                                            newItems[idx].type = e.target.value;
                                                            setData({ ...data, courses: { ...data.courses, items: newItems } });
                                                        }}
                                                        className="w-full px-4 py-2 border rounded-lg text-gray-900"
                                                    />
                                                </div>
                                                <textarea
                                                    placeholder="Description"
                                                    value={item.description}
                                                    rows={2}
                                                    onChange={(e) => {
                                                        const newItems = [...data.courses.items];
                                                        newItems[idx].description = e.target.value;
                                                        setData({ ...data, courses: { ...data.courses, items: newItems } });
                                                    }}
                                                    className="w-full px-4 py-2 border rounded-lg text-gray-900"
                                                />
                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={item.popular || false}
                                                        onChange={(e) => {
                                                            const newItems = [...data.courses.items];
                                                            newItems[idx].popular = e.target.checked;
                                                            setData({ ...data, courses: { ...data.courses, items: newItems } });
                                                        }}
                                                        className="w-4 h-4 text-primary rounded"
                                                    />
                                                    <span className="text-sm text-gray-600">Mark as Popular</span>
                                                </label>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    const newItems = data.courses.items.filter((_: any, i: number) => i !== idx);
                                                    setData({ ...data, courses: { ...data.courses, items: newItems } });
                                                }}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                            >
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => {
                                            const currentItems = data.courses.items || [];
                                            setData({ ...data, courses: { ...data.courses, items: [...currentItems, { icon: "school", level: "", type: "", description: "", popular: false }] } });
                                        }}
                                        className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-bold hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2"
                                    >
                                        <span className="material-symbols-outlined">add</span>
                                        Add New Course
                                    </button>
                                </div>
                            </div>
                        </CMSSection>
                    )}

                    {activeTab === "eligibility" && (
                        <CMSSection
                            title="Eligibility Path Section"
                            isVisible={data.eligibility?.isVisible ?? true}
                            onVisibilityChange={(v) => setData({ ...data, eligibility: { ...data.eligibility, isVisible: v } })}
                        >
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Section Title</label>
                                    <input
                                        value={data.eligibility?.title || ""}
                                        onChange={(e) => setData({ ...data, eligibility: { ...(data.eligibility || {}), title: e.target.value } })}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Illustration / Image URL</label>
                                    <ImageUploader
                                        value={data.eligibility?.imageUrl || ""}
                                        onChange={(url) => setData({ ...data, eligibility: { ...(data.eligibility || {}), imageUrl: url } })}
                                    />
                                </div>

                                <div className="space-y-4 pt-4 border-t">
                                    <h4 className="font-bold text-gray-700">Path Steps</h4>
                                    {(data.eligibility?.steps || []).map((step: any, idx: number) => (
                                        <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex gap-4">
                                            <div className="w-16 shrink-0">
                                                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Step #</label>
                                                <input
                                                    value={step.step}
                                                    onChange={(e) => {
                                                        const newSteps = [...data.eligibility.steps];
                                                        newSteps[idx].step = e.target.value;
                                                        setData({ ...data, eligibility: { ...data.eligibility, steps: newSteps } });
                                                    }}
                                                    className="w-full px-3 py-2 border rounded-lg text-center font-bold"
                                                />
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <input
                                                    placeholder="Title"
                                                    value={step.title}
                                                    onChange={(e) => {
                                                        const newSteps = [...data.eligibility.steps];
                                                        newSteps[idx].title = e.target.value;
                                                        setData({ ...data, eligibility: { ...data.eligibility, steps: newSteps } });
                                                    }}
                                                    className="w-full px-4 py-2 border rounded-lg"
                                                />
                                                <textarea
                                                    placeholder="Description"
                                                    value={step.description}
                                                    rows={2}
                                                    onChange={(e) => {
                                                        const newSteps = [...data.eligibility.steps];
                                                        newSteps[idx].description = e.target.value;
                                                        setData({ ...data, eligibility: { ...data.eligibility, steps: newSteps } });
                                                    }}
                                                    className="w-full px-4 py-2 border rounded-lg"
                                                />
                                            </div>
                                            <button
                                                onClick={() => {
                                                    const newSteps = data.eligibility.steps.filter((_: any, i: number) => i !== idx);
                                                    setData({ ...data, eligibility: { ...data.eligibility, steps: newSteps } });
                                                }}
                                                className="p-2 text-red-500 self-start"
                                            >
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => setData({ ...data, eligibility: { ...(data.eligibility || {}), steps: [...(data.eligibility?.steps || []), { step: (data.eligibility?.steps?.length + 1).toString(), title: "", description: "" }] } })}
                                        className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-bold hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2"
                                    >
                                        <span className="material-symbols-outlined">add</span> Add Step
                                    </button>
                                </div>
                            </div>
                        </CMSSection>
                    )}

                    {activeTab === "structure" && (
                        <CMSSection
                            title="Course Structure Section"
                            isVisible={data.structure?.isVisible ?? true}
                            onVisibilityChange={(v) => setData({ ...data, structure: { ...data.structure, isVisible: v } })}
                        >
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Section Title</label>
                                        <input
                                            value={data.structure?.title || ""}
                                            onChange={(e) => setData({ ...data, structure: { ...(data.structure || {}), title: e.target.value } })}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Subtitle / Description</label>
                                        <input
                                            value={data.structure?.description || ""}
                                            onChange={(e) => setData({ ...data, structure: { ...(data.structure || {}), description: e.target.value } })}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t">
                                    <h4 className="font-bold text-gray-700">Course Levels (Accordions)</h4>
                                    {(data.structure?.levels || []).map((level: any, idx: number) => (
                                        <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                                            <div className="flex justify-between items-center">
                                                <input
                                                    placeholder="Level Title (e.g. Applied Knowledge)"
                                                    value={level.title}
                                                    onChange={(e) => {
                                                        const newLevels = [...data.structure.levels];
                                                        newLevels[idx].title = e.target.value;
                                                        setData({ ...data, structure: { ...data.structure, levels: newLevels } });
                                                    }}
                                                    className="flex-1 bg-transparent border-b border-gray-300 font-bold text-lg focus:border-primary outline-none py-1 mr-4"
                                                />
                                                <div className="flex items-center gap-4">
                                                    <label className="flex items-center gap-2 text-xs font-bold text-gray-500 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={level.isOpen}
                                                            onChange={(e) => {
                                                                const newLevels = [...data.structure.levels];
                                                                newLevels[idx].isOpen = e.target.checked;
                                                                setData({ ...data, structure: { ...data.structure, levels: newLevels } });
                                                            }}
                                                        />
                                                        Default Open
                                                    </label>
                                                    <button
                                                        onClick={() => {
                                                            const newLevels = data.structure.levels.filter((_: any, i: number) => i !== idx);
                                                            setData({ ...data, structure: { ...data.structure, levels: newLevels } });
                                                        }}
                                                        className="text-red-500"
                                                    >
                                                        <span className="material-symbols-outlined">delete</span>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Papers / Items (One per line)</label>
                                                <textarea
                                                    rows={4}
                                                    value={level.items?.join("\n") || ""}
                                                    onChange={(e) => {
                                                        const newLevels = [...data.structure.levels];
                                                        newLevels[idx].items = e.target.value.split("\n").filter(s => s.trim() !== "");
                                                        setData({ ...data, structure: { ...data.structure, levels: newLevels } });
                                                    }}
                                                    className="w-full px-4 py-2 border rounded-lg font-medium leading-relaxed"
                                                    placeholder="Financial Accounting (FA)&#10;Management Accounting (MA)"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => setData({ ...data, structure: { ...(data.structure || {}), levels: [...(data.structure?.levels || []), { title: "", items: [], isOpen: false }] } })}
                                        className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-bold hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2"
                                    >
                                        <span className="material-symbols-outlined">add</span> Add Level
                                    </button>
                                </div>
                            </div>
                        </CMSSection>
                    )}

                    {activeTab === "why" && (
                        <CMSSection
                            title="Why Choose Us Section"
                            isVisible={data.whyChooseUs?.isVisible ?? true}
                            onVisibilityChange={(v) => setData({ ...data, whyChooseUs: { ...data.whyChooseUs, isVisible: v } })}
                        >
                            <div className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Section Title</label>
                                        <input
                                            value={data.whyChooseUs?.title || ""}
                                            onChange={(e) => setData({ ...data, whyChooseUs: { ...(data.whyChooseUs || {}), title: e.target.value } })}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Description (Optional)</label>
                                        <textarea
                                            rows={2}
                                            value={data.whyChooseUs?.description || ""}
                                            onChange={(e) => setData({ ...data, whyChooseUs: { ...(data.whyChooseUs || {}), description: e.target.value } })}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                                    <h4 className="font-bold text-gray-900 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">looks_one</span>
                                        Main Highlight Card (Large)
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Icon</label>
                                            <IconChooser
                                                value={data.whyChooseUs?.mainCard?.icon || "military_tech"}
                                                onChange={(icon) => setData({ ...data, whyChooseUs: { ...data.whyChooseUs, mainCard: { ...data.whyChooseUs.mainCard, icon } } })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Title</label>
                                            <input
                                                value={data.whyChooseUs?.mainCard?.title || ""}
                                                onChange={(e) => setData({ ...data, whyChooseUs: { ...data.whyChooseUs, mainCard: { ...data.whyChooseUs.mainCard, title: e.target.value } } })}
                                                className="w-full px-4 py-2 border rounded-lg"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Tags (Comma Separated)</label>
                                            <input
                                                value={data.whyChooseUs?.mainCard?.tags?.join(", ") || ""}
                                                onChange={(e) => setData({ ...data, whyChooseUs: { ...data.whyChooseUs, mainCard: { ...data.whyChooseUs.mainCard, tags: e.target.value.split(",").map(s => s.trim()) } } })}
                                                className="w-full px-4 py-2 border rounded-lg"
                                                placeholder="Tag 1, Tag 2"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Description</label>
                                            <textarea
                                                rows={2}
                                                value={data.whyChooseUs?.mainCard?.description || ""}
                                                onChange={(e) => setData({ ...data, whyChooseUs: { ...data.whyChooseUs, mainCard: { ...data.whyChooseUs.mainCard, description: e.target.value } } })}
                                                className="w-full px-4 py-2 border rounded-lg"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 space-y-4">
                                    <h4 className="font-bold text-primary flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">analytics</span>
                                        Stats Card (Blue)
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-primary/60 uppercase tracking-widest mb-1">Stat Value</label>
                                            <input
                                                value={data.whyChooseUs?.statsCard?.value || ""}
                                                onChange={(e) => setData({ ...data, whyChooseUs: { ...data.whyChooseUs, statsCard: { ...data.whyChooseUs.statsCard, value: e.target.value } } })}
                                                className="w-full px-4 py-2 border border-primary/20 rounded-lg"
                                                placeholder="e.g. 92%"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-primary/60 uppercase tracking-widest mb-1">Icon</label>
                                            <IconChooser
                                                value={data.whyChooseUs?.statsCard?.icon || "analytics"}
                                                onChange={(icon) => setData({ ...data, whyChooseUs: { ...data.whyChooseUs, statsCard: { ...data.whyChooseUs.statsCard, icon } } })}
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold text-primary/60 uppercase tracking-widest mb-1">Label / Description</label>
                                            <input
                                                value={data.whyChooseUs?.statsCard?.label || ""}
                                                onChange={(e) => setData({ ...data, whyChooseUs: { ...data.whyChooseUs, statsCard: { ...data.whyChooseUs.statsCard, label: e.target.value } } })}
                                                className="w-full px-4 py-2 border border-primary/20 rounded-lg"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t">
                                    <h4 className="font-bold text-gray-700">Additional Features</h4>
                                    {(data.whyChooseUs?.items || []).map((item: any, idx: number) => (
                                        <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col md:flex-row gap-4 items-start">
                                            <IconChooser
                                                value={item.icon}
                                                className="w-full md:w-48 shrink-0"
                                                onChange={(icon) => {
                                                    const newItems = [...data.whyChooseUs.items];
                                                    newItems[idx].icon = icon;
                                                    setData({ ...data, whyChooseUs: { ...data.whyChooseUs, items: newItems } });
                                                }}
                                            />
                                            <div className="flex-1 space-y-2">
                                                <input
                                                    placeholder="Title"
                                                    value={item.title}
                                                    onChange={(e) => {
                                                        const newItems = [...data.whyChooseUs.items];
                                                        newItems[idx].title = e.target.value;
                                                        setData({ ...data, whyChooseUs: { ...data.whyChooseUs, items: newItems } });
                                                    }}
                                                    className="w-full px-4 py-2 border rounded-lg text-gray-900"
                                                />
                                                <input
                                                    placeholder="Description"
                                                    value={item.description}
                                                    onChange={(e) => {
                                                        const newItems = [...data.whyChooseUs.items];
                                                        newItems[idx].description = e.target.value;
                                                        setData({ ...data, whyChooseUs: { ...data.whyChooseUs, items: newItems } });
                                                    }}
                                                    className="w-full px-4 py-2 border rounded-lg text-gray-900"
                                                />
                                            </div>
                                            <button
                                                onClick={() => {
                                                    const newItems = data.whyChooseUs.items.filter((_: any, i: number) => i !== idx);
                                                    setData({ ...data, whyChooseUs: { ...data.whyChooseUs, items: newItems } });
                                                }}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                            >
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => setData({ ...data, whyChooseUs: { ...(data.whyChooseUs || {}), items: [...(data.whyChooseUs?.items || []), { icon: "check_circle", title: "", description: "" }] } })}
                                        className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-bold hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2"
                                    >
                                        <span className="material-symbols-outlined">add</span>
                                        Add New Feature
                                    </button>
                                </div>
                            </div>
                        </CMSSection>
                    )}

                    {activeTab === "cta" && (
                        <CMSSection
                            title="Bottom CTA Section"
                            isVisible={data.cta.isVisible}
                            onVisibilityChange={(v) => setData({ ...data, cta: { ...data.cta, isVisible: v } })}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Illustration / Image</label>
                                    <ImageUploader
                                        value={data.cta.imageUrl || ""}
                                        onChange={(url) => setData({ ...data, cta: { ...data.cta, imageUrl: url } })}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={data.cta.title}
                                        onChange={(e) => setData({ ...data, cta: { ...data.cta, title: e.target.value } })}
                                        className={inputClass}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                    <textarea
                                        rows={2}
                                        value={data.cta.description}
                                        onChange={(e) => setData({ ...data, cta: { ...data.cta, description: e.target.value } })}
                                        className={inputClass}
                                    />
                                </div>
                                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                    <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-lg">link</span>
                                        Primary Button
                                    </h3>
                                    <div className="space-y-4">
                                        <IconChooser
                                            value={data.cta.primaryButton.icon || ''}
                                            onChange={(icon) => setData({ ...data, cta: { ...data.cta, primaryButton: { ...data.cta.primaryButton, icon } } })}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Text"
                                            value={data.cta.primaryButton.text}
                                            onChange={(e) => setData({ ...data, cta: { ...data.cta, primaryButton: { ...data.cta.primaryButton, text: e.target.value } } })}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Link"
                                            value={data.cta.primaryButton.link}
                                            onChange={(e) => setData({ ...data, cta: { ...data.cta, primaryButton: { ...data.cta.primaryButton, link: e.target.value } } })}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
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
                                            value={data.cta.secondaryButton.icon || ''}
                                            onChange={(icon) => setData({ ...data, cta: { ...data.cta, secondaryButton: { ...data.cta.secondaryButton, icon } } })}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Text"
                                            value={data.cta.secondaryButton.text}
                                            onChange={(e) => setData({ ...data, cta: { ...data.cta, secondaryButton: { ...data.cta.secondaryButton, text: e.target.value } } })}
                                            className="w-full px-4 py-3.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-secondary/20"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Link"
                                            value={data.cta.secondaryButton.link}
                                            onChange={(e) => setData({ ...data, cta: { ...data.cta, secondaryButton: { ...data.cta.secondaryButton, link: e.target.value } } })}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-secondary/20"
                                        />
                                    </div>
                                </div>
                            </div>
                        </CMSSection>
                    )}

                    {activeTab === "seo" && (
                        <CMSSection title="SEO Settings">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Meta Title</label>
                                    <input
                                        type="text"
                                        value={data.seo?.title || ""}
                                        onChange={(e) => setData({ ...data, seo: { ...data.seo, title: e.target.value } })}
                                        className={inputClass}
                                        placeholder="Homepage Title"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Meta Description</label>
                                    <textarea
                                        rows={3}
                                        value={data.seo?.description || ""}
                                        onChange={(e) => setData({ ...data, seo: { ...data.seo, description: e.target.value } })}
                                        className={inputClass}
                                        placeholder="Enter meta description"
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
