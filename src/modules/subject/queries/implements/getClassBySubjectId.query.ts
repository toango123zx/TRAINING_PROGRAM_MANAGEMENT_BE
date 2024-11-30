import { IQuery } from '@nestjs/cqrs';

export class GetClassBySubjectIdQuery implements IQuery {
	constructor(public readonly id: string) {}
}
