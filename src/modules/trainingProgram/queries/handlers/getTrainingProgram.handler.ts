import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HttpException, InternalServerErrorException } from '@nestjs/common';

import { HttpResponseBodySuccessDto } from 'src/common/dtos';
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
	): Promise<HttpResponseBodySuccessDto<TrainingProgramDto[]> | HttpException> {
		try {
			const skip = (query.pagination.page - 1) * query.pagination.limit;

			const [trainingProgram, totalRecords] =
				await this.trainingProgramRepository.findAll(
					skip,
					query.pagination.limit,
				);
			const totalPage = Math.ceil(totalRecords / query.pagination.limit);
			return { data: trainingProgram, totalPage: totalPage };
		} catch (error) {
			return new InternalServerErrorException();
		}
	}
}
