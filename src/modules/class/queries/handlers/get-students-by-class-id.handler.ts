import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetStudentsByClassIdQuery } from '../implements';
import { ClassRepository } from '../../repositories/class.repository';

@QueryHandler(GetStudentsByClassIdQuery)
export class GetStudentsByClassIdHandler
	implements IQueryHandler<GetStudentsByClassIdQuery>
{
	constructor(private readonly classRepository: ClassRepository) {}

	async execute(query: GetStudentsByClassIdQuery): Promise<any> {
		return await this.classRepository.getStudentByClassId(query.id);
	}
}
