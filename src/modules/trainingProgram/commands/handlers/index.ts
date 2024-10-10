export * from './createTrainingProgram.handler';

import { CreateTrainingProgramHandler } from './createTrainingProgram.handler';
import { DeleteTrainingProgramHandler } from './deleteTrainingProgram.handler';
import { UpdateTrainingProgramHandler } from './updateTrainingProgram.handler';

export const CommandHandlers = [
	CreateTrainingProgramHandler,
	UpdateTrainingProgramHandler,
	DeleteTrainingProgramHandler,
];
