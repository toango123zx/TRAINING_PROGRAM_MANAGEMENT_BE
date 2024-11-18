import { Injectable } from '@nestjs/common';
import { Lecturer } from '@prisma/client';
import { SafeUserDto } from 'src/common/dtos/safe-user.dto';
import { Role } from 'src/common/enums';
import { UpdateLecturerDto } from 'src/models';
import { PrismaService } from 'src/modules/database/services';

@Injectable()
export class LecturerRepository {
	lecturerRole: { id_role: string; name: string; description: string };

	constructor(private readonly prisma: PrismaService) {
		prisma.role
			.findFirst({ where: { name: Role.Lecturer } })
			.then((data) => (this.lecturerRole = data));
	}

	async findById(id: string): Promise<any> {
		const lecturer = await this.prisma.lecturer.findFirst({
			where: { OR: [{ id_user: id }, { id_lecturer: id }] },
		});
		const user = await this.prisma.user.findFirst({
			where: { id_user: lecturer.id_user },
		});
		delete lecturer.id_user;
		return { ...new SafeUserDto(user), lecturer: lecturer };
	}

	async findByLecturerId(id: string): Promise<Lecturer | null> {
		return await this.prisma.lecturer.findFirst({ where: { id_user: id } });
	}

	async updateByUserId(
		id_user: string,
		data: UpdateLecturerDto,
	): Promise<Lecturer> {
		return await this.prisma.lecturer.update({ where: { id_user }, data });
	}

	async createLecturer(data: any): Promise<Lecturer> {
		return await this.prisma.lecturer.create({ data });
	}

	async getAllLecturer(skip: number, take: number): Promise<[any[], number]> {
		try {
			const [users, totalRecords] = await Promise.all([
				this.prisma.user.findMany({
					where: {
						status: 'activate',
						id_role: this.lecturerRole.id_role,
					},
					skip: skip,
					take: take,
					include: { Lecturer: true },
				}),
				this.prisma.user.count({
					where: {
						status: 'activate',
						id_role: this.lecturerRole.id_role,
					},
				}),
			]);
			return [
				users.map((user) => ({
					...new SafeUserDto(user),
					lecturer: user.Lecturer,
				})),
				totalRecords,
			];
		} catch (error) {
			throw error;
		}
	}
}
