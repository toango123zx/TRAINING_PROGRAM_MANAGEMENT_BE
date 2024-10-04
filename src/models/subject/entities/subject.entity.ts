import { Subject_Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { ClassDto } from '../../class/entities/class.entity';
import { InfoSubjectDto } from '../../info_subject/entities/info_subject.entity';

export class SubjectDto {
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
		type: () => ClassDto,
		isArray: true,
		required: false,
	})
	classes?: ClassDto[];
	@ApiProperty({
		type: () => InfoSubjectDto,
		isArray: true,
		required: false,
	})
	infoSubjects?: InfoSubjectDto[];
}
