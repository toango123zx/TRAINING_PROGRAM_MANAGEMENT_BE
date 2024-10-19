import { HttpException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';

import { HttpResponseBodySuccessDto } from 'src/common/dtos';
import { InternalServerErrorException, NotFoundException } from 'src/exceptions';
import { SubjectEntity } from 'src/models';

import { UpdateSubjectCommand } from '../implements';
import { SubjectRepository } from '../../repositories/subject.repository';

export class UpdateSubjectHandler implements ICommandHandler<UpdateSubjectCommand> {
	constructor(public readonly subjectRepository: SubjectRepository) {}
	async execute(
		command: UpdateSubjectCommand,
	): Promise<HttpResponseBodySuccessDto<SubjectEntity> | HttpException> {
		try {
			const subject = await this.subjectRepository.findById(command.id);
			if (!subject) {
				return new NotFoundException();
			}

			const newSubject = await this.subjectRepository.updateSubject(
				command.id,
				command.updateSubjectDto,
			);
			return { data: newSubject };
		} catch (error) {
			return new InternalServerErrorException();
		}
	}
}
