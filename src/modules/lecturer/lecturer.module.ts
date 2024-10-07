import { Module } from '@nestjs/common';
import { PrismaService } from '../database/services';
import { LecturerRepository } from './repositories/lecturer.repository';

@Module({
	imports: [],
	providers: [PrismaService, LecturerRepository],
	exports: [LecturerRepository],
})
export class LecturerModule {}
