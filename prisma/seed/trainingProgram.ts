import { CreateTrainingProgramDto } from 'src/models';
import { PrismaService } from '../../src/modules/database/services';

const prismaService = new PrismaService();

export const trainingProgramSeedData = async () => {
	const trainingProgramData : CreateTrainingProgramDto[] = [];

	const trainigProgramQuantity = 5;

	for (let i = 0; i < trainigProgramQuantity; i++) {
		trainingProgramData.push( {
            name: `Training Program ${i}`,
            description: `Description ${i}`,
            number_semester: i,
            school_year: `2021-2022`,
        });
	}

	return prismaService.training_Program.createMany({ data: trainingProgramData });
};
