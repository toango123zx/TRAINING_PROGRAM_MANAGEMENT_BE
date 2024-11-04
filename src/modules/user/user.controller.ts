import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Put,
	Query,
	UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/implements/create-user.command';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard, RoleGuard } from '../../shared/guards';
import { Authorize } from '../../common/decorators';
import { Role } from '../../common/enums';
import { UpdateUserCommand } from './commands/implements';
import { UpdateUserDto, CreateUserDto } from './dto';
import { PaginationDto } from 'src/common/dtos';
import {
	GetAllStudentQuery,
	GetUserByIdQuery,
	GetUserQuery,
} from './queries/implements';

@ApiTags('Users')
@Controller('user')
export class UserController {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	@Get()
	async getUsers(@Query() pagination: PaginationDto) {
		return this.queryBus.execute(new GetUserQuery(pagination));
	}

	@Post()
	@ApiBearerAuth()
	@UseGuards(AuthGuard, RoleGuard)
	@Authorize(Role.Admin)
	async registerUser(@Body() createUserDto: CreateUserDto): Promise<any> {
		return this.commandBus.execute(new CreateUserCommand(createUserDto));
	}

	@Get('/:id')
	async getUserById(@Param('id') id: string): Promise<any> {
		return this.queryBus.execute(new GetUserByIdQuery(id));
	}

	@Put('/:id')
	@ApiBearerAuth()
	@UseGuards(AuthGuard, RoleGuard)
	@Authorize(Role.Admin)
	async updateUser(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string) {
		return this.commandBus.execute(new UpdateUserCommand(id, updateUserDto));
	}

	@Get('/student')
	async getAllStudent(@Query() pagination: PaginationDto) {
		return this.queryBus.execute(new GetAllStudentQuery(pagination));
	}
}
