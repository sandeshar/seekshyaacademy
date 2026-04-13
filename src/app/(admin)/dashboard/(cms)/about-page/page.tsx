"use client";

import ImageUploader from "../../_components/ImageUploader";
import IconChooser from "../../_components/IconChooser";
import CMSSection from "../../_components/CMSSection";
import CMSPage from "../../_components/CMSPage";
import { getAboutPage, updateAboutPage } from "@/actions/cms-actions";

const TABS = [
    { id: "hero", label: "Hero", icon: "home" },
    { id: "qualities", label: "Stats/Qualities", icon: "equalizer" },
    { id: "about", label: "About Us", icon: "info" },
    { id: "cta1", label: "CTA Section 1", icon: "campaign" },
    { id: "philosophy", label: "Philosophy", icon: "psychology" },
    { id: "seo", label: "SEO Settings", icon: "search" },
];

export default function AboutCMS() {
    const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium";

    return (
        <CMSPage
            title="About Page Management"
            description="Manage the content and settings for your About Us page"
            getAction={getAboutPage}
            updateAction={updateAboutPage}
            tabs={TABS}
            renderTabContent={(activeTab: string, data: any, setData: (d: any) => void) => (
                <>
                    {activeTab === "hero" && (
                        <CMSSection
                            title="Hero Section"
                            isVisible={data.hero.isVisible}
                            onVisibilityChange={(v: boolean) => setData({ ...data, hero: { ...data.hero, isVisible: v } })}
                        >
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Background Image</label>
                                        <ImageUploader
                                            value={data.hero.backgroundImage}
                                            onChange={(url: string) => setData({ ...data, hero: { ...data.hero, backgroundImage: url } })}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="text-sm font-bold text-gray-700 mb-2 flex justify-between">
                                            <span>Overlay Opacity</span>
                                            <span className="text-primary">{data.hero.overlayOpacity || 80}%</span>
                                        </label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            step="5"
                                            value={data.hero.overlayOpacity || 80}
                                            onChange={(e) => setData({ ...data, hero: { ...data.hero, overlayOpacity: parseInt(e.target.value) } })}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                        <div className="flex justify-between text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-wider">
                                            <span>Clear</span>
                                            <span>Themed Overlay</span>
                                            <span>Deep Overlay</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Badge Text</label>
                                        <input
                                            type="text"
                                            value={data.hero.badgeText}
                                            onChange={(e) => setData({ ...data, hero: { ...data.hero, badgeText: e.target.value } })}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
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
                                                className={inputClass}
                                            />
                                            <input
                                                type="text"
                                                placeholder="URL / Link"
                                                value={data.hero.primaryButton.link}
                                                onChange={(e) => setData({ ...data, hero: { ...data.hero, primaryButton: { ...data.hero.primaryButton, link: e.target.value } } })}
                                                className={inputClass}
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
                                                className={inputClass}
                                            />
                                            <input
                                                type="text"
                                                placeholder="URL / Link"
                                                value={data.hero.secondaryButton.link}
                                                onChange={(e) => setData({ ...data, hero: { ...data.hero, secondaryButton: { ...data.hero.secondaryButton, link: e.target.value } } })}
                                                className={inputClass}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CMSSection>
                    )}

                    {activeTab === "qualities" && (
                        <CMSSection
                            title="Stats & Qualities"
                            isVisible={data.qualities.isVisible}
                            onVisibilityChange={(v: boolean) => setData({ ...data, qualities: { ...data.qualities, isVisible: v } })}
                        >
                            <div className="space-y-4">
                                {data.qualities.items.map((item: any, idx: number) => (
                                    <div key={idx} className="flex gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 items-start">
                                        <div className="flex-1">
                                            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-tight">Number/Value</label>
                                            <input
                                                type="text"
                                                value={item.number}
                                                onChange={(e) => {
                                                    const newItems = [...data.qualities.items];
                                                    newItems[idx].number = e.target.value;
                                                    setData({ ...data, qualities: { ...data.qualities, items: newItems } });
                                                }}
                                                className={inputClass}
                                            />
                                        </div>
                                        <div className="flex-2">
                                            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-tight">Title</label>
                                            <input
                                                type="text"
                                                value={item.title}
                                                onChange={(e) => {
                                                    const newItems = [...data.qualities.items];
                                                    newItems[idx].title = e.target.value;
                                                    setData({ ...data, qualities: { ...data.qualities, items: newItems } });
                                                }}
                                                className={inputClass}
                                            />
                                        </div>
                                        <button
                                            onClick={() => {
                                                const newItems = data.qualities.items.filter((_: any, i: number) => i !== idx);
                                                setData({ ...data, qualities: { ...data.qualities, items: newItems } });
                                            }}
                                            className="mt-8 p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                        >
                                            <span className="material-symbols-outlined font-black">delete</span>
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => setData({ ...data, qualities: { ...data.qualities, items: [...data.qualities.items, { number: "", title: "" }] } })}
                                    className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-500 font-bold hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined">add</span>
                                    Add New Stat
                                </button>
                            </div>
                        </CMSSection>
                    )}

                    {activeTab === "about" && (
                        <CMSSection
                            title="About Us Section"
                            isVisible={data.aboutUs.isVisible}
                            onVisibilityChange={(v: boolean) => setData({ ...data, aboutUs: { ...data.aboutUs, isVisible: v } })}
                        >
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Featured Image</label>
                                        <ImageUploader
                                            value={data.aboutUs.imageUrl}
                                            onChange={(url: string) => setData({ ...data, aboutUs: { ...data.aboutUs, imageUrl: url } })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Badge Text</label>
                                        <input
                                            type="text"
                                            value={data.aboutUs.badgeText}
                                            onChange={(e) => setData({ ...data, aboutUs: { ...data.aboutUs, badgeText: e.target.value } })}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                                        <input
                                            type="text"
                                            value={data.aboutUs.title}
                                            onChange={(e) => setData({ ...data, aboutUs: { ...data.aboutUs, title: e.target.value } })}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                        <textarea
                                            rows={3}
                                            value={data.aboutUs.description}
                                            onChange={(e) => setData({ ...data, aboutUs: { ...data.aboutUs, description: e.target.value } })}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4 pt-8 border-t">
                                    <h4 className="font-bold text-gray-900 border-b pb-2 mb-4">Feature Cards</h4>
                                    <div className="grid grid-cols-1 gap-4">
                                        {data.aboutUs.cards.map((card: any, idx: number) => (
                                            <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex gap-6 items-start">
                                                <div className="pt-2">
                                                    <IconChooser
                                                        value={card.icon}
                                                        onChange={(icon: string) => {
                                                            const newCards = [...data.aboutUs.cards];
                                                            newCards[idx].icon = icon;
                                                            setData({ ...data, aboutUs: { ...data.aboutUs, cards: newCards } });
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex-1 space-y-4">
                                                    <input
                                                        placeholder="Card Title"
                                                        value={card.title}
                                                        onChange={(e) => {
                                                            const newCards = [...data.aboutUs.cards];
                                                            newCards[idx].title = e.target.value;
                                                            setData({ ...data, aboutUs: { ...data.aboutUs, cards: newCards } });
                                                        }}
                                                        className={inputClass}
                                                    />
                                                    <input
                                                        placeholder="Card Description"
                                                        value={card.description}
                                                        onChange={(e) => {
                                                            const newCards = [...data.aboutUs.cards];
                                                            newCards[idx].description = e.target.value;
                                                            setData({ ...data, aboutUs: { ...data.aboutUs, cards: newCards } });
                                                        }}
                                                        className={inputClass}
                                                    />
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        const newCards = data.aboutUs.cards.filter((_: any, i: number) => i !== idx);
                                                        setData({ ...data, aboutUs: { ...data.aboutUs, cards: newCards } });
                                                    }}
                                                    className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                                >
                                                    <span className="material-symbols-outlined font-black">delete</span>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setData({ ...data, aboutUs: { ...data.aboutUs, cards: [...data.aboutUs.cards, { icon: "star", title: "", description: "" }] } })}
                                        className="w-full py-4 bg-white border-2 border-dashed border-gray-200 rounded-2xl text-sm font-bold text-gray-500 hover:text-primary hover:border-primary transition-all"
                                    >
                                        + Add Feature Card
                                    </button>
                                </div>
                            </div>
                        </CMSSection>
                    )}

                    {activeTab === "cta1" && (
                        <CMSSection
                            title="CTA Section 1"
                            isVisible={data.cta1.isVisible}
                            onVisibilityChange={(v: boolean) => setData({ ...data, cta1: { ...data.cta1, isVisible: v } })}
                        >
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Featured Image</label>
                                        <ImageUploader
                                            value={data.cta1.imageUrl}
                                            onChange={(url: string) => setData({ ...data, cta1: { ...data.cta1, imageUrl: url } })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Badge</label>
                                        <input
                                            type="text"
                                            value={data.cta1.badgeText}
                                            onChange={(e) => setData({ ...data, cta1: { ...data.cta1, badgeText: e.target.value } })}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                                        <input
                                            type="text"
                                            value={data.cta1.title}
                                            onChange={(e) => setData({ ...data, cta1: { ...data.cta1, title: e.target.value } })}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                        <textarea
                                            rows={2}
                                            value={data.cta1.description}
                                            onChange={(e) => setData({ ...data, cta1: { ...data.cta1, description: e.target.value } })}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div className="md:col-span-2 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                        <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary text-lg">link</span>
                                            Primary Button
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="md:col-span-2">
                                                <IconChooser
                                                    value={data.cta1.primaryButton.icon || ''}
                                                    onChange={(icon) => setData({ ...data, cta1: { ...data.cta1, primaryButton: { ...data.cta1.primaryButton, icon } } })}
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Button Text"
                                                value={data.cta1.primaryButton.text}
                                                onChange={(e) => setData({ ...data, cta1: { ...data.cta1, primaryButton: { ...data.cta1.primaryButton, text: e.target.value } } })}
                                                className={inputClass}
                                            />
                                            <input
                                                type="text"
                                                placeholder="URL / Link"
                                                value={data.cta1.primaryButton.link}
                                                onChange={(e) => setData({ ...data, cta1: { ...data.cta1, primaryButton: { ...data.cta1.primaryButton, link: e.target.value } } })}
                                                className={inputClass}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CMSSection>
                    )}

                    {activeTab === "philosophy" && (
                        <CMSSection
                            title="Our Philosophy"
                            isVisible={data.philosophy.isVisible}
                            onVisibilityChange={(v: boolean) => setData({ ...data, philosophy: { ...data.philosophy, isVisible: v } })}
                        >
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Section Title</label>
                                        <input
                                            type="text"
                                            value={data.philosophy.title}
                                            onChange={(e) => setData({ ...data, philosophy: { ...data.philosophy, title: e.target.value } })}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                        <textarea
                                            rows={2}
                                            value={data.philosophy.description}
                                            onChange={(e) => setData({ ...data, philosophy: { ...data.philosophy, description: e.target.value } })}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4 pt-8 border-t">
                                    <h4 className="font-bold text-gray-900 border-b pb-2 mb-4">Philosophy Items</h4>
                                    <div className="grid grid-cols-1 gap-4">
                                        {data.philosophy.items.map((item: any, idx: number) => (
                                            <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex gap-6 items-start">
                                                <div className="pt-2">
                                                    <IconChooser
                                                        value={item.icon}
                                                        onChange={(icon: string) => {
                                                            const newItems = [...data.philosophy.items];
                                                            newItems[idx].icon = icon;
                                                            setData({ ...data, philosophy: { ...data.philosophy, items: newItems } });
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex-1 space-y-4">
                                                    <input
                                                        placeholder="Title"
                                                        value={item.title}
                                                        onChange={(e) => {
                                                            const newItems = [...data.philosophy.items];
                                                            newItems[idx].title = e.target.value;
                                                            setData({ ...data, philosophy: { ...data.philosophy, items: newItems } });
                                                        }}
                                                        className={inputClass}
                                                    />
                                                    <input
                                                        placeholder="Description"
                                                        value={item.description}
                                                        onChange={(e) => {
                                                            const newItems = [...data.philosophy.items];
                                                            newItems[idx].description = e.target.value;
                                                            setData({ ...data, philosophy: { ...data.philosophy, items: newItems } });
                                                        }}
                                                        className={inputClass}
                                                    />
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        const newItems = data.philosophy.items.filter((_: any, i: number) => i !== idx);
                                                        setData({ ...data, philosophy: { ...data.philosophy, items: newItems } });
                                                    }}
                                                    className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                                >
                                                    <span className="material-symbols-outlined font-black">delete</span>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setData({ ...data, philosophy: { ...data.philosophy, items: [...data.philosophy.items, { icon: "verified_user", title: "", description: "" }] } })}
                                        className="w-full py-4 bg-white border-2 border-dashed border-gray-200 rounded-2xl text-sm font-bold text-gray-500 hover:text-primary hover:border-primary transition-all"
                                    >
                                        + Add Philosophy Item
                                    </button>
                                </div>
                            </div>
                        </CMSSection>
                    )}

                    {activeTab === "seo" && (
                        <CMSSection title="SEO Settings">
                            <div className="space-y-6">
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
                                        rows={4}
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
