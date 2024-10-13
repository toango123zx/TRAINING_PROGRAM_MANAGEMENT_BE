import { IQuery } from '@nestjs/cqrs';

import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class GetSubjectsQuery implements IQuery {
	constructor(public readonly pagination: PaginationDto) {}
}
