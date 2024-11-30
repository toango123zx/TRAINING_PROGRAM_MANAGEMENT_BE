import { Injectable, NotFoundException } from '@nestjs/common';
import { SafeUserDto } from 'src/common/dtos/safe-user.dto';
import { PrismaService } from 'src/modules/database/services';

@Injectable()
export class ClassRepository {
	constructor(private readonly prisma: PrismaService) {}

	async getAllClass(
		skip: number,
		take: number,
		name: string,
	): Promise<[any[], number]> {
		try {
			const [classes, totalRecords] = await Promise.all([
				this.prisma.class.findMany({
					where: {
						status: 'activate',
						name: {
							contains: name.trim().toLowerCase(),
							mode: 'insensitive',
						},
					},
					skip,
					take,
				}),
				this.prisma.class.count({
					where: {
						status: 'activate',
						name: {
							contains: name.trim().toLowerCase(),
							mode: 'insensitive',
						},
					},
				}),
			]);
			return [classes, totalRecords];
		} catch (err) {
			throw err;
		}
	}

	async getStudentByClassId(id: string) {
		try {
			const _class = await this.prisma.class.findFirst({
				where: { id_class: id },
			});
			if (!_class) throw new NotFoundException('Class not found');
			const infos = await this.prisma.info_Class.findMany({
				where: { id_class: id },
				include: { user: true },
			});
			return infos.map((info) => new SafeUserDto(info.user));
		} catch (err) {
			throw err;
		}
	}
}
