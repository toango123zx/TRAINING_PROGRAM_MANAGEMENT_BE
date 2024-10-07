import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Role } from '@prisma/client';
import { GetAllRoleQuery } from '../implements/get-all-role.query';
import { RoleRepository } from '../../repositories/role.repository';

@QueryHandler(GetAllRoleQuery)
export class GetAllRoleHandler implements IQueryHandler<GetAllRoleQuery> {
	constructor(private readonly roleRepository: RoleRepository) {}

	async execute(): Promise<Role[] | null> {
		return this.roleRepository.getAll();
	}
}
