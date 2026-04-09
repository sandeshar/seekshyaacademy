"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

const FacultyFilters = ({
    categories,
    subcategories,
    selectedCategory,
    selectedSubcategory
}: {
    categories?: any[],
    subcategories?: any[],
    selectedCategory?: string,
    selectedSubcategory?: string
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

    // Sync state with URL when it changes elsewhere (e.g. back button)
    useEffect(() => {
        setSearchQuery(searchParams.get('q') || '');
    }, [searchParams]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());
        if (searchQuery.trim()) {
            params.set('q', searchQuery.trim());
        } else {
            params.delete('q');
        }
        router.push(`/faculty?${params.toString()}`);
    };

    // Filter subcategories based on selected category if category is selected
    const displayedSubcategories = selectedCategory
        ? subcategories?.filter(sub => {
            const parentCat = categories?.find(c => c.slug === selectedCategory);
            return sub.categoryId === parentCat?._id || sub.categoryId?._id === parentCat?._id;
        })
        : [];

    return (
        <section className="sticky top-16 z-40 border-y border-outline-variant/30 bg-surface-container-lowest/95 backdrop-blur shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 py-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    {/* Chips for Categories */}
                    <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                        <Link
                            href="/faculty"
                            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${!selectedCategory
                                ? 'bg-primary text-white shadow-sm'
                                : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                                }`}
                        >
                            All Faculty
                        </Link>
                        {categories?.map((cat) => {
                            const params = new URLSearchParams(searchParams.toString());
                            params.set('category', cat.slug);
                            params.delete('subcategory'); // Reset subcategory when category changes
                            return (
                                <Link
                                    key={cat._id}
                                    href={`/faculty?${params.toString()}`}
                                    className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${selectedCategory === cat.slug
                                        ? 'bg-primary text-white shadow-sm'
                                        : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                                        }`}
                                >
                                    {cat.name}
                                </Link>
                            );
                        })}
                    </div>
                    {/* Search Input */}
                    <form onSubmit={handleSearch} className="relative w-full sm:w-72 md:w-80">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="material-symbols-outlined text-slate-400">search</span>
                        </div>
                        <input
                            className="block w-full rounded-xl border-0 bg-surface-container-low py-2.5 pl-10 text-on-surface ring-1 ring-inset ring-outline-variant placeholder:text-on-surface-variant focus:ring-2 focus:ring-inset focus:ring-primary outline-none"
                            placeholder="Search by name or subject"
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>
                </div>

                {/* Subcategories if category selected */}
                {displayedSubcategories && displayedSubcategories.length > 0 && (
                    <div className="no-scrollbar flex gap-2 overflow-x-auto border-t border-outline-variant/20 pt-3">
                        <Link
                            href={`/faculty?category=${selectedCategory}`}
                            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${!selectedSubcategory
                                ? 'bg-secondary text-white'
                                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                                }`}
                        >
                            All {categories?.find(c => c.slug === selectedCategory)?.name}
                        </Link>
                        {displayedSubcategories.map((sub) => {
                            const params = new URLSearchParams(searchParams.toString());
                            params.set('subcategory', sub.slug);
                            return (
                                <Link
                                    key={sub._id}
                                    href={`/faculty?${params.toString()}`}
                                    className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${selectedSubcategory === sub.slug
                                        ? 'bg-secondary text-white'
                                        : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                                        }`}
                                >
                                    {sub.name}
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FacultyFilters;

