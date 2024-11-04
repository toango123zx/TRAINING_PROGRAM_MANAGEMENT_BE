import { IQuery } from '@nestjs/cqrs';
import { GetAllTrainingProgramDto } from '../../dto';

export class GetTrainingProgramQuery implements IQuery {
	constructor(public readonly data: GetAllTrainingProgramDto) {}
}
