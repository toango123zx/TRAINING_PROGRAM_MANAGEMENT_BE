import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { LoginUserDto } from './dto';
import { LoginUserCommand } from './commands/implements/login-user.command';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly commandBus: CommandBus) {}

	@Post('login')
	async loginUser(@Body() loginUserDto: LoginUserDto): Promise<User> {
		return this.commandBus.execute(new LoginUserCommand(loginUserDto));
	}
}
