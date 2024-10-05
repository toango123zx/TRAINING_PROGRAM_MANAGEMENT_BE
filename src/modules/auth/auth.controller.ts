import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { LoginUserDto } from './dto';
import { LoginUserCommand } from './commands/implements/login-user.command';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { ProfileUserQuery } from './queries/implements';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	@Post('login')
	async loginUser(@Body() loginUserDto: LoginUserDto): Promise<User> {
		return this.commandBus.execute(new LoginUserCommand(loginUserDto));
	}

	@ApiBearerAuth()
	@UseGuards(AuthGuard)
	@Get('profile')
	getProtected(@Request() req: any) {
		return this.queryBus.execute(new ProfileUserQuery(req.user));
	}
}
