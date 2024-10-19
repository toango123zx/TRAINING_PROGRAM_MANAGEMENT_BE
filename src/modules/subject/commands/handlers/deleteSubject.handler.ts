import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteSubjectCommand } from '../implements';
import { SubjectRepository } from '../../repositories/subject.repository';
import { HttpResponseBodySuccessDto } from 'src/common/dtos';
import { SubjectEntity } from 'src/models';
import { HttpException } from '@nestjs/common/exceptions';
import { InternalServerErrorException, NotFoundException } from 'src/exceptions';

@CommandHandler(DeleteSubjectCommand)
export class DeleteSubjectHandler implements ICommandHandler<DeleteSubjectCommand> {
	constructor(private readonly subjectRepository: SubjectRepository) {}
	async execute(
		command: DeleteSubjectCommand,
	): Promise<HttpResponseBodySuccessDto<SubjectEntity> | HttpException> {
		try {
			const subject = await this.subjectRepository.findById(command.id);
			if (!subject) {
				return new NotFoundException();
			}

			const newSubject = await this.subjectRepository.deleteSubject(
				command.id,
			);
			return { data: newSubject };
		} catch (error) {
			return new InternalServerErrorException();
		}
	}
}
