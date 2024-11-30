import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAssignableSubjectsQuery } from '../implements';
import { StudentRepository } from '../../repositories';

@QueryHandler(GetAssignableSubjectsQuery)
export class GetAssignableSubjectsHandler
	implements IQueryHandler<GetAssignableSubjectsQuery>
{
	constructor(private readonly studentRepository: StudentRepository) {}

	async execute(query: GetAssignableSubjectsQuery): Promise<any> {
		return this.studentRepository.getAssignableSubjects(query.id, query.dto.all);
	}
}
