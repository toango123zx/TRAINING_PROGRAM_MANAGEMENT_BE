import { Controller, Get, Param, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos';
import { GetAllStudentQuery, GetStudentByIdQuery } from './queries/implements';

@ApiTags('Student')
@Controller('student')
export class StudentController {
	constructor(private readonly queryBus: QueryBus) {}

	@Get()
	async getUsers(@Query() pagination: PaginationDto) {
		return this.queryBus.execute(new GetAllStudentQuery(pagination));
	}

	@Get('/:id')
	async getStudentById(@Param('id') id: string): Promise<any> {
		return this.queryBus.execute(new GetStudentByIdQuery(id));
	}
}
