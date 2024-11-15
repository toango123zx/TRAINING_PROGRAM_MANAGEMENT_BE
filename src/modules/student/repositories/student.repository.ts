import { Injectable } from '@nestjs/common';
import { Role } from 'src/common/enums';
import { PrismaService } from 'src/modules/database/services';
import { StudentDto } from '../dtos';
import { SafeUserDto } from 'src/common/dtos/safe-user.dto';

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

	async findAll(skip: number, take: number): Promise<[StudentDto[], number]> {
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
			return [users.map((user) => new StudentDto(user)), totalRecords];
		} catch (error) {
			throw error;
		}
	}

	async findById(id: string): Promise<any | null> {
		const student = await this.prisma.user.findFirst({
			where: { id_user: id, id_role: this.studentRole.id_role },
		});
		const program = await this.prisma.training_Program.findFirst({
			where: { id_training_program: student.id_program },
		});
		return {
			...new SafeUserDto(student),
			program: program,
		};
	}
}
