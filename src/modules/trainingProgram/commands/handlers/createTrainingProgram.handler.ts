import { HttpException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { InternalServerErrorException } from 'src/exceptions';
import { TrainingProgramDto } from 'src/models';

import { CreateTrainingProgramCommand } from '../implements';
import { TrainingProgramRepository } from '../../repositories/trainingProgram.repository';

@CommandHandler(CreateTrainingProgramCommand)
export class CreateTrainingProgramHandler
	implements ICommandHandler<CreateTrainingProgramCommand>
{
	constructor(
		private readonly trainingProgramRepository: TrainingProgramRepository,
	) {}
	async execute(
		command: CreateTrainingProgramCommand,
	): Promise<TrainingProgramDto | HttpException> {
		try {
			return await this.trainingProgramRepository.createTrainingProgram(
				command.createTrainingProgramDto,
			);
		} catch (error) {
			return new InternalServerErrorException();
		}
	}
}
