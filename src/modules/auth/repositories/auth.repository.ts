import { PrismaService } from '../../database/services';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findUserByUsername(username: string) {
		return await this.prisma.user.findFirst({ where: { username } });
	}
}
