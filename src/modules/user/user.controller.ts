import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserDto } from '../../models/user/dto';
import { CreateUserCommand } from './commands/implements/create-user.command';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard, RoleGuard } from '../../shared/guards';
import { Authorize } from '../../common/decorators';
import { Role } from '../../common/enums';
import { UpdateUserCommand } from './commands/implements';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('user')
export class UserController {
	constructor(private readonly commandBus: CommandBus) {}

	@Post()
	@ApiBearerAuth()
	@UseGuards(AuthGuard, RoleGuard)
	@Authorize(Role.Admin)
	async registerUser(@Body() createUserDto: CreateUserDto): Promise<any> {
		return this.commandBus.execute(new CreateUserCommand(createUserDto));
	}

	@Put(':id')
	@ApiBearerAuth()
	@UseGuards(AuthGuard, RoleGuard)
	@Authorize(Role.Admin)
	async updateUser(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string) {
		return this.commandBus.execute(new UpdateUserCommand(id, updateUserDto));
	}
}
