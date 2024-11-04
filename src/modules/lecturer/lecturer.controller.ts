import { Controller, Get, Param, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { GetAllLecturerQuery, GetLecturerByIdQuery } from './queries/implements';
import { PaginationDto } from 'src/common/dtos';

@ApiTags('Lecturers')
@Controller('lecturer')
export class LecturerController {
	constructor(private readonly queryBus: QueryBus) {}

	@Get('')
	async getAllLecturer(@Query() pagination: PaginationDto) {
		return this.queryBus.execute(new GetAllLecturerQuery(pagination));
	}

	@Get('/:id')
	async getLecturerById(@Param('id') id: string): Promise<any> {
		return this.queryBus.execute(new GetLecturerByIdQuery(id));
	}
}
