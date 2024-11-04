import { Training_Program_Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { InfoSubjectEntity } from '../../info_subject/entities/info_subject.entity';
import { UserEntity } from '../../user/entities/user.entity';

export class TrainingProgramEntity {
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
		nullable: true,
	})
	update_at: Date | null;
	@ApiProperty({
		type: 'string',
		format: 'date-time',
		nullable: true,
	})
	delete_at: Date | null;
	@ApiProperty({
		type: 'string',
	})
	school_year: string;
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
		type: () => InfoSubjectEntity,
		isArray: true,
		required: false,
	})
	infoSubjects?: InfoSubjectEntity[];
	@ApiProperty({
		type: () => UserEntity,
		isArray: true,
		required: false,
	})
	students?: UserEntity[];
}
