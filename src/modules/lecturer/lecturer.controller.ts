import {
	Body,
	Controller,
	Get,
	Patch,
	Query,
	Request,
	UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
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
import { FindLecturerByIdDto, UpdateCurrentLecturerDto } from './dto';
import { UpdateCurrentLecturerCommand } from './commands/implements';

@ApiTags('Lecturers')
@Controller('lecturer')
export class LecturerController {
	constructor(
		private readonly queryBus: QueryBus,
		private readonly commandBus: CommandBus,
	) {}

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

	@Patch('/current/profile')
	@ApiBearerAuth()
	@UseGuards(AuthGuard, RoleGuard)
	@Authorize(Role.Lecturer)
	async updateCurrentLecturer(
		@Request() request: any,
		@Body() dto: UpdateCurrentLecturerDto,
	) {
		return this.commandBus.execute(
			new UpdateCurrentLecturerCommand(request.user.id_user, dto),
		);
	}

	@Get('/find')
	async getLecturerById(@Query() dto: FindLecturerByIdDto): Promise<any> {
		return this.queryBus.execute(
			new GetLecturerByIdQuery(dto.userId, dto.lecturerId),
		);
	}
}
