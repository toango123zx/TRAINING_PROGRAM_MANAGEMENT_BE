import { HttpException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { InternalServerErrorException } from 'src/exceptions';

import { DeleteTrainingProgramCommand } from '../implements';
import { TrainingProgramRepository } from '../../repositories/trainingProgram.repository';

@CommandHandler(DeleteTrainingProgramCommand)
export class DeleteTrainingProgramHandler
	implements ICommandHandler<DeleteTrainingProgramCommand>
{
	constructor(
		private readonly trainingProgramRepository: TrainingProgramRepository,
	) {}
	async execute(command: DeleteTrainingProgramCommand): Promise<HttpException> {
		try {
			const trainingProgram = await this.trainingProgramRepository.findById(
				command.id,
			);
			if (!trainingProgram) {
				return new NotFoundException();
			}

			await this.trainingProgramRepository.deleteTrainingProgram(command.id);
			return;
		} catch (error) {
			return new InternalServerErrorException();
		}
	}
}
