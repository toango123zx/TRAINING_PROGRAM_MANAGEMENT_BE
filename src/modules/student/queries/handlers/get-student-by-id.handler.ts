import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetStudentByIdQuery } from '../implements';
import { StudentRepository } from '../../repositories';

@QueryHandler(GetStudentByIdQuery)
export class GetStudentByIdHandler implements IQueryHandler<GetStudentByIdQuery> {
	constructor(private readonly studentRepository: StudentRepository) {}

	async execute(query: GetStudentByIdQuery): Promise<any> {
		return this.studentRepository.findById(query.id);
	}
}
