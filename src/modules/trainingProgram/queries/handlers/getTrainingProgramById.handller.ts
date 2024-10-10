import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HttpException } from '@nestjs/common';

import { TrainingProgramDto } from 'src/models';
import { InternalServerErrorException, NotFoundException } from 'src/exceptions';
import { GetTrainingProgramByIdQuery } from '../implements';
import { TrainingProgramRepository } from '../../repositories/trainingProgram.repository';

@QueryHandler(GetTrainingProgramByIdQuery)
export class GetTrainingProgramByIdHandler
	implements IQueryHandler<GetTrainingProgramByIdQuery>
{
	constructor(
		private readonly trainingProgramRepository: TrainingProgramRepository,
	) {}
	async execute(
		query: GetTrainingProgramByIdQuery,
	): Promise<TrainingProgramDto | HttpException> {
		try {
			const trainingProgram = await this.trainingProgramRepository.findById(
				query.id,
			);

			if (!trainingProgram) {
				return new NotFoundException();
			}
			return trainingProgram;
		} catch (error) {
			return new InternalServerErrorException();
		}
	}
}
