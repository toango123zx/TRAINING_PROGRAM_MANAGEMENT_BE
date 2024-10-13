import { HttpException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { HttpResponseBodySuccessDto } from 'src/common/dtos';
import { InternalServerErrorException, NotFoundException } from 'src/exceptions';
import { SubjectEntity } from 'src/models';

import { GetSubjectsByNameQuery } from '../implements';
import { SubjectRepository } from '../../repositories/subject.repository';

@QueryHandler(GetSubjectsByNameQuery)
export class GetSubjectsByNameHandler
	implements IQueryHandler<GetSubjectsByNameQuery>
{
	constructor(private readonly subjectRepository: SubjectRepository) {}

	async execute(
		query: GetSubjectsByNameQuery,
	): Promise<HttpResponseBodySuccessDto<SubjectEntity[]> | HttpException> {
		try {
			const skip = (query.pagination.page - 1) * query.pagination.limit;

			const [subjects, totalRecords] = await this.subjectRepository.findByName(
				query.name,
				skip,
				query.pagination.limit,
			);
			const totalPage = Math.floor(totalRecords / query.pagination.limit);
			if (!subjects) {
				return new NotFoundException();
			}
			return { data: subjects, totalPage };
		} catch (error) {
			return new InternalServerErrorException();
		}
	}
}
