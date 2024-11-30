import { IQuery } from '@nestjs/cqrs';
import { GetAssignableSubjectsDto } from '../../dtos';

export class GetAssignableSubjectsQuery implements IQuery {
	constructor(
		public readonly id: string,
		public readonly dto: GetAssignableSubjectsDto,
	) {}
}
