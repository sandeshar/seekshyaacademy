import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICourse extends Document {
    title: string;
    slug: string;
    categoryId: mongoose.Types.ObjectId;
    subcategoryId?: mongoose.Types.ObjectId;
    description: string;
    features: string[];
    icon?: string;
    type?: string;
    level?: string;
    popular: boolean;
    status: 'active' | 'inactive';
    seo?: {
        title?: string;
        description?: string;
        keywords?: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

const CourseSchema: Schema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'CourseCategory', required: true },
    subcategoryId: { type: Schema.Types.ObjectId, ref: 'CourseSubcategory' },
    description: { type: String, required: true },
    features: { type: [String], default: [] },
    icon: { type: String, default: 'school' },
    type: { type: String },
    level: { type: String },
    popular: { type: Boolean, default: false },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    seo: {
        title: { type: String },
        description: { type: String },
        keywords: { type: String }
    }
}, {
    timestamps: true
});

const Course: Model<ICourse> = mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);

export default Course;
