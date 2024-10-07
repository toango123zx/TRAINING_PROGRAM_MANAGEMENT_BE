import { Module } from '@nestjs/common';
import { PrismaService } from '../database/services';
import { CqrsModule } from '@nestjs/cqrs';
import { RoleRepository } from './repositories/role.repository';
import { RoleController } from './role.controller';
import { GetAllRoleHandler } from './queries/handlers/get-all-role.handler';

const ExternalProviders = [GetAllRoleHandler];

@Module({
	imports: [CqrsModule],
	controllers: [RoleController],
	providers: [RoleRepository, PrismaService, ...ExternalProviders],
	exports: [RoleRepository],
})
export class RoleModule {}
