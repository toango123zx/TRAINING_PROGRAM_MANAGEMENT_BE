import { Injectable } from '@nestjs/common';

import {
	CreateTrainingProgramDto,
	TrainingProgramEntity,
	UpdateTrainingProgramDto,
} from 'src/models';
import {
	PrismaClientKnownRequestError,
	PrismaService,
} from 'src/modules/database/services';

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
					status: 'activate',
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
					status: 'activate',
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
					status: 'activate',
				},
				data: {
					delete_at: new Date(),
					status: 'cancel',
				},
			});
		} catch (error) {
			throw error;
		}
	}

	async assignSubjectInTrainingProgram(
		trainingProgramId: string,
		subjectId: string,
		semester: number,
	): Promise<TrainingProgramEntity> {
		try {
			return await this.prismaService.training_Program.update({
				include: {
					infoSubjects: {
						include: {
							subject: true,
						},
						where: {
							status: 'activate',
						},
						orderBy: [
							{
								semester: 'asc',
							},
							{
								create_at: 'desc',
							},
						],
					},
				},
				where: {
					id_training_program: trainingProgramId,
					status: 'activate',
					infoSubjects: {
						none: {
							subject: {
								id_subject: subjectId,
								status: 'activate',
							},
							status: 'activate',
						},
					},
				},
				data: {
					infoSubjects: {
						create: [
							{
								subject: {
									connect: {
										id_subject: subjectId,
										status: 'activate',
									},
								},
								semester: semester,
							},
						],
					},
				},
			});
		} catch (error) {
			throw error;
		}
	}

	async removeSubjectInTrainingProgram(
		trainingProgramId: string,
		infoSubjectId: string,
	): Promise<TrainingProgramEntity> {
		try {
			return await this.prismaService.training_Program.update({
				include: {
					infoSubjects: {
						include: {
							subject: true,
						},
						where: {
							status: 'activate',
						},
						orderBy: [
							{
								semester: 'asc',
							},
							{
								create_at: 'desc',
							},
						],
					},
				},
				where: {
					id_training_program: trainingProgramId,
					status: 'activate',
					infoSubjects: {
						some: {
							id_info_subject: infoSubjectId,
							status: 'activate',
							subject: {
								status: 'activate',
							},
						},
					},
				},
				data: {
					infoSubjects: {
						update: [
							{
								where: {
									id_info_subject: infoSubjectId,
									status: 'activate',
								},
								data: {
									delete_at: new Date(),
									status: 'cancel',
								},
							},
						],
					},
				},
			});
		} catch (error) {
			throw error;
		}
	}
}
