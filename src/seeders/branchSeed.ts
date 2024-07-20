import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { Branch } from '../models/Branch';

dotenv.config();

const branches = [
	{
		name: 'Head Quarter',
		province: 'กรุงเทพมหานคร',
		user_ids: [],
	},
];

const seedBranches = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI as string);
		console.log('Connected to MongoDB');

		const existingHQ = await Branch.findOne({ name: 'Head Quarter' });

		if (!existingHQ) {
			const createdHQ = await Branch.create(branches[0]);
			console.log('Head Quarter created:', createdHQ);
			const otherBranches = await Branch.create(branches.slice(1));
			console.log('Other branches created:', otherBranches);
		} else {
			console.log('Head Quarter already exists. Skipping seed.');
			for (const branch of branches.slice(1)) {
				await Branch.findOneAndUpdate({ name: branch.name }, branch, { upsert: true, new: true });
			}
			console.log('Other branches updated or created.');
		}

		console.log('Branch seeding completed');
		mongoose.connection.close();
	} catch (error) {
		console.error('Error seeding branches:', error);
	}
};

export { seedBranches };
