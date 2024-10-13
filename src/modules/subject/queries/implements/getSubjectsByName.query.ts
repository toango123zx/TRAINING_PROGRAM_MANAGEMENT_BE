import { IQuery } from '@nestjs/cqrs';

import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class GetSubjectsByNameQuery implements IQuery {
	constructor(
		public readonly name: string,
		public readonly pagination: PaginationDto,
	) {}
}
