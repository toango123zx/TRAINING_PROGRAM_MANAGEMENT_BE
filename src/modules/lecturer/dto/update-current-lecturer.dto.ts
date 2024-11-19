import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { UpdateLecturerDto } from 'src/models';

export class UpdateCurrentLecturerDto {
	@ApiProperty({
		type: 'string',
		required: false,
	})
	@IsOptional()
	@IsString()
	email?: string;

	@ApiProperty({
		type: 'string',
		required: false,
	})
	@IsOptional()
	@IsString()
	phone_number?: string;

	@ApiProperty({
		type: 'string',
		required: false,
	})
	@IsOptional()
	@IsString()
	address?: string;

	@ApiProperty({
		type: UpdateLecturerDto,
		required: false,
	})
	@IsOptional()
	lecturer: UpdateLecturerDto;
}
