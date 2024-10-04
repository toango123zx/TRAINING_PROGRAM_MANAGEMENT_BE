import { Training_Program_Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { InfoSubjectDto } from '../../info_subject/entities/info_subject.entity';

export class TrainingProgramDto {
	@ApiProperty({
		type: 'string',
	})
	id_training_program: string;
	@ApiProperty({
		type: 'string',
	})
	name: string;
	@ApiProperty({
		type: 'string',
	})
	description: string;
	@ApiProperty({
		type: 'string',
		format: 'date-time',
	})
	create_at: Date;
	@ApiProperty({
		type: 'string',
		format: 'date-time',
	})
	update_at: Date;
	@ApiProperty({
		type: 'string',
		format: 'date-time',
	})
	delete_at: Date;
	@ApiProperty({
		type: 'integer',
		format: 'int32',
	})
	school_year: number;
	@ApiProperty({
		type: 'integer',
		format: 'int32',
	})
	number_semester: number;
	@ApiProperty({
		enum: Training_Program_Status,
	})
	status: Training_Program_Status;
	@ApiProperty({
		type: () => InfoSubjectDto,
		isArray: true,
		required: false,
	})
	infoSubjects?: InfoSubjectDto[];
}
