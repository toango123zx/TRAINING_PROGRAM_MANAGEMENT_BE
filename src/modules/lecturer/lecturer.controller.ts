import { Controller, Get, Param, Query, Request, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
	GetAllLecturerQuery,
	GetClassesByLecturerIdQuery,
	GetLecturerByIdQuery,
} from './queries/implements';
import { PaginationDto } from 'src/common/dtos';
import { AuthGuard, RoleGuard } from 'src/shared/guards';
import { Authorize } from 'src/common/decorators';
import { Role } from 'src/common/enums';

@ApiTags('Lecturers')
@Controller('lecturer')
export class LecturerController {
	constructor(private readonly queryBus: QueryBus) {}

	@Get('')
	async getAllLecturer(@Query() pagination: PaginationDto) {
		return this.queryBus.execute(new GetAllLecturerQuery(pagination));
	}

	@Get('/current/class')
	@ApiBearerAuth()
	@UseGuards(AuthGuard, RoleGuard)
	@Authorize(Role.Lecturer)
	async getClassOfCurrentLecturer(@Request() request: any) {
		return this.queryBus.execute(
			new GetClassesByLecturerIdQuery(request.user.id_user),
		);
	}

	@Get('/:id')
	async getLecturerById(@Param('id') id: string): Promise<any> {
		return this.queryBus.execute(new GetLecturerByIdQuery(id));
	}
}
