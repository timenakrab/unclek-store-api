import { seedBranches } from './branchSeed';
import { seedRoles } from './roleSeed';
import { seedUsers } from './userSeed';

const runSeeders = async () => {
	await seedRoles();
	await seedBranches();
	await seedUsers();
};

runSeeders()
	.then(() => {
		console.log('All seeders completed');
		process.exit(0);
	})
	.catch((error) => {
		console.error('Error running seeders:', error);
		process.exit(1);
	});
