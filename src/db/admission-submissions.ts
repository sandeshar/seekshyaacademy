import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAdmissionSubmission extends Document {
    formId: mongoose.Types.ObjectId;
    data: Record<string, any>;
    status: 'pending' | 'reviewed' | 'accepted' | 'rejected' | 'archived';
    createdAt: Date;
    updatedAt: Date;
}

const AdmissionSubmissionSchema: Schema = new Schema({
    formId: { type: Schema.Types.ObjectId, ref: 'AdmissionForm', required: true },
    data: { type: Schema.Types.Mixed, required: true },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'accepted', 'rejected', 'archived'],
        default: 'pending'
    }
}, {
    timestamps: true
});

const AdmissionSubmissionModel: Model<IAdmissionSubmission> = mongoose.models.AdmissionSubmission || mongoose.model<IAdmissionSubmission>('AdmissionSubmission', AdmissionSubmissionSchema);

export default AdmissionSubmissionModel;
