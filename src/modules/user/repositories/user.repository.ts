import { User } from '@prisma/client';
import { PrismaService } from '../../database/services';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { LecturerRepository } from 'src/modules/lecturer/repositories/lecturer.repository';
import { UpdateUserDto } from '../dto/update-user.dto';
import { SafeUserDto } from 'src/common/dtos/safe-user.dto';
import { Role } from 'src/common/enums';
import { CloudinaryService } from 'src/modules/cloudinary/cloudinary.service';
import { hash } from 'bcryptjs';

@Injectable()
export class UserRepository {
	constructor(
		private readonly prisma: PrismaService,
		private readonly lecturerRepository: LecturerRepository,
		private readonly cloudinaryService: CloudinaryService,
	) {}

	async getById(id: string): Promise<any> {
		const user = await this.prisma.user.findFirst({
			where: { id_user: id },
			include: { Lecturer: true },
		});
		const safeUser = { ...new SafeUserDto(user), lecturer: user.Lecturer };
		if (!safeUser.lecturer) delete safeUser.lecturer;
		return safeUser;
	}

	async findAll(skip: number, take: number): Promise<[SafeUserDto[], number]> {
		try {
			const [users, totalRecords] = await Promise.all([
				this.prisma.user.findMany({
					where: {
						status: 'activate',
					},
					skip: skip,
					take: take,
				}),
				this.prisma.user.count({
					where: {
						status: 'activate',
					},
				}),
			]);
			return [users.map((user) => new SafeUserDto(user)), totalRecords];
		} catch (error) {
			throw error;
		}
	}

	async getAllStudent(
		skip: number,
		take: number,
	): Promise<[SafeUserDto[], number]> {
		try {
			const studentRole = await this.prisma.role.findFirst({
				where: {
					name: Role.Student,
				},
			});
			const [users, totalRecords] = await Promise.all([
				this.prisma.user.findMany({
					where: {
						status: 'activate',
						id_role: studentRole.id_role,
					},
					skip: skip,
					take: take,
				}),
				this.prisma.user.count({
					where: {
						status: 'activate',
						id_role: studentRole.id_role,
					},
				}),
			]);
			return [users.map((user) => new SafeUserDto(user)), totalRecords];
		} catch (error) {
			throw error;
		}
	}

	async create(user: any): Promise<User> {
		return await this.prisma.user.create({
			data: {
				...user,
			},
		});
	}

	async updateUser(id: string, data: UpdateUserDto): Promise<User> {
		return await this.prisma.user.update({ where: { id_user: id }, data });
	}

	async updateLecturer(id: string, data: UpdateUserDto): Promise<any> {
		const { lecturer, ...userData } = data;

		const newLecturer = await this.lecturerRepository.updateByUserId(
			id,
			lecturer,
		);
		const newUser = await this.prisma.user.update({
			where: { id_user: id },
			data: userData,
		});

		return { ...newUser, lecturer: newLecturer };
	}

	async updateUserPhoto(id: string, file: Express.Multer.File) {
		const user = await this.prisma.user.findFirst({ where: { id_user: id } });
		if (!user) throw new NotFoundException();

		const response = await this.cloudinaryService.uploadImage(file);
		return await this.prisma.user.update({
			data: { photo_url: response.url },
			where: { id_user: id },
		});
	}

	async updateUserPassword(id: string, oldPassword: string, newPassword: string) {
		const user = await this.prisma.user.findFirst({ where: { id_user: id } });
		if (!user) throw new NotFoundException();
		const { salt, password } = user;
		if (password.trim() !== (await hash(oldPassword, salt)).trim())
			throw new BadRequestException('Old password mismatched');

		return await this.prisma.user.update({
			where: { id_user: id },
			data: {
				password: await hash(newPassword, salt),
			},
		});
	}
}
