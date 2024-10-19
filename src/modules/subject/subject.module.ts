import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DatabaseModule } from '../database/database.module';

import { SubjectController } from './subject.controller';

import { QueryHandlers } from './queries/handlers';
import { CommandHandlers } from './commands/handlers';
import { SubjectRepository } from './repositories/subject.repository';

@Module({
	imports: [CqrsModule, DatabaseModule],
	controllers: [SubjectController],
	providers: [...QueryHandlers, ...CommandHandlers, SubjectRepository],
	exports: [SubjectRepository],
})
export class SubjectModule {}
