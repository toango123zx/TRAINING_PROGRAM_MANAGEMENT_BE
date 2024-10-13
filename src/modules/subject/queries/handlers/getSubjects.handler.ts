import { HttpException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { HttpResponseBodySuccessDto } from 'src/common/dtos';
import { InternalServerErrorException } from 'src/exceptions';
import { SubjectEntity } from 'src/models';

import { GetSubjectsQuery } from '../implements';
import { SubjectRepository } from '../../repositories/subject.repository';

@QueryHandler(GetSubjectsQuery)
export class GetSubjectsHandler implements IQueryHandler<GetSubjectsQuery> {
	constructor(private readonly subjectRepository: SubjectRepository) {}
	async execute(
		query: GetSubjectsQuery,
	): Promise<HttpResponseBodySuccessDto<SubjectEntity[]> | HttpException> {
		try {
			const skip = (query.pagination.page - 1) * query.pagination.limit;

			const [subjects, totalRecords] = await this.subjectRepository.findAll(
				skip,
				query.pagination.limit,
			);
			const totalPage = Math.ceil(totalRecords / query.pagination.limit);
			return { data: subjects, totalPage };
		} catch (error) {
			return new InternalServerErrorException();
		}
	}
}
