import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllClassQuery } from '../implements';
import { ClassRepository } from '../../repositories/class.repository';

@QueryHandler(GetAllClassQuery)
export class GetAllClassHandler implements IQueryHandler<GetAllClassQuery> {
	constructor(private readonly classRepository: ClassRepository) {}

	async execute(query: GetAllClassQuery): Promise<any> {
		const skip = (query.dto.page - 1) * query.dto.limit;
		const [classes, totalRecords] = await this.classRepository.getAllClass(
			skip,
			query.dto.limit,
			query.dto.name,
		);
		const totalPage = Math.ceil(totalRecords / query.dto.limit);
		return { data: classes, totalPage };
	}
}
