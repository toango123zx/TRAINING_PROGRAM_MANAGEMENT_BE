import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateLecturerDto {
	@ApiProperty({
		type: 'string',
		required: false,
	})
	@IsOptional()
	@IsString()
	description?: string;
	@ApiProperty({
		type: 'string',
		required: false,
		nullable: true,
	})
	@IsOptional()
	@IsString()
	degree?: string | null;
	@ApiProperty({
		type: 'string',
		required: false,
		nullable: true,
	})
	@IsOptional()
	@IsString()
	work_address?: string | null;
}
