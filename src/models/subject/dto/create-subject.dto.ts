import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSubjectDto {
	@ApiProperty({
		type: 'string',
	})
	@IsNotEmpty()
	@IsString()
	name: string;
	@ApiProperty({
		type: 'string',
		required: false,
		nullable: true,
	})
	@IsOptional()
	@IsString()
	description?: string | null;
}
