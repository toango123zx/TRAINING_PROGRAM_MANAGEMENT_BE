import { ICommand } from '@nestjs/cqrs';

export class DeleteTrainingProgramCommand implements ICommand {
	constructor(public readonly id: string) {}
}
