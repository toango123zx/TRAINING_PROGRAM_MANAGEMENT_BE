/* eslint-disable no-console */
import { classSeedData } from './class.seed';
import { infoSubjectSeedData } from './program_subject.seed';
import { roleSeedData } from './role.seed';
import { studentClassDataSeed } from './student_class.seed';
import { subjectSeedData } from './subject.seed';
import { trainingProgramSeedData } from './trainingProgram';
import { userSeedData } from './user.seed';

const seedData = async () => {
	await trainingProgramSeedData().catch((error) => {
		console.error('Error seeding trainign Program:', error);
	});
	await roleSeedData().catch((error) => {
		console.error('Error seeding roles:', error);
	});
	await userSeedData().catch((error) => {
		console.error('Error seeding users:', error);
	});
	await subjectSeedData().catch((error) => {
		console.error('Error seeding subjects:', error);
	});
	await infoSubjectSeedData().catch((error) => {
		console.error('Error seeding info subjects:', error);
	});
	await classSeedData().catch((error) => {
		console.error('Error seeding classes:', error);
	});
	await studentClassDataSeed().catch((error) => {
		console.error('Error seeding student in classes:', error);
	});
};

seedData()
	.then(() => {
		console.log('Seed data successfully');
	})
	.catch((error) => {
		console.error('Seed data error', error);
	});
