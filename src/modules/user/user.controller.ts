import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserDto } from '../../models/user/dto';
import { CreateUserCommand } from './commands/implements/create-user.command';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
	constructor(private readonly commandBus: CommandBus) {}

	@Post('create')
	async registerUser(@Body() createUserDto: CreateUserDto): Promise<any> {
		return this.commandBus.execute(new CreateUserCommand(createUserDto));
	}
}
