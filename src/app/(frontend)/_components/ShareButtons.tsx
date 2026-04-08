'use client';

import React from 'react';
import {
    Twitter,
    Facebook,
    Linkedin,
    Link as LinkIcon,
    Share2,
    Check
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ShareButtonsProps {
    title: string;
    url: string;
    hideTitle?: boolean;
    type?: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url, hideTitle = false, type = "article" }) => {
    const [copied, setCopied] = React.useState(false);
    const [canShare, setCanShare] = React.useState(false);

    React.useEffect(() => {
        setCanShare(typeof navigator !== 'undefined' && !!navigator.share);
    }, []);

    const shareData = {
        title: title,
        text: `Check this out: ${title}`,
        url: url,
    };

    const handleWebShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error('Error sharing:', err);
            }
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            toast.success('Link copied to clipboard!');
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
            toast.error('Failed to copy link');
        }
    };

    const shareLinks = [
        {
            name: 'Twitter',
            icon: <Twitter className="w-4 h-4" />,
            href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
            color: 'hover:bg-[#1DA1F2] hover:text-white',
        },
        {
            name: 'Facebook',
            icon: <Facebook className="w-4 h-4" />,
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            color: 'hover:bg-[#4267B2] hover:text-white',
        },
        {
            name: 'LinkedIn',
            icon: <Linkedin className="w-4 h-4" />,
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            color: 'hover:bg-[#0077B5] hover:text-white',
        },
        {
            name: 'WhatsApp',
            icon: (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.435 5.611 1.436h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
            ),
            href: `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`,
            color: 'hover:bg-[#25D366] hover:text-white',
        }
    ];

    return (
        <div className="flex flex-col gap-3">
            {!hideTitle && <h3 className="text-sm font-bold text-slate-800">Share this {type}</h3>}
            <div className="flex flex-wrap items-center gap-2">
                {/* Native Share Button (Mobile) */}
                {canShare && (
                    <button
                        onClick={handleWebShare}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-primary hover:text-white transition-all"
                        title="Share"
                    >
                        <Share2 className="w-4 h-4" />
                    </button>
                )}

                {/* Specific Social Links */}
                {shareLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-600 transition-all ${link.color}`}
                        title={`Share on ${link.name}`}
                    >
                        {link.icon}
                    </a>
                ))}

                {/* Copy Link Button */}
                <button
                    onClick={copyToClipboard}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-800 hover:text-white transition-all"
                    title="Copy Link"
                >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
                </button>
            </div>
        </div>
    );
};

export default ShareButtons;
