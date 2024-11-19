import { ICommand } from '@nestjs/cqrs';
import { UpdateCurrentLecturerDto } from '../../dto';

export class UpdateCurrentLecturerCommand implements ICommand {
	constructor(
		public readonly id: string,
		public readonly dto: UpdateCurrentLecturerDto,
	) {}
}
