import { CreateSubjectDto } from 'src/models';

export class CreateSubjectCommand {
	constructor(public readonly createSubjectDto: CreateSubjectDto) {}
}
