import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFooterItem {
    label: string;
    href: string;
}

export interface IFooter extends Document {
    customSections: never; // Deprecated
    quickLinks: never; // Deprecated
    educationalPillars: never; // Deprecated

    footerSections: {
        title: string;
        links: IFooterItem[];
    }[];
    contactInfo: {
        address: string;
        phone: string;
        email: string;
        googleMapEmbed?: string;
    };
    socialLinks: {
        facebook: string;
        instagram: string;
        linkedin?: string;
        twitter?: string;
        youtube?: string;
        whatsapp?: string;
    };
    logo: {
        url: string;
        alt: string;
        height: number;
        width: number;
    };
    copyrightText: string;
    developedBy: {
        text: string;
        link: string;
    };
}

const FooterItemSchema = new Schema({
    label: { type: String, required: true },
    href: { type: String, required: true },
});

const FooterSchema = new Schema({
    description: {
        type: String,
        default: 'Dedicated to producing the finest Chartered Accountants in Nepal through excellence in education and professional ethics.'
    },
    logo: {
        url: { type: String, default: '' },
        alt: { type: String, default: 'Seekshya Academy' },
        height: { type: Number, default: 40 },
        width: { type: Number, default: 120 }
    },
    footerSections: {
        type: [{
            title: { type: String, required: true },
            links: [FooterItemSchema]
        }],
        default: [
            {
                title: 'Quick Links',
                links: [
                    { label: 'About Us', href: '/about' },
                    { label: 'Our Faculty', href: '/faculty' },
                    { label: 'Courses', href: '/courses' },
                    { label: 'Contact Us', href: '/contact' }
                ]
            },
            {
                title: 'Educational Pillars',
                links: [
                    { label: 'CAP-I Foundation', href: '/courses/cap-i' },
                    { label: 'CAP-II Intermediate', href: '/courses/cap-ii' },
                    { label: 'CAP-III Advisory', href: '/courses/cap-iii' },
                    { label: 'Scholarship Programs', href: '/scholarships' }
                ]
            }
        ]
    },
    contactInfo: {
        address: { type: String, default: 'Putalisadak, Kathmandu, Nepal' },
        phone: { type: String, default: '+977-1-4XXXXXX' },
        email: { type: String, default: 'info@seekshyaacademy.com' },
        googleMapEmbed: { type: String, default: '' }
    },
    socialLinks: {
        facebook: { type: String, default: '' },
        instagram: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        twitter: { type: String, default: '' },
        youtube: { type: String, default: '' },
        whatsapp: { type: String, default: '' }
    },
    copyrightText: { type: String, default: '© 2024 Seekshya Academy. All rights reserved.' },
    developedBy: {
        text: { type: String, default: '' },
        link: { type: String, default: '' }
    }
}, {
    timestamps: true
});

// Use existing model if available to prevent overwrite error during hot reload
const Footer: Model<IFooter> = mongoose.models.Footer || mongoose.model<IFooter>('Footer', FooterSchema);

export default Footer;
