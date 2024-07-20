import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
	_id: mongoose.Types.ObjectId;
	branch_id: mongoose.Types.ObjectId;
	image_url?: string;
	name: string;
	description: string;
	cost_price: number;
	sale_price: number;
	total: number;
	created_at: Date;
	deleted_at?: Date;
}

const ProductSchema: Schema = new Schema({
	branch_id: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
	image_url: { type: String },
	name: { type: String, required: true },
	description: { type: String, required: true },
	cost_price: { type: Number, required: true },
	sale_price: { type: Number, required: true },
	total: { type: Number, required: true },
	created_at: { type: Date, default: Date.now },
	deleted_at: { type: Date },
});

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
