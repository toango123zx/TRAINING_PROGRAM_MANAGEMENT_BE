import { Injectable } from '@nestjs/common';

import {
	CreateTrainingProgramDto,
	TrainingProgramEntity,
	UpdateTrainingProgramDto,
} from 'src/models';
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
					status: "activate"
				},
			});
		} catch (error) {
			throw error;
		}
	}

	async createTrainingProgram(
		trainingProgramData: CreateTrainingProgramDto,
	): Promise<TrainingProgramEntity> {
		try {
			return await this.prismaService.training_Program.create({
				data: trainingProgramData,
			});
		} catch (error) {
			throw error;
		}
	}

	async updateTrainingProgram(
		trainingProgramId: string,
		trainingProgramData: UpdateTrainingProgramDto,
	): Promise<TrainingProgramEntity | null> {
		try {
			return await this.prismaService.training_Program.update({
				where: {
					id_training_program: trainingProgramId,
					status: "activate"
				},
				data: trainingProgramData,
			});
		} catch (error) {
			throw error;
		}
	}

	async deleteTrainingProgram(id: string): Promise<TrainingProgramEntity | null> {
		try {
			return await this.prismaService.training_Program.update({
				where: {
					id_training_program: id,
					status: "activate"
				},
				data: {
					delete_at: new Date(),
					status: 'cancel',
				}
			});
		} catch (error) {
			throw error;
		}
	}
}
