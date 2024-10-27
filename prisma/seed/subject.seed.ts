import { PrismaService } from '../../src/modules/database/services';

import * as subjectData from './data/subject.json';

const prismaService = new PrismaService();

export const subjectSeedData = async () => {
	return prismaService.subject.createMany({
		data: subjectData.map((item) => item),
	});
};
