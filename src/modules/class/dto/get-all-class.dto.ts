import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';
import { GetApiConfig } from 'src/config';

export class GetAllClassDto {
	@ApiProperty({ type: 'number', required: false })
	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@IsPositive()
	page: number = GetApiConfig.defaultPage;

	@ApiProperty({ type: 'number', required: false })
	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@IsPositive()
	limit: number = GetApiConfig.defaultLimitPage;

	@ApiProperty({ type: 'string', required: false })
	@IsOptional()
	@Type(() => String)
	@IsString()
	name: string = '';
}
