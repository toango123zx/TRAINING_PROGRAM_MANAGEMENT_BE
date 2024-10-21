import { ICommand } from '@nestjs/cqrs';

export class RemoveSubjectTrainingProgramCommand implements ICommand {
	constructor(
		public readonly trainingProgramId: string,
		public readonly infoSubjectId: string,
	) {}
}
