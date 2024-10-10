import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DatabaseModule } from '../database/database.module';

import { TrainingProgramController } from './trainingProgram.controller';
import { QueryHandlers } from './queries/handlers';
import { TrainingProgramRepository } from './repositories/trainingProgram.repository';

@Module({
	imports: [CqrsModule, DatabaseModule],
	controllers: [TrainingProgramController],
	providers: [...QueryHandlers, TrainingProgramRepository],
	exports: [TrainingProgramRepository],
})
export class TrainingProgramModule {}
