import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/modules/database/services';

@Injectable()
export class RoleRepository {
	constructor(private readonly prisma: PrismaService) {}

	async getAll(): Promise<Role[]> {
		return await this.prisma.role.findMany();
	}
}
