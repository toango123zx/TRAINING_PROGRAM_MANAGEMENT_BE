import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllLecturerQuery } from '../implements';
import { LecturerRepository } from '../../repositories/lecturer.repository';
import { HttpResponseBodySuccessDto } from 'src/common/dtos';
import { SafeUserDto } from 'src/common/dtos/safe-user.dto';
import { HttpException, InternalServerErrorException } from '@nestjs/common';

@QueryHandler(GetAllLecturerQuery)
export class GetAllLecturerHandler implements IQueryHandler<GetAllLecturerQuery> {
	constructor(private readonly lecturerRepository: LecturerRepository) {}
	async execute(
		query: GetAllLecturerQuery,
	): Promise<HttpResponseBodySuccessDto<SafeUserDto[]> | HttpException> {
		try {
			const skip = (query.pagination.page - 1) * query.pagination.limit;

			const [lecturers, totalRecords] =
				await this.lecturerRepository.getAllLecturer(
					skip,
					query.pagination.limit,
				);
			const totalPage = Math.ceil(totalRecords / query.pagination.limit);
			return { data: lecturers, totalPage };
		} catch (error) {
			return new InternalServerErrorException();
		}
	}
}
