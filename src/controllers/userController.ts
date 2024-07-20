import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export const userController = {
	// Create a new user
	createUser: async (req: Request, res: Response) => {
		try {
			const { username, password, firstname, lastname, role_id } = req.body;
			const newUser = new User({ username, password, firstname, lastname, role_id });
			await newUser.save();

			// const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET as string, {
			// 	expiresIn: process.env.JWT_EXPIRES_IN,
			// });

			res.status(201).json({ user: newUser });
		} catch (error) {
			res.status(400).json({ message: 'Error creating user' });
		}
	},

	// Get all users
	getAllUsers: async (req: Request, res: Response) => {
		try {
			const users = await User.find({ deleted_at: null }).select('-password');
			res.status(200).json(users);
		} catch (error) {
			res.status(400).json({ message: 'Error fetching users', error });
		}
	},

	// Get a single user by ID
	getUserById: async (req: Request, res: Response) => {
		try {
			const user = await User.findOne({ _id: req.params.id, deleted_at: null }).select('-password');
			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}
			res.status(200).json(user);
		} catch (error) {
			res.status(400).json({ message: 'Error fetching user', error });
		}
	},

	// Update a user
	updateUser: async (req: Request, res: Response) => {
		try {
			const { username, firstname, lastname, role_id } = req.body;
			const updatedUser = await User.findOneAndUpdate(
				{ _id: req.params.id, deleted_at: null },
				{ username, firstname, lastname, role_id },
				{ new: true },
			).select('-password');

			if (!updatedUser) {
				return res.status(404).json({ message: 'User not found' });
			}
			res.status(200).json(updatedUser);
		} catch (error) {
			res.status(400).json({ message: 'Error updating user', error });
		}
	},

	// Soft delete a user
	deleteUser: async (req: Request, res: Response) => {
		try {
			const deletedUser = await User.findOneAndUpdate(
				{ _id: req.params.id, deleted_at: null },
				{ deleted_at: new Date() },
				{ new: true },
			);
			if (!deletedUser) {
				return res.status(404).json({ message: 'User not found' });
			}
			res.status(200).json({ message: 'User deleted successfully' });
		} catch (error) {
			res.status(400).json({ message: 'Error deleting user', error });
		}
	},

	// User login
	login: async (req: Request, res: Response) => {
		try {
			const { username, password } = req.body;
			const user = await User.findOne({ username, deleted_at: null });

			if (!user) {
				return res.status(401).json({ message: 'Authentication failed' });
			}

			const isMatch = await user.comparePassword(password);
			if (!isMatch) {
				return res.status(401).json({ message: 'Authentication failed' });
			}

			const token = jwt.sign(
				{ userId: user._id, role: user.role_id._id },
				process.env.JWT_SECRET as string,
				{ expiresIn: process.env.JWT_EXPIRES_IN },
			);

			res.status(200).json({
				token,
			});
		} catch (error) {
			console.error('Login error:', error);
			res.status(500).json({ message: 'Internal server error' });
		}
	},
};
