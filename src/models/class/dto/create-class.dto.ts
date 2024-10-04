import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClassDto {
	@ApiProperty({
		type: 'string',
	})
	@IsNotEmpty()
	@IsString()
	name: string;
	@ApiProperty({
		type: 'string',
		format: 'date-time',
		required: false,
		nullable: true,
	})
	@IsOptional()
	@IsDateString()
	delete_at?: Date | null;
}
