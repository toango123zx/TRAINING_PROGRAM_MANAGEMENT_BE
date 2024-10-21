import { HttpException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { HttpResponseBodySuccessDto } from 'src/common/dtos';
import { InternalServerErrorException, NotFoundException } from 'src/exceptions';
import { TrainingProgramEntity } from 'src/models';

import { PrismaClientKnownRequestError } from 'src/modules/database/services';

import { RemoveSubjectTrainingProgramCommand } from '../implements';
import { TrainingProgramRepository } from '../../repositories/trainingProgram.repository';

@CommandHandler(RemoveSubjectTrainingProgramCommand)
export class RemoveSubjectTrainingProgramHandler
	implements ICommandHandler<RemoveSubjectTrainingProgramCommand>
{
	constructor(
		private readonly trainingProgramRepository: TrainingProgramRepository,
	) {}

	async execute(
		command: RemoveSubjectTrainingProgramCommand,
	): Promise<HttpResponseBodySuccessDto<TrainingProgramEntity> | HttpException> {
		try {
			const trainingProgram = await this.trainingProgramRepository.findById(
				command.trainingProgramId,
			);
			if (!trainingProgram) {
				return new NotFoundException('trainingProgramId');
			}

			const newTrainingProgram =
				await this.trainingProgramRepository.removeSubjectInTrainingProgram(
					command.trainingProgramId,
					command.infoSubjectId,
				);

			return { data: newTrainingProgram };
		} catch (error) {
			if (
				error instanceof PrismaClientKnownRequestError &&
				error.code === 'P2025'
			) {
				return new NotFoundException('infoSubjectId');
			}

			return new InternalServerErrorException();
		}
	}
}
