import { CreateSubjectDto } from 'src/models';
import { PrismaService } from '../../src/modules/database/services';

const prismaService = new PrismaService();

export const subjectSeedData = async () => {
	const subjectData: CreateSubjectDto[] = [];

	const trainigProgramQuantity = 20;

	for (let i = 0; i < trainigProgramQuantity; i++) {
		subjectData.push({
			name: `Subject ${i}`,
			description: `Description ${i}`,
		});
	}

	return prismaService.subject.createMany({ data: subjectData });
};
