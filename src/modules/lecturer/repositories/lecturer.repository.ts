import { Injectable } from '@nestjs/common';
import { Lecturer } from '@prisma/client';
import { UpdateLecturerDto } from 'src/models';
import { PrismaService } from 'src/modules/database/services';

@Injectable()
export class LecturerRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findById(id: string): Promise<Lecturer | null> {
		return await this.prisma.lecturer.findFirst({ where: { id_lecturer: id } });
	}

	async findByUserId(id: string): Promise<Lecturer | null> {
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
}
