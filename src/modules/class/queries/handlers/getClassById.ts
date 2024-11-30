import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetClassById } from '../implements';
import { ClassRepository } from '../../repositories/class.repository';
import { HttpException, NotFoundException } from '@nestjs/common';
import { InternalServerErrorException } from 'src/exceptions';
import { HttpResponseBodySuccessDto } from 'src/common/dtos';
import { ClassEntity } from 'src/models';

@QueryHandler(GetClassById)
export class GetClassByIdHandler implements IQueryHandler<GetClassById> {
	constructor(private readonly classRepository: ClassRepository) {}
	async execute(
		query: GetClassById,
	): Promise<HttpResponseBodySuccessDto<ClassEntity> | HttpException> {
		try {
			const classData = await this.classRepository.getClassById(query.id);
			if (!classData) {
				return new NotFoundException('Class');
			}

			return { data: classData };
		} catch (error) {
			return new InternalServerErrorException();
		}
	}
}
