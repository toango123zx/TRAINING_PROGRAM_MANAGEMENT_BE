import { IQuery } from '@nestjs/cqrs';

export class GetStudentByIdQuery implements IQuery {
	constructor(public readonly id: string) {}
}
