"use client";

import { useState, useEffect } from "react";
import ImageUploader from "../../_components/ImageUploader";
import IconChooser from "../../_components/IconChooser";
import CMSSection from "../../_components/CMSSection";
import CMSPage from "../../_components/CMSPage";
import RichTextEditor from "@/app/(admin)/dashboard/_components/RichTextEditor";
import { toast } from "react-hot-toast";
import { getCoursePage, updateCoursePage } from "@/actions/cms-actions";
import { getCourseCategories, getCourseSubcategories } from "@/actions/categories";

interface IHeroContent {
    isVisible: boolean;
    badgeText: string;
    title: string;
    description: string;
    backgroundImage: string;
    overlayOpacity?: number;
    primaryButton: {
        text: string;
        link: string;
    };
    secondaryButton: {
        text: string;
        link: string;
    };
}

interface ICourseConfig {
    _id?: string;
    name: string;
    slug: string;
    type: 'category' | 'subcategory' | 'default';
    hero: IHeroContent;
    content?: string;
    courses?: {
        title: string;
        subtitle: string;
        items: {
            level: string;
            slug: string;
            type: string;
            description: string;
            features: string[];
            icon: string;
            popular: boolean;
        }[];
    };
}

interface ITaxonomyOption {
    label: string;
    value: string;
    type: 'category' | 'subcategory' | 'default';
}

export default function CoursePageCMS() {
    const [activeConfigIndex, setActiveConfigIndex] = useState(0);
    const [taxonomyOptions, setTaxonomyOptions] = useState<ITaxonomyOption[]>([]);

    useEffect(() => {
        const fetchTaxonomies = async () => {
            try {
                const [cats, subs] = await Promise.all([
                    getCourseCategories(),
                    getCourseSubcategories()
                ]);

                const options: ITaxonomyOption[] = [
                    { label: "[Default] Global Default Page", value: "default", type: "default" as const },
                    ...cats.map((c: any) => ({ label: `[Category] ${c.name}`, value: c.slug, type: 'category' as const })),
                    ...subs.map((s: any) => ({ label: `[Subcategory] ${s.name}`, value: s.slug, type: 'subcategory' as const }))
                ];
                setTaxonomyOptions(options);
            } catch (error) {
                console.error("Failed to fetch taxonomies", error);
            }
        };
        fetchTaxonomies();
    }, []);

    const defaultConfig: ICourseConfig = {
        name: "New Config",
        slug: "new-slug",
        type: 'category',
        hero: {
            isVisible: true,
            badgeText: "New Badge",
            title: "New Title",
            description: "New Description",
            backgroundImage: "",
            overlayOpacity: 40,
            primaryButton: { text: "Learn More", link: "#" },
            secondaryButton: { text: "Contact Us", link: "#" }
        },
        content: "",
        courses: {
            title: "Available Courses",
            subtitle: "Expert Training",
            items: []
        }
    };

    const renderHeroEditor = (config: ICourseConfig, index: number, data: any, setData: (data: any) => void) => {
        const updateHero = (field: string, value: any) => {
            const newCategories = [...data.categories];
            newCategories[index] = {
                ...newCategories[index],
                hero: { ...newCategories[index].hero, [field]: value }
            };
            setData({ ...data, categories: newCategories });
        };

        const updateButton = (btnType: 'primaryButton' | 'secondaryButton', field: string, value: string) => {
            const newCategories = [...data.categories];
            newCategories[index] = {
                ...newCategories[index],
                hero: {
                    ...newCategories[index].hero,
                    [btnType]: { ...newCategories[index].hero[btnType], [field]: value }
                }
            };
            setData({ ...data, categories: newCategories });
        };

        const updateBasic = (field: 'name' | 'slug' | 'type', value: string) => {
            const newCategories = [...data.categories];
            newCategories[index][field] = value as any;
            setData({ ...data, categories: newCategories });
        };

        const handleTargetChange = (slug: string) => {
            const option = taxonomyOptions.find(o => o.value === slug);
            if (option) {
                const newCategories = [...data.categories];
                newCategories[index].name = option.label.split('] ')[1];
                newCategories[index].slug = option.value;
                newCategories[index].type = option.type;
                setData({ ...data, categories: newCategories });
            }
        };

        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900 p-8 rounded-4xl text-white shadow-xl">
                    <div className="md:col-span-2 flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                            <span className="material-symbols-outlined text-blue-400">target</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-black tracking-tight">Configuration Target</h3>
                            <p className="text-white/50 text-xs font-bold uppercase tracking-widest">Identify what this hero is for</p>
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Linked Category / Subcategory</label>
                        <select
                            value={config.slug}
                            onChange={(e) => handleTargetChange(e.target.value)}
                            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-bold text-white appearance-none"
                        >
                            <option value="" className="bg-slate-900">Select Target...</option>
                            {taxonomyOptions.map(opt => (
                                <option key={opt.value} value={opt.value} className="bg-slate-900">{opt.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Display Name (Admin)</label>
                        <input
                            type="text"
                            value={config.name}
                            onChange={(e) => updateBasic('name', e.target.value)}
                            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-bold"
                            placeholder="e.g. Foundation Hero"
                        />
                    </div>
                    <div className="md:col-span-1 text-right flex flex-col justify-center">
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Target Type</span>
                        <span className="text-blue-400 font-black text-lg uppercase tracking-tight">{config.type}</span>
                    </div>
                </div>

                <CMSSection
                    title="Hero Visuals"
                    isVisible={config.hero.isVisible}
                    onVisibilityChange={(v) => updateHero('isVisible', v)}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Background Image</label>
                            <ImageUploader
                                value={config.hero.backgroundImage}
                                onChange={(url) => updateHero('backgroundImage', url)}
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
                                    onChange={(e) => updateHero('overlayOpacity', parseInt(e.target.value))}
                                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <span className="text-sm font-bold text-gray-900 w-12">{config.hero.overlayOpacity ?? 40}%</span>
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Badge Text</label>
                            <input
                                type="text"
                                value={config.hero.badgeText}
                                onChange={(e) => updateHero('badgeText', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                            <input
                                type="text"
                                value={config.hero.title}
                                onChange={(e) => updateHero('title', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                            <RichTextEditor
                                value={config.hero.description}
                                onChange={(content: string) => updateHero('description', content)}
                                placeholder="Enter hero description..."
                            />
                        </div>
                        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-lg">link</span>
                                Primary Button
                            </h3>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Button Text"
                                    value={config.hero.primaryButton.text}
                                    onChange={(e) => updateButton('primaryButton', 'text', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
                                />
                                <input
                                    type="text"
                                    placeholder="URL / Link"
                                    value={config.hero.primaryButton.link}
                                    onChange={(e) => updateButton('primaryButton', 'link', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                        </div>
                        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-secondary text-lg">link</span>
                                Secondary Button
                            </h3>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Button Text"
                                    value={config.hero.secondaryButton.text}
                                    onChange={(e) => updateButton('secondaryButton', 'text', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
                                />
                                <input
                                    type="text"
                                    placeholder="URL / Link"
                                    value={config.hero.secondaryButton.link}
                                    onChange={(e) => updateButton('secondaryButton', 'link', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                        </div>
                    </div>
                </CMSSection>

                <CMSSection title="Courses Grid">
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Section Title</label>
                                <input
                                    type="text"
                                    value={config.courses?.title || ""}
                                    onChange={(e) => {
                                        const newCategories = [...data.categories];
                                        const currentCourses = newCategories[index].courses || { title: "", subtitle: "", items: [] };
                                        newCategories[index].courses = { ...currentCourses, title: e.target.value };
                                        setData({ ...data, categories: newCategories });
                                    }}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Section Subtitle</label>
                                <input
                                    type="text"
                                    value={config.courses?.subtitle || ""}
                                    onChange={(e) => {
                                        const newCategories = [...data.categories];
                                        const currentCourses = newCategories[index].courses || { title: "", subtitle: "", items: [] };
                                        newCategories[index].courses = { ...currentCourses, subtitle: e.target.value };
                                        setData({ ...data, categories: newCategories });
                                    }}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                                />
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t">
                            <div className="flex items-center justify-between">
                                <h4 className="font-bold text-gray-700">Course Items</h4>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newCategories = [...data.categories];
                                        const currentCourses = newCategories[index].courses || { title: "", subtitle: "", items: [] };
                                        newCategories[index].courses = {
                                            ...currentCourses,
                                            items: [...(currentCourses.items || []), { level: "", slug: "", type: "", description: "", features: [], icon: "school", popular: false }]
                                        };
                                        setData({ ...data, categories: newCategories });
                                    }}
                                    className="text-primary font-bold text-sm flex items-center gap-1 hover:underline"
                                >
                                    <span className="material-symbols-outlined text-sm">add</span>
                                    Add Course Item
                                </button>
                            </div>

                            {(config.courses?.items || []).map((item: any, idx: number) => (
                                <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-4 relative group/item">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newCategories = [...data.categories];
                                            const currentCourses = newCategories[index].courses || { title: "", subtitle: "", items: [] };
                                            newCategories[index].courses = {
                                                ...currentCourses,
                                                items: (currentCourses.items || []).filter((_: any, i: number) => i !== idx)
                                            };
                                            setData({ ...data, categories: newCategories });
                                        }}
                                        className="absolute top-4 right-4 text-red-400 opacity-0 group-hover/item:opacity-100 hover:text-red-600 transition-all"
                                    >
                                        <span className="material-symbols-outlined">delete</span>
                                    </button>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Level / Title</label>
                                            <input
                                                value={item.level}
                                                onChange={(e) => {
                                                    const newCategories = [...data.categories];
                                                    const items = [...(newCategories[index].courses?.items || [])];
                                                    items[idx] = { ...items[idx], level: e.target.value };
                                                    newCategories[index].courses = { ...newCategories[index].courses, items };
                                                    setData({ ...data, categories: newCategories });
                                                }}
                                                className="w-full px-3 py-2 border rounded-lg text-sm"
                                                placeholder="e.g. CA Foundation"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Slug / Link</label>
                                            <input
                                                value={item.slug}
                                                onChange={(e) => {
                                                    const newCategories = [...data.categories];
                                                    const items = [...(newCategories[index].courses?.items || [])];
                                                    items[idx] = { ...items[idx], slug: e.target.value };
                                                    newCategories[index].courses = { ...newCategories[index].courses, items };
                                                    setData({ ...data, categories: newCategories });
                                                }}
                                                className="w-full px-3 py-2 border rounded-lg text-sm"
                                                placeholder="foundation"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Type</label>
                                            <input
                                                value={item.type}
                                                onChange={(e) => {
                                                    const newCategories = [...data.categories];
                                                    const items = [...(newCategories[index].courses?.items || [])];
                                                    items[idx] = { ...items[idx], type: e.target.value };
                                                    newCategories[index].courses = { ...newCategories[index].courses, items };
                                                    setData({ ...data, categories: newCategories });
                                                }}
                                                className="w-full px-3 py-2 border rounded-lg text-sm"
                                                placeholder="Full Course"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <div className="md:col-span-1">
                                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Icon</label>
                                            <IconChooser
                                                value={item.icon || "school"}
                                                onChange={(icon) => {
                                                    const newCategories = [...data.categories];
                                                    const items = [...(newCategories[index].courses?.items || [])];
                                                    items[idx] = { ...items[idx], icon };
                                                    newCategories[index].courses = { ...newCategories[index].courses, items };
                                                    setData({ ...data, categories: newCategories });
                                                }}
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Description</label>
                                            <textarea
                                                value={item.description}
                                                onChange={(e) => {
                                                    const newCategories = [...data.categories];
                                                    const items = [...(newCategories[index].courses?.items || [])];
                                                    items[idx] = { ...items[idx], description: e.target.value };
                                                    newCategories[index].courses = { ...newCategories[index].courses, items };
                                                    setData({ ...data, categories: newCategories });
                                                }}
                                                className="w-full px-3 py-2 border rounded-lg text-sm"
                                                rows={2}
                                            />
                                        </div>
                                        <div className="md:col-span-1 flex items-center">
                                            <label className="flex items-center gap-2 cursor-pointer mt-4">
                                                <input
                                                    type="checkbox"
                                                    checked={item.popular}
                                                    onChange={(e) => {
                                                        const newCategories = [...data.categories];
                                                        const items = [...(newCategories[index].courses?.items || [])];
                                                        items[idx] = { ...items[idx], popular: e.target.checked };
                                                        newCategories[index].courses = { ...newCategories[index].courses, items };
                                                        setData({ ...data, categories: newCategories });
                                                    }}
                                                    className="w-4 h-4 rounded text-primary border-gray-300 focus:ring-primary/20"
                                                />
                                                <span className="text-sm font-bold text-gray-600">Popular?</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Features (One per line)</label>
                                        <textarea
                                            value={(item.features || []).join('\n')}
                                            onChange={(e) => {
                                                const newCategories = [...data.categories];
                                                const items = [...(newCategories[index].courses?.items || [])];
                                                items[idx] = { ...items[idx], features: e.target.value.split('\n') };
                                                newCategories[index].courses = { ...newCategories[index].courses, items };
                                                setData({ ...data, categories: newCategories });
                                            }}
                                            className="w-full px-3 py-2 border rounded-lg text-sm"
                                            rows={3}
                                            placeholder="Expert Faculty&#10;Study Materials&#10;Mock Tests"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CMSSection>

                <CMSSection title="Body Content">
                    <p className="text-sm text-gray-500 mb-6">
                        This content will appear below the hero section. Use the rich text editor to add course details, syllabus, or other relevant information.
                    </p>
                    <RichTextEditor
                        value={config.content || ""}
                        onChange={(html: string) => {
                            const newCategories = [...data.categories];
                            newCategories[index].content = html;
                            setData({ ...data, categories: newCategories });
                        }}
                        placeholder="Write detailed course information here..."
                    />
                </CMSSection>

                <div className="flex justify-end pt-4">
                    <button
                        type="button"
                        onClick={() => {
                            if (data.categories.length > 1) {
                                const newCategories = data.categories.filter((_: any, i: number) => i !== index);
                                setData({ ...data, categories: newCategories });
                                setActiveConfigIndex(0);
                            } else {
                                toast.error("At least one configuration is required.");
                            }
                        }}
                        className="px-6 py-3 bg-red-50 text-red-600 rounded-2xl hover:bg-red-100 transition-all text-sm font-black flex items-center gap-3 active:scale-95"
                    >
                        <span className="material-symbols-outlined text-sm">delete</span>
                        DELETE CONFIGURATION
                    </button>
                </div>
            </div>
        );
    };

    return (
        <CMSPage
            title="Course Hero CMS"
            description="Manage individual hero settings for categories and subcategories."
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
        >
            {(data: any, setData: any) => (
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Standard Sidebar */}
                    <div className="w-full lg:w-72 shrink-0">
                        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm sticky top-8">
                            <div className="flex items-center justify-between mb-4 px-2">
                                <h3 className="font-black text-slate-900 text-[10px] uppercase tracking-[0.2em]">Configurations</h3>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setData({ ...data, categories: [...data.categories, { ...defaultConfig }] });
                                        setActiveConfigIndex(data.categories.length);
                                    }}
                                    className="w-8 h-8 flex items-center justify-center bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-all shadow-sm"
                                >
                                    <span className="material-symbols-outlined text-sm">add</span>
                                </button>
                            </div>
                            <div className="space-y-1 max-h-[calc(100vh-250px)] overflow-y-auto pr-1 scrollbar-hide">
                                {data.categories.map((config: ICourseConfig, index: number) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => setActiveConfigIndex(index)}
                                        className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between group ${activeConfigIndex === index
                                            ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10"
                                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-transparent"
                                            }`}
                                    >
                                        <div className="flex flex-col truncate">
                                            <span className="text-sm font-bold truncate">{config.name || `Config ${index + 1}`}</span>
                                            <span className={`text-[10px] font-black uppercase tracking-tighter ${activeConfigIndex === index ? "text-white/60" : "text-slate-400"}`}>
                                                {config.type}
                                            </span>
                                        </div>
                                        {activeConfigIndex === index && (
                                            <span className="material-symbols-outlined text-xs">chevron_right</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Editor Area */}
                    <div className="flex-1 min-w-0">
                        {data.categories[activeConfigIndex] ? (
                            renderHeroEditor(data.categories[activeConfigIndex], activeConfigIndex, data, setData)
                        ) : (
                            <div className="bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100 p-20 flex flex-col items-center justify-center text-center">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined text-4xl text-gray-200">dashboard_customize</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Select a Configuration</h3>
                                <p className="text-gray-500 max-w-sm">Select one of the configurations from the left sidebar to start editing its hero section.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </CMSPage>
    );
}


