import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllRoleService } from '../implements/get-all-role.implement';
import { Role } from '@prisma/client';
import { GetAllRoleQuery } from '../get-all-role.query';

@QueryHandler(GetAllRoleQuery)
export class GetAllRoleHandler implements IQueryHandler<GetAllRoleQuery> {
	constructor(private readonly getAllRoleService: GetAllRoleService) {}

	async execute(): Promise<Role[] | null> {
		return this.getAllRoleService.execute();
	}
}
