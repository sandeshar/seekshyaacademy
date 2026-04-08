import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INoticeCategory extends Document {
    name: string;
    slug: string;
    order: number;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

const NoticeCategorySchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    order: { type: Number, default: 0 },
    description: { type: String },
}, {
    timestamps: true
});

const NoticeCategory: Model<INoticeCategory> = mongoose.models.NoticeCategory || mongoose.model<INoticeCategory>('NoticeCategory', NoticeCategorySchema);

export default NoticeCategory;
