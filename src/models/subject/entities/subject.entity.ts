import { Subject_Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { ClassEntity } from '../../class/entities/class.entity';
import { InfoSubjectEntity } from '../../info_subject/entities/info_subject.entity';

export class SubjectEntity {
	@ApiProperty({
		type: 'string',
	})
	id_subject: string;
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
		enum: Subject_Status,
	})
	status: Subject_Status;
	@ApiProperty({
		type: () => ClassEntity,
		isArray: true,
		required: false,
	})
	classes?: ClassEntity[];
	@ApiProperty({
		type: () => InfoSubjectEntity,
		isArray: true,
		required: false,
	})
	infoSubjects?: InfoSubjectEntity[];
}
