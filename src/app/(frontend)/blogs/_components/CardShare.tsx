'use client';

import React from 'react';
import { Share2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface CardShareProps {
    title: string;
    url: string;
}

const CardShare: React.FC<CardShareProps> = ({ title, url }) => {
    const handleShare = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const nav = typeof navigator !== 'undefined' ? navigator : null;

        if (nav && nav.share) {
            try {
                await nav.share({
                    title,
                    text: `Check out this article: ${title}`,
                    url,
                });
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            try {
                await navigator.clipboard.writeText(url);
                toast.success('Link copied to clipboard!');
            } catch (err) {
                toast.error('Failed to copy link');
            }
        }
    };

    return (
        <button
            onClick={handleShare}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-primary transition-colors"
            title="Share"
        >
            <Share2 className="w-4 h-4" />
        </button>
    );
};

export default CardShare;
