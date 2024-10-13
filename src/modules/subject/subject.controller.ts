import { Controller, Get, Param, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

import {
	GetSubjectByIdQuery,
	GetSubjectsQuery,
	GetSubjectsByNameQuery,
} from './queries/implements';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@ApiTags('Subject')
@Controller('subject')
export class SubjectController {
	constructor(
		private readonly queryBus: QueryBus,
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
}
