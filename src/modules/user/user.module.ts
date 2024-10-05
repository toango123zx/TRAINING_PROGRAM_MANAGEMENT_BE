import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './user.controller';
import { PrismaService } from '../database/services';
import { CqrsModule } from '@nestjs/cqrs';
import { UserCommandHandlers } from './commands/handlers';

@Module({
	imports: [CqrsModule],
	controllers: [UserController],
	providers: [UserRepository, PrismaService, ...UserCommandHandlers],
})
export class UserModule {}
