import { ICommand } from '@nestjs/cqrs';

import { UpdateClassRequsestDto } from '../../dtos';

export class UpdateClassCommand implements ICommand {
	constructor(
		public readonly classId: string,
		public readonly updateClassDto: UpdateClassRequsestDto,
	) {}
}
