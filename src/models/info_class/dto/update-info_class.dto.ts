import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export class UpdateInfoClassDto {
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
