import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllLecturerQuery } from '../implements';
import { UserRepository } from '../../repositories/user.repository';
import { HttpResponseBodySuccessDto } from 'src/common/dtos';
import { SafeUserDto } from 'src/common/dtos/safe-user.dto';
import { HttpException, InternalServerErrorException } from '@nestjs/common';

@QueryHandler(GetAllLecturerQuery)
export class GetAllLecturerHandler implements IQueryHandler<GetAllLecturerQuery> {
	constructor(private readonly userRepository: UserRepository) {}
	async execute(
		query: GetAllLecturerQuery,
	): Promise<HttpResponseBodySuccessDto<SafeUserDto[]> | HttpException> {
		try {
			const skip = (query.pagination.page - 1) * query.pagination.limit;

			const [subjects, totalRecords] =
				await this.userRepository.getAllLecturer(
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
