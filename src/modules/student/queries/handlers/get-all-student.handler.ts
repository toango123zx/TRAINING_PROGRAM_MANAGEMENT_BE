import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllStudentQuery } from '../implements';
import { StudentRepository } from '../../repositories';
import { HttpResponseBodySuccessDto } from 'src/common/dtos';
import { SafeUserDto } from 'src/common/dtos/safe-user.dto';
import { HttpException, InternalServerErrorException } from '@nestjs/common';

@QueryHandler(GetAllStudentQuery)
export class GetAllStudentHandler implements IQueryHandler<GetAllStudentQuery> {
	constructor(private readonly studentRepository: StudentRepository) {}
	async execute(
		query: GetAllStudentQuery,
	): Promise<HttpResponseBodySuccessDto<SafeUserDto[]> | HttpException> {
		try {
			const skip = (query.pagination.page - 1) * query.pagination.limit;

			const [subjects, totalRecords] = await this.studentRepository.findAll(
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
