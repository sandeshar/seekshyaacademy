import React from 'react';

interface AboutHeroProps {
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

const AboutHero = ({ data }: AboutHeroProps) => {
    const opacityValue = data?.overlayOpacity !== undefined ? data.overlayOpacity / 100 : 0.8;

    return (
        <div
            className="w-full bg-slate-900 overflow-hidden relative bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `linear-gradient(rgba(126, 25, 27, ${opacityValue}) 0%, rgba(30, 67, 131, ${opacityValue * 0.9}) 100%), url("${data?.backgroundImage || 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2070&auto=format&fit=crop'}")`
            }}
        >
            <div className="relative flex min-h-[500px] flex-col gap-8 items-center justify-center px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center max-w-7xl mx-auto">
                <div className="flex flex-col gap-6 max-w-3xl relative z-10">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-md w-fit mx-auto border border-white/20 shadow-sm">
                        {data?.badgeText}
                    </span>
                    <h1 className="text-white text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl drop-shadow-lg font-lexend">
                        {data?.title}
                    </h1>
                    <h2 className="text-blue-50/90 text-base font-normal leading-relaxed sm:text-lg max-w-2xl mx-auto font-sans opacity-90">
                        {data?.description}
                    </h2>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-5 mt-4">
                    {data?.primaryButton?.text && (
                        <a
                            href={data.primaryButton.link}
                            className="flex min-w-[180px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-white text-primary text-base font-bold leading-normal hover:bg-gray-100 transition-all shadow-xl hover:shadow-white/10 gap-2 group"
                        >
                            {data.primaryButton.icon && <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">{data.primaryButton.icon}</span>}
                            <span>{data.primaryButton.text}</span>
                        </a>
                    )}
                    {data?.secondaryButton?.text && (
                        <a
                            href={data.secondaryButton.link}
                            className="flex min-w-[180px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-transparent border-2 border-white/30 text-white text-base font-bold leading-normal hover:bg-white/10 hover:border-white transition-all gap-2"
                        >
                            {data.secondaryButton.icon && <span className="material-symbols-outlined">{data.secondaryButton.icon}</span>}
                            <span>{data.secondaryButton.text}</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AboutHero;

