import { HttpException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { HttpResponseBodySuccessDto } from 'src/common/dtos';
import {
	ConflictException,
	InternalServerErrorException,
	NotFoundException,
} from 'src/exceptions';
import { TrainingProgramEntity } from 'src/models';

import { PrismaClientKnownRequestError } from 'src/modules/database/services';
import { SubjectRepository } from 'src/modules/subject/repositories/subject.repository';

import { AssginSubjectInTrainingProgramCommand } from '../implements';
import { TrainingProgramRepository } from '../../repositories/trainingProgram.repository';

@CommandHandler(AssginSubjectInTrainingProgramCommand)
export class AssginSubjectInTrainingProgramHandler
	implements ICommandHandler<AssginSubjectInTrainingProgramCommand>
{
	constructor(
		private readonly trainingProgramRepository: TrainingProgramRepository,
		private readonly subjectRepository: SubjectRepository,
	) {}
	async execute(
		command: AssginSubjectInTrainingProgramCommand,
	): Promise<HttpResponseBodySuccessDto<TrainingProgramEntity> | HttpException> {
		try {
			const trainingProgram = await this.trainingProgramRepository.findById(
				command.trainingProgramId,
			);
			if (!trainingProgram) {
				return new NotFoundException();
			}

			const subject = await this.subjectRepository.findById(command.subjectId);
			if (!subject) {
				return new NotFoundException();
			}

			const newTrainingProgram =
				await this.trainingProgramRepository.assignSubjectInTrainingProgram(
					command.trainingProgramId,
					command.subjectId,
					command.semester,
				);
			return { data: newTrainingProgram };
		} catch (error) {
			if (
				error instanceof PrismaClientKnownRequestError &&
				error.code === 'P2025'
			) {
				return new ConflictException();
			}
			return new InternalServerErrorException();
		}
	}
}
