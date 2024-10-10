import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HttpException, InternalServerErrorException } from '@nestjs/common';

import { TrainingProgramDto } from 'src/models';
import { GetTrainingProgramQuery } from '../implements';
import { TrainingProgramRepository } from '../../repositories/trainingProgram.repository';

@QueryHandler(GetTrainingProgramQuery)
export class GetTrainingProgramHandler
	implements IQueryHandler<GetTrainingProgramQuery>
{
	constructor(
		private readonly trainingProgramRepository: TrainingProgramRepository,
	) {}

	async execute(
		query: GetTrainingProgramQuery,
	): Promise<TrainingProgramDto[] | HttpException> {
		try {
			const trainingProgram = await this.trainingProgramRepository.findAll();
			return trainingProgram;
		} catch (error) {
			return new InternalServerErrorException();
		}
	}
}
