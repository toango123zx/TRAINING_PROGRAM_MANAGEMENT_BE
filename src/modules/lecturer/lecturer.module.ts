import { Module } from '@nestjs/common';
import { PrismaService } from '../database/services';
import { LecturerRepository } from './repositories/lecturer.repository';
import { LecturerController } from './lecturer.controller';
import { LecturerQueryHandler } from './queries/handlers';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
	imports: [CqrsModule],
	controllers: [LecturerController],
	providers: [PrismaService, LecturerRepository, ...LecturerQueryHandler],
	exports: [LecturerRepository],
})
export class LecturerModule {}
