import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllClassQuery } from '../implements';
import { ClassRepository } from '../../repositories/class.repository';

@QueryHandler(GetAllClassQuery)
export class GetAllClassHandler implements IQueryHandler<GetAllClassQuery> {
	constructor(private readonly classRepository: ClassRepository) {}

	async execute(query: GetAllClassQuery): Promise<any> {
		const skip = (query.pagination.page - 1) * query.pagination.limit;
		const [classes, totalRecords] = await this.classRepository.getAllClass(
			skip,
			query.pagination.limit,
		);
		const totalPage = Math.ceil(totalRecords / query.pagination.limit);
		return { data: classes, totalPage };
	}
}
