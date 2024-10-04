import { User_Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
	@ApiProperty({
		type: 'string',
	})
	id_user: string;
	@ApiProperty({
		type: 'string',
	})
	username: string;
	@ApiProperty({
		type: 'string',
	})
	password: string;
	@ApiProperty({
		type: 'string',
	})
	name: string;
	@ApiProperty({
		type: 'string',
	})
	email: string;
	@ApiProperty({
		type: 'boolean',
	})
	gender: boolean;
	@ApiProperty({
		type: 'string',
		format: 'date-time',
	})
	date_of_birth: Date;
	@ApiProperty({
		type: 'string',
	})
	phone_number: string;
	@ApiProperty({
		type: 'string',
	})
	address: string;
	@ApiProperty({
		type: 'string',
		format: 'date-time',
	})
	create_at: Date;
	@ApiProperty({
		type: 'string',
	})
	salt: string;
	@ApiProperty({
		enum: User_Status,
	})
	status: User_Status;
}
