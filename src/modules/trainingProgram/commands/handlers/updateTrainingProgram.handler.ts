import { HttpException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { NotFoundException, InternalServerErrorException } from 'src/exceptions';
import { TrainingProgramDto } from 'src/models';

import { UpdateTrainingProgramCommand } from '../implements';
import { TrainingProgramRepository } from '../../repositories/trainingProgram.repository';

@CommandHandler(UpdateTrainingProgramCommand)
export class UpdateTrainingProgramHandler
	implements ICommandHandler<UpdateTrainingProgramCommand>
{
	constructor(
		private readonly trainingProgramRepository: TrainingProgramRepository,
	) {}
	async execute(
		command: UpdateTrainingProgramCommand,
	): Promise<TrainingProgramDto | HttpException> {
		try {
			const trainingProgram = await this.trainingProgramRepository.findById(
				command.id,
			);
			if (!trainingProgram) {
				return new NotFoundException();
			}

			await this.trainingProgramRepository.updateTrainingProgram(
				command.id,
				command.updateTrainingProgramDto,
			);
			return trainingProgram;
		} catch (error) {
			return new InternalServerErrorException();
		}
	}
}
