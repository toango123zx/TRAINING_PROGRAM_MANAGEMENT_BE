import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllStudentQuery } from '../implements';
import { UserRepository } from '../../repositories/user.repository';
import { HttpResponseBodySuccessDto } from 'src/common/dtos';
import { SafeUserDto } from 'src/common/dtos/safe-user.dto';
import { HttpException, InternalServerErrorException } from '@nestjs/common';

@QueryHandler(GetAllStudentQuery)
export class GetAllStudentHandler implements IQueryHandler<GetAllStudentQuery> {
	constructor(private readonly userRepository: UserRepository) {}
	async execute(
		query: GetAllStudentQuery,
	): Promise<HttpResponseBodySuccessDto<SafeUserDto[]> | HttpException> {
		try {
			const skip = (query.pagination.page - 1) * query.pagination.limit;

			const [students, totalRecords] = await this.userRepository.getAllStudent(
				skip,
				query.pagination.limit,
			);
			const totalPage = Math.ceil(totalRecords / query.pagination.limit);
			return { data: students, totalPage };
		} catch (error) {
			return new InternalServerErrorException();
		}
	}
}
