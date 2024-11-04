import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByIdQuery } from '../implements';
import { UserRepository } from '../../repositories/user.repository';
import { HttpResponseBodySuccessDto } from 'src/common/dtos';
import { HttpException } from '@nestjs/common';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
	constructor(private readonly userRepository: UserRepository) {}
	async execute(
		query: GetUserByIdQuery,
	): Promise<HttpResponseBodySuccessDto<any> | HttpException> {
		return this.userRepository.getById(query.id);
	}
}
