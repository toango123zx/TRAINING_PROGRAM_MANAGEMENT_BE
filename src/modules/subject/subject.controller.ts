import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

import { PaginationDto } from 'src/common/dtos';
import { CreateSubjectDto, UpdateSubjectDto } from 'src/models';

import {
	GetSubjectByIdQuery,
	GetSubjectsQuery,
	GetSubjectsByNameQuery,
	GetClassBySubjectIdQuery,
} from './queries/implements';
import {
	CreatClassBySubjectIdCommand,
	CreateSubjectCommand,
	DeleteSubjectCommand,
	UpdateSubjectCommand,
} from './commands/implements';
import { CreateClassBySubjectIdDto } from '../class/dtos';

@ApiTags('Subject')
@Controller('subject')
export class SubjectController {
	constructor(
		private readonly queryBus: QueryBus,
		private readonly commandBus: CommandBus,
	) {}

	@Get()
	async findAll(@Query() pagination: PaginationDto): Promise<QueryBus> {
		return this.queryBus.execute(new GetSubjectsQuery(pagination));
	}

	@Get('/name')
	async findSubjectByName(
		@Query('name') name: string,
		@Query() pagination: PaginationDto,
	): Promise<QueryBus> {
		return this.queryBus.execute(new GetSubjectsByNameQuery(name, pagination));
	}

	@Get(':id')
	async findSubjectById(@Param('id') id: string): Promise<QueryBus> {
		return this.queryBus.execute(new GetSubjectByIdQuery(id));
	}

	@Get(':subjectId/class')
	async getClassesBySubjectId(@Param('subjectId') id: string): Promise<QueryBus> {
		return this.queryBus.execute(new GetClassBySubjectIdQuery(id));
	}

	@Post()
	async createSubject(
		@Body() createSubjectDto: CreateSubjectDto,
	): Promise<CommandBus> {
		return this.commandBus.execute(new CreateSubjectCommand(createSubjectDto));
	}

	@Patch(':id')
	async updateSubject(
		@Param('id') id: string,
		@Body() subjectData: UpdateSubjectDto,
	): Promise<CommandBus> {
		return this.commandBus.execute(new UpdateSubjectCommand(id, subjectData));
	}

	@Delete(':id')
	async deleteSubject(@Param('id') id: string): Promise<CommandBus> {
		return this.commandBus.execute(new DeleteSubjectCommand(id));
	}

	@Post(':subjectId/class')
	async createClassBySubjectId(
		@Param('subjectId') subjectId: string,
		@Body() createClassBySubjectIdData: CreateClassBySubjectIdDto,
	): Promise<any> {
		return this.commandBus.execute(
			new CreatClassBySubjectIdCommand(subjectId, createClassBySubjectIdData),
		);
	}
}
