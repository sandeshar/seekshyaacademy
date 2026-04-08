import React from 'react';
import Link from 'next/link';
import { getHubCategories } from '@/actions/categories';

const CategoryFilters = async ({ selectedCategory }: { selectedCategory?: string }) => {
    let categories: any[] = [];
    try {
        categories = await getHubCategories();
    } catch (err) {
        console.error('Failed to load categories', err);
    }

    return (
        <section className="overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex gap-3 min-w-max">
                <Link
                    href="/learning-hub"
                    className={`flex h-10 items-center gap-x-2 rounded-full pl-4 pr-6 transition-all ${!selectedCategory ? 'bg-primary text-white scale-105' : 'bg-[#e8ebf3] text-[#0e121b] hover:bg-gray-200'}`}
                >
                    <span className="material-symbols-outlined text-[20px]">apps</span>
                    <span className="text-sm font-medium">All Posts</span>
                </Link>
                {categories.map((cat) => (
                    <Link
                        key={cat._id}
                        href={`/learning-hub?category=${cat.slug}`}
                        className={`flex h-10 items-center gap-x-2 rounded-full pl-4 pr-6 transition-all ${selectedCategory === cat.slug ? 'bg-primary text-white scale-105' : 'bg-[#e8ebf3] text-[#0e121b] hover:bg-gray-200'}`}
                    >
                        <span className="material-symbols-outlined text-[20px]">menu_book</span>
                        <span className="text-sm font-medium">{cat.name}</span>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default CategoryFilters;

