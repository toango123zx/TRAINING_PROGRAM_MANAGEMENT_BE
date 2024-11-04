import { IQuery } from '@nestjs/cqrs';

export class GetLecturerByIdQuery implements IQuery {
	constructor(public readonly id: string) {}
}
