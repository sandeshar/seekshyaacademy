import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITeacherSubcategory extends Document {
    name: string;
    slug: string;
    description?: string;
    categoryId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const TeacherSubcategorySchema: Schema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String },
    categoryId: { type: Schema.Types.ObjectId, ref: 'TeacherCategory', required: true },
}, {
    timestamps: true
});

// Compound index to ensure subcategory names are unique within a category
TeacherSubcategorySchema.index({ name: 1, categoryId: 1 }, { unique: true });
TeacherSubcategorySchema.index({ slug: 1, categoryId: 1 }, { unique: true });

const TeacherSubcategory: Model<ITeacherSubcategory> = mongoose.models.TeacherSubcategory || mongoose.model<ITeacherSubcategory>('TeacherSubcategory', TeacherSubcategorySchema);

export default TeacherSubcategory;
