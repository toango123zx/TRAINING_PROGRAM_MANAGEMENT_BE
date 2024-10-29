import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/services';

@Injectable()
export class ClassRepository {
	constructor(private readonly prisma: PrismaService) {}

	async getAllClass(skip: number, take: number): Promise<[any[], number]> {
		try {
			const [classes, totalRecords] = await Promise.all([
				this.prisma.class.findMany({
					where: { status: 'activate' },
					skip,
					take,
				}),
				this.prisma.class.count({ where: { status: 'activate' } }),
			]);
			return [classes, totalRecords];
		} catch (err) {
			throw err;
		}
	}
}
