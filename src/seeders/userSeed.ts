import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { Branch, IBranch } from '../models/Branch';
import { Role } from '../models/Role';
import { IUser, User } from '../models/User';

dotenv.config();

const seedUsers = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI as string);
		console.log('Connected to MongoDB');

		const adminRole = await Role.findOne({ name: 'ADMIN' });
		if (!adminRole) {
			throw new Error('ADMIN role not found. Please run role seeder first.');
		}

		let superadmin: IUser | null = await User.findOne({ username: 'superadmin' });

		if (!superadmin) {
			superadmin = new User({
				username: 'superadmin',
				password: 'P@ssw0rd',
				firstname: 'Super',
				lastname: 'Admin',
				role_id: adminRole._id,
			});
			await superadmin.save();
			console.log('Superadmin created:', superadmin);
		} else {
			console.log('Superadmin already exists. Skipping creation.');
		}

		const headQuarter: IBranch | null = await Branch.findOne({ name: 'Head Quarter' });
		if (!headQuarter) {
			throw new Error('Head Quarter branch not found. Please run branch seeder first.');
		}

		if (!headQuarter.user_ids) {
			headQuarter.user_ids = [];
		}

		if (!headQuarter.user_ids.some((id) => id.equals(superadmin._id))) {
			headQuarter.user_ids.push(superadmin._id);
			await headQuarter.save();
			console.log('Superadmin added to Head Quarter branch');
		} else {
			console.log('Superadmin already in Head Quarter branch');
		}

		console.log('User seeding completed');
		mongoose.connection.close();
	} catch (error) {
		console.error('Error seeding users:', error);
	}
};

export { seedUsers };
