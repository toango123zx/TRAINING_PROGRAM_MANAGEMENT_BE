import { Module } from '@nestjs/common';
import { PrismaService } from '../database/services';
import { CqrsModule } from '@nestjs/cqrs';
import { StudentController } from './student.controller';
import { StudentRepository } from './repositories';
import { StudentQueryHandler } from './queries/handlers';

@Module({
	imports: [CqrsModule],
	controllers: [StudentController],
	providers: [StudentRepository, PrismaService, ...StudentQueryHandler],
})
export class StudentModule {}
