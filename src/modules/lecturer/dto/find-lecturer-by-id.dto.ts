import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindLecturerByIdDto {
	@ApiProperty({
		type: 'string',
		required: false,
	})
	@IsOptional()
	@IsString()
	userId?: string;
	@ApiProperty({
		type: 'string',
		required: false,
	})
	@IsOptional()
	@IsString()
	lecturerId?: string;
}
