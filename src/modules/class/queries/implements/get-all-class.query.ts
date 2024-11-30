import { IQuery } from '@nestjs/cqrs';
import { GetAllClassDto } from '../../dto';

export class GetAllClassQuery implements IQuery {
	constructor(public readonly dto: GetAllClassDto) {}
}
