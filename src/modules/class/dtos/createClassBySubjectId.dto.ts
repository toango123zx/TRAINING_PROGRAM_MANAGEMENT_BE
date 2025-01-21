import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateClassBySubjectIdDto {
	@ApiProperty({
		type: 'string',
	})
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty({
		type: 'integer',
		format: 'int32',
	})
	@IsNotEmpty()
	@IsInt()
	quantity: number;

	@ApiProperty({
		type: 'string',
	})
	@IsNotEmpty()
	@IsString()
	id_lecturer: string;
}
