export * from './createTrainingProgram.handler';

import { CreateTrainingProgramHandler } from './createTrainingProgram.handler';
import { UpdateTrainingProgramHandler } from './updateTrainingProgram.handler';

export const CommandHandlers = [
	CreateTrainingProgramHandler,
	UpdateTrainingProgramHandler,
];
