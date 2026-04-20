import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IStudentRankCategory extends Document {
    name: string;
    slug: string;
    order: number;
    status: 'active' | 'inactive';
    createdAt: Date;
    updatedAt: Date;
}

const StudentRankCategorySchema: Schema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

const StudentRankCategory: Model<IStudentRankCategory> = mongoose.models.StudentRankCategory || mongoose.model<IStudentRankCategory>('StudentRankCategory', StudentRankCategorySchema);

export default StudentRankCategory;
