import { ICommand } from '@nestjs/cqrs';
import { LoginUserDto } from '../../dto';

export class LoginUserCommand implements ICommand {
	constructor(public readonly loginUserDto: LoginUserDto) {}
}
