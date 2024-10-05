import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { roleSeedData } from './role.data';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeedService implements OnModuleInit {
	constructor(private readonly prisma: PrismaService) {}

	async onModuleInit() {
		const roles = await this.prisma.role.findMany();

		if (roles.length === 0) {
			await this.prisma.role.createMany({ data: roleSeedData });
		}

		const adminAccount = await this.prisma.user.findFirst({});
		if (!adminAccount) {
			const role = await this.prisma.role.findFirst({
				where: { name: 'ADMIN' },
			});
			const salt = await bcrypt.genSalt();
			const password = await bcrypt.hash('123456a@A', salt);
			await this.prisma.user.create({
				data: {
					username: 'admin',
					password,
					name: 'admin',
					id_role: role.id_role,
					email: '',
					gender: true,
					phone_number: '',
					date_of_birth: '2002-01-01T00:00:00Z',
					address: '',
					salt,
				},
			});
		}
	}
}
