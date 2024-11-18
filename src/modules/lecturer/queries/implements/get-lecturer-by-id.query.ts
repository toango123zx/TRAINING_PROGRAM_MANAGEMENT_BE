import { IQuery } from '@nestjs/cqrs';

export class GetLecturerByIdQuery implements IQuery {
	constructor(
		public readonly userId: string,
		public readonly lecturerId: string,
	) {}
}
