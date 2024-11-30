import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class GetAssignableSubjectsDto {
	@ApiProperty({
		type: 'boolean',
		required: false,
	})
	@IsOptional()
	@Type(() => Boolean)
	@IsBoolean()
	all?: boolean;
}
