import React from 'react';

interface CourseHeroProps {
    data: {
        isVisible: boolean;
        badgeText: string;
        title: string;
        description: string;
        backgroundImage: string;
        overlayOpacity?: number;
        primaryButton: {
            text: string;
            link: string;
            icon?: string;
        };
        secondaryButton: {
            text: string;
            link: string;
            icon?: string;
        };
    }
}

const CourseHero = ({ data }: CourseHeroProps) => {
    if (!data || data.isVisible === false) return null;

    const opacity = (data.overlayOpacity ?? 40) / 100;

    return (
        <div className="bg-white">
            <div className="flex flex-col">
                <div
                    className="relative flex min-h-[560px] flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center bg-cover bg-center"
                    style={{
                        backgroundImage: `linear-gradient(135deg, rgba(126, 25, 27, ${opacity + 0.5 > 1 ? 0.9 : opacity + 0.5}) 0%, rgba(30, 67, 131, ${opacity + 0.45 > 1 ? 0.85 : opacity + 0.45}) 100%), url("${data.backgroundImage || "https://images.unsplash.com/photo-1523050335392-9bef867a0571?q=80&w=2070&auto=format&fit=crop"}")`
                    }}
                >
                    <div className="max-w-7xl mx-auto flex flex-col items-center gap-6 z-10">
                        {data.badgeText && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm border border-white/30">
                                <span className="material-symbols-outlined text-[18px]">school</span>
                                {data.badgeText}
                            </span>
                        )}
                        <h1 className="text-white text-4xl font-black leading-tight tracking-tight md:text-6xl drop-shadow-sm font-display">
                            {data.title}
                        </h1>
                        <p className="text-gray-100 text-lg font-normal leading-relaxed max-w-2xl md:text-xl whitespace-pre-wrap">
                            {data.description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
                            {data.primaryButton?.text && (
                                <a
                                    href={data.primaryButton.link}
                                    className="flex w-full sm:w-auto cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 gap-2 group"
                                >
                                    {data.primaryButton.text}
                                    {data.primaryButton.icon && (
                                        <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">{data.primaryButton.icon}</span>
                                    )}
                                </a>
                            )}
                            {data.secondaryButton?.text && (
                                <a
                                    href={data.secondaryButton.link}
                                    className="flex w-full sm:w-auto cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-white/10 backdrop-blur-md border border-white/30 text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-white/20 transition-all gap-2 group"
                                >
                                    <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">{data.secondaryButton.icon || 'download'}</span>
                                    {data.secondaryButton.text}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseHero;


