import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DatabaseModule } from '../database/database.module';

import { TrainingProgramController } from './trainingProgram.controller';

import { SubjectModule } from '../subject/subject.module';

import { SubjectRepository } from '../subject/repositories/subject.repository';

import { QueryHandlers } from './queries/handlers';
import { CommandHandlers } from './commands/handlers';
import { TrainingProgramRepository } from './repositories/trainingProgram.repository';

@Module({
	imports: [CqrsModule, DatabaseModule, SubjectModule],
	controllers: [TrainingProgramController],
	providers: [
		...QueryHandlers,
		...CommandHandlers,
		TrainingProgramRepository,
		SubjectRepository,
	],
	exports: [TrainingProgramRepository],
})
export class TrainingProgramModule {}
