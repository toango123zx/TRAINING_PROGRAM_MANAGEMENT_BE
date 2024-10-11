import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../implements';
import { UserRepository } from '../../repositories/user.repository';
import { RoleRepository } from 'src/modules/role/repositories/role.repository';
import { Role } from 'src/common/enums';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly roleRepository: RoleRepository,
	) {}

	async execute(command: UpdateUserCommand): Promise<any> {
		const { id, updateUserDto } = command;

		const user = await this.userRepository.getById(id);
		if (!user) return new NotFoundException();

		const role = await this.roleRepository.getById(user.id_role);

		if (role.name === Role.Lecturer)
			return await this.userRepository.updateLecturer(id, updateUserDto);

		delete updateUserDto.lecturer;
		return await this.userRepository.updateUser(id, updateUserDto);
	}
}
