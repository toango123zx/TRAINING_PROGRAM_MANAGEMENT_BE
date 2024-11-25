import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SafeUserDto } from 'src/common/dtos/safe-user.dto';
import { ClassEntity, CreateClassDto } from 'src/models';
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

	async enroll(id_user: string, id_class: string) {
		try {
			const _class = await this.prisma.class.findFirst({
				where: { id_class },
				include: { subject: true },
			});
			if (!_class) throw new NotFoundException('Class not found');
			const student = await this.prisma.user.findFirst({ where: { id_user } });
			const info = await this.prisma.info_Subject.findFirst({
				where: {
					id_subject: _class.subject.id_subject,
					id_training_program: student.id_program,
				},
			});
			if (info.semester > student.current_semester)
				throw new BadRequestException('Cannot enroll in this class');
			const enrollment = await this.prisma.info_Class.findFirst({
				where: {
					id_user,
					id_class,
				},
			});
			if (enrollment) throw new BadRequestException('already enrolled');
			if (_class.current_quantity >= _class.quantity)
				throw new BadRequestException('Class full');

			await this.prisma.info_Class.create({
				data: {
					id_user,
					id_class,
				},
			});
			await this.prisma.class.update({
				where: { id_class },
				data: {
					current_quantity: _class.current_quantity + 1,
				},
			});
			return {
				success: true,
				message: 'enrollment completed',
			};
		} catch (err) {
			throw err;
		}
	}

	async cancelEnroll(id_user: string, id_class: string) {
		try {
			const _class = await this.prisma.class.findFirst({
				where: { id_class },
				include: { subject: true },
			});
			if (!_class) throw new NotFoundException('Class not found');
			const enrollment = await this.prisma.info_Class.findFirst({
				where: {
					id_user,
					id_class,
				},
			});
			if (!enrollment) throw new BadRequestException('Not yet enrolled');
			await this.prisma.info_Class.delete({
				where: { id_info_class: enrollment.id_info_class },
			});
			await this.prisma.class.update({
				where: { id_class },
				data: { current_quantity: _class.current_quantity - 1 },
			});
			return { success: true, message: 'Cancel completed' };
		} catch (err) {
			throw err;
		}
	}

	async getClassById(id: string): Promise<ClassEntity> {
		try {
			return await this.prisma.class.findUnique({
				where: { id_class: id },
			});
		} catch (err) {
			throw err;
		}
	}

	async createClassBySubjectId(classData: CreateClassDto): Promise<ClassEntity> {
		try {
			return await this.prisma.class.create({
				data: classData
			});
		} catch (err) {
			throw err;
		}
	}
}
