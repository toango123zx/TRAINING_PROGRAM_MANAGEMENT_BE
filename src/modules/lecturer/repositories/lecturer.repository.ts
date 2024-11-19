import { Injectable, NotFoundException } from '@nestjs/common';
import { Lecturer } from '@prisma/client';
import { SafeUserDto } from 'src/common/dtos/safe-user.dto';
import { Role } from 'src/common/enums';
import { UpdateLecturerDto } from 'src/models';
import { PrismaService } from 'src/modules/database/services';
import { UpdateCurrentLecturerDto } from '../dto';

@Injectable()
export class LecturerRepository {
	lecturerRole: { id_role: string; name: string; description: string };

	constructor(private readonly prisma: PrismaService) {
		prisma.role
			.findFirst({ where: { name: Role.Lecturer } })
			.then((data) => (this.lecturerRole = data));
	}

	async findByUserId(id: string): Promise<any> {
		const lecturer = await this.prisma.lecturer.findFirst({
			where: { id_user: id },
		});
		const user = await this.prisma.user.findFirst({
			where: { id_user: lecturer.id_user },
		});
		delete lecturer.id_user;
		return { ...new SafeUserDto(user), lecturer: lecturer };
	}

	async findByLecturerId(id: string): Promise<any> {
		const lecturer = await this.prisma.lecturer.findFirst({
			where: { id_lecturer: id },
		});
		const user = await this.prisma.user.findFirst({
			where: { id_user: lecturer.id_user },
		});
		delete lecturer.id_user;
		return { ...new SafeUserDto(user), lecturer: lecturer };
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

	async getClassesByLecturerId(id: string) {
		const user = await this.findByUserId(id);
		if (!user) return new NotFoundException();

		return await this.prisma.class.findMany({
			where: { id_lecturer: user.lecturer.id_lecturer, status: 'activate' },
			include: { subject: true },
		});
	}

	async updateLecturer(id: string, dto: UpdateCurrentLecturerDto) {
		const data = Object.fromEntries(
			Object.entries(dto).filter(([, value]) => !!value),
		);

		let lecturerData = { ...data.lecturer };
		if (lecturerData) {
			lecturerData = Object.fromEntries(
				Object.entries(lecturerData).filter(([, value]) => !!value),
			);
			await this.prisma.lecturer.update({
				where: { id_user: id },
				data: lecturerData,
			});
		}
		delete data.lecturer;
		await this.prisma.user.update({ where: { id_user: id }, data });
		return await this.findByUserId(id);
	}
}
