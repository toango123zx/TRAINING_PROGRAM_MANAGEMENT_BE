import { ICommand } from '@nestjs/cqrs';
import { CreateUserDto } from '../../../../models/user/dto';

export class CreateUserCommand implements ICommand {
	constructor(public readonly createUserDto: CreateUserDto) {}
}
