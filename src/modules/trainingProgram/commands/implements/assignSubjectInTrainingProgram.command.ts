import { ICommand } from '@nestjs/cqrs';

export class AssginSubjectInTrainingProgramCommand implements ICommand {
	constructor(
		public readonly trainingProgramId: string,
		public readonly subjectId: string,
		public readonly semester: number,
	) {}
}
