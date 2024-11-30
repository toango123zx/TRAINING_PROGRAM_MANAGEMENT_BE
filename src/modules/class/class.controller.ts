import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	Request,
	UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard, RoleGuard } from 'src/shared/guards';
import {
	GetAllClassQuery,
	GetClassById,
	GetStudentsByClassIdQuery,
} from './queries/implements';
import { GetAllClassDto } from './dto';
import { Role } from 'src/common/enums';
import { Authorize } from 'src/common/decorators';
import { CancelEnrollCommand, EnrollClassCommand } from './commands/implements';
import { UpdateClassRequsestDto } from './dtos';
import { UpdateClassCommand } from './commands/implements';

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

	@Post('/:id/enroll')
	@ApiBearerAuth()
	@UseGuards(AuthGuard, RoleGuard)
	@Authorize(Role.Student)
	async enrollClass(@Request() request: any, @Param('id') id_class: string) {
		return this.commandBus.execute(
			new EnrollClassCommand(request.user.id_user, id_class),
		);
	}

	@Delete('/:id/enroll')
	@ApiBearerAuth()
	@UseGuards(AuthGuard, RoleGuard)
	@Authorize(Role.Student)
	async cancelEnrollClass(@Request() request: any, @Param('id') id_class: string) {
		return this.commandBus.execute(
			new CancelEnrollCommand(request.user.id_user, id_class),
		);
	}

	@Patch(':classId')
	@ApiBearerAuth()
	async updateClass(
		@Param('classId') classId: string,
		@Body() updateClassData: UpdateClassRequsestDto,
	) {
		return this.commandBus.execute(
			new UpdateClassCommand(classId, updateClassData),
		);
	}
}
