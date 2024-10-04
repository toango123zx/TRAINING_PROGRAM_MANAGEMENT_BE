import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
	@ApiProperty({
		type: 'string',
	})
	@IsNotEmpty()
	@IsString()
	username: string;
	@ApiProperty({
		type: 'string',
	})
	@IsNotEmpty()
	@IsString()
	password: string;
	@ApiProperty({
		type: 'string',
	})
	@IsNotEmpty()
	@IsString()
	name: string;
	@ApiProperty({
		type: 'string',
	})
	@IsNotEmpty()
	@IsString()
	email: string;
	@ApiProperty({
		type: 'boolean',
	})
	@IsNotEmpty()
	@IsBoolean()
	gender: boolean;
	@ApiProperty({
		type: 'string',
		format: 'date-time',
	})
	@IsNotEmpty()
	@IsDateString()
	date_of_birth: Date;
	@ApiProperty({
		type: 'string',
	})
	@IsNotEmpty()
	@IsString()
	phone_number: string;
	@ApiProperty({
		type: 'string',
	})
	@IsNotEmpty()
	@IsString()
	address: string;
	@ApiProperty({
		type: 'string',
	})
	@IsNotEmpty()
	@IsString()
	salt: string;
}
