import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteSubjectCommand } from '../implements';
import { SubjectRepository } from '../../repositories/subject.repository';
import { HttpResponseBodySuccessDto } from 'src/common/dtos';
import { SubjectEntity } from 'src/models';
import { HttpException } from '@nestjs/common/exceptions';
import { InternalServerErrorException, NotFoundException } from 'src/exceptions';
import { ClassRepository } from 'src/modules/class/repositories/class.repository';

@CommandHandler(DeleteSubjectCommand)
export class DeleteSubjectHandler implements ICommandHandler<DeleteSubjectCommand> {
	constructor(
		private readonly subjectRepository: SubjectRepository,
		private readonly classRepository: ClassRepository,
	) {}
	async execute(
		command: DeleteSubjectCommand,
	): Promise<HttpResponseBodySuccessDto<SubjectEntity> | HttpException> {
		try {
			const subject = await this.subjectRepository.findById(command.id);
			if (!subject) {
				return new NotFoundException();
			}

			const classes = await this.subjectRepository.getClassBySubjectId(
				command.id,
			);

			const newSubject = await this.subjectRepository.deleteSubject(
				command.id,
			);

			classes.forEach(async (classItem) => {
				await this.classRepository.deleteClassById(classItem.id_class);
			});
			return { data: newSubject };
		} catch (error) {
			return new InternalServerErrorException();
		}
	}
}
