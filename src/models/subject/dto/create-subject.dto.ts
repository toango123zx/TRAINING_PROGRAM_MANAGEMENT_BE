import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateSubjectDto {
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
	description: string;
	@ApiProperty({
		type: 'string',
		format: 'date-time',
	})
	@IsNotEmpty()
	@IsDateString()
	delete_at: Date;
}
