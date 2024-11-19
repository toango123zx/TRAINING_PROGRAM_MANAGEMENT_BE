import { Module } from '@nestjs/common';
import { PrismaService } from '../database/services';
import { CqrsModule } from '@nestjs/cqrs';
import { StudentController } from './student.controller';
import { StudentRepository } from './repositories';
import { StudentQueryHandlers } from './queries/handlers';
import { StudentCommandHandlers } from './commands/handlers';

@Module({
	imports: [CqrsModule],
	controllers: [StudentController],
	providers: [
		StudentRepository,
		PrismaService,
		...StudentQueryHandlers,
		...StudentCommandHandlers,
	],
})
export class StudentModule {}
