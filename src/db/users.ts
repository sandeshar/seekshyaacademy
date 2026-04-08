import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export type Permission = 'cms' | 'teachers' | 'courses' | 'notices' | 'learning-hub' | 'media' | 'contacts' | 'users' | 'settings';

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    role: 'admin' | 'staff' | 'editor';
    permissions: Permission[];
    status: 'active' | 'inactive';
    comparePassword(password: string): Promise<boolean>;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['admin', 'staff', 'editor'], default: 'staff' },
    permissions: { type: [String], default: [] },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

// Hash password before saving
UserSchema.pre<IUser>('save', async function () {
    if (!this.isModified('password')) return;
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password!, salt);
    } catch (error: any) {
        throw error;
    }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password || '');
};

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
