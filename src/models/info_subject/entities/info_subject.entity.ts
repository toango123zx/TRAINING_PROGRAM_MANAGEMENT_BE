import { Info_Subject_Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { TrainingProgramEntity } from '../../training_program/entities/training_program.entity';
import { SubjectEntity } from '../../subject/entities/subject.entity';

export class InfoSubjectEntity {
	@ApiProperty({
		type: 'string',
	})
	id_info_subject: string;
	@ApiProperty({
		type: 'string',
	})
	id_training_program: string;
	@ApiProperty({
		type: () => TrainingProgramEntity,
		required: false,
	})
	trainingProgram?: TrainingProgramEntity;
	@ApiProperty({
		type: 'string',
	})
	id_subject: string;
	@ApiProperty({
		type: () => SubjectEntity,
		required: false,
	})
	subject?: SubjectEntity;
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
		nullable: true,
	})
	delete_at: Date | null;
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
