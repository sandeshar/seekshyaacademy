import Image from 'next/image';
import Link from 'next/link';
import { getFooter } from '@/actions/footer';
import { getSettings } from '@/actions/settings';
import CurrentYear from './CurrentYear';

const Footer = async () => {
    // Cast to any to access properties safely or define interface for lean object
    const data = await getFooter() as any;
    const settings = await getSettings();

    // Use global settings as fallback for social links and logo
    const socialLinks = { ...settings.socialLinks, ...(data.socialLinks || {}) };
    const footerLogo = data.logo?.url || settings.logos?.main || "/logos.png";
    const footerAlt = data.logo?.alt || settings.siteName || "Seekshya Academy";
    const logoWidth = data.logo?.width || 150;
    const logoHeight = data.logo?.height || 50;

    // Filter out social links that are empty strings
    const activeSocialLinks = Object.fromEntries(
        Object.entries(socialLinks).filter(([_, value]) => !!value)
    ) as Record<string, string>;

    return (
        <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Column 1: Logo & Description */}
                    <div className="col-span-1 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <Image
                                src={footerLogo}
                                alt={footerAlt}
                                width={logoWidth}
                                height={logoHeight}
                                className="object-contain brightness-0 invert"
                                style={{ height: `auto`, width: `${logoWidth}px` }}
                            />
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            {data.description || settings.siteDescription}
                        </p>
                    </div>

                    {/* Dynamic Footer Sections */}
                    {data.footerSections?.map((section: any, idx: number) => (
                        <div key={`section-${idx}`}>
                            <h3 className="text-white font-bold text-lg mb-6">{section.title}</h3>
                            <ul className="space-y-3 text-sm">
                                {section.links?.map((link: any, i: number) => (
                                    <li key={i}>
                                        <Link className="hover:text-primary transition-colors font-medium block" href={link.href}>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact Info (Always the last column if it fits, or wrapping) */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Contact Info</h3>
                        <ul className="space-y-4 text-sm">
                            {(data.contactInfo?.address || settings.address) && (
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-primary text-xl mt-0.5">location_on</span>
                                    <span>{data.contactInfo?.address || settings.address}</span>
                                </li>
                            )}
                            {(data.contactInfo?.phone || settings.contactPhone) && (
                                <li className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary text-xl">call</span>
                                    <span>{data.contactInfo?.phone || settings.contactPhone}</span>
                                </li>
                            )}
                            {(data.contactInfo?.email || settings.contactEmail) && (
                                <li className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary text-xl">mail</span>
                                    <span>{data.contactInfo?.email || settings.contactEmail}</span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-center md:text-left">
                        <p className="text-slate-500 text-sm">© <CurrentYear /> {settings.siteName}. All rights reserved.</p>
                        {data.developedBy?.text && (
                            <p className="text-slate-500 text-sm">
                                Developed by {data.developedBy.link ? (
                                    <a href={data.developedBy.link} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                        {data.developedBy.text}
                                    </a>
                                ) : (
                                    <span>{data.developedBy.text}</span>
                                )}
                            </p>
                        )}
                    </div>
                    <div className="flex gap-5">
                        {activeSocialLinks.facebook && (
                            <Link className="text-slate-500 hover:text-primary transition-colors" href={activeSocialLinks.facebook} target="_blank">
                                <span className="sr-only">Facebook</span>
                                <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                                </svg>
                            </Link>
                        )}
                        {activeSocialLinks.instagram && (
                            <Link className="text-slate-500 hover:text-primary transition-colors" href={activeSocialLinks.instagram} target="_blank">
                                <span className="sr-only">Instagram</span>
                                <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.247 2.242 1.308 3.607.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.247-3.607 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.247-2.242-1.308-3.607-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.247 3.607-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </Link>
                        )}
                        {activeSocialLinks.linkedin && (
                            <Link className="text-slate-500 hover:text-primary transition-colors" href={activeSocialLinks.linkedin} target="_blank">
                                <span className="sr-only">LinkedIn</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        )}
                        {activeSocialLinks.twitter && (
                            <Link className="text-slate-500 hover:text-primary transition-colors" href={activeSocialLinks.twitter} target="_blank">
                                <span className="sr-only">Twitter</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </Link>
                        )}
                        {activeSocialLinks.youtube && (
                            <Link className="text-slate-500 hover:text-primary transition-colors" href={activeSocialLinks.youtube} target="_blank">
                                <span className="sr-only">YouTube</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        )}
                        {activeSocialLinks.whatsapp && (
                            <Link className="text-slate-500 hover:text-primary transition-colors" href={`https://wa.me/${activeSocialLinks.whatsapp.replace(/\D/g, '')}`} target="_blank">
                                <span className="sr-only">WhatsApp</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
