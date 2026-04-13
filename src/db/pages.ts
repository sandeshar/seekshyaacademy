import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPage extends Document {
    title: string;
    slug: string;
    content: string;
    status: 'draft' | 'published';
    heroes?: {
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
    }[];
    header?: {
        isVisible: boolean;
        badgeText?: string;
        title: string;
        subtitle?: string;
        backgroundImage?: string;
        overlayOpacity?: number;
        textAlign?: 'left' | 'center' | 'right';
        textColor?: 'light' | 'dark';
        height?: 'small' | 'medium' | 'large';
        primaryButton?: {
            text: string;
            link: string;
            icon?: string;
            variant?: 'solid' | 'outline' | 'ghost';
        };
        secondaryButton?: {
            text: string;
            link: string;
            icon?: string;
            variant?: 'solid' | 'outline' | 'ghost';
        };
    };
    seo?: {
        title?: string;
        description?: string;
        keywords?: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

const PageSchema: Schema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    heroes: [{
        isVisible: { type: Boolean, default: true },
        badgeText: { type: String },
        title: { type: String },
        description: { type: String },
        backgroundImage: { type: String },
        overlayOpacity: { type: Number, default: 40 },
        primaryButton: {
            text: { type: String },
            link: { type: String },
            icon: { type: String }
        },
        secondaryButton: {
            text: { type: String },
            link: { type: String },
            icon: { type: String }
        }
    }],
    header: {
        isVisible: { type: Boolean, default: false },
        badgeText: { type: String },
        title: { type: String },
        subtitle: { type: String },
        backgroundImage: { type: String },
        overlayOpacity: { type: Number, default: 40 },
        textAlign: { type: String, enum: ['left', 'center', 'right'], default: 'center' },
        textColor: { type: String, enum: ['light', 'dark'], default: 'light' },
        height: { type: String, enum: ['small', 'medium', 'large'], default: 'small' },
        primaryButton: {
            text: { type: String },
            link: { type: String },
            icon: { type: String },
            variant: { type: String, enum: ['solid', 'outline', 'ghost'], default: 'solid' }
        },
        secondaryButton: {
            text: { type: String },
            link: { type: String },
            icon: { type: String },
            variant: { type: String, enum: ['solid', 'outline', 'ghost'], default: 'outline' }
        }
    },
    seo: {
        title: { type: String },
        description: { type: String },
        keywords: { type: String }
    }
}, {
    timestamps: true
});

const Page: Model<IPage> = mongoose.models.Page || mongoose.model<IPage>('Page', PageSchema);

export default Page;