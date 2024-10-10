import { ICommand } from '@nestjs/cqrs';
import { CreateTrainingProgramDto } from 'src/models';

export class CreateTrainingProgramCommand implements ICommand {
	constructor(
		public readonly createTrainingProgramDto: CreateTrainingProgramDto,
	) {}
}
