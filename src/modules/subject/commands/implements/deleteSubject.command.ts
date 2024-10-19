import { ICommand } from '@nestjs/cqrs';

export class DeleteSubjectCommand implements ICommand {
	constructor(public readonly id: string) {}
}
