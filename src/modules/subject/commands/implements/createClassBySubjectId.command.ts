import { ICommand } from '@nestjs/cqrs';
import { CreateClassBySubjectIdDto } from 'src/modules/class/dtos';

export class CreatClassBySubjectIdCommand implements ICommand {
	constructor(
		public readonly subjectId: string,
		public readonly createClassBySubjecIdDto: CreateClassBySubjectIdDto,
	) {}
}
