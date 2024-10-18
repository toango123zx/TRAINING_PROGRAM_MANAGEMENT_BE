import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../implements';
import { genSalt, hash } from 'bcryptjs';
import { UserRepository } from '../../repositories/user.repository';
import { RoleRepository } from 'src/modules/role/repositories/role.repository';
import { Role } from 'src/common/enums';
import { LecturerRepository } from 'src/modules/lecturer/repositories/lecturer.repository';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly roleRepository: RoleRepository,
		private readonly lecturerRepository: LecturerRepository,
	) {}

	async execute(command: CreateUserCommand): Promise<any> {
		const { createUserDto } = command;
		const { password } = createUserDto;

		const salt = await genSalt();
		const hashedPassword = await hash(password, salt);

		const role = await this.roleRepository.getById(createUserDto.id_role);

		const { lecturer, ...userData } = createUserDto;

		const user = await this.userRepository.create({
			...userData,
			salt,
			password: hashedPassword,
		});

		if (role.name === Role.Lecturer)
			await this.lecturerRepository.createLecturer({
				...lecturer,
				id_user: user.id_user,
			});

		return user;
	}
}
