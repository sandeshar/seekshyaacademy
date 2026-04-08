import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IArticle extends Document {
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    featuredImage?: string;
    categoryId: mongoose.Types.ObjectId;
    subcategoryId?: mongoose.Types.ObjectId;
    author?: string;
    status: 'draft' | 'published';
    featured?: boolean;
    seo?: {
        title?: string;
        description?: string;
        keywords?: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

const ArticleSchema: Schema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String },
    featuredImage: { type: String },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    subcategoryId: { type: Schema.Types.ObjectId, ref: 'Subcategory' },
    author: { type: String, required: false },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    featured: { type: Boolean, default: false },
    seo: {
        title: { type: String },
        description: { type: String },
        keywords: { type: String }
    }
}, {
    timestamps: true
});

const Article: Model<IArticle> = mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);

export default Article;
