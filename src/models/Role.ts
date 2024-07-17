import mongoose, { Document, Schema } from 'mongoose';

export interface IRole extends Document {
	name: string;
	created_at: Date;
	deleted_at?: Date;
}

const RoleSchema: Schema = new Schema({
	name: { type: String, required: true, enum: ['ADMIN', 'MANAGER', 'STAFF'] },
	created_at: { type: Date, default: Date.now },
	deleted_at: { type: Date },
});

export const Role = mongoose.model<IRole>('Role', RoleSchema);
