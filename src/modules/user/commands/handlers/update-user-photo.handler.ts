import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserPhotoCommand } from '../implements';
import { UserRepository } from '../../repositories/user.repository';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(UpdateUserPhotoCommand)
export class UpdateUserPhotoHandler
	implements ICommandHandler<UpdateUserPhotoCommand>
{
	constructor(private readonly userRepository: UserRepository) {}

	async execute(command: UpdateUserPhotoCommand): Promise<any> {
		if (!command.file || !command.id) throw new BadRequestException();
		return await this.userRepository.updateUserPhoto(command.id, command.file);
	}
}
