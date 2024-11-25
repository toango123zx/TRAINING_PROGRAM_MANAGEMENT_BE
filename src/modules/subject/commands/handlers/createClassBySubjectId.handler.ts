import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatClassBySubjectIdCommand } from '../implements';
import { HttpResponseBodySuccessDto } from 'src/common/dtos';
import { ClassEntity, CreateClassDto } from 'src/models';
import { HttpException } from '@nestjs/common/exceptions';
import { InternalServerErrorException, NotFoundException } from 'src/exceptions';

import { SubjectRepository } from '../../repositories/subject.repository';
import { ClassRepository } from 'src/modules/class/repositories/class.repository';
import { LecturerRepository } from 'src/modules/lecturer/repositories/lecturer.repository';

@CommandHandler(CreatClassBySubjectIdCommand)
export class CreateClassBySubjectIdHandler
	implements ICommandHandler<CreatClassBySubjectIdCommand>
{
	constructor(
		private readonly subjectRepository: SubjectRepository,
		private readonly lecturerRepository: LecturerRepository,
		private readonly classRepository: ClassRepository,
	) {}
	async execute(
		command: CreatClassBySubjectIdCommand,
	): Promise<HttpResponseBodySuccessDto<ClassEntity> | HttpException> {
		try {
			const subject = await this.subjectRepository.findById(command.subjectId);
			if (!subject) {
				return new NotFoundException('Subject');
			}

			const lecturer = await this.lecturerRepository.findByLecturerId(
				command.createClassBySubjecIdDto.id_lecturer,
			);

			if (!lecturer) {
				return new NotFoundException('Lecturer');
			}

			const classDatra: CreateClassDto = {
				name: command.createClassBySubjecIdDto.name,
				quantity: Number(command.createClassBySubjecIdDto.quantity),
				lecturer: {
					connect: {
						id_lecturer: command.createClassBySubjecIdDto.id_lecturer,
					},
				},
				subject: {
					connect: {
						id_subject: command.subjectId,
					},
				},
			};

			const createClassData =
				await this.classRepository.createClassBySubjectId(classDatra);

			return { data: createClassData };
		} catch (error) {
			return new InternalServerErrorException();
		}
	}
}
