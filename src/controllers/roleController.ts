import { Request, Response } from 'express';

import { IRole, Role } from '../models/Role';

export const roleController = {
	// Create a new role
	createRole: async (req: Request, res: Response) => {
		try {
			const { name } = req.body;
			const newRole = new Role({ name });
			const savedRole = await newRole.save();
			res.status(201).json(savedRole);
		} catch (error) {
			res.status(400).json({ message: 'Error creating role', error });
		}
	},

	// Get all roles
	getAllRoles: async (req: Request, res: Response) => {
		try {
			const roles = await Role.find({ deleted_at: null });
			res.status(200).json(roles);
		} catch (error) {
			res.status(400).json({ message: 'Error fetching roles', error });
		}
	},

	// Get a single role by ID
	getRoleById: async (req: Request, res: Response) => {
		try {
			const role = await Role.findOne({ _id: req.params.id, deleted_at: null });
			if (!role) {
				return res.status(404).json({ message: 'Role not found' });
			}
			res.status(200).json(role);
		} catch (error) {
			res.status(400).json({ message: 'Error fetching role', error });
		}
	},

	// Update a role
	updateRole: async (req: Request, res: Response) => {
		try {
			const { name } = req.body;
			const updatedRole = await Role.findOneAndUpdate(
				{ _id: req.params.id, deleted_at: null },
				{ name },
				{ new: true },
			);
			if (!updatedRole) {
				return res.status(404).json({ message: 'Role not found' });
			}
			res.status(200).json(updatedRole);
		} catch (error) {
			res.status(400).json({ message: 'Error updating role', error });
		}
	},

	// Soft delete a role
	deleteRole: async (req: Request, res: Response) => {
		try {
			const deletedRole = await Role.findOneAndUpdate(
				{ _id: req.params.id, deleted_at: null },
				{ deleted_at: new Date() },
				{ new: true },
			);
			if (!deletedRole) {
				return res.status(404).json({ message: 'Role not found' });
			}
			res.status(200).json({ message: 'Role deleted successfully' });
		} catch (error) {
			res.status(400).json({ message: 'Error deleting role', error });
		}
	},
};
