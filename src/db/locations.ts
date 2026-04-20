import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILocation extends Document {
    name: string;
    slug: string;
    address: string;
    phone: string;
    email?: string;
    mapUrl?: string;
    image?: string;
    content: string;
    status: 'draft' | 'published';
    isMainBranch: boolean;
    seo?: {
        title?: string;
        description?: string;
        keywords?: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

const LocationSchema: Schema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    mapUrl: { type: String },
    image: { type: String },
    content: { type: String, required: true },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    isMainBranch: { type: Boolean, default: false },
    seo: {
        title: { type: String },
        description: { type: String },
        keywords: { type: String }
    }
}, { timestamps: true });

const Location: Model<ILocation> = mongoose.models.Location || mongoose.model<ILocation>('Location', LocationSchema);

export default Location;
