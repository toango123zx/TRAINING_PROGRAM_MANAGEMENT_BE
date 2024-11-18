import { IQuery } from '@nestjs/cqrs';

export class GetClassesByStudentIdQuery implements IQuery {
	constructor(public readonly id: string) {}
}
