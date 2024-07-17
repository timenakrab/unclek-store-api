import { Request, Response } from 'express';

import { Bill, IBill } from '../models/Bill';
import { Product } from '../models/Product';

export const billController = {
	// Create a new bill
	createBill: async (req: Request, res: Response) => {
		try {
			const {
				branch_id,
				customer_name,
				address,
				province,
				amphoe,
				tambon,
				zipcode,
				phone,
				products,
				discount,
				user_id,
				status,
			} = req.body;

			// Calculate total amount
			let total_amount = 0;
			for (const product of products) {
				const productDoc = await Product.findById(product.product_id);
				if (!productDoc) {
					return res.status(400).json({ message: `Product ${product.product_id} not found` });
				}
				total_amount += productDoc.sale_price * product.quantity;
			}

			// Apply discount
			if (discount) {
				total_amount -= discount;
			}

			const newBill = new Bill({
				branch_id,
				customer_name,
				address,
				province,
				amphoe,
				tambon,
				zipcode,
				phone,
				products,
				discount,
				user_id,
				status,
				total_amount,
			});

			const savedBill = await newBill.save();
			res.status(201).json(savedBill);
		} catch (error) {
			res.status(400).json({ message: 'Error creating bill', error });
		}
	},

	// Get all bills
	getAllBills: async (req: Request, res: Response) => {
		try {
			const bills = await Bill.find({ deleted_at: null })
				.populate('branch_id', 'name')
				.populate('user_id', 'username')
				.populate('products.product_id', 'name');
			res.status(200).json(bills);
		} catch (error) {
			res.status(400).json({ message: 'Error fetching bills', error });
		}
	},

	// Get a single bill by ID
	getBillById: async (req: Request, res: Response) => {
		try {
			const bill = await Bill.findOne({ _id: req.params.id, deleted_at: null })
				.populate('branch_id', 'name')
				.populate('user_id', 'username')
				.populate('products.product_id', 'name');
			if (!bill) {
				return res.status(404).json({ message: 'Bill not found' });
			}
			res.status(200).json(bill);
		} catch (error) {
			res.status(400).json({ message: 'Error fetching bill', error });
		}
	},

	// Update a bill
	updateBill: async (req: Request, res: Response) => {
		try {
			const {
				branch_id,
				customer_name,
				address,
				province,
				amphoe,
				tambon,
				zipcode,
				phone,
				products,
				discount,
				user_id,
				status,
			} = req.body;

			// Recalculate total amount
			let total_amount = 0;
			for (const product of products) {
				const productDoc = await Product.findById(product.product_id);
				if (!productDoc) {
					return res.status(400).json({ message: `Product ${product.product_id} not found` });
				}
				total_amount += productDoc.sale_price * product.quantity;
			}

			// Apply discount
			if (discount) {
				total_amount -= discount;
			}

			const updatedBill = await Bill.findOneAndUpdate(
				{ _id: req.params.id, deleted_at: null },
				{
					branch_id,
					customer_name,
					address,
					province,
					amphoe,
					tambon,
					zipcode,
					phone,
					products,
					discount,
					user_id,
					status,
					total_amount,
				},
				{ new: true },
			)
				.populate('branch_id', 'name')
				.populate('user_id', 'username')
				.populate('products.product_id', 'name');

			if (!updatedBill) {
				return res.status(404).json({ message: 'Bill not found' });
			}
			res.status(200).json(updatedBill);
		} catch (error) {
			res.status(400).json({ message: 'Error updating bill', error });
		}
	},

	// Soft delete a bill
	deleteBill: async (req: Request, res: Response) => {
		try {
			const deletedBill = await Bill.findOneAndUpdate(
				{ _id: req.params.id, deleted_at: null },
				{ deleted_at: new Date() },
				{ new: true },
			);
			if (!deletedBill) {
				return res.status(404).json({ message: 'Bill not found' });
			}
			res.status(200).json({ message: 'Bill deleted successfully' });
		} catch (error) {
			res.status(400).json({ message: 'Error deleting bill', error });
		}
	},

	// Update bill status
	updateBillStatus: async (req: Request, res: Response) => {
		try {
			const { status } = req.body;
			const updatedBill = await Bill.findOneAndUpdate(
				{ _id: req.params.id, deleted_at: null },
				{ status },
				{ new: true },
			)
				.populate('branch_id', 'name')
				.populate('user_id', 'username')
				.populate('products.product_id', 'name');

			if (!updatedBill) {
				return res.status(404).json({ message: 'Bill not found' });
			}
			res.status(200).json(updatedBill);
		} catch (error) {
			res.status(400).json({ message: 'Error updating bill status', error });
		}
	},

	// Get bills by branch
	getBillsByBranch: async (req: Request, res: Response) => {
		try {
			const branchId = req.params.branchId;
			const bills = await Bill.find({ branch_id: branchId, deleted_at: null })
				.populate('branch_id', 'name')
				.populate('user_id', 'username')
				.populate('products.product_id', 'name');
			res.status(200).json(bills);
		} catch (error) {
			res.status(400).json({ message: 'Error fetching bills by branch', error });
		}
	},
};
