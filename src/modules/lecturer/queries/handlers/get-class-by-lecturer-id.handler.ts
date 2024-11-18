import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetClassesByLecturerIdQuery } from '../implements';
import { LecturerRepository } from '../../repositories/lecturer.repository';

@QueryHandler(GetClassesByLecturerIdQuery)
export class GetClassesByLecturerIdHandler
	implements IQueryHandler<GetClassesByLecturerIdQuery>
{
	constructor(private readonly lecturerRepository: LecturerRepository) {}

	async execute(query: GetClassesByLecturerIdQuery): Promise<any> {
		return this.lecturerRepository.getClassesByLecturerId(query.id);
	}
}
