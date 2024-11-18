import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetLecturerByIdQuery } from '../implements';
import { LecturerRepository } from '../../repositories/lecturer.repository';
import { BadRequestException } from '@nestjs/common';

@QueryHandler(GetLecturerByIdQuery)
export class GetLecturerByIdHandler implements IQueryHandler<GetLecturerByIdQuery> {
	constructor(private readonly lecturerRepository: LecturerRepository) {}

	async execute(query: GetLecturerByIdQuery): Promise<any> {
		const { userId, lecturerId } = query;
		if (!userId && !lecturerId) throw new BadRequestException();
		if (userId) return this.lecturerRepository.findByUserId(userId);
		return this.lecturerRepository.findByLecturerId(lecturerId);
	}
}
