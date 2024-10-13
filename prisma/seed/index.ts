/* eslint-disable no-console */
import { roleSeedData } from './role.seed';
import { subjectSeedData } from './subject.seed';
import { trainingProgramSeedData } from './trainingProgram';
import { userSeedData } from './user.seed';

const seedData = async () => {
	await roleSeedData();
	await userSeedData();
	await trainingProgramSeedData();
	await subjectSeedData();
};

seedData()
	.then(() => {
		console.log('Seed data successfully');
	})
	.catch((error) => {
		console.error('Seed data error', error);
	});
