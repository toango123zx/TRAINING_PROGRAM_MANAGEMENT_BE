import { ICommand } from '@nestjs/cqrs';

export class CancelEnrollCommand implements ICommand {
	constructor(
		public readonly id_user: string,
		public readonly id_class: string,
	) {}
}
