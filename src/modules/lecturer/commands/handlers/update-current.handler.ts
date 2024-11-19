import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCurrentLecturerCommand } from '../implements';
import { NotFoundException } from '@nestjs/common';
import { LecturerRepository } from '../../repositories';

@CommandHandler(UpdateCurrentLecturerCommand)
export class UpdateCurrentLecturerHandler
	implements ICommandHandler<UpdateCurrentLecturerCommand>
{
	constructor(private readonly lecturerRepository: LecturerRepository) {}

	async execute(command: UpdateCurrentLecturerCommand): Promise<any> {
		const { id, dto } = command;

		const user = await this.lecturerRepository.findByUserId(id);
		if (!user) return new NotFoundException();

		return await this.lecturerRepository.updateLecturer(id, dto);
	}
}
