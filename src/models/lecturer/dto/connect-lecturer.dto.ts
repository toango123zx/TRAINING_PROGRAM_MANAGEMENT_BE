import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ConnectLecturerDto {
	@ApiProperty({
		type: 'string',
		required: false,
		nullable: true,
	})
	@IsOptional()
	@IsString()
	id_lecturer?: string;
	@ApiProperty({
		type: 'string',
		required: false,
		nullable: true,
	})
	@IsOptional()
	@IsString()
	id_user?: string;
}
