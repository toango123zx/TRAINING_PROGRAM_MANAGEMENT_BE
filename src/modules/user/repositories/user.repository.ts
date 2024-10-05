import { User } from '@prisma/client';
import { PrismaService } from '../../database/services';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(user: any): Promise<User> {
		return await this.prisma.user.create({
			data: {
				...user,
			},
		});
	}
}
