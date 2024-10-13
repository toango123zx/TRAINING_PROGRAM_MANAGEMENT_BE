import { IQuery } from '@nestjs/cqrs';

export class GetSubjectByIdQuery implements IQuery {
	constructor(public readonly id: string) {}
}
