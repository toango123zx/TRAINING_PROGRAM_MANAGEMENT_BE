import { IQuery } from '@nestjs/cqrs';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';

export class ProfileUserQuery implements IQuery {
	constructor(public readonly payload: JwtPayload) {}
}
