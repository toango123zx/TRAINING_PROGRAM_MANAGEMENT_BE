import { Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '../database/database.module';
import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';

@Module({
	imports: [CqrsModule, DatabaseModule],
	controllers: [ClassController],
	providers: [...CommandHandlers, ...QueryHandlers],
})
export class ClassModule {}
