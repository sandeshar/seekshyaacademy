"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { getNavbar, updateNavbar } from "@/actions/navbar";
import * as CategoryActions from "@/actions/categories";
import {
    Plus,
    Trash2,
    Save,
    ChevronUp,
    ChevronDown,
    Edit,
    Search,
    Menu,
    X
} from "lucide-react";

interface INavbarItem {
    _id?: string;
    label: string;
    href: string;
    isExternal: boolean;
    subItems: INavbarItem[];
}

interface Category {
    _id: string;
    name: string;
    slug: string;
}

interface Subcategory {
    _id: string;
    name: string;
    slug: string;
    categoryId: string;
}

type ContentType = 'courses' | 'notices' | 'teachers' | 'blogs';

export default function NavbarManager() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [items, setItems] = useState<INavbarItem[]>([]);
    const [cta, setCta] = useState<{ label: string; href: string; show: boolean } | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<INavbarItem | null>(null);
    const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1);
    const [manageDropdownId, setManageDropdownId] = useState<number | null>(null);
    const [selectedContentType, setSelectedContentType] = useState<ContentType>('courses');
    const [categories, setCategories] = useState<Category[]>([]);
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
    const [loadingCategories, setLoadingCategories] = useState(false);
    const [includeSubcategories, setIncludeSubcategories] = useState(true);
    const [categorySearch, setCategorySearch] = useState("");
    const [manualLabel, setManualLabel] = useState("");
    const [manualHref, setManualHref] = useState("");
    const [activeTab, setActiveTab] = useState<'import' | 'manual'>('import');
    const [addSubToSubId, setAddSubToSubId] = useState<number | null>(null);

    useEffect(() => {
        fetchNavbar();
    }, []);

    const fetchNavbar = async () => {
        setIsLoading(true);
        try {
            const data = await getNavbar();
            setItems(data.items || []);
            setCta(data.cta || { label: "", href: "", show: true });
        } catch (error) {
            console.error(error);
            toast.error("Failed to load navbar");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await updateNavbar({ items, cta });
            toast.success("Navbar saved successfully!");
            router.refresh();
            fetchNavbar();
        } catch (error) {
            console.error(error);
            toast.error("Failed to save changes");
        } finally {
            setIsSaving(false);
        }
    };

    const addItem = () => {
        setSelectedItem({
            label: "",
            href: "",
            isExternal: false,
            subItems: []
        });
        setSelectedItemIndex(-1);
        setIsModalOpen(true);
    };

    const editItem = (index: number) => {
        setSelectedItem({ ...items[index] });
        setSelectedItemIndex(index);
        setIsModalOpen(true);
    };

    const saveItemModal = () => {
        if (!selectedItem) return;

        if (selectedItemIndex >= 0) {
            const newItems = [...items];
            newItems[selectedItemIndex] = selectedItem;
            setItems(newItems);
        } else {
            setItems([...items, selectedItem]);
        }

        setIsModalOpen(false);
        setSelectedItem(null);
        setSelectedItemIndex(-1);
        toast.success("Item saved!");
    };

    const deleteItem = (index: number) => {
        if (!confirm("Delete this navbar item?")) return;
        setItems(items.filter((_, i) => i !== index));
        toast.success("Item deleted!");
    };

    const deleteSubItem = (parentIndex: number, subIndex: number) => {
        if (!confirm("Delete this dropdown item?")) return;
        const newItems = [...items];
        newItems[parentIndex].subItems = newItems[parentIndex].subItems.filter((_, i) => i !== subIndex);
        setItems(newItems);
        toast.success("Dropdown item deleted!");
    };

    const moveItem = (index: number, direction: 'up' | 'down') => {
        if ((direction === 'up' && index === 0) || (direction === 'down' && index === items.length - 1)) return;

        const newItems = [...items];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
        setItems(newItems);
    };

    const moveSubItem = (parentIndex: number, subIndex: number, direction: 'up' | 'down') => {
        const subItems = items[parentIndex].subItems;
        if ((direction === 'up' && subIndex === 0) || (direction === 'down' && subIndex === subItems.length - 1)) return;

        const newItems = [...items];
        const subs = [...newItems[parentIndex].subItems];
        const targetIndex = direction === 'up' ? subIndex - 1 : subIndex + 1;
        [subs[subIndex], subs[targetIndex]] = [subs[targetIndex], subs[subIndex]];
        newItems[parentIndex].subItems = subs;
        setItems(newItems);
    };

    const toggleManageDropdown = async (index: number) => {
        if (manageDropdownId === index) {
            setManageDropdownId(null);
            return;
        }

        setManageDropdownId(index);
        await loadCategories(selectedContentType);
    };

    const loadCategories = async (type: ContentType) => {
        setLoadingCategories(true);
        setSelectedCategories(new Set());
        try {
            let cats = [];
            let subs = [];

            switch (type) {
                case 'courses':
                    cats = await CategoryActions.getCourseCategories();
                    subs = await CategoryActions.getCourseSubcategories();
                    break;
                case 'notices':
                    cats = await CategoryActions.getNoticeCategories();
                    subs = await CategoryActions.getNoticeSubcategories();
                    break;
                case 'teachers':
                    cats = await CategoryActions.getTeacherCategories();
                    subs = await CategoryActions.getTeacherSubcategories();
                    break;
                case 'blogs':
                    cats = await CategoryActions.getHubCategories();
                    subs = await CategoryActions.getHubSubcategories();
                    break;
            }

            setCategories(cats);
            setSubcategories(subs);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load categories');
        } finally {
            setLoadingCategories(false);
        }
    };

    const handleContentTypeChange = (type: ContentType) => {
        setSelectedContentType(type);
        loadCategories(type);
    };

    const toggleCategory = (catId: string) => {
        setSelectedCategories(prev => {
            const next = new Set(prev);
            if (next.has(catId)) next.delete(catId);
            else next.add(catId);
            return next;
        });
    };

    const attachSelectedCategories = () => {
        if (manageDropdownId === null || selectedCategories.size === 0) {
            toast.error('Please select at least one category');
            return;
        }

        const newItems = [...items];
        const newSubItems: INavbarItem[] = [];

        selectedCategories.forEach(catId => {
            const cat = categories.find(c => c._id === catId);
            if (!cat) return;

            // Handle both string and ObjectId categoryId
            const subs = subcategories.filter(s => {
                const subCatId = typeof s.categoryId === 'object' && s.categoryId !== null
                    ? (s.categoryId as any)._id || s.categoryId
                    : s.categoryId;
                return String(subCatId) === String(catId);
            });

            const getHref = (type: ContentType, cSlug: string, sSlug?: string) => {
                const basePath = type === 'teachers' ? 'faculty' : type;
                if (type === 'courses') {
                    return sSlug ? `/courses/${cSlug}/${sSlug}` : `/courses/${cSlug}`;
                }
                if (sSlug) {
                    return `/${basePath}?category=${cSlug}&subcategory=${sSlug}`;
                }
                return `/${basePath}?category=${cSlug}`;
            };

            newSubItems.push({
                label: cat.name,
                href: getHref(selectedContentType, cat.slug),
                isExternal: false,
                subItems: includeSubcategories ? subs.map(sub => ({
                    label: sub.name,
                    href: getHref(selectedContentType, cat.slug, sub.slug),
                    isExternal: false,
                    subItems: []
                })) : []
            });
        });

        newItems[manageDropdownId].subItems = [...newItems[manageDropdownId].subItems, ...newSubItems];
        setItems(newItems);
        setManageDropdownId(null);
        toast.success(`Added ${newSubItems.length} categories!`);
    };

    const removeAllChildren = (parentIndex: number) => {
        if (!confirm('Remove all dropdown items from this menu?')) return;

        const newItems = [...items];
        newItems[parentIndex].subItems = [];
        setItems(newItems);
        toast.success('All dropdown items removed');
    };

    const addManualSubItem = (parentIndex: number) => {
        if (!manualLabel || !manualHref) {
            toast.error('Please enter both label and URL');
            return;
        }

        const newItems = [...items];
        newItems[parentIndex].subItems.push({
            label: manualLabel,
            href: manualHref,
            isExternal: manualHref.startsWith('http'),
            subItems: []
        });

        setItems(newItems);
        setManualLabel("");
        setManualHref("");
        toast.success('Sub-item added!');
    };

    const addManualSubSubItem = (parentIndex: number, subIndex: number) => {
        if (!manualLabel || !manualHref) {
            toast.error('Please enter both label and URL');
            return;
        }

        const newItems = [...items];
        if (!newItems[parentIndex].subItems[subIndex].subItems) {
            newItems[parentIndex].subItems[subIndex].subItems = [];
        }

        newItems[parentIndex].subItems[subIndex].subItems?.push({
            label: manualLabel,
            href: manualHref,
            isExternal: manualHref.startsWith('http'),
            subItems: []
        });

        setItems(newItems);
        setManualLabel("");
        setManualHref("");
        setAddSubToSubId(null);
        toast.success('Nested item added!');
    };

    const deleteSubSubItem = (parentIndex: number, subIndex: number, subSubIndex: number) => {
        if (!confirm("Delete this nested item?")) return;
        const newItems = [...items];
        newItems[parentIndex].subItems[subIndex].subItems =
            newItems[parentIndex].subItems[subIndex].subItems?.filter((_, i) => i !== subSubIndex);
        setItems(newItems);
        toast.success("Nested item deleted!");
    };

    const moveSubSubItem = (parentIndex: number, subIndex: number, subSubIndex: number, direction: 'up' | 'down') => {
        const newItems = [...items];
        const subs = [...(newItems[parentIndex].subItems[subIndex].subItems || [])];
        if ((direction === 'up' && subSubIndex === 0) || (direction === 'down' && subSubIndex === subs.length - 1)) return;

        const targetIndex = direction === 'up' ? subSubIndex - 1 : subSubIndex + 1;
        [subs[subSubIndex], subs[targetIndex]] = [subs[targetIndex], subs[subSubIndex]];
        newItems[parentIndex].subItems[subIndex].subItems = subs;
        setItems(newItems);
    };

    const filteredItems = items.filter(item => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return item.label.toLowerCase().includes(query) || item.href.toLowerCase().includes(query);
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-slate-600 text-sm">Loading...</p>
                </div>
            </div>
        );
    }

    if (!cta) return null;

    return (
        <div className="flex-1 overflow-y-autobg-slate-50">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-md">
                <div className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 leading-none">Navbar Manager</h1>
                        <p className="text-[11px] text-slate-500 mt-1 uppercase font-bold tracking-wider">Navigation Control Panel</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded text-sm font-bold transition-all flex items-center gap-2 disabled:opacity-50 shadow-sm"
                        >
                            <Save size={18} />
                            {isSaving ? "SAVING..." : "SAVE ALL CHANGES"}
                        </button>
                        <button
                            onClick={addItem}
                            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded text-sm font-bold transition-all flex items-center gap-2 shadow-sm"
                        >
                            <Plus size={18} />
                            ADD NEW ITEM
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full mx-auto px-6 py-8">
                <div className="max-w-5xl mx-auto space-y-6">
                    {/* Search and Actions */}
                    <div className="bg-white p-4 border border-slate-200 shadow-sm rounded flex items-center gap-4">
                        <div className="flex-1 relative">
                            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search items..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest px-4 border-l border-slate-200">
                            {filteredItems.length} Items Found
                        </div>
                    </div>

                    {/* Stationary CTA Button Setting */}
                    <div className="bg-white p-4 border border-slate-200 shadow-sm rounded">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                    <Edit size={20} />
                                </div>
                                <div>
                                    <h2 className="text-sm font-bold text-slate-900 uppercase tracking-tight">Stationary CTA Button</h2>
                                    <p className="text-[10px] text-slate-500 font-medium">This button is always visible on the right side of the navbar</p>
                                </div>
                            </div>
                            <div className="flex flex-1 max-w-2xl gap-2">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="Button Label"
                                        value={cta.label || ""}
                                        onChange={(e) => setCta({ ...cta, label: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-200 rounded text-xs font-bold"
                                    />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="Button URL"
                                        value={cta.href || ""}
                                        onChange={(e) => setCta({ ...cta, href: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-200 rounded text-xs"
                                    />
                                </div>
                                <div className="flex items-center px-3 border border-slate-200 rounded">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={cta.show}
                                            onChange={(e) => setCta({ ...cta, show: e.target.checked })}
                                            className="w-3.5 h-3.5 text-primary rounded"
                                        />
                                        <span className="text-[10px] font-bold text-slate-600">SHOW</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Items List */}
                    {filteredItems.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-lg border border-dashed border-slate-300">
                            <Menu size={48} className="mx-auto text-slate-300 mb-3" />
                            <p className="text-slate-500 text-sm mb-4">No navbar items found</p>
                            <button
                                onClick={addItem}
                                className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                            >
                                Create your first navbar item
                            </button>
                        </div>
                    ) : (
                        <div className="bg-white border border-slate-200 divide-y divide-slate-200">
                            {filteredItems.map((item, index) => (
                                <div key={index} className="px-4 py-3 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        {/* Reorder Buttons */}
                                        <div className="flex flex-col gap-1">
                                            <button
                                                onClick={() => moveItem(index, 'up')}
                                                disabled={index === 0}
                                                className="p-1 text-slate-600 hover:bg-slate-200 rounded disabled:opacity-30"
                                            >
                                                <ChevronUp size={16} />
                                            </button>
                                            <button
                                                onClick={() => moveItem(index, 'down')}
                                                disabled={index === filteredItems.length - 1}
                                                className="p-1 text-slate-600 hover:bg-slate-200 rounded disabled:opacity-30"
                                            >
                                                <ChevronDown size={16} />
                                            </button>
                                        </div>

                                        {/* Item Info */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-base font-semibold text-slate-900">
                                                    {item.label || <span className="text-slate-400 italic">Untitled</span>}
                                                </h3>
                                                {item.subItems.length > 0 && (
                                                    <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                                                        {item.subItems.length} dropdown{item.subItems.length !== 1 ? 's' : ''}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-slate-500">{item.href}</p>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-1">
                                            <button
                                                onClick={() => editItem(index)}
                                                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => deleteItem(index)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => toggleManageDropdown(index)}
                                                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                                title="Manage dropdown items"
                                            >
                                                <Menu size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Manage Dropdown Panel */}
                                    {manageDropdownId === index && (
                                        <div className="mt-3 p-3 border border-slate-200 bg-white rounded-lg shadow-sm">
                                            {/* Header with Tabs */}
                                            <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                                                <div className="flex gap-4">
                                                    <button
                                                        onClick={() => setActiveTab('import')}
                                                        className={`text-xs font-bold uppercase tracking-wider pb-2 border-b-2 transition-colors ${activeTab === 'import' ? 'border-primary text-primary' : 'border-transparent text-slate-400'}`}
                                                    >
                                                        Quick Import
                                                    </button>
                                                    <button
                                                        onClick={() => setActiveTab('manual')}
                                                        className={`text-xs font-bold uppercase tracking-wider pb-2 border-b-2 transition-colors ${activeTab === 'manual' ? 'border-primary text-primary' : 'border-transparent text-slate-400'}`}
                                                    >
                                                        Manual Link
                                                    </button>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {item.subItems.length > 0 && (
                                                        <button
                                                            onClick={() => removeAllChildren(index)}
                                                            className="text-[10px] text-red-500 hover:text-red-700 font-bold uppercase"
                                                        >
                                                            Clear All ({item.subItems.length})
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            {activeTab === 'import' ? (
                                                <div className="space-y-3">
                                                    {/* Content Type Selector */}
                                                    <div className="flex gap-1 overflow-x-auto no-scrollbar pb-1">
                                                        {(['courses', 'notices', 'teachers', 'blogs'] as ContentType[]).map(type => (
                                                            <button
                                                                key={type}
                                                                onClick={() => handleContentTypeChange(type)}
                                                                className={`px-3 py-1 text-[10px] font-bold rounded capitalize whitespace-nowrap transition-colors ${selectedContentType === type
                                                                    ? 'bg-slate-900 text-white'
                                                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                                                    }`}
                                                            >
                                                                {type.replace('-', ' ')}
                                                            </button>
                                                        ))}
                                                    </div>

                                                    {/* Category Selector with Search */}
                                                    <div className="space-y-2">
                                                        <div className="flex gap-2">
                                                            <input
                                                                type="text"
                                                                placeholder="Search categories..."
                                                                value={categorySearch}
                                                                onChange={(e) => setCategorySearch(e.target.value)}
                                                                className="flex-1 px-3 py-1.5 border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                                                            />
                                                            <label className="flex items-center gap-1 cursor-pointer">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={includeSubcategories}
                                                                    onChange={(e) => setIncludeSubcategories(e.target.checked)}
                                                                    className="w-3.5 h-3.5 rounded"
                                                                />
                                                                <span className="text-[10px] text-slate-500 font-medium">Subs</span>
                                                            </label>
                                                        </div>

                                                        {loadingCategories ? (
                                                            <div className="py-4 text-center text-[10px] text-slate-400">Loading...</div>
                                                        ) : (
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 max-h-32 overflow-y-auto">
                                                                {categories.filter(c => c.name.toLowerCase().includes(categorySearch.toLowerCase())).map(cat => (
                                                                    <label key={cat._id} className={`flex items-center gap-2 px-2 py-1 rounded border cursor-pointer transition-colors ${selectedCategories.has(cat._id) ? 'bg-primary/5 border-primary/20' : 'bg-slate-50 border-transparent hover:bg-slate-100'}`}>
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={selectedCategories.has(cat._id)}
                                                                            onChange={() => toggleCategory(cat._id)}
                                                                            className="w-3.5 h-3.5 text-primary rounded"
                                                                        />
                                                                        <span className="text-xs text-slate-700 truncate">{cat.name}</span>
                                                                    </label>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <button
                                                        onClick={attachSelectedCategories}
                                                        disabled={selectedCategories.size === 0}
                                                        className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded text-xs font-bold transition-all disabled:opacity-50"
                                                    >
                                                        Import {selectedCategories.size} Selected Categories
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="space-y-3">
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                        <div className="space-y-1">
                                                            <label className="text-[10px] font-bold text-slate-500 uppercase">Label</label>
                                                            <input
                                                                type="text"
                                                                placeholder="e.g. My Link"
                                                                value={manualLabel}
                                                                onChange={(e) => setManualLabel(e.target.value)}
                                                                className="w-full px-3 py-1.5 border border-slate-200 rounded text-xs"
                                                            />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <label className="text-[10px] font-bold text-slate-500 uppercase">URL / Path</label>
                                                            <input
                                                                type="text"
                                                                placeholder="e.g. /my-path"
                                                                value={manualHref}
                                                                onChange={(e) => setManualHref(e.target.value)}
                                                                className="w-full px-3 py-1.5 border border-slate-200 rounded text-xs"
                                                            />
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => addManualSubItem(index)}
                                                        className="w-full bg-slate-900 hover:bg-black text-white py-2 rounded text-xs font-bold transition-all"
                                                    >
                                                        Add Manual Dropdown Item
                                                    </button>
                                                </div>
                                            )}

                                            {/* Existing items condensed */}
                                            {item.subItems.length > 0 && (
                                                <div className="mt-4 pt-4 border-t border-slate-100">
                                                    <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">Dropdown Structure</div>
                                                    <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
                                                        {item.subItems.map((sub, subIndex) => (
                                                            <div key={subIndex} className="space-y-1">
                                                                <div className="bg-slate-50 group/item border border-slate-100 rounded p-1.5 flex items-center justify-between">
                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="text-[11px] font-bold text-slate-800 flex items-center gap-1">
                                                                            {sub.label}
                                                                            {sub.subItems && sub.subItems.length > 0 && (
                                                                                <span className="text-[10px] px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded-full font-bold">{sub.subItems.length}</span>
                                                                            )}
                                                                        </div>
                                                                        <div className="text-[9px] text-slate-400 truncate">{sub.href}</div>
                                                                    </div>
                                                                    <div className="flex gap-0.5 opacity-0 group-hover/item:opacity-100 transition-opacity">
                                                                        <button
                                                                            onClick={() => setAddSubToSubId(addSubToSubId === subIndex ? null : subIndex)}
                                                                            className={`p-1 rounded ${addSubToSubId === subIndex ? 'bg-primary text-white' : 'hover:bg-white text-primary'}`}
                                                                            title="Add Child"
                                                                        >
                                                                            <Plus size={12} />
                                                                        </button>
                                                                        <button onClick={() => moveSubItem(index, subIndex, 'up')} className="p-1 hover:bg-white rounded"><ChevronUp size={12} /></button>
                                                                        <button onClick={() => moveSubItem(index, subIndex, 'down')} className="p-1 hover:bg-white rounded"><ChevronDown size={12} /></button>
                                                                        <button onClick={() => deleteSubItem(index, subIndex)} className="p-1 text-red-500 hover:bg-white rounded"><Trash2 size={12} /></button>
                                                                    </div>
                                                                </div>

                                                                {/* Add Sub-Sub-Item Form */}
                                                                {addSubToSubId === subIndex && (
                                                                    <div className="ml-4 p-2 border border-dashed border-primary/30 bg-primary/5 rounded space-y-2">
                                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                                            <input
                                                                                type="text"
                                                                                placeholder="Sub Label"
                                                                                value={manualLabel}
                                                                                onChange={(e) => setManualLabel(e.target.value)}
                                                                                className="px-2 py-1 text-[10px] border border-slate-200 rounded"
                                                                            />
                                                                            <input
                                                                                type="text"
                                                                                placeholder="Sub URL"
                                                                                value={manualHref}
                                                                                onChange={(e) => setManualHref(e.target.value)}
                                                                                className="px-2 py-1 text-[10px] border border-slate-200 rounded"
                                                                            />
                                                                        </div>
                                                                        <div className="flex gap-2">
                                                                            <button
                                                                                onClick={() => addManualSubSubItem(index, subIndex)}
                                                                                className="flex-1 bg-primary text-white text-[10px] py-1 rounded font-bold"
                                                                            >
                                                                                Add Nested Item
                                                                            </button>
                                                                            <button
                                                                                onClick={() => setAddSubToSubId(null)}
                                                                                className="px-2 bg-slate-200 text-slate-600 text-[10px] py-1 rounded font-bold"
                                                                            >
                                                                                Cancel
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {/* Nested children list */}
                                                                {sub.subItems && sub.subItems.length > 0 && (
                                                                    <div className="ml-4 space-y-1 border-l-2 border-slate-100 pl-2">
                                                                        {sub.subItems.map((ss, ssIdx) => (
                                                                            <div key={ssIdx} className="bg-white group/ss border border-slate-100 rounded p-1 flex items-center justify-between">
                                                                                <div className="flex-1 min-w-0">
                                                                                    <div className="text-[10px] font-medium text-slate-700">{ss.label}</div>
                                                                                    <div className="text-[8px] text-slate-400 truncate">{ss.href}</div>
                                                                                </div>
                                                                                <div className="flex gap-0.5 opacity-0 group-hover/ss:opacity-100 transition-opacity">
                                                                                    <button onClick={() => moveSubSubItem(index, subIndex, ssIdx, 'up')} className="p-0.5 hover:bg-slate-100 rounded"><ChevronUp size={10} /></button>
                                                                                    <button onClick={() => moveSubSubItem(index, subIndex, ssIdx, 'down')} className="p-0.5 hover:bg-slate-100 rounded"><ChevronDown size={10} /></button>
                                                                                    <button onClick={() => deleteSubSubItem(index, subIndex, ssIdx)} className="p-0.5 text-red-500 hover:bg-slate-100 rounded"><Trash2 size={10} /></button>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Edit Modal */}
            {isModalOpen && selectedItem && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[95vh] flex flex-col overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-900">
                                {selectedItemIndex >= 0 ? "Edit" : "New"} Navbar Item
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-1 hover:bg-slate-100 rounded"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-4 overflow-y-auto">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Label</label>
                                <input
                                    type="text"
                                    value={selectedItem.label || ""}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, label: e.target.value })}
                                    placeholder="e.g., Home, About, Courses"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Link (href)</label>
                                <input
                                    type="text"
                                    value={selectedItem.href || ""}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, href: e.target.value })}
                                    placeholder="e.g., /, /about, /courses"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedItem.isExternal}
                                        onChange={(e) => setSelectedItem({ ...selectedItem, isExternal: e.target.checked })}
                                        className="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary"
                                    />
                                    <span className="text-sm text-slate-700">External link (opens in new tab)</span>
                                </label>
                            </div>
                        </div>

                        <div className="px-6 py-4 border-t border-slate-200 flex gap-3">
                            <button
                                onClick={saveItemModal}
                                className="flex-1 bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
                            >
                                Save Item
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-6 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-sm font-medium transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
