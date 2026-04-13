import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IStudentRank extends Document {
    name: string;
    rank: string;
    description: string;
    image?: string;
    order: number;
    status: 'active' | 'inactive';
    createdAt: Date;
    updatedAt: Date;
}

const StudentRankSchema: Schema = new Schema({
    name: { type: String, required: true },
    rank: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

const StudentRank: Model<IStudentRank> = mongoose.models.StudentRank || mongoose.model<IStudentRank>('StudentRank', StudentRankSchema);

export default StudentRank;
