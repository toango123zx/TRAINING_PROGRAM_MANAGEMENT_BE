import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DatabaseModule } from '../database/database.module';

import { SubjectController } from './subject.controller';

import { SubjectRepository } from './repositories/subject.repository';
import { QueryHandlers } from './queries/handlers';

@Module({
	imports: [CqrsModule, DatabaseModule],
	controllers: [SubjectController],
	providers: [...QueryHandlers, SubjectRepository],
	exports: [],
})
export class SubjectModule {}
