import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INoticeSubcategory extends Document {
    name: string;
    slug: string;
    description?: string;
    categoryId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const NoticeSubcategorySchema: Schema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String },
    categoryId: { type: Schema.Types.ObjectId, ref: 'NoticeCategory', required: true },
}, {
    timestamps: true
});

// Compound index to ensure subcategory names are unique within a category
NoticeSubcategorySchema.index({ name: 1, categoryId: 1 }, { unique: true });
NoticeSubcategorySchema.index({ slug: 1, categoryId: 1 }, { unique: true });

const NoticeSubcategory: Model<INoticeSubcategory> = mongoose.models.NoticeSubcategory || mongoose.model<INoticeSubcategory>('NoticeSubcategory', NoticeSubcategorySchema);

export default NoticeSubcategory;
