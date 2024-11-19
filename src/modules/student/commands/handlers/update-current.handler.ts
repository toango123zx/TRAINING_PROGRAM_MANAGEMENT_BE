import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCurrentStudentCommand } from '../implements';
import { NotFoundException } from '@nestjs/common';
import { StudentRepository } from '../../repositories';

@CommandHandler(UpdateCurrentStudentCommand)
export class UpdateCurrentStudentHandler
	implements ICommandHandler<UpdateCurrentStudentCommand>
{
	constructor(private readonly studentRepository: StudentRepository) {}

	async execute(command: UpdateCurrentStudentCommand): Promise<any> {
		const { id, dto } = command;

		const user = await this.studentRepository.findById(id);
		if (!user) return new NotFoundException();

		return await this.studentRepository.updateStudent(id, dto);
	}
}
