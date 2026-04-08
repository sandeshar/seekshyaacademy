import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISiteSettings extends Document {
    siteName: string;
    siteDescription: string;
    tagline: string;
    contactEmail: string;
    contactPhone: string;
    address: string;
    googleMapsUrl: string;
    logos: {
        main: string;
        favicon: string;
    };
    socialLinks: {
        facebook: string;
        instagram: string;
        linkedin: string;
        twitter: string;
        youtube: string;
        whatsapp: string;
    };
    seo: {
        title: string;
        description: string;
        titleTemplate: string;
    };
    smtp: {
        host: string;
        port: number;
        user: string;
        pass: string;
        from: string;
        fromName: string;
    };
}

const SiteSettingsSchema: Schema = new Schema({
    siteName: { type: String, default: 'Seekshya Academy' },
    siteDescription: { type: String, default: 'The best CA institute in Nepal' },
    tagline: { type: String, default: 'Excellence in CA Education' },
    contactEmail: { type: String, default: 'info@lakshyaca.edu.np' },
    contactPhone: { type: String, default: '+977-1-4XXXXXX' },
    address: { type: String, default: 'Putalisadak, Kathmandu, Nepal' },
    googleMapsUrl: { type: String, default: '' },
    logos: {
        main: { type: String, default: '/logos.png' },
        favicon: { type: String, default: '/favicon.ico' }
    },
    socialLinks: {
        facebook: { type: String, default: '' },
        instagram: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        twitter: { type: String, default: '' },
        youtube: { type: String, default: '' },
        whatsapp: { type: String, default: '' }
    },
    seo: {
        title: { type: String, default: "Seekshya Academy" },
        description: { type: String, default: "Your Target to Chartered Accountancy Success" },
        titleTemplate: { type: String, default: "%s | Seekshya Academy" }
    },
    smtp: {
        host: { type: String, default: '' },
        port: { type: Number, default: 587 },
        user: { type: String, default: '' },
        pass: { type: String, default: '' },
        from: { type: String, default: '' },
        fromName: { type: String, default: 'Seekshya Academy' }
    }
}, {
    timestamps: true
});

const SiteSettings: Model<ISiteSettings> = mongoose.models.SiteSettings || mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);

export default SiteSettings;
