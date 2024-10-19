import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

import { PaginationDto } from 'src/common/dtos';
import { CreateSubjectDto, UpdateSubjectDto } from 'src/models';

import {
	GetSubjectByIdQuery,
	GetSubjectsQuery,
	GetSubjectsByNameQuery,
} from './queries/implements';
import { CreateSubjectCommand, UpdateSubjectCommand } from './commands/implements';

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
}
