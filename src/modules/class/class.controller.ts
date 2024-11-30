import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Query,
	UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/shared/guards';
import {
	GetAllClassQuery,
	GetClassById,
	GetStudentsByClassIdQuery,
} from './queries/implements';
import { GetAllClassDto } from './dto';
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

	@Get('/:classId')
	@ApiBearerAuth()
	@UseGuards(AuthGuard)
	async getClassById(@Param('classId') classId: string) {
		return this.queryBus.execute(new GetClassById(classId));
	}

	@Get('/:id/students')
	@ApiBearerAuth()
	@UseGuards(AuthGuard)
	async getStudentByClassId(@Param('id') id: string) {
		return this.queryBus.execute(new GetStudentsByClassIdQuery(id));
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
