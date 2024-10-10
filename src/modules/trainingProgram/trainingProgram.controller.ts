import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

import { GetTrainingProgramQuery } from './queries/implements';
import { GetTrainingProgramByIdQuery } from './queries/implements/getTrainingProgramById.query';

@ApiTags('Training Program')
@Controller('training-program')
export class TrainingProgramController {
	constructor(private readonly queryBus: QueryBus) {}

	@Get()
	async findAll(): Promise<QueryBus> {
		return this.queryBus.execute(new GetTrainingProgramQuery());
	}

	@Get(':id')
	async findTrainingProgramById(@Param('id') id: string): Promise<QueryBus> {
		return this.queryBus.execute(new GetTrainingProgramByIdQuery(id));
	}
}
