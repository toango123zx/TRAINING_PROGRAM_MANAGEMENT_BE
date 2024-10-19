import { ICommand } from '@nestjs/cqrs';

import { UpdateSubjectDto } from 'src/models';

export class UpdateSubjectCommand implements ICommand {
	constructor(
		public readonly id: string,
		public readonly updateSubjectDto: UpdateSubjectDto,
	) {}
}
