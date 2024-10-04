import { Class_Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { SubjectEntity } from '../../subject/entities/subject.entity';
import { InfoClassEntity } from '../../info_class/entities/info_class.entity';
import { LecturerEntity } from '../../lecturer/entities/lecturer.entity';

export class ClassEntity {
	@ApiProperty({
		type: 'string',
	})
	id_class: string;
	@ApiProperty({
		type: 'string',
	})
	name: string;
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
		type: 'integer',
		format: 'int32',
	})
	quantity: number;
	@ApiProperty({
		type: 'integer',
		format: 'int32',
	})
	current_quantity: number;
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
		type: () => InfoClassEntity,
		isArray: true,
		required: false,
	})
	infoClasses?: InfoClassEntity[];
	@ApiProperty({
		type: 'string',
	})
	id_lecturer: string;
	@ApiProperty({
		type: () => LecturerEntity,
		required: false,
	})
	lecturer?: LecturerEntity;
	@ApiProperty({
		enum: Class_Status,
	})
	status: Class_Status;
}
