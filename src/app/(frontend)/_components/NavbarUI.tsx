"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';

interface NavbarUIProps {
    navbarData: any;
    settings: any;
}

const NavbarUI: React.FC<NavbarUIProps> = ({ navbarData, settings }) => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
    const [mobileExpanded, setMobileExpanded] = useState<number | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when shifting to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isLinkActive = (href: string) => {
        if (href === '/' && pathname !== '/') return false;
        return pathname.startsWith(href);
    };

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-lg shadow-md h-16' : 'bg-white h-20'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                    <div className="flex justify-between items-center h-full">
                        {/* Logo */}
                        <div className="flex shrink-0 items-center">
                            <Link href="/" className="flex items-center">
                                <Image
                                    src={settings.logos?.main || "/logos.png"}
                                    alt={settings.siteName || "Seekshya Academy"}
                                    width={150}
                                    height={50}
                                    className={`transition-all duration-300 ${scrolled ? 'h-10' : 'h-12'} w-auto object-contain`}
                                />
                            </Link>
                        </div>

                        {/* Desktop Menu - Centered Links */}
                        <div className="hidden md:flex flex-1 justify-center items-center space-x-8 h-full">
                            {navbarData.items?.map((item: any, index: number) => {
                                const active = isLinkActive(item.href) ||
                                    (item.subItems?.some((sub: any) => isLinkActive(sub.href)));

                                return (
                                    <div
                                        key={index}
                                        className="relative group flex items-center h-full"
                                        onMouseEnter={() => setActiveDropdown(index)}
                                        onMouseLeave={() => setActiveDropdown(null)}
                                    >
                                        {item.subItems && item.subItems.length > 0 ? (
                                            <>
                                                <Link
                                                    href={item.href}
                                                    className={`inline-flex items-center text-sm font-semibold h-full transition-colors cursor-pointer outline-none ${active ? 'text-primary' : 'text-slate-700 hover:text-primary'
                                                        }`}>
                                                    {item.label}
                                                    <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${activeDropdown === index ? 'rotate-180' : ''}`} />
                                                </Link>

                                                {/* Dropdown */}
                                                <div className="absolute left-0 top-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-100 min-w-55">
                                                    <div className="bg-white border-x border-b border-slate-200 border-t-2 border-t-primary shadow-lg py-2">
                                                        {item.subItems.map((sub: any, subIdx: number) => (
                                                            <div key={subIdx} className="group/sub relative">
                                                                <Link
                                                                    href={sub.href}
                                                                    className={`block px-5 py-2 text-sm transition-colors ${isLinkActive(sub.href) ? 'text-primary font-bold bg-primary/5' : 'text-slate-700 hover:text-primary hover:bg-slate-50 font-medium'
                                                                        }`}
                                                                >
                                                                    <div className="flex items-center justify-between pointer-events-none">
                                                                        <span>{sub.label}</span>
                                                                        {sub.subItems && sub.subItems.length > 0 && (
                                                                            <ChevronRight className="h-4 w-4" />
                                                                        )}
                                                                    </div>
                                                                </Link>
                                                                {/* Nested Subcategories */}
                                                                {sub.subItems && sub.subItems.length > 0 && (
                                                                    <div className="absolute left-full -top-2.5 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 z-110 min-w-55">
                                                                        <div className="bg-white border-x border-b border-slate-200 border-t-2 border-t-primary shadow-lg py-2 -ml-px">
                                                                            {sub.subItems.map((subSub: any, subSubIdx: number) => (
                                                                                <Link
                                                                                    key={subSubIdx}
                                                                                    href={subSub.href}
                                                                                    className={`block px-5 py-2 text-sm transition-colors ${isLinkActive(subSub.href) ? 'text-primary font-bold bg-primary/5' : 'text-slate-700 hover:text-primary hover:bg-slate-50 font-medium'
                                                                                        }`}
                                                                                >
                                                                                    {subSub.label}
                                                                                </Link>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <Link
                                                href={item.href}
                                                className={`inline-flex items-center text-sm font-semibold h-full transition-all ${active ? 'text-primary' : 'text-slate-700 hover:text-primary'
                                                    }`}
                                            >
                                                {item.label}
                                            </Link>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* CTA Button (Desktop) */}
                        {navbarData.cta?.show && (
                            <div className="hidden md:flex shrink-0 items-center h-full">
                                <Link
                                    href={navbarData.cta?.href || "/contact"}
                                    className="bg-primary text-white px-7 py-2.5 rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                                >
                                    {navbarData.cta?.label || "Enroll Now"}
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-slate-600 hover:text-primary p-2 transition-colors"
                            >
                                {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <div className={`fixed inset-0 ${scrolled ? 'top-16' : 'top-20'} md:hidden bg-white z-40 transition-all duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    } overflow-y-auto`}>
                    <div className="px-6 py-8 space-y-4">
                        {navbarData.items?.map((item: any, index: number) => (
                            <div key={index} className="border-b border-slate-50 pb-4">
                                {item.subItems && item.subItems.length > 0 ? (
                                    <div className="space-y-3">
                                        <button
                                            onClick={() => setMobileExpanded(mobileExpanded === index ? null : index)}
                                            className={`w-full text-lg font-bold flex items-center justify-between outline-none ${isLinkActive(item.href) || item.subItems.some((s: any) => isLinkActive(s.href)) ? 'text-primary' : 'text-slate-900'
                                                }`}>
                                            {item.label}
                                            <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${mobileExpanded === index ? 'rotate-180 text-primary' : 'text-slate-400'}`} />
                                        </button>

                                        {mobileExpanded === index && (
                                            <div className="pl-4 space-y-3 border-l-2 border-slate-100 animate-in slide-in-from-top-2 duration-200">
                                                {item.subItems.map((sub: any, subIdx: number) => (
                                                    <div key={subIdx}>
                                                        <Link
                                                            href={sub.href}
                                                            onClick={() => setIsOpen(false)}
                                                            className={`block font-medium transition-colors ${isLinkActive(sub.href) ? 'text-primary font-bold' : 'text-slate-600 hover:text-primary'
                                                                }`}
                                                        >
                                                            {sub.label}
                                                        </Link>
                                                        {/* Nested Subcategories in Mobile */}
                                                        {sub.subItems && sub.subItems.length > 0 && (
                                                            <div className="pl-4 mt-2 space-y-2 border-l border-slate-100">
                                                                {sub.subItems.map((subSub: any, subSubIdx: number) => (
                                                                    <Link
                                                                        key={subSubIdx}
                                                                        href={subSub.href}
                                                                        onClick={() => setIsOpen(false)}
                                                                        className={`block text-sm transition-colors ${isLinkActive(subSub.href) ? 'text-primary font-semibold' : 'text-slate-500 hover:text-primary'
                                                                            }`}
                                                                    >
                                                                        {subSub.label}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`block text-lg font-bold transition-colors ${isLinkActive(item.href) ? 'text-primary' : 'text-slate-900 hover:text-primary'
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        ))}
                        {navbarData.cta?.show && (
                            <div className="pt-6">
                                <Link
                                    href={navbarData.cta?.href || "/contact"}
                                    onClick={() => setIsOpen(false)}
                                    className="block w-full bg-primary text-white text-center py-4 rounded-xl font-bold shadow-md"
                                >
                                    {navbarData.cta?.label || "Enroll Now"}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            {/* Overlay background for accessibility/feel when menu open */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default NavbarUI;
