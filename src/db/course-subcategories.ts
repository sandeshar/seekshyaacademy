import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICourseSubcategory extends Document {
    name: string;
    slug: string;
    description?: string;
    categoryId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const CourseSubcategorySchema: Schema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String },
    categoryId: { type: Schema.Types.ObjectId, ref: 'CourseCategory', required: true },
}, {
    timestamps: true
});

CourseSubcategorySchema.index({ name: 1, categoryId: 1 }, { unique: true });
CourseSubcategorySchema.index({ slug: 1, categoryId: 1 }, { unique: true });

const CourseSubcategory: Model<ICourseSubcategory> = mongoose.models.CourseSubcategory || mongoose.model<ICourseSubcategory>('CourseSubcategory', CourseSubcategorySchema);

export default CourseSubcategory;
