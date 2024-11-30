import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateClassRequsestDto {
	@ApiProperty({
		type: 'number',
	})
	@IsNotEmpty()
	@Type(() => Number)
	@IsNumber()
	quantity: number;
}
