import { IQuery } from '@nestjs/cqrs';

export class GetClassById implements IQuery {
	constructor(public readonly id: string) {}
}
