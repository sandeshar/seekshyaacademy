import React from 'react';

interface ContactHeroProps {
    data: {
        title: string;
        subtitle: string;
        backgroundImage: string;
        overlayOpacity?: number;
    };
}

const ContactHero = ({ data }: ContactHeroProps) => {
    const opacityValue = data?.overlayOpacity !== undefined ? data.overlayOpacity / 100 : 0.6;

    return (
        <div className="w-full">
            <div
                className="flex min-h-80 lg:min-h-100 flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center relative"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, ${opacityValue}) 0%, rgba(0, 0, 0, ${opacityValue + 0.1}) 100%), url("${data.backgroundImage}")`
                }}
            >
                <div className="flex flex-col gap-3 z-10 max-w-7xl mx-auto">
                    <h1 className="text-white text-4xl lg:text-5xl font-black leading-tight tracking-tight font-display">
                        {data.title}
                    </h1>
                    <h2 className="text-gray-200 text-base lg:text-lg font-normal leading-relaxed max-w-2xl mx-auto">
                        {data.subtitle}
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default ContactHero;

