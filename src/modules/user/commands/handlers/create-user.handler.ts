import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../implements';
import { genSalt, hash } from 'bcryptjs';
import { UserRepository } from '../../repositories/user.repository';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
	constructor(private readonly userRepository: UserRepository) {}

	async execute(command: CreateUserCommand): Promise<any> {
		const { createUserDto } = command;
		const { password } = createUserDto;

		const salt = await genSalt();
		const hashedPassword = await hash(password, salt);

		return this.userRepository.create({
			...createUserDto,
			salt,
			password: hashedPassword,
		});
	}
}
