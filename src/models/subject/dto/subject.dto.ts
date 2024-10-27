import { Subject_Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

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
		nullable: true,
	})
	description: string | null;
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
	category: string;
	@ApiProperty({
		enum: Subject_Status,
	})
	status: Subject_Status;
}
