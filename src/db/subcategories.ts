import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISubcategory extends Document {
    name: string;
    slug: string;
    description?: string;
    categoryId: mongoose.Types.ObjectId;
    seo?: {
        title?: string;
        description?: string;
        keywords?: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

const SubcategorySchema: Schema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    seo: {
        title: { type: String },
        description: { type: String },
        keywords: { type: String },
    },
}, {
    timestamps: true
});

// Compound index to ensure subcategory names are unique within a category
SubcategorySchema.index({ name: 1, categoryId: 1 }, { unique: true });
SubcategorySchema.index({ slug: 1, categoryId: 1 }, { unique: true });

const Subcategory: Model<ISubcategory> = mongoose.models.Subcategory || mongoose.model<ISubcategory>('Subcategory', SubcategorySchema);

export default Subcategory;
