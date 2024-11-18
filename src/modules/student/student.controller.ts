import { Controller, Get, Param, Query, Request, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos';
import {
	GetAllStudentQuery,
	GetClassesByStudentIdQuery,
	GetStudentByIdQuery,
} from './queries/implements';
import { AuthGuard, RoleGuard } from 'src/shared/guards';
import { Authorize } from 'src/common/decorators';
import { Role } from 'src/common/enums';

@ApiTags('Student')
@Controller('student')
export class StudentController {
	constructor(private readonly queryBus: QueryBus) {}

	@Get()
	async getUsers(@Query() pagination: PaginationDto) {
		return this.queryBus.execute(new GetAllStudentQuery(pagination));
	}

	@Get('/current/class')
	@ApiBearerAuth()
	@UseGuards(AuthGuard, RoleGuard)
	@Authorize(Role.Admin, Role.Student)
	async getCurrentStudentClasses(@Request() request: any) {
		return this.queryBus.execute(
			new GetClassesByStudentIdQuery(request.user.id_user),
		);
	}

	@Get('/:id')
	async getStudentById(@Param('id') id: string): Promise<any> {
		return this.queryBus.execute(new GetStudentByIdQuery(id));
	}
}
