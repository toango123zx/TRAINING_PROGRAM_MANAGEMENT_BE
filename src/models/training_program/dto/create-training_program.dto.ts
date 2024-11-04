import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTrainingProgramDto {
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
	})
	@IsNotEmpty()
	@IsString()
	school_year: string;
	@ApiProperty({
		type: 'integer',
		format: 'int32',
	})
	@IsNotEmpty()
	@IsInt()
	number_semester: number;
}
