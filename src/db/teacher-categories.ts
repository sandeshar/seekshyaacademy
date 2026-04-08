import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITeacherCategory extends Document {
    name: string;
    slug: string;
    order: number;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

const TeacherCategorySchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    order: { type: Number, default: 0 },
    description: { type: String },
}, {
    timestamps: true
});

const TeacherCategory: Model<ITeacherCategory> = mongoose.models.TeacherCategory || mongoose.model<ITeacherCategory>('TeacherCategory', TeacherCategorySchema);

export default TeacherCategory;
