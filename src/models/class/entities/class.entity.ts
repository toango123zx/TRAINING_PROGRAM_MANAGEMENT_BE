import { Class_Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { SubjectDto } from '../../subject/entities/subject.entity';
import { InfoClassDto } from '../../info_class/entities/info_class.entity';
import { LecturerDto } from '../../lecturer/entities/lecturer.entity';

export class ClassDto {
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
		type: () => SubjectDto,
		required: false,
	})
	subject?: SubjectDto;
	@ApiProperty({
		type: () => InfoClassDto,
		isArray: true,
		required: false,
	})
	infoClasses?: InfoClassDto[];
	@ApiProperty({
		type: 'string',
	})
	id_lecturer: string;
	@ApiProperty({
		type: () => LecturerDto,
		required: false,
	})
	lecturer?: LecturerDto;
	@ApiProperty({
		enum: Class_Status,
	})
	status: Class_Status;
}
