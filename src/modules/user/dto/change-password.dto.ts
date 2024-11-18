import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ChangePasswordDto {
	@ApiProperty({
		type: 'string',
		required: true,
	})
	@IsString()
	oldPassword: string;
	@ApiProperty({
		type: 'string',
		required: true,
	})
	@IsString()
	newPassword: string;
	@ApiProperty({
		type: 'string',
		required: true,
	})
	@IsString()
	confirmedPassword: string;
}
