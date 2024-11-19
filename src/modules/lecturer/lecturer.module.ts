import { Module } from '@nestjs/common';
import { PrismaService } from '../database/services';
import { LecturerRepository } from './repositories/lecturer.repository';
import { LecturerController } from './lecturer.controller';
import { LecturerQueryHandlers } from './queries/handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { LecturerCommandHanlders } from './commands/handlers';

@Module({
	imports: [CqrsModule],
	controllers: [LecturerController],
	providers: [
		PrismaService,
		LecturerRepository,
		...LecturerQueryHandlers,
		...LecturerCommandHanlders,
	],
	exports: [LecturerRepository],
})
export class LecturerModule {}
