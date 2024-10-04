import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateInfoSubjectDto {
	@ApiProperty({
		type: 'string',
		format: 'date-time',
	})
	@IsNotEmpty()
	@IsDateString()
	delete_at: Date;
	@ApiProperty({
		type: 'integer',
		format: 'int32',
	})
	@IsNotEmpty()
	@IsInt()
	semester: number;
}
