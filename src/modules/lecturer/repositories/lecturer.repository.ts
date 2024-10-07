import { Injectable } from '@nestjs/common';
import { Lecturer } from '@prisma/client';
import { CreateLecturerDto, UpdateLecturerDto } from 'src/models';
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

	// async create(data: CreateLecturerDto): Promise<Lecturer> {
	// 	return await this.prisma.lecturer.create({ data });
	// }

	// async update(data: UpdateLecturerDto): Promise<any> {
	// 	return await this.prisma.lecturer.update({ data });
	// }
}
