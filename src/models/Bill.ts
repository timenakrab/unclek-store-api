import mongoose, { Document, Schema } from 'mongoose';

export interface IBill extends Document {
	branch_id: mongoose.Types.ObjectId;
	customer_name: string;
	address: string;
	province: string;
	amphoe: string;
	tambon: string;
	zipcode: string;
	phone: string;
	products: Array<{
		product_id: mongoose.Types.ObjectId;
		quantity: number;
		price: number;
	}>;
	discount?: number;
	user_id: mongoose.Types.ObjectId;
	status: 'PR' | 'PO' | 'TRANSPORT' | 'COMPLETED';
	total_amount: number;
	created_at: Date;
	deleted_at?: Date;
}

const BillSchema: Schema = new Schema({
	branch_id: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
	customer_name: { type: String, required: true },
	address: { type: String, required: true },
	province: { type: String, required: true },
	amphoe: { type: String, required: true },
	tambon: { type: String, required: true },
	zipcode: { type: String, required: true },
	phone: { type: String, required: true },
	products: [
		{
			product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
			quantity: { type: Number, required: true },
			price: { type: Number, required: true },
		},
	],
	discount: { type: Number, default: 0 },
	user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	status: { type: String, enum: ['PR', 'PO', 'TRANSPORT', 'COMPLETED'], required: true },
	total_amount: { type: Number, required: true },
	created_at: { type: Date, default: Date.now },
	deleted_at: { type: Date },
});

export const Bill = mongoose.model<IBill>('Bill', BillSchema);
