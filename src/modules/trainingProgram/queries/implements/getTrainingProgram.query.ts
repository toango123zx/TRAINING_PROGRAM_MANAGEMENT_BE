import { IQuery } from '@nestjs/cqrs';

import { PaginationDto } from 'src/common/dtos';

export class GetTrainingProgramQuery implements IQuery {
	constructor(public readonly pagination: PaginationDto) {}
}
