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
                backgroundImage: `linear-gradient(rgba(126, 25, 27, ${opacityValue}) 0%, rgba(30, 67, 131, ${opacityValue * 0.9}) 100%), url("${data?.backgroundImage || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2070&auto=format&fit=crop'}")`
            }}
        >
            <div className="relative flex min-h-125 flex-col gap-6 items-center justify-center px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center max-w-7xl mx-auto">
                <div className="flex flex-col gap-4 max-w-200 relative z-10">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm w-fit mx-auto border border-white/30">
                        {data?.badgeText}
                    </span>
                    <h1 className="text-white text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl drop-shadow-md font-display">
                        {data?.title}
                    </h1>
                    <h2 className="text-gray-100 text-base font-normal leading-relaxed sm:text-lg max-w-2xl mx-auto">
                        {data?.description}
                    </h2>
                </div>
                <div className="flex gap-4 mt-4">
                    {data?.primaryButton?.text && (
                        <a
                            href={data.primaryButton.link}
                            className="flex min-w-21 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-white text-primary text-base font-bold leading-normal hover:bg-gray-100 transition-colors shadow-lg gap-2"
                        >
                            {data.primaryButton.icon && <span className="material-symbols-outlined">{data.primaryButton.icon}</span>}
                            <span>{data.primaryButton.text}</span>
                        </a>
                    )}
                    {data?.secondaryButton?.text && (
                        <a
                            href={data.secondaryButton.link}
                            className="flex min-w-21 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-transparent border-2 border-white text-white text-base font-bold leading-normal hover:bg-white/10 transition-colors gap-2"
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

