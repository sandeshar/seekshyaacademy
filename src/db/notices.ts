import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INotice extends Document {
    title: string;
    slug: string;
    description: string;
    categoryId: mongoose.Types.ObjectId;
    subcategoryId?: mongoose.Types.ObjectId;
    tag?: string; // e.g., "Exam Alert", "New Syllabus"
    date: Date;
    documents?: {
        title: string;
        url: string;
    }[];
    status: 'active' | 'inactive';
    seo?: {
        title?: string;
        description?: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

const NoticeSchema: Schema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'NoticeCategory', required: true },
    subcategoryId: { type: Schema.Types.ObjectId, ref: 'NoticeSubcategory' },
    tag: { type: String },
    date: { type: Date, default: Date.now },
    documents: [{
        title: { type: String, required: true },
        url: { type: String, required: true }
    }],
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    seo: {
        title: { type: String },
        description: { type: String }
    }
}, {
    timestamps: true
});

const Notice: Model<INotice> = mongoose.models.Notice || mongoose.model<INotice>('Notice', NoticeSchema);

export default Notice;
