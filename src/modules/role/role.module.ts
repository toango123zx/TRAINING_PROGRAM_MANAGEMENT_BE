import { Module } from '@nestjs/common';
import { PrismaService } from '../database/services';
import { CqrsModule } from '@nestjs/cqrs';
import { RoleRepository } from './repositories/role.repository';
import { RoleController } from './role.controller';
import { GetAllRoleService } from './queries/implements/get-all-role.implement';
import { GetAllRoleHandler } from './queries/handlers/get-all-role.handler';

const ExternalProviders = [GetAllRoleHandler, GetAllRoleService];

@Module({
	imports: [CqrsModule],
	controllers: [RoleController],
	providers: [RoleRepository, PrismaService, ...ExternalProviders],
	exports: [RoleRepository],
})
export class RoleModule {}
