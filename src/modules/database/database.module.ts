import { Module } from '@nestjs/common';
import { PrismaService } from './services';
import { SeedService } from './seed/seed.service';

// const Services = Object.values(PrismaService);

@Module({
	imports: [],
	providers: [PrismaService, SeedService],
	exports: [PrismaService],
})
export class DatabaseModule {}
