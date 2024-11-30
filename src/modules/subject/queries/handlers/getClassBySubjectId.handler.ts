import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetClassBySubjectIdQuery } from '../implements';
import { SubjectRepository } from '../../repositories';

@QueryHandler(GetClassBySubjectIdQuery)
export class GetClassBySubjectIdHandler
	implements IQueryHandler<GetClassBySubjectIdQuery>
{
	constructor(private readonly subjectRepository: SubjectRepository) {}

	async execute(query: GetClassBySubjectIdQuery): Promise<any> {
		return this.subjectRepository.getClassBySubjectId(query.id);
	}
}
