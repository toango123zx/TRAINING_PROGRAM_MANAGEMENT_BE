/* eslint-disable no-console */
import { roleSeedData } from './role.seed';
import { trainingProgramSeedData } from './trainingProgram';
import { userSeedData } from './user.seed';

const seedData = async () => {
	await roleSeedData();
	await userSeedData();
	await trainingProgramSeedData();
};

seedData()
	.then(() => {
		console.log('Seed data successfully');
	})
	.catch((error) => {
		console.error('Seed data error', error);
	});
