import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { Role } from '../models/Role';

dotenv.config();

const roles = [{ name: 'SUPER_ADMIN' }, { name: 'ADMIN' }, { name: 'MANAGER' }, { name: 'STAFF' }];

const seedRoles = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI as string);
		console.log('Connected to MongoDB');

		await Role.deleteMany({});
		console.log('Existing roles deleted');

		const createdRoles = await Role.create(roles);
		console.log('Roles seeded successfully:', createdRoles);

		mongoose.connection.close();
	} catch (error) {
		console.error('Error seeding roles:', error);
	}
};

export { seedRoles };
