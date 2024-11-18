import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCurrentUserPasswordCommand } from '../implements';
import { UserRepository } from '../../repositories/user.repository';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(UpdateCurrentUserPasswordCommand)
export class UpdateCurrentUserPasswordHandler
	implements ICommandHandler<UpdateCurrentUserPasswordCommand>
{
	constructor(private readonly userRepository: UserRepository) {}

	async execute(command: UpdateCurrentUserPasswordCommand): Promise<any> {
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
