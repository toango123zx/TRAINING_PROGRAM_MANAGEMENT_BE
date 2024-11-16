//Tương tác dữ liệu với database bằng prisma
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/services';

// import { GetHealthCheckQuery } from "../implements";

// @QueryHandler(GetHealthCheckQuery)
@Injectable()
export class HealthCheckRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async getConection() {
		try {
			await this.prismaService.$queryRaw`SELECT 1`;
			return true;
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log(
				'🚀 ~ file: index.ts:16 ~ HealthCheckRepository ~ getConection ~ error:',
				error,
			);
			return false;
		}
	}
}
