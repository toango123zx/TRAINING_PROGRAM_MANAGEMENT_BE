import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from './auth.controller';
import { PrismaService } from '../database/services';
import { AuthRepository } from './repositories/auth.repository';
import { AuthCommandHandlers } from './commands/handlers';

@Module({
	imports: [CqrsModule],
	controllers: [AuthController],
	providers: [PrismaService, AuthRepository, ...AuthCommandHandlers],
})
export class AuthModule {}
