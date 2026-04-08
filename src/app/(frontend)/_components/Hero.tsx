import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeroProps {
    data: {
        badgeText: string;
        title: string;
        description: string;
        backgroundImage: string;
        overlayOpacity?: number;
        primaryButton: { text: string; link: string; icon?: string };
        secondaryButton: { text: string; link: string; icon?: string };
    };
}

const Hero = ({ data }: HeroProps) => {
    const opacityValue = data?.overlayOpacity !== undefined ? data.overlayOpacity / 100 : 0.4;

    return (
        <div className="relative w-full overflow-hidden bg-slate-900">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={data?.backgroundImage || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"}
                    alt="Students studying"
                    fill
                    className="object-cover"
                    style={{ opacity: 1 - (opacityValue * 0.5) }} // Subtle image dimming
                    priority
                />
                <div
                    className="absolute inset-0 bg-black z-10"
                    style={{ opacity: opacityValue }}
                ></div>
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-linear-to-t from-slate-900/80 to-transparent z-20"></div>
            </div>

            <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 mb-6 backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-orange opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-orange"></span>
                    </span>
                    <span className="text-xs font-bold text-white tracking-wide uppercase">{data?.badgeText}</span>
                </div>
                <h1
                    className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6 max-w-4xl drop-shadow-md whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: data?.title?.replace('Chartered Accountancy', '<span class="text-accent-gold">Chartered Accountancy</span>') || '' }}
                />
                <p className="text-lg sm:text-xl text-slate-100 max-w-2xl mb-10 leading-relaxed font-medium">
                    {data?.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Link
                        href={data?.primaryButton?.link || '#'}
                        className="h-14 px-10 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold shadow-xl shadow-primary/20 transition-all hover:scale-105 flex items-center justify-center gap-3 group"
                    >
                        <span>{data?.primaryButton?.text}</span>
                        <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">{data?.primaryButton?.icon}</span>
                    </Link>
                    <Link
                        href={data?.secondaryButton?.link || '#'}
                        className="h-14 px-10 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 text-white font-bold transition-all flex items-center justify-center gap-3 group"
                    >
                        <span>{data?.secondaryButton?.text}</span>
                        {data?.secondaryButton?.icon && (
                            <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">{data?.secondaryButton?.icon}</span>
                        )}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Hero;

