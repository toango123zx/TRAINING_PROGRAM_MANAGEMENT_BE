import { Injectable } from '@nestjs/common';
import { SafeUserDto } from 'src/common/dtos/safe-user.dto';
import { Role } from 'src/common/enums';
import { PrismaService } from 'src/modules/database/services';

@Injectable()
export class StudentRepository {
	studentRole: { id_role: string; name: string; description: string };

	constructor(private readonly prisma: PrismaService) {
		this.prisma.role
			.findFirst({
				where: { name: Role.Student },
			})
			.then((data) => {
				this.studentRole = data;
			});
	}

	async findAll(skip: number, take: number): Promise<[SafeUserDto[], number]> {
		try {
			const [users, totalRecords] = await Promise.all([
				this.prisma.user.findMany({
					where: {
						status: 'activate',
						id_role: this.studentRole.id_role,
					},
					skip: skip,
					take: take,
				}),
				this.prisma.user.count({
					where: {
						status: 'activate',
						id_role: this.studentRole.id_role,
					},
				}),
			]);
			return [users.map((user) => new SafeUserDto(user)), totalRecords];
		} catch (error) {
			throw error;
		}
	}

	async findById(id: string): Promise<SafeUserDto | null> {
		return new SafeUserDto(
			await this.prisma.user.findFirst({
				where: { id_user: id, id_role: this.studentRole.id_role },
			}),
		);
	}
}
