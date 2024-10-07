import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { GetAllRoleQuery } from './queries/implements/get-all-role.query';

@ApiTags('Roles')
@Controller('role')
export class RoleController {
	constructor(private readonly queryBus: QueryBus) {}

	@Get('all')
	async getAll(): Promise<any> {
		return this.queryBus.execute(new GetAllRoleQuery());
	}
}
