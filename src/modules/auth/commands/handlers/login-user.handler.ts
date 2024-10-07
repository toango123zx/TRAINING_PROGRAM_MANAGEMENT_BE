import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginUserCommand } from '../implements';
import { NotFoundException } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { AuthRepository } from '../../repositories/auth.repository';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from 'src/config';
import { RoleRepository } from 'src/modules/role/repositories/role.repository';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
	constructor(
		private readonly authRepository: AuthRepository,
		private readonly roleRepository: RoleRepository,
		private readonly jwtService: JwtService,
	) {}

	async execute(command: LoginUserCommand): Promise<any> {
		const { loginUserDto } = command;
		const { username, password } = loginUserDto;

		const user = await this.authRepository.findUserByUsername(username);

		if (!user) throw new NotFoundException();
		const { salt } = user;
		const hashedPassword = await hash(password, salt);

		if (hashedPassword !== user.password.replaceAll(' ', ''))
			return new NotFoundException();
		const role = await this.roleRepository.getById(user.id_role);
		return {
			access_token: this.jwtService.sign(
				{
					username: username,
					id_user: user.id_user,
					role: role.name,
				},
				{ secret: jwtConfig.secret },
			),
		};
	}
}
