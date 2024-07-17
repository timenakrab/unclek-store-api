import mongoose, { Document, Schema } from 'mongoose';

export interface IBranch extends Document {
	name: string;
	province: string;
	user_ids?: mongoose.Types.ObjectId[];
	created_at: Date;
	deleted_at?: Date;
}

const BranchSchema: Schema = new Schema({
	name: { type: String, required: true },
	province: { type: String, required: true },
	user_ids: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	created_at: { type: Date, default: Date.now },
	deleted_at: { type: Date },
});

export const Branch = mongoose.model<IBranch>('Branch', BranchSchema);
