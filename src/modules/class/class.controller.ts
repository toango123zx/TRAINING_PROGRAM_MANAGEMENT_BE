import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/shared/guards';
import { GetAllClassQuery, GetStudentsByClassIdQuery } from './queries/implements';
import { GetAllClassDto } from './dto';

@ApiTags('Classes')
@Controller('class')
export class ClassController {
	constructor(
		private readonly queryBus: QueryBus,
		private readonly commandBus: CommandBus,
	) {}

	@Get()
	@ApiBearerAuth()
	@UseGuards(AuthGuard)
	async getAllClasses(@Query() dto: GetAllClassDto) {
		return this.queryBus.execute(new GetAllClassQuery(dto));
	}

	@Get('/:id/students')
	@ApiBearerAuth()
	@UseGuards(AuthGuard)
	async getStudentByClassId(@Param('id') id: string) {
		return this.queryBus.execute(new GetStudentsByClassIdQuery(id));
	}
}
