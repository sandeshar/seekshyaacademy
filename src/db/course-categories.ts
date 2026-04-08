import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICourseCategory extends Document {
    name: string;
    slug: string;
    order: number;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

const CourseCategorySchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    order: { type: Number, default: 0 },
    description: { type: String },
}, {
    timestamps: true
});

const CourseCategory: Model<ICourseCategory> = mongoose.models.CourseCategory || mongoose.model<ICourseCategory>('CourseCategory', CourseCategorySchema);

export default CourseCategory;
