import { IQuery } from '@nestjs/cqrs';

export class GetTrainingProgramByIdQuery implements IQuery {
	constructor(public readonly id: string) {}
}
