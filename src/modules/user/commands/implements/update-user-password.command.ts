import { ICommand } from '@nestjs/cqrs';
import { ChangePasswordDto } from '../../dto';

export class UpdateUserPasswordCommand implements ICommand {
	constructor(
		public readonly id: string,
		public readonly dto: ChangePasswordDto,
	) {}
}
