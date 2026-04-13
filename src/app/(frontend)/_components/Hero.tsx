"use client";

import React from "react";
import Link from "next/link";

interface HeroProps {
    data: {
        title?: string;
        subtitle?: string;
        backgroundImage?: string;
        primaryButton?: {
            text?: string;
            link?: string;
            variant?: "solid" | "outline" | "ghost";
            icon?: string;
        };
        secondaryButton?: {
            text?: string;
            link?: string;
            variant?: "solid" | "outline" | "ghost";
            icon?: string;
        };
        height?: "small" | "medium" | "large";
        textAlign?: "left" | "center" | "right";
        textColor?: "light" | "dark";
        overlayOpacity?: number;
    };
}

const Hero = ({ data }: HeroProps) => {
    if (!data) return null;

    const {
        title,
        subtitle,
        backgroundImage,
        primaryButton,
        secondaryButton,
        height = "medium",
        textAlign = "center",
        textColor = "light",
        overlayOpacity = 40,
    } = data;

    const heightClasses = {
        small: "min-h-[300px]",
        medium: "min-h-[450px]",
        large: "min-h-[600px]",
    };

    const alignClasses = {
        left: "justify-start text-left",
        center: "justify-center text-center",
        right: "justify-end text-right",
    };

    return (
        <section
            className={`relative flex items-center overflow-hidden border-b border-slate-200 
        ${heightClasses[height]}
        ${alignClasses[textAlign].split(" ")[0]}
        ${textColor === 'dark' ? 'bg-white' : 'bg-primary'}`}
        >
            {backgroundImage && (
                <div className="absolute inset-0 pointer-events-none">
                    <img
                        src={backgroundImage}
                        alt={title || "Hero Background"}
                        className="w-full h-full object-cover"
                    />
                    <div
                        className={`absolute inset-0 ${textColor === 'dark' ? 'bg-white' : 'bg-primary'}`}
                        style={{ opacity: (overlayOpacity || 40) / 100 }}
                    />
                </div>
            )}
            <div className={`layout-container px-6 md:px-12 lg:px-24 relative z-10 py-12 
        ${alignClasses[textAlign]}
        ${textColor === 'dark' ? 'text-slate-900' : 'text-white'}`}
            >
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight mb-6 animate-in slide-in-from-bottom-4 duration-500">
                    {title}
                </h1>
                {subtitle && (
                    <p className={`text-lg md:text-2xl max-w-3xl font-medium animate-in slide-in-from-bottom-6 duration-700 delay-100 leading-relaxed
            ${textAlign === 'center' ? 'mx-auto' : ''}
            ${textColor === 'dark' ? 'text-slate-600' : 'text-slate-100'}`}
                    >
                        {subtitle}
                    </p>
                )}
                <div className={`h-1.5 w-24 bg-secondary rounded-full mt-10 shadow-lg shadow-secondary/20 
          ${textAlign === 'center' ? 'mx-auto' :
                        textAlign === 'right' ? 'ml-auto' : ''}`}
                />

                {(primaryButton?.text || secondaryButton?.text) && (
                    <div className={`flex flex-wrap gap-4 mt-12 animate-in slide-in-from-bottom-8 duration-1000 delay-200
            ${textAlign === 'center' ? 'justify-center' :
                            textAlign === 'right' ? 'justify-end' : 'justify-start'}`}
                    >
                        {primaryButton?.text && (
                            <Link
                                href={primaryButton.link || "#"}
                                className={`px-10 py-4 rounded-xl font-bold transition-all active:scale-95 shadow-xl shadow-secondary/20 uppercase tracking-wide text-sm flex items-center gap-2
                    ${primaryButton.variant === 'outline' ?
                                        'border-2 border-secondary text-secondary hover:bg-secondary hover:text-white' :
                                        primaryButton.variant === 'ghost' ?
                                            'text-secondary hover:bg-red-50' :
                                            'bg-secondary text-white hover:bg-secondary-dark'}`}
                            >
                                {primaryButton.icon && (
                                    <span className="material-symbols-outlined text-[20px]">{primaryButton.icon}</span>
                                )}
                                {primaryButton.text}
                            </Link>
                        )}
                        {secondaryButton?.text && (
                            <Link
                                href={secondaryButton.link || "#"}
                                className={`px-10 py-4 rounded-xl font-bold transition-all active:scale-95 uppercase tracking-wide text-sm flex items-center gap-2
                    ${secondaryButton.variant === 'solid' ?
                                        'bg-white text-primary hover:bg-slate-100 shadow-xl' :
                                        secondaryButton.variant === 'ghost' ?
                                            (textColor === 'dark' ? 'text-slate-600 hover:bg-slate-100' : 'text-white/80 hover:text-white hover:bg-white/10') :
                                            `border-2 ${textColor === 'dark' ? 'border-primary text-primary hover:bg-slate-50' : 'border-white/30 text-white hover:border-white hover:bg-white/10'}`}`}
                            >
                                {secondaryButton.icon && (
                                    <span className="material-symbols-outlined text-[20px]">{secondaryButton.icon}</span>
                                )}
                                {secondaryButton.text}
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Hero;
