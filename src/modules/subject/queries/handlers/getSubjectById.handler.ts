import { HttpException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { HttpResponseBodySuccessDto } from 'src/common/dtos';
import { InternalServerErrorException, NotFoundException } from 'src/exceptions';
import { SubjectEntity } from 'src/models';

import { GetSubjectByIdQuery } from '../implements';
import { SubjectRepository } from '../../repositories/subject.repository';

@QueryHandler(GetSubjectByIdQuery)
export class GetSubjectByIdHandler implements IQueryHandler<GetSubjectByIdQuery> {
	constructor(private readonly subjectRepository: SubjectRepository) {}
	async execute(
		query: GetSubjectByIdQuery,
	): Promise<HttpResponseBodySuccessDto<SubjectEntity> | HttpException> {
		try {
			const subject = await this.subjectRepository.findById(query.id);

			if (!subject) {
				return new NotFoundException();
			}

			return { data: subject };
		} catch (error) {
			return new InternalServerErrorException();
		}
	}
}
