import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/modules/database/services';

@Injectable()
export class RoleRepository {
	constructor(private readonly prisma: PrismaService) {}

	async getAll(): Promise<Role[]> {
		return await this.prisma.role.findMany();
	}

	async getById(id_role: string): Promise<Role> {
		return await this.prisma.role.findFirst({ where: { id_role } });
	}
}
