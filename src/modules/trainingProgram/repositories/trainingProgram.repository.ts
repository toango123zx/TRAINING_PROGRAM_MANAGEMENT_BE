import { Injectable } from '@nestjs/common';

import { CreateTrainingProgramDto, TrainingProgramEntity } from 'src/models';
import { PrismaService } from 'src/modules/database/services';

@Injectable()
export class TrainingProgramRepository {
	constructor(private readonly prismaService: PrismaService) {}
	async findAll(): Promise<TrainingProgramEntity[] | null> {
		try {
			return await this.prismaService.training_Program.findMany();
		} catch (error) {
			throw error;
		}
	}

	async findById(
		trainingProgramId: string,
	): Promise<TrainingProgramEntity | null> {
		try {
			return await this.prismaService.training_Program.findUnique({
				where: {
					id_training_program: trainingProgramId,
				},
			});
		} catch (error) {
			throw error;
		}
	}
}
