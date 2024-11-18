import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetClassesByStudentIdQuery } from '../implements';
import { StudentRepository } from '../../repositories';

@QueryHandler(GetClassesByStudentIdQuery)
export class GetClassesByStudentIdHandler
	implements IQueryHandler<GetClassesByStudentIdQuery>
{
	constructor(private readonly studentRepository: StudentRepository) {}

	async execute(query: GetClassesByStudentIdQuery): Promise<any> {
		return this.studentRepository.getClassesByStudentId(query.id);
	}
}
