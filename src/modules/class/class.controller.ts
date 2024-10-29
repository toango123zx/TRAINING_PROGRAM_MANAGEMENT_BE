import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Authorize } from 'src/common/decorators';
import { Role } from 'src/common/enums';
import { AuthGuard, RoleGuard } from 'src/shared/guards';
import { GetAllClassQuery } from './queries/implements';
import { PaginationDto } from 'src/common/dtos';

@ApiTags('Classes')
@Controller('class')
export class ClassController {
	constructor(
		private readonly queryBus: QueryBus,
		private readonly commandBus: CommandBus,
	) {}

	@Get()
	@ApiBearerAuth()
	@UseGuards(AuthGuard, RoleGuard)
	@Authorize(Role.Admin)
	async getAllClasses(@Query() pagination: PaginationDto) {
		return this.queryBus.execute(new GetAllClassQuery(pagination));
	}
}
