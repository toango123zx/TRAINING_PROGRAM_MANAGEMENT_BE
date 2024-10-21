import { IQuery } from '@nestjs/cqrs';
import { PaginationDto } from 'src/common/dtos';

export class GetUserQuery implements IQuery {
	constructor(public readonly pagination: PaginationDto) {}
}
