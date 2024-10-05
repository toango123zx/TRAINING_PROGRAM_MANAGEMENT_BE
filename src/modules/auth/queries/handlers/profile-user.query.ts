import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProfileUserQuery } from '../implements';
import { InternalServerErrorException } from '@nestjs/common';
import { AuthRepository } from '../../repositories/auth.repository';
import { SafeUserDto } from '../../dto';

@QueryHandler(ProfileUserQuery)
export class ProfileUserHandler implements IQueryHandler<ProfileUserQuery> {
	constructor(private readonly authRepository: AuthRepository) {}

	async execute(query: ProfileUserQuery): Promise<any> {
		const { payload } = query;
		const { username } = payload;

		const user = await this.authRepository.findUserByUsername(username);
		if (!user) throw new InternalServerErrorException();

		return new SafeUserDto(user);
	}
}
