import { Info_Subject_Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { TrainingProgramDto } from '../../training_program/entities/training_program.entity';
import { SubjectDto } from '../../subject/entities/subject.entity';

export class InfoSubjectDto {
	@ApiProperty({
		type: 'string',
	})
	id_info_subject: string;
	@ApiProperty({
		type: 'string',
	})
	id_training_program: string;
	@ApiProperty({
		type: () => TrainingProgramDto,
		required: false,
	})
	trainingProgram?: TrainingProgramDto;
	@ApiProperty({
		type: 'string',
	})
	id_subject: string;
	@ApiProperty({
		type: () => SubjectDto,
		required: false,
	})
	subject?: SubjectDto;
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
		enum: Info_Subject_Status,
	})
	status: Info_Subject_Status;
	@ApiProperty({
		type: 'integer',
		format: 'int32',
	})
	semester: number;
}
