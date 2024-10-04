import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ConnectUserDto {
	@ApiProperty({
		type: 'string',
		required: false,
		nullable: true,
	})
	@IsOptional()
	@IsString()
	id_user?: string;
	@ApiProperty({
		type: 'string',
		required: false,
		nullable: true,
	})
	@IsOptional()
	@IsString()
	username?: string;
	@ApiProperty({
		type: 'string',
		required: false,
		nullable: true,
	})
	@IsOptional()
	@IsString()
	email?: string;
}
