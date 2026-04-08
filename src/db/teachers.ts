import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITeacher extends Document {
    name: string;
    slug: string;
    qualifications: string;
    subject: string;
    image?: string;
    quote?: string;
    badge?: string;
    badgeIcon?: string;
    categoryIds: mongoose.Types.ObjectId[];
    subcategoryId?: mongoose.Types.ObjectId;
    order: number;
    status: 'active' | 'inactive';
    createdAt: Date;
    updatedAt: Date;
}

const TeacherSchema: Schema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    qualifications: { type: String, required: true },
    subject: { type: String, required: true },
    image: { type: String },
    quote: { type: String },
    badge: { type: String },
    badgeIcon: { type: String },
    categoryIds: [{ type: Schema.Types.ObjectId, ref: 'TeacherCategory', required: true }],
    subcategoryId: { type: Schema.Types.ObjectId, ref: 'TeacherSubcategory' },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

const Teacher: Model<ITeacher> = mongoose.models.Teacher || mongoose.model<ITeacher>('Teacher', TeacherSchema);

export default Teacher;
