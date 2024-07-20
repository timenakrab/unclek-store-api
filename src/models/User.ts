import bcrypt from 'bcrypt';
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
	_id: mongoose.Types.ObjectId;
	username: string;
	password: string;
	firstname: string;
	lastname: string;
	role_id: mongoose.Types.ObjectId;
	created_at: Date;
	deleted_at?: Date;
	comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	role_id: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
	created_at: { type: Date, default: Date.now },
	deleted_at: { type: Date },
});

UserSchema.pre<IUser>('save', async function (next) {
	if (!this.isModified('password')) return next();

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
	return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>('User', UserSchema);
