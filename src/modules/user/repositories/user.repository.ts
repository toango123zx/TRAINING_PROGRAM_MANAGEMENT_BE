import { User } from '@prisma/client';
import { PrismaService } from '../../database/services';
import { Injectable, NotFoundException } from '@nestjs/common';
import { LecturerRepository } from 'src/modules/lecturer/repositories/lecturer.repository';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserRepository {
	constructor(
		private readonly prisma: PrismaService,
		private readonly lecturerRepository: LecturerRepository,
	) {}

	async getById(id: string): Promise<User> {
		return await this.prisma.user.findFirst({ where: { id_user: id } });
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

		const user = await this.getById(id);
		if (!user) return new NotFoundException();

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
}
