import { ICommand } from '@nestjs/cqrs';
import { UpdateTrainingProgramDto } from 'src/models';

export class UpdateTrainingProgramCommand implements ICommand {
	constructor(
		public readonly id: string,
		public readonly updateTrainingProgramDto: UpdateTrainingProgramDto,
	) {}
}
