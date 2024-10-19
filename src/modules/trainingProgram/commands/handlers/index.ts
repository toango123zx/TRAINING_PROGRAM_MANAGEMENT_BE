export * from './createTrainingProgram.handler';

import { AssginSubjectInTrainingProgramHandler } from './assginSubjectInTrainingProgram.handler';
import { CreateTrainingProgramHandler } from './createTrainingProgram.handler';
import { DeleteTrainingProgramHandler } from './deleteTrainingProgram.handler';
import { UpdateTrainingProgramHandler } from './updateTrainingProgram.handler';

export const CommandHandlers = [
	AssginSubjectInTrainingProgramHandler,
	CreateTrainingProgramHandler,
	UpdateTrainingProgramHandler,
	DeleteTrainingProgramHandler,
];
