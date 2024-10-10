import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateTrainingProgramDto, UpdateTrainingProgramDto } from 'src/models';

import {
	GetTrainingProgramQuery,
	GetTrainingProgramByIdQuery,
} from './queries/implements';
import {
	CreateTrainingProgramCommand,
	UpdateTrainingProgramCommand,
} from './commands/implements';
import { AuthGuard, RoleGuard } from 'src/shared/guards';
import { Authorize } from 'src/common/decorators';
import { Role } from 'src/common/enums';

@ApiTags('Training Program')
@Controller('training-program')
export class TrainingProgramController {
	constructor(
		private readonly queryBus: QueryBus,
		private readonly commandBus: CommandBus,
	) {}

	@Get()
	async findAll(): Promise<QueryBus> {
		return this.queryBus.execute(new GetTrainingProgramQuery());
	}

	@Get(':id')
	async findTrainingProgramById(@Param('id') id: string): Promise<QueryBus> {
		return this.queryBus.execute(new GetTrainingProgramByIdQuery(id));
	}

	@Post()
	@ApiBearerAuth()
	@UseGuards(AuthGuard, RoleGuard)
	@Authorize(Role.Admin)
	async createTrainingProgram(
		@Body() trainingProgramData: CreateTrainingProgramDto,
	): Promise<CommandBus> {
		return this.commandBus.execute(
			new CreateTrainingProgramCommand(trainingProgramData),
		);
	}

	@Patch(':id')
	@ApiBearerAuth()
	@UseGuards(AuthGuard, RoleGuard)
	@Authorize(Role.Admin)
	async updateTrainingProgram(
		@Param('id') id: string,
		@Body() trainingProgramData: UpdateTrainingProgramDto,
	): Promise<CommandBus> {
		return this.commandBus.execute(
			new UpdateTrainingProgramCommand(id, trainingProgramData),
		);
	}
}
