import { Module } from '@nestjs/common';
import { PrismaService } from './services';

// const Services = Object.values(PrismaService);

@Module({
  imports: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
