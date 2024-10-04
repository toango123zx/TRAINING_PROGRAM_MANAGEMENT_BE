import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLecturerDto {
	@ApiProperty({
		type: 'string',
	})
	@IsNotEmpty()
	@IsString()
	description: string;
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
	})
	@IsNotEmpty()
	@IsString()
	work_address: string;
}
