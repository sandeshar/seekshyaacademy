import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFormField {
    label: string;
    name: string;
    type: 'text' | 'number' | 'email' | 'tel' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date' | 'file' | 'image' | 'header' | 'subtext';
    required: boolean;
    options?: string[]; // For select, radio, checkbox
    placeholder?: string;
}

export interface IAdmissionForm extends Document {
    title: string;
    slug: string;
    description?: string;
    fields: IFormField[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const FormFieldSchema = new Schema({
    label: { type: String, required: true },
    name: { type: String, required: true },
    type: {
        type: String,
        required: true,
        enum: ['text', 'number', 'email', 'tel', 'textarea', 'select', 'radio', 'checkbox', 'date', 'file', 'image', 'header', 'subtext']
    },
    required: { type: Boolean, default: false },
    options: [{ type: String }],
    placeholder: { type: String }
});

const AdmissionFormSchema: Schema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    fields: [FormFieldSchema],
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});

const AdmissionFormModel: Model<IAdmissionForm> = mongoose.models.AdmissionForm || mongoose.model<IAdmissionForm>('AdmissionForm', AdmissionFormSchema);

export default AdmissionFormModel;
