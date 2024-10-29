import { Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '../database/database.module';
import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';
import { ClassRepository } from './repositories/class.repository';

@Module({
	imports: [CqrsModule, DatabaseModule],
	controllers: [ClassController],
	providers: [...CommandHandlers, ...QueryHandlers, ClassRepository],
})
export class ClassModule {}
