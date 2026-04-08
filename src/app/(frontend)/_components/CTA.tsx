import React from 'react';
import Link from 'next/link';

interface CTAProps {
    data?: {
        title: string;
        description: string;
        primaryButton: { text: string; link: string; icon?: string };
        secondaryButton: { text: string; link: string; icon?: string };
    };
}

const CTA = ({ data }: CTAProps) => {
    return (
        <div className="w-full bg-background-dark py-16 md:py-24 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--secondary) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight font-lexend">{data?.title}</h2>
                <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">{data?.description}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href={data?.primaryButton?.link || '#'}
                        className="bg-primary hover:bg-primary-dark text-white font-bold py-4 px-10 rounded-xl shadow-xl shadow-primary/20 transition-all hover:scale-105 inline-flex items-center justify-center gap-3 group"
                    >
                        {data?.primaryButton?.text}
                        <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">{data?.primaryButton?.icon}</span>
                    </Link>
                    <Link
                        href={data?.secondaryButton?.link || '#'}
                        className="bg-secondary hover:bg-secondary-dark text-white font-bold py-4 px-10 rounded-xl shadow-xl shadow-secondary/20 transition-all hover:scale-105 inline-flex items-center justify-center gap-3 group"
                    >
                        {data?.secondaryButton?.text}
                        <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">{data?.secondaryButton?.icon}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CTA;

