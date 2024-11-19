import { ICommand } from '@nestjs/cqrs';
import { UpdateStudentDto } from '../../dtos';

export class UpdateCurrentStudentCommand implements ICommand {
	constructor(
		public readonly id: string,
		public readonly dto: UpdateStudentDto,
	) {}
}
