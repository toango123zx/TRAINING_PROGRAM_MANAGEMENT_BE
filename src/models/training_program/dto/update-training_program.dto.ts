import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateTrainingProgramDto {
	@ApiProperty({
		type: 'string',
		required: false,
	})
	@IsOptional()
	@IsString()
	name?: string;
	@ApiProperty({
		type: 'string',
		required: false,
	})
	@IsOptional()
	@IsString()
	description?: string;
	@ApiProperty({
		type: 'string',
		format: 'date-time',
		required: false,
		nullable: true,
	})
	@IsOptional()
	@IsDateString()
	delete_at?: Date | null;
	@ApiProperty({
		type: 'string',
		required: false,
	})
	@IsOptional()
	@IsString()
	school_year?: string;
	@ApiProperty({
		type: 'integer',
		format: 'int32',
		required: false,
	})
	@IsOptional()
	@IsInt()
	number_semester?: number;
}
