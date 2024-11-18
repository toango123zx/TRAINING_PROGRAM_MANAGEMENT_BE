import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProfileUserQuery } from '../implements';
import { InternalServerErrorException } from '@nestjs/common';
import { AuthRepository } from '../../repositories/auth.repository';
import { Role } from '../../../../common/enums';
import { LecturerRepository } from 'src/modules/lecturer/repositories/lecturer.repository';
import { SafeUserDto } from 'src/common/dtos/safe-user.dto';

@QueryHandler(ProfileUserQuery)
export class ProfileUserHandler implements IQueryHandler<ProfileUserQuery> {
	constructor(
		private readonly authRepository: AuthRepository,
		private readonly lecturerRepository: LecturerRepository,
	) {}

	async execute(query: ProfileUserQuery): Promise<any> {
		const { payload } = query;
		const { username } = payload;

		const user = await this.authRepository.findUserByUsername(username);
		if (!user) throw new InternalServerErrorException();

		const safeUserData = new SafeUserDto(user);
		if (payload.role !== Role.Lecturer) return safeUserData;

		const lecturerData = await this.lecturerRepository.findById(user.id_user);
		return { ...safeUserData, lecturer: lecturerData.lecturer };
	}
}
