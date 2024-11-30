import { IQuery } from '@nestjs/cqrs';

export class GetStudentsByClassIdQuery implements IQuery {
	constructor(public readonly id: string) {}
}
