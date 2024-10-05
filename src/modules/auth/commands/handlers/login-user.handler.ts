import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginUserCommand } from '../implements';
import { NotFoundException } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { AuthRepository } from '../../repositories/auth.repository';
import { SafeUserDto } from '../../dto';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
	constructor(private readonly authRepository: AuthRepository) {}

	async execute(command: LoginUserCommand): Promise<any> {
		const { loginUserDto } = command;
		const { username, password } = loginUserDto;

		const user = await this.authRepository.findUserByUsername(username);

		if (!user) throw new NotFoundException();

		const { salt } = user;
		const hashedPassword = await hash(password, salt);

		if (hashedPassword !== user.password.replaceAll(' ', ''))
			return new NotFoundException();
		return new SafeUserDto(user);
	}
}
