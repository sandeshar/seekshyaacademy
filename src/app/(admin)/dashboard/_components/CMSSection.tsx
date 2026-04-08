"use client";

import React from "react";

interface CMSSectionProps {
    title: string;
    isVisible?: boolean;
    onVisibilityChange?: (visible: boolean) => void;
    children: React.ReactNode;
}

const CMSSection = ({ title, isVisible, onVisibilityChange, children }: CMSSectionProps) => (
    <div className={`mb-12 animate-in fade-in duration-700 ${isVisible === false ? 'opacity-50 grayscale-[0.5]' : ''}`}>
        <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{title}</h2>
            {onVisibilityChange && (
                <button
                    onClick={() => onVisibilityChange(!isVisible)}
                    className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-all ${isVisible
                            ? 'bg-indigo-50 border-indigo-100 text-indigo-600'
                            : 'bg-slate-50 border-slate-200 text-slate-400'
                        }`}
                >
                    <span className="material-symbols-outlined text-sm">{isVisible ? 'visibility' : 'visibility_off'}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">{isVisible ? 'Live' : 'Hidden'}</span>
                </button>
            )}
        </div>
        <div className="bg-white rounded-4xl border border-slate-100 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.05)] p-10">
            <div className="space-y-8">
                {children}
            </div>
        </div>
    </div>
);

export default CMSSection;
