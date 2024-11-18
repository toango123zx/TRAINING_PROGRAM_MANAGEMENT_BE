import { IQuery } from '@nestjs/cqrs';

export class GetClassesByLecturerIdQuery implements IQuery {
	constructor(public readonly id: string) {}
}
