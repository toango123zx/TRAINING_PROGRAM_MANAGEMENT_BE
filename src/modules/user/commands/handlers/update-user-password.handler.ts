import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserPasswordCommand } from '../implements';
import { UserRepository } from '../../repositories/user.repository';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(UpdateUserPasswordCommand)
export class UpdateUserPasswordHandler
	implements ICommandHandler<UpdateUserPasswordCommand>
{
	constructor(private readonly userRepository: UserRepository) {}

	async execute(command: UpdateUserPasswordCommand): Promise<any> {
		if (!command.dto || !command.id) throw new BadRequestException();
		const { oldPassword, newPassword, confirmedPassword } = command.dto;

		if (newPassword !== confirmedPassword)
			throw new BadRequestException('Password mismatched');

		return await this.userRepository.updateUserPassword(
			command.id,
			oldPassword,
			newPassword,
		);
	}
}
