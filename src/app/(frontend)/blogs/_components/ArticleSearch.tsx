'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';

const ArticleSearch = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('q') || '');

    // Synchronize local state with URL params (e.g., when clearing search or changing category)
    useEffect(() => {
        const urlQ = searchParams.get('q') || '';
        setQuery(urlQ);
    }, [searchParams]);

    // Debounce search updates to the URL
    useEffect(() => {
        const currentQ = searchParams.get('q') || '';
        // Only trigger if the query actually changed
        if (query === currentQ) return;

        const timeoutId = setTimeout(() => {
            updateSearch(query);
        }, 600); // Slightly longer debounce for better UX

        return () => clearTimeout(timeoutId);
    }, [query]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        updateSearch(query);
    };

    const updateSearch = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const trimmedValue = value.trim();
        if (trimmedValue) {
            params.set('q', trimmedValue);
        } else {
            params.delete('q');
        }
        params.delete('page'); // Reset to page 1 on search
        router.push(`/blogs?${params.toString()}`, { scroll: false });
    };

    const clearSearch = () => {
        setQuery('');
        updateSearch('');
    };

    return (
        <form onSubmit={handleSearch} className="relative w-full max-w-md">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full h-10 pl-10 pr-10 rounded-full bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                {query && (
                    <button
                        type="button"
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-3 h-3 text-slate-400" />
                    </button>
                )}
            </div>
        </form>
    );
};

export default ArticleSearch;
