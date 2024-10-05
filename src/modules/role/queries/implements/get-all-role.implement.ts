import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../../repositories/role.repository';

@Injectable()
export class GetAllRoleService {
	constructor(private readonly roleRepository: RoleRepository) {}

	async execute(): Promise<any> {
		return this.roleRepository.getAll();
	}
}
