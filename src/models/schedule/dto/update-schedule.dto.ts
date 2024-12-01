import { Weekday } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional } from 'class-validator';

export class UpdateScheduleDto {
	@ApiProperty({
		minimum: 2,
		maximum: 8,
		enum: Weekday,
		required: false,
	})
	@IsOptional()
	weekday?: Weekday;
	@ApiProperty({
		minimum: 1,
		maximum: 14,
		type: 'integer',
		format: 'int32',
		required: false,
	})
	@IsOptional()
	@IsInt()
	start_lession?: number;
	@ApiProperty({
		minimum: 1,
		maximum: 14,
		type: 'integer',
		format: 'int32',
		required: false,
	})
	@IsOptional()
	@IsInt()
	end_lession?: number;
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
