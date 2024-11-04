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
			const skip = (query.data.page - 1) * query.data.limit;

			const [trainingProgram, totalRecords] =
				await this.trainingProgramRepository.findAll(
					skip,
					query.data.limit,
					query.data.name,
				);
			const totalPage = Math.ceil(totalRecords / query.data.limit);
			return { data: trainingProgram, totalPage: totalPage };
		} catch (error) {
			return new InternalServerErrorException();
		}
	}
}
