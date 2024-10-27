/* eslint-disable no-console */
import { infoSubjectSeedData } from './program_subject.seed';
import { roleSeedData } from './role.seed';
import { subjectSeedData } from './subject.seed';
import { trainingProgramSeedData } from './trainingProgram';
import { userSeedData } from './user.seed';

const seedData = async () => {
	await roleSeedData().catch((error) => {
		console.error('Error seeding roles:', error);
	});
	await userSeedData().catch((error) => {
		console.error('Error seeding users:', error);
	});
	await trainingProgramSeedData().catch((error) => {
		console.error('Error seeding trainign Program:', error);
	});
	await subjectSeedData().catch((error) => {
		console.error('Error seeding subjects:', error);
	});
	await infoSubjectSeedData().catch((error) => {
		console.error('Error seeding info subjects:', error);
	});
};

seedData()
	.then(() => {
		console.log('Seed data successfully');
	})
	.catch((error) => {
		console.error('Seed data error', error);
	});
