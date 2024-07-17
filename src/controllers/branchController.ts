import { Request, Response } from 'express';

import { Branch, IBranch } from '../models/Branch';

export const branchController = {
	// Create a new branch
	createBranch: async (req: Request, res: Response) => {
		try {
			const { name, province, user_ids } = req.body;
			const newBranch = new Branch({ name, province, user_ids });
			const savedBranch = await newBranch.save();
			res.status(201).json(savedBranch);
		} catch (error) {
			res.status(400).json({ message: 'Error creating branch', error });
		}
	},

	// Get all branches
	getAllBranches: async (req: Request, res: Response) => {
		try {
			const branches = await Branch.find({ deleted_at: null }).populate(
				'user_ids',
				'username firstname lastname',
			);
			res.status(200).json(branches);
		} catch (error) {
			res.status(400).json({ message: 'Error fetching branches', error });
		}
	},

	// Get a single branch by ID
	getBranchById: async (req: Request, res: Response) => {
		try {
			const branch = await Branch.findOne({ _id: req.params.id, deleted_at: null }).populate(
				'user_ids',
				'username firstname lastname',
			);
			if (!branch) {
				return res.status(404).json({ message: 'Branch not found' });
			}
			res.status(200).json(branch);
		} catch (error) {
			res.status(400).json({ message: 'Error fetching branch', error });
		}
	},

	// Update a branch
	updateBranch: async (req: Request, res: Response) => {
		try {
			const { name, province, user_ids } = req.body;
			const updatedBranch = await Branch.findOneAndUpdate(
				{ _id: req.params.id, deleted_at: null },
				{ name, province, user_ids },
				{ new: true },
			).populate('user_ids', 'username firstname lastname');

			if (!updatedBranch) {
				return res.status(404).json({ message: 'Branch not found' });
			}
			res.status(200).json(updatedBranch);
		} catch (error) {
			res.status(400).json({ message: 'Error updating branch', error });
		}
	},

	// Soft delete a branch
	deleteBranch: async (req: Request, res: Response) => {
		try {
			const deletedBranch = await Branch.findOneAndUpdate(
				{ _id: req.params.id, deleted_at: null },
				{ deleted_at: new Date() },
				{ new: true },
			);
			if (!deletedBranch) {
				return res.status(404).json({ message: 'Branch not found' });
			}
			res.status(200).json({ message: 'Branch deleted successfully' });
		} catch (error) {
			res.status(400).json({ message: 'Error deleting branch', error });
		}
	},

	// Add user to branch
	addUserToBranch: async (req: Request, res: Response) => {
		try {
			const { userId } = req.body;
			const updatedBranch = await Branch.findOneAndUpdate(
				{ _id: req.params.id, deleted_at: null },
				{ $addToSet: { user_ids: userId } },
				{ new: true },
			).populate('user_ids', 'username firstname lastname');

			if (!updatedBranch) {
				return res.status(404).json({ message: 'Branch not found' });
			}
			res.status(200).json(updatedBranch);
		} catch (error) {
			res.status(400).json({ message: 'Error adding user to branch', error });
		}
	},

	// Remove user from branch
	removeUserFromBranch: async (req: Request, res: Response) => {
		try {
			const { userId } = req.body;
			const updatedBranch = await Branch.findOneAndUpdate(
				{ _id: req.params.id, deleted_at: null },
				{ $pull: { user_ids: userId } },
				{ new: true },
			).populate('user_ids', 'username firstname lastname');

			if (!updatedBranch) {
				return res.status(404).json({ message: 'Branch not found' });
			}
			res.status(200).json(updatedBranch);
		} catch (error) {
			res.status(400).json({ message: 'Error removing user from branch', error });
		}
	},
};
