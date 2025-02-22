import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateTrainingProgramDto, UpdateTrainingProgramDto } from 'src/models';
import { AuthGuard, RoleGuard } from 'src/shared/guards';
import { Authorize } from 'src/common/decorators';
import { Role } from 'src/common/enums';

import {
	GetTrainingProgramQuery,
	GetTrainingProgramByIdQuery,
} from './queries/implements';
import {
	AssginSubjectInTrainingProgramCommand,
	CreateTrainingProgramCommand,
	DeleteTrainingProgramCommand,
	RemoveSubjectTrainingProgramCommand,
	UpdateTrainingProgramCommand,
} from './commands/implements';
import { GetAllTrainingProgramDto } from './dto';

@ApiTags('Training Program')
@Controller('training-program')
export class TrainingProgramController {
	constructor(
		private readonly queryBus: QueryBus,
		private readonly commandBus: CommandBus,
	) {}

	@Get()
	async findAll(@Query() query: GetAllTrainingProgramDto): Promise<QueryBus> {
		return this.queryBus.execute(new GetTrainingProgramQuery(query));
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

	@Delete(':id')
	@ApiBearerAuth()
	@UseGuards(AuthGuard, RoleGuard)
	@Authorize(Role.Admin)
	async DeleteTrainingProgram(@Param('id') id: string): Promise<CommandBus> {
		return this.commandBus.execute(new DeleteTrainingProgramCommand(id));
	}

	@Post(':trainingProgramId/subject/:subjectId')
	@ApiBearerAuth()
	@UseGuards(AuthGuard, RoleGuard)
	@Authorize(Role.Admin)
	async assignSubjectInTrainingProgram(
		@Param('trainingProgramId') trainingProgramId: string,
		@Param('subjectId') subjectId: string,
		@Query('semester') semester: number,
	): Promise<CommandBus> {
		return this.commandBus.execute(
			new AssginSubjectInTrainingProgramCommand(
				trainingProgramId,
				subjectId,
				semester,
			),
		);
	}

	@Delete(':trainingProgramId/info-subject/:infoSubjectId')
	@ApiBearerAuth()
	@UseGuards(AuthGuard, RoleGuard)
	@Authorize(Role.Admin)
	async removeSubjectInTrainingProgram(
		@Param('trainingProgramId') trainingProgramId: string,
		@Param('infoSubjectId') infoSubjectId: string,
	): Promise<CommandBus> {
		return this.commandBus.execute(
			new RemoveSubjectTrainingProgramCommand(
				trainingProgramId,
				infoSubjectId,
			),
		);
	}
}
