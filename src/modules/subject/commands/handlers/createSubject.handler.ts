import { HttpException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { HttpResponseBodySuccessDto } from 'src/common/dtos';
import { InternalServerErrorException } from 'src/exceptions';
import { SubjectEntity } from 'src/models';

import { CreateSubjectCommand } from '../implements';
import { SubjectRepository } from '../../repositories/subject.repository';

@CommandHandler(CreateSubjectCommand)
export class CreateSubjectHandler implements ICommandHandler<CreateSubjectCommand> {
	constructor(private readonly subjectRepository: SubjectRepository) {}

	async execute(
		command: CreateSubjectCommand,
	): Promise<HttpResponseBodySuccessDto<SubjectEntity> | HttpException> {
		try {
			const subject = await this.subjectRepository.createSubject(
				command.createSubjectDto,
			);
			return { data: subject };
		} catch (error) {
			throw new InternalServerErrorException();
		}
	}
}
