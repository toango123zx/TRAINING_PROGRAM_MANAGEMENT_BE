import { ICommand } from '@nestjs/cqrs';

export class EnrollClassCommand implements ICommand {
	constructor(
		public readonly id_user: string,
		public readonly id_class: string,
	) {}
}
