import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Query,
	Request,
	UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos';
import {
	GetAllStudentQuery,
	GetAssignableSubjectsQuery,
	GetClassesByStudentIdQuery,
	GetStudentByIdQuery,
} from './queries/implements';
import { AuthGuard, RoleGuard } from 'src/shared/guards';
import { Authorize } from 'src/common/decorators';
import { Role } from 'src/common/enums';
import { GetAssignableSubjectsDto, UpdateStudentDto } from './dtos';
import { UpdateCurrentStudentCommand } from './commands/implements';
import { User } from '@prisma/client';

@ApiTags('Student')
@Controller('student')
export class StudentController {
	constructor(
		private readonly queryBus: QueryBus,
		private readonly commandBus: CommandBus,
	) {}

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

	@Patch('/current/profile')
	@ApiBearerAuth()
	@UseGuards(AuthGuard, RoleGuard)
	@Authorize(Role.Student)
	async updateCurrentProfile(
		@Request() request: any,
		@Body() dto: UpdateStudentDto,
	): Promise<User> {
		return this.commandBus.execute(
			new UpdateCurrentStudentCommand(request.user.id_user, dto),
		);
	}

	@Get('/:id')
	async getStudentById(@Param('id') id: string): Promise<any> {
		return this.queryBus.execute(new GetStudentByIdQuery(id));
	}

	@Get('/current/subject/assignable')
	@ApiBearerAuth()
	@UseGuards(AuthGuard, RoleGuard)
	@Authorize(Role.Student)
	async getAssignableClasses(
		@Request() request: any,
		@Query() dto: GetAssignableSubjectsDto,
	) {
		return this.queryBus.execute(
			new GetAssignableSubjectsQuery(request.user.id_user, dto),
		);
	}
}
