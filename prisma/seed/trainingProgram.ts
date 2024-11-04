import { PrismaService } from '../../src/modules/database/services';

import * as trainingProgramData from './data/program.json';

const prismaService = new PrismaService();

export const trainingProgramSeedData = async () => {
	return prismaService.training_Program.createMany({
		data: trainingProgramData.map((item) => ({ ...item, description: '' })),
	});
};
