import { Request, Response } from 'express';

import { IProduct, Product } from '../models/Product';

export const productController = {
	// Create a new product
	createProduct: async (req: Request, res: Response) => {
		try {
			const { branch_id, image_url, name, description, cost_price, sale_price, total } = req.body;
			const newProduct = new Product({
				branch_id,
				image_url,
				name,
				description,
				cost_price,
				sale_price,
				total,
			});
			const savedProduct = await newProduct.save();
			res.status(201).json(savedProduct);
		} catch (error) {
			res.status(400).json({ message: 'Error creating product', error });
		}
	},

	// Get all products
	getAllProducts: async (req: Request, res: Response) => {
		try {
			const products = await Product.find({ deleted_at: null }).populate('branch_id', 'name');
			res.status(200).json(products);
		} catch (error) {
			res.status(400).json({ message: 'Error fetching products', error });
		}
	},

	// Get a single product by ID
	getProductById: async (req: Request, res: Response) => {
		try {
			const product = await Product.findOne({ _id: req.params.id, deleted_at: null }).populate(
				'branch_id',
				'name',
			);
			if (!product) {
				return res.status(404).json({ message: 'Product not found' });
			}
			res.status(200).json(product);
		} catch (error) {
			res.status(400).json({ message: 'Error fetching product', error });
		}
	},

	// Update a product
	updateProduct: async (req: Request, res: Response) => {
		try {
			const { branch_id, image_url, name, description, cost_price, sale_price, total } = req.body;
			const updatedProduct = await Product.findOneAndUpdate(
				{ _id: req.params.id, deleted_at: null },
				{ branch_id, image_url, name, description, cost_price, sale_price, total },
				{ new: true },
			).populate('branch_id', 'name');

			if (!updatedProduct) {
				return res.status(404).json({ message: 'Product not found' });
			}
			res.status(200).json(updatedProduct);
		} catch (error) {
			res.status(400).json({ message: 'Error updating product', error });
		}
	},

	// Soft delete a product
	deleteProduct: async (req: Request, res: Response) => {
		try {
			const deletedProduct = await Product.findOneAndUpdate(
				{ _id: req.params.id, deleted_at: null },
				{ deleted_at: new Date() },
				{ new: true },
			);
			if (!deletedProduct) {
				return res.status(404).json({ message: 'Product not found' });
			}
			res.status(200).json({ message: 'Product deleted successfully' });
		} catch (error) {
			res.status(400).json({ message: 'Error deleting product', error });
		}
	},

	// Get products by branch
	getProductsByBranch: async (req: Request, res: Response) => {
		try {
			const branchId = req.params.branchId;
			const products = await Product.find({ branch_id: branchId, deleted_at: null }).populate(
				'branch_id',
				'name',
			);
			res.status(200).json(products);
		} catch (error) {
			res.status(400).json({ message: 'Error fetching products by branch', error });
		}
	},

	// Update product stock
	updateProductStock: async (req: Request, res: Response) => {
		try {
			const { total } = req.body;
			const updatedProduct = await Product.findOneAndUpdate(
				{ _id: req.params.id, deleted_at: null },
				{ total },
				{ new: true },
			).populate('branch_id', 'name');

			if (!updatedProduct) {
				return res.status(404).json({ message: 'Product not found' });
			}
			res.status(200).json(updatedProduct);
		} catch (error) {
			res.status(400).json({ message: 'Error updating product stock', error });
		}
	},
};
