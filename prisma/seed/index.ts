/* eslint-disable no-console */
import { roleSeedData } from './role.seed';
import { userSeedData } from './user.seed';

const seedData = async () => {
	await roleSeedData();
	await userSeedData();
};

seedData()
	.then(() => {
		console.log('Seed data successfully');
	})
	.catch((error) => {
		console.error('Seed data error', error);
	});
