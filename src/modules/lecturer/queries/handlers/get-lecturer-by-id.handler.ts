import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetLecturerByIdQuery } from '../implements';
import { LecturerRepository } from '../../repositories/lecturer.repository';

@QueryHandler(GetLecturerByIdQuery)
export class GetLecturerByIdHandler implements IQueryHandler<GetLecturerByIdQuery> {
	constructor(private readonly lecturerRepository: LecturerRepository) {}

	async execute(query: GetLecturerByIdQuery): Promise<any> {
		return this.lecturerRepository.findById(query.id);
	}
}
