import { Injectable } from '@nestjs/common';

import { SubjectEntity } from 'src/models';
import { PrismaService } from 'src/modules/database/services';

@Injectable()
export class SubjectRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async findAll(
		skip: number,
		take: number,
	): Promise<[SubjectEntity[], number] | null> {
		try {
			const [subjects, totalRecords] = await Promise.all([
				this.prismaService.subject.findMany({
					where: {
						status: 'activate',
					},
					skip: skip,
					take: take,
				}),
				this.prismaService.subject.count({
					where: {
						status: 'activate',
					},
				}),
			]);
			return [subjects, totalRecords];
		} catch (error) {
			throw error;
		}
	}

	async findById(subjectId: string): Promise<SubjectEntity | null> {
		try {
			return await this.prismaService.subject.findFirst({
				where: {
					id_subject: subjectId,
					status: 'activate',
				},
			});
		} catch (error) {
			throw error;
		}
	}

	async findByName(
		subjectName: string,
		skip: number,
		take: number,
	): Promise<[SubjectEntity[], number] | null> {
		try {
			const [subjects, totalRecords] = await Promise.all([
				this.prismaService.subject.findMany({
					where: {
						name: subjectName,
						status: 'activate',
					},
					skip: skip,
					take: take,
				}),
				this.prismaService.subject.count({
					where: {
						name: subjectName,
						status: 'activate',
					},
				}),
			]);
			return [subjects, totalRecords];
		} catch (error) {
			throw error;
		}
	}
}
